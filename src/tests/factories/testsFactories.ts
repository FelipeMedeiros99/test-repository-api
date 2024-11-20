import request from "supertest";
import { faker } from "@faker-js/faker";

import app from "../../app";


function generateNewTestData(){
    return {
        name: faker.person.fullName(),
        pdfUrl: faker.internet.url(),
        categoryId: randonNumber(1, 4),
        teacherDisciplineId: randonNumber(1, 2)
    }

}

function returnRoutersAndDatas(): [string[], object[]] {
    const routers = ['/newtest', "/tests"]
    const datas = [generateNewTestData(), {}]

    return [routers, datas]

}

export function randonNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

async function returnValidToken() {
    const tokenResponse = await request(app).post("/login").send({
        email: "felipe@gmail.com",
        password: "123456"
    })
    return tokenResponse.text
}

export async function sendRequestsWithoutToken() {
    const [routers, datas] = returnRoutersAndDatas()
    for(let i = 0; i<routers.length; i++){ 
        const response = await request(app).post(routers[i]).send(datas[i])        
        expect(response.status).toBe(401);
        expect(response.text).toBe("Token is required in the Authorization header")
    }
}

export async function sendRequestsWithIncorrectFormatToken() {

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

    const token = await returnValidToken();
    const testData = {
        name: faker.person.fullName(),
        pdfUrl: faker.internet.url(),
        categoryId: randonNumber(1, 4),
        teacherDisciplineId: randonNumber(1, 2)
    }
    const testResponse = await request(app).post("/newtest").send(testData).set("Authorization", `Bearer ${token}`)
    expect(testResponse.status).toBe(201)

}

export async function findAllTests() {
    const token = await returnValidToken()
    const response = await request(app)
        .get("/tests")
        .set("Authorization", `Bearer ${token}`)
    expect(response.body.length > 0).toBe(true)
    expect(response.statusCode).toBe(200)
}

export async function findTestWitoutToken(){
    const response = await request(app).get("/tests")
    expect(response.status).toBe(401)
    expect(response.body).toStrictEqual({})

}