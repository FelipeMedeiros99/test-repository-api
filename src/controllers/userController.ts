import { Request, Response } from "express"
import { UserSignupType } from "../types/userTypes";

import { findUser, registerUserInDatabaseRepository } from "../repositories/userRepository";
import { comparePassword, hashPassword } from "../services/tools";
import { ErrorType } from "../types/errorTypes";


export async function signupUserController(req: Request, res: Response) {

    let userData = req.body as UserSignupType;
    userData.password = hashPassword(userData.password)

    await registerUserInDatabaseRepository(userData)

    res.sendStatus(201);
}

export async function loginUserController(req: Request, res: Response) {

    let userData = req.body as UserSignupType;
    
    const userIsInDatabase = await findUser(userData);

    if(!userIsInDatabase){
        const error: ErrorType = {message: "Email not found", status: 404};
        throw error;
    }
    
    const passwordIsCorrect = comparePassword(userData.password, userIsInDatabase.password)
    if(!passwordIsCorrect){
        const error: ErrorType = {message: "Incorrect password", status: 404};
        throw error;
    }

    

    res.sendStatus(201);
}