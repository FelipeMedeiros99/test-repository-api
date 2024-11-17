import { Router } from "express";

import { validToken } from "../middlewares/testsMiddlewares";
import { validSchemaMiddleware } from "../middlewares/validationsMiddleware";
import { addTestSchema } from "../schemas/testsSchemas";
import { addTestController, returnTestsController } from "../controllers/testsController";


const testRouter = Router()


testRouter.use(validToken)
testRouter.post("/newtest", validSchemaMiddleware(addTestSchema), addTestController)

testRouter.get("/tests", returnTestsController)

export default testRouter;