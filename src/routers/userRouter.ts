import { Router } from "express";
import { signupUserController } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/signup", signupUserController)

export default userRouter;