import request from "supertest";
import { faker } from "@faker-js/faker";

import app from "../../app";


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