import request from "supertest";
import { faker } from "@faker-js/faker";
import "dotenv/config"

import app from "../../app";


function generateNewTestData() {
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

async function returnValidToken() {
    const tokenResponse = await request(app).post("/login").send({
        email: process.env.VALID_USER_EMAIL,
        password: process.env.VALID_USER_PASSWORD
    })
    return tokenResponse.text;
}

export function randonNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export async function sendRequestsWithoutToken() {
    const [routers, datas] = returnRoutersAndDatas()
    for (let i = 0; i < routers.length; i++) {
        const response = await request(app).post(routers[i]).send(datas[i])
        expect(response.status).toBe(401);
        expect(response.text).toBe("Token is required in the Authorization header")
    }
}

export async function sendRequestsWithIncorrectFormatToken() {

    const [routers, datas] = returnRoutersAndDatas();
    for (let i = 0; i < routers.length; i++) {
        const response = await request(app).post(routers[i]).send(datas[i]).set("Authorization", "IsNotBearer <token>")
        expect(response.status).toBe(401)
        expect(response.text).toBe("Token format must be 'Bearer <Token>'")
    }



}

export async function sendRequestsWithInvalidToken() {
    const [routers, datas] = returnRoutersAndDatas()
    for (let i = 0; i < routers.length; i++) {
        const response = await request(app).post(routers[i]).send(datas[i]).set("Authorization", `Bearer ${faker.internet.jwt()}`)
        expect(response.status).toBe(401)
        expect(response.text).toBe("Token expired")
    }
}

export async function sendRequestsWithValidToken() {

    const token = await returnValidToken();
    const [routers, datas] = returnRoutersAndDatas();
    for (let index = 0; index < routers.length; index++) {
        if (routers[index] === "/newtest") {
            const testResponse = await request(app).post(routers[index]).send(datas[index]).set("Authorization", `Bearer ${token}`)
            expect(testResponse.status).toBe(201)
        } else if (routers[index] === "/tests") {
            const testResponse = await request(app).get(routers[index]).send(datas[index]).set("Authorization", `Bearer ${token}`)
            expect(testResponse.status).toBe(200)
        }
    }

}

export async function findAllTests() {
    const token = await returnValidToken()
    const response = await request(app)
        .get("/tests")
        .set("Authorization", `Bearer ${token}`)
    expect(response.body.length > 0).toBe(true)
    expect(response.statusCode).toBe(200)
}

