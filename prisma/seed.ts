import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import "dotenv/config"

import prisma from "../src/config/db";
import { createToken, hashPassword } from "../src/services/userService";
import { UserDataTokenType } from "../src/types/userTypes";
import { Tests } from "@prisma/client";
import { randonNumber } from "../src/tests/factories/testsFactories";
import { TestType } from "../src/types/testsTypes";


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

async function populingTests() {
    const tests: TestType[] = []

    for (let i = 0; i < 30; i++) {
        const test: Omit<Tests, "id"> = {
            name: faker.person.fullName(),
            pdfUrl: faker.internet.url(),
            categoryId: randonNumber(1, 4),
            teacherDisciplineId: randonNumber(1, 2)
        }

        tests.push(test);
    }

    await prisma.tests.createMany({
        data: tests
    })


}

async function addAllDatas() {
    await populingTerms()
    await populingCategories()
    await populingTeachers()
    await populingDisciplines()
    await populingTeachersDisciplines()
    await populingTests()

}

async function registerUsers() {
    let data = []
    for (let i = 0; i < 10; i++) {
        const password = bcrypt.hashSync(faker.internet.password(), 10)
        data.push({
            email: faker.internet.email(),
            password: password
        })
    }
    data.push({
        email: "felipe@gmail.com",
        password: hashPassword("123456")
    })
    await prisma.users.createMany({
        data,
        skipDuplicates: true
    })
}

async function seed() {
    try {
        await addAllDatas()
        await registerUsers()
    } catch (e) {
        console.log("err: ", e)
    }
}

// receita de bolo para caso de erro
seed().catch(e => {
    console.log(e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
})
