import { Request, Response } from "express"
import { UserSignupType } from "../types/userTypes";
import dotenv from "dotenv"

import { registerUserInDatabaseRepository } from "../repositories/userRepository";


dotenv.config()


export async function signupUserController(req: Request, res: Response) {
    const userData = req.body as UserSignupType;
    
    await registerUserInDatabaseRepository(userData)
    res.sendStatus(201);
}