import prisma from "../src/config/db";

async function clearAllTables() {
    const tablenames = await prisma.$queryRaw<Array<{ tablename: string }>>`SELECT tablename FROM pg_tables WHERE schemaname='public'`

    for (const table of tablenames) {
        try {
            await prisma.$executeRawUnsafe(`TRUNCATE TABLE ${table.tablename} CASCADE`)
        } catch (e) {
        }
    }

}

async function populingTerms() {
    await prisma.terms.createMany({
        data: [
            { number: 1 },
            { number: 2 },
            { number: 3 },
            { number: 4 },
            { number: 5 },
            { number: 6 }
        ],
        skipDuplicates: true
    })
}

async function populingCategories() {
    await prisma.categories.createMany({
        data: [
            { name: "Projeto" },
            { name: "Prática" },
            { name: "Recuperação" },
            { name: "Teórica" },
        ],
        skipDuplicates: true
    })
}

async function populingTeachers() {
    await prisma.teachers.createMany({
        data: [
            { name: "Osvaldo Cutrim" },
            { name: "Márcia Regina" },
        ],
        skipDuplicates: true
    })
}

async function populingDisciplines() {
    await prisma.disciplines.createMany({
        data: [
            {
                name: "HTML e CSS",
                termId: 1
            },
            {
                name: "JavaScript",
                termId: 2
            },
            {
                name: "React",
                termId: 3
            },
            {
                name: "Testes De Integração",
                termId: 4
            },
            {
                name: "Planejamento",
                termId: 1
            },
            {
                name: "UX",
                termId: 2
            },
            {
                name: "Calculo 1",
                termId: 3
            },
        ],
        skipDuplicates: true
    })
}

async function populingTeachersDisciplines() {
    await prisma.teachersDiscliplines.createMany({
        data: [
            {
                "teacherId": 1,
                "disciplineId": 1
            },
            {
                "teacherId": 1,
                "disciplineId": 2
            },
            {
                "teacherId": 1,
                "disciplineId": 3
            },
            {
                "teacherId": 2,
                "disciplineId": 4
            },
            {
                "teacherId": 2,
                "disciplineId": 5
            },
            {
                "teacherId": 2,
                "disciplineId": 6
            },
        ],
        skipDuplicates: true
    })
}

async function addDatasInTeachersTables() {
    await populingTerms()
    await populingCategories()
    await populingTeachers()
    await populingDisciplines()
    await populingTeachersDisciplines()
}

async function seed() {
    await clearAllTables()
    await addDatasInTeachersTables()
}


seed()