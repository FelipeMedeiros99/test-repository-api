import { Request, Response, NextFunction } from "express";
import { UserSignupType } from "../types/userTypes";
import { findUser } from "../repositories/userRepository";

export async function validUserExists(req: Request, res: Response, next: NextFunction){
    const userData = req.body as UserSignupType;
    const userExists = await findUser(userData)
    if(userExists){
        throw { message: "User alread exists", status: 409}
    }

    next()

}