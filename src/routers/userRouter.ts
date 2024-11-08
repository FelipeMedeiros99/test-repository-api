import { Router } from "express";

import { signupUserController } from "../controllers/userController";
import { validSchemaMiddleware } from "../middlewares/validationsMiddleware";
import { signupUserSchema } from "../schemas/userSchemas";


const userRouter = Router();

userRouter.post("/signup", validSchemaMiddleware(signupUserSchema), signupUserController)

export default userRouter;