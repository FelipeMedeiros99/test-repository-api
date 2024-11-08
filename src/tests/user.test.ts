import request from "supertest";
import { faker } from "@faker-js/faker"

import app from "../app";


describe("signup user test", ()=>{

    it("sending correct user data. should return status 201", async()=>{
        const password = faker.internet.password()
        const userData = {
            name: faker.person.fullName(),
            password: password,
            passwordConfirmation: password
        };

        const response = await request(app).post("/signup").send(userData);
        
        expect(response.statusCode).toBe(201)
    })

})