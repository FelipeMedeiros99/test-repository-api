import { faker } from "@faker-js/faker";
import request from "supertest";

import app from "../../app";
import prisma from "../../config/db";
import { comparePassword } from "../../services/userService";


export async function signupUser() {
    const password = faker.internet.password()
    const userData = {
        email: faker.internet.email(),
        password: password,
        passwordConfirmation: password
    };

    const response = await request(app).post("/signup").send(userData);

    expect(response.statusCode).toBe(201)
}

export async function sendingIncorrectDatasUser() {
    const password = faker.internet.password()
    const userData = {
        email: faker.internet.email(),
        password,
        passwordConfirmation: password
    };

    const incorrectUserDataScenarios = [
        { ...userData, email: undefined },
        { ...userData, password: undefined },
        { ...userData, passwordConfirmation: undefined },
    ]

    for (let incorrectData of incorrectUserDataScenarios) {
        const response = await request(app).post("/signup").send(incorrectData)
        expect(response.statusCode).toBe(400)
    }
}

export async function checkIfUSerIsSavedInDatabase() {
    const password = faker.internet.password()
    const userData = {
        email: faker.internet.email(),
        password: password,
        passwordConfirmation: password
    };

    await request(app).post("/signup").send(userData);

    const userDataDb = await prisma.users.findFirst({
        where: { email: userData.email }
    })


    expect(userDataDb).not.toBe(null)
    expect(userDataDb?.email).toBe(userData.email)
    expect(comparePassword(userData.password, userDataDb?.password)).toBe(true)

}

export async function loginUser() {
    const response = await request(app).post("/login").send({
        "email": "felipe@gmail.com",
        "password": "123456"
    })

    expect(response.statusCode).toBe(200);
    expect(response.text).not.toBe(null)
}


export async function loginInvalidUser() {
    const invalidDatas = [{
        email: faker.internet.email(),
        password: faker.internet.password()
    },{
        email: "felipe@gmail.com",
        password: faker.internet.password()
    }]

    for(let data of invalidDatas){
        const response = await request(app).post("/login").send(data)
        expect(response.statusCode).toBe(401);
        expect(response.text).not.toBe(null);
    }
}