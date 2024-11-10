import { faker } from "@faker-js/faker";
import request from "supertest";

import app from "../../app";
import prisma from "../../config/db";
import exp from "constants";
import { comparePassword } from "../../services/tools";


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


export async function sendingIncorrectDatasUser(){
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


export async function checkIfUSerIsSavedInDatabase(){
    const password = faker.internet.password()
    const userData = {
        email: faker.internet.email(),
        password: password,
        passwordConfirmation: password
    };

    await request(app).post("/signup").send(userData);

    const userDataDb = await prisma.users.findFirst({
        where: {email: userData.email}
    })


    expect(userDataDb).not.toBe(null)
    expect(userDataDb?.email).toBe(userData.email)
    expect(comparePassword(userData.password, userDataDb?.password)).toBe(true)

}