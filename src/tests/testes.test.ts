import { findAllTests, sendRequestsWithoutToken, sendRequestsWithIncorrectFormatToken, sendRequestsWithInvalidToken, sendRequestsWithValidToken } from "./factories/testsFactories"

describe("Tests router tests", ()=>{
    describe("token tests", ()=>{
        it("Try to send requests witout token, it should be return 401", sendRequestsWithoutToken);
    
        it("Try to send request with incorrect token format, it should be return 401", sendRequestsWithIncorrectFormatToken)
    
        it("Try to send invalid/expired token, it should be return 401", sendRequestsWithInvalidToken)
    
        it("Try to send request with correct token, it should be return 201", sendRequestsWithValidToken)
    })

    describe("find tests test", ()=>{
        it("find all tests. Should be 200 and not null array", findAllTests)
    })
})