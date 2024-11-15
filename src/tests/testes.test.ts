import { sendTestWithoutToken } from "./factories/testsFactories"

describe("Tests router tests", ()=>{
    it("Try to send test witout token, it should return 401", sendTestWithoutToken)
})