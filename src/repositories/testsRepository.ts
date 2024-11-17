import prisma from "../config/db";
import { TestType } from "../types/testsTypes";

export async function tokenIsInDatabase(token: string) {

    const tokenInDatabase = await prisma.tokens.findFirst({
        where: { token: token.replace("Bearer ", "") }
    })
    if(!tokenInDatabase) throw { message: "Token expired", status: 401}
}   

export async function saveTest(testData: TestType) {
    await prisma.tests.create({
        data: testData
    })
}