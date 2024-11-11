import prisma from "../config/db";
import { UserSignupType } from "../types/userTypes";

export async function registerUserInDatabaseRepository(userData: UserSignupType){
    delete userData.passwordConfirmation;

    await prisma.users.create({
        data: userData
    });
}

export async function findUser(userData: UserSignupType) {
    const databaseData = await prisma.users.findFirst({
        where: {email: userData.email}
    });

    return databaseData;
}