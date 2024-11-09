import request from "supertest";
import { faker } from "@faker-js/faker"

import app from "../app";


describe("signup user test", () => {

    it("sending correct user data. should return status 201", async () => {
        const password = faker.internet.password()
        const userData = {
            email: faker.internet.email(),
            password: password,
            passwordConfirmation: password
        };

        const response = await request(app).post("/signup").send(userData);

        expect(response.statusCode).toBe(201)

    });

    it("sending incorrect user data. Should return 400", async () => {
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
    })

})