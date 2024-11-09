import prisma from "../config/db";
import { UserSignupType } from "../types/userTypes";

export async function registerUserInDatabaseRepository(userData: UserSignupType){
    delete userData.passwordConfirmation;

    await prisma.users.create({
        data: userData
    })
}