import request from "supertest";
import { faker } from "@faker-js/faker";

import app from "../../app";
import prisma from "../../config/db";


function randonNumber(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function sendTestWithoutToken() {

    const response = await request(app).post("/newtest").send({
        name: faker.person.fullName(),
        pdfUrl: faker.internet.url(),
        categoryId: randonNumber(1, 4),
        teacherDisciplineId: randonNumber(1, 2)
    })
    expect(response.status).toBe(401);
    expect(response.text).toBe("Token is required in the Authorization header")
}

export async function sendTestWithIncorrectFormatToken() {

    const testData = {
        name: faker.person.fullName(),
        pdfUrl: faker.internet.url(),
        categoryId: randonNumber(1, 4),
        teacherDisciplineId: randonNumber(1, 2)
    }
    const response = await request(app).post("/newtest").send(testData).set("Authorization", "IsNotBearer <token>")
    
    expect(response.status).toBe(401)
    expect(response.text).toBe("Token format must be 'Bearer <Token>'")
}

export async function sendTestWithInvalidToken() {
    const testData = {
        name: faker.person.fullName(),
        pdfUrl: faker.internet.url(),
        categoryId: randonNumber(1, 4),
        teacherDisciplineId: randonNumber(1, 2)
    }
    const response = await request(app).post("/newtest").send(testData).set("Authorization", `Bearer ${faker.internet.jwt()}`)
    
    expect(response.status).toBe(401)
    expect(response.text).toBe("Token expired")
}

export async function sendTestWithValidToken() {
    const tokenResponse = await request(app).post("/login").send({
        email: "felipe@gmail.com",
        password: "123456"
    })

    console.log("login response: ", tokenResponse.text)

    const token = tokenResponse.text;

    const testData = {
        name: faker.person.fullName(),
        pdfUrl: faker.internet.url(),
        categoryId: randonNumber(1, 4),
        teacherDisciplineId: randonNumber(1, 2)
    }
    const testResponse = await request(app).post("/newtest").send(testData).set("Authorization", `Bearer ${token}`)
    const allTokens = await prisma.tokens.findMany()
    console.log("All tokens: ", allTokens)
    console.log("token sended: ", token)
    console.log("error recived: ", testResponse.text)
    console.log("Response status: ", testResponse.status)
    expect(testResponse.status).toBe(201)

}