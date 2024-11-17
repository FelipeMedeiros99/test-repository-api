import { checkIfUSerIsSavedInDatabase, duplicateUser, loginInvalidUser, loginUser, sendingIncorrectDatasUser, signupUser } from "./factories/userFactories";

describe("signup user test", () => {

    it("sending correct user data. should return status 201", signupUser);

    it("valid if user is saved and password was encripted", checkIfUSerIsSavedInDatabase)

    it("sending incorrect user data. Should return 400", sendingIncorrectDatasUser)

    it("sending duplicates emails. shold be return 409", duplicateUser)

})

describe("login user tests", () => {
    it("trying do login with correct user. Shold be return status 200 and a token", loginUser)

    it("Trying do login with incorrect user email and password. Shold be return status 401 and error message", loginInvalidUser)
})