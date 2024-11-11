import { Request, Response } from "express"

import { registerUserInDatabaseRepository } from "../repositories/userRepository";
import { hashPassword, userDataValidation } from "../services/userService";
import { UserSignupType } from "../types/userTypes";


export async function signupUserController(req: Request, res: Response) {

    let userData = req.body as UserSignupType;
    userData.password = hashPassword(userData.password)

    await registerUserInDatabaseRepository(userData)

    res.sendStatus(201);
}

export async function loginUserController(req: Request, res: Response) {

    let userData = req.body as UserSignupType;
    
    const databaseUserData = await userDataValidation(userData);

    console.log(databaseUserData)

    res.sendStatus(201);
}