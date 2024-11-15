import { Router } from "express";

import { validToken } from "../middlewares/testsMiddlewares";
import { validSchemaMiddleware } from "../middlewares/validationsMiddleware";
import { addTestSchema } from "../schemas/testsSchemas";
import { addTestController } from "../controllers/testsController";


const testRouter = Router()


testRouter.use(validToken)
testRouter.post("/newtest", validSchemaMiddleware(addTestSchema), addTestController)


export default testRouter;