import prisma from "../config/db";
import { UserSignupType } from "../types/userTypes";

export async function registerUserInDatabaseRepository(userData: UserSignupType) {
    delete userData.passwordConfirmation;

    await prisma.users.create({
        data: userData
    });
}

export async function findUser(userData: UserSignupType) {
    const databaseData = await prisma.users.findFirst({
        where: { email: userData.email }
    });

    return databaseData;
}

export async function saveTokenAtDatabase(userId: number, token: string) {
    await prisma.tokens.create({
        data: {
            token: token,
            userId: userId
        }
    })
}

export async function removeExpiredTokens() {
    const timeLimit = new Date()
    timeLimit.setMinutes(timeLimit.getMinutes() - 15)

    try {
        await prisma.tokens.deleteMany({
            where: {
                createdAt: { lt: timeLimit }
            }
        })
    } catch (e) {
        console.log("error when trying to delete tokens:", e)
    }
}
