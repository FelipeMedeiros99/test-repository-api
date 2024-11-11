import { Router } from "express";

import { signupUserController } from "../controllers/userController";
import { validSchemaMiddleware } from "../middlewares/validationsMiddleware";
import { loginUserSchema, signupUserSchema } from "../schemas/userSchemas";


const userRouter = Router();

userRouter.post("/signup", validSchemaMiddleware(signupUserSchema), signupUserController)
userRouter.post("/login", validSchemaMiddleware(loginUserSchema), )


export default userRouter;