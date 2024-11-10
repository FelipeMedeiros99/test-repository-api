import request from "supertest";
import { faker } from "@faker-js/faker"

import app from "../app";
import { checkIfUSerIsSavedInDatabase, sendingIncorrectDatasUser, signupUser } from "./factories/userFactories";

describe("signup user test", () => {

    it("sending correct user data. should return status 201", signupUser);

    it("valid if user is saved and password was encripted", checkIfUSerIsSavedInDatabase)

    it("sending incorrect user data. Should return 400", sendingIncorrectDatasUser)

})