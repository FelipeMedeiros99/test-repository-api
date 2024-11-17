import { Request, Response } from "express"

import { registerUserInDatabaseRepository, saveTokenAtDatabase } from "../repositories/userRepository";
import { createToken, hashPassword, userDataValidation } from "../services/userService";
import { UserDataTokenType, UserSignupType } from "../types/userTypes";


export async function signupUserController(req: Request, res: Response) {
    
    let userData = req.body as UserSignupType;
    userData.password = hashPassword(userData.password)
    await registerUserInDatabaseRepository(userData)
    res.sendStatus(201);
}

export async function loginUserController(req: Request, res: Response) {

    let userData = req.body as UserSignupType;    
    const databaseUserData = await userDataValidation(userData);
    const token = createToken(databaseUserData)
    await saveTokenAtDatabase(databaseUserData.id, token)
    
    res.status(200).send(token);
}