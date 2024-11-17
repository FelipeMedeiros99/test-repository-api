import { Router } from "express";

import { loginUserController, signupUserController } from "../controllers/userController";
import { validSchemaMiddleware } from "../middlewares/validationsMiddleware";
import { loginUserSchema, signupUserSchema } from "../schemas/userSchemas";
import { validUserExists } from "../middlewares/usersMiddleware";


const userRouter = Router();
//TODO: ADD CONFLIT VALIDATION
userRouter.post("/signup", validSchemaMiddleware(signupUserSchema), validUserExists, signupUserController)
userRouter.post("/login", validSchemaMiddleware(loginUserSchema), loginUserController)


export default userRouter;