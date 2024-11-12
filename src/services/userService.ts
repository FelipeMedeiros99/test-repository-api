import bcrypt from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";

import { UserDataTokenType, UserSignupType } from "../types/userTypes";
import { ErrorType } from "../types/errorTypes";
import { findUser } from "../repositories/userRepository";


export function hashPassword(password: string) {
    const SALTS = Number(process.env.SALTS);
    const newPassword = bcrypt.hashSync(password, SALTS)
    return newPassword;
}

export function comparePassword(password: string, hash: string | undefined) {
    if (hash) {
        return bcrypt.compareSync(password, hash)
    }

    return false
}

export async function userDataValidation(userData: UserSignupType) {
    const userIsInDatabase = await findUser(userData);

    if (!userIsInDatabase) {
        const error: ErrorType = { message: "Email not found", status: 404 };
        throw error;
    }

    const passwordIsCorrect = comparePassword(userData.password, userIsInDatabase.password)
    if (!passwordIsCorrect) {
        const error: ErrorType = { message: "Incorrect password", status: 404 };
        throw error;
    }

    return userIsInDatabase;
}

export function createToken(userData: UserDataTokenType) {
    const TOKEN_PASSWORD = process.env.TOKEN_PASSWORD;
    if (!TOKEN_PASSWORD) {
        throw { message: ".env dont have token password", status: 500 }
    }    
    delete userData.password;
    const token = jwt.sign(userData, TOKEN_PASSWORD);

    return token;
}