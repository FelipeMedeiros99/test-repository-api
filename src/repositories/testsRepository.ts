import { Tests } from "@prisma/client";
import prisma from "../config/db";
import { TestType } from "../types/testsTypes";

export async function tokenIsInDatabase(token: string) {

    const tokenInDatabase = await prisma.tokens.findFirst({
        where: { token: token.replace("Bearer ", "") }
    })
    if (!tokenInDatabase) throw { message: "Token expired", status: 401 }
}

export async function saveTest(testData: Omit<Tests, "id">) {
    await prisma.tests.create({
        data: testData
    })
}

export async function findTests(group: string | undefined) {
    if (group === "disciplines") {
        const byPeriod = await prisma.terms.findMany({
            select: {
                number: true,
                disciplines: {
                    select: {
                        name: true,
                        teachersDisciplines: {
                            select: {
                                teachers: {
                                    select: {
                                        name: true
                                    }
                                },
                                disciplines: {
                                    select: {
                                        name: true
                                    }
                                },
                                tests: {
                                    select: {
                                        name: true,
                                        pdfUrl: true,
                                        category: {
                                            select: {
                                                name: true
                                            }
                                        }
                                    }
                                },
                            }
                        }
                    }
                }
            }
        })
        return byPeriod
    } else if (group === "teachers") {
        const byTeacher = await prisma.teachers.findMany({
            include: {
                teachersDisciplines: {
                    include: {
                        disciplines: {
                            include: {
                                terms: true
                            }
                        },
                        tests: {
                            include: {
                                category: true
                            }
                        }
                        

                    }
                }
            }
        })
        return byTeacher
    }
    return await prisma.tests.findMany({
        include: {
            category: true,
            teacherDiscipline: {
                include: {
                    teachers: true,
                    disciplines: {
                        include: {
                            terms: true
                        }
                    }
                }
            }
        }
    })



}