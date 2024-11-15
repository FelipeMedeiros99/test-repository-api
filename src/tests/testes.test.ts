import { sendTestWithIncorrectFormatToken, sendTestWithInvalidToken, sendTestWithoutToken, sendTestWithValidToken } from "./factories/testsFactories"

describe("Tests router tests", ()=>{
    it("Try to send test witout token, it should be return 401", sendTestWithoutToken);

    it("Try to send test with incorrect token format, it should be return 401", sendTestWithIncorrectFormatToken)

    it("Try to send invalid/expired token, it should be return 401", sendTestWithInvalidToken)

    it("Try to send test with correct token, it should be return 201", sendTestWithValidToken)
})