import { Request, Response } from "express"
import { UserSignupType } from "../types/userTypes";

import { registerUserInDatabaseRepository } from "../repositories/userRepository";
import { hashPassword } from "../services/tools";


export async function signupUserController(req: Request, res: Response) {

    let userData = req.body as UserSignupType;
    userData.password = hashPassword(userData.password)

    await registerUserInDatabaseRepository(userData)

    res.sendStatus(201);
}