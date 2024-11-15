import prisma from "../config/db";

export async function tokenIsInDatabase(token: string) {

    const tokenInDatabase = await prisma.tokens.findFirst({
        where: { token: token.replace("Bearer ", "") }
    })
    if(!tokenInDatabase) throw { message: "Token expired", status: 401}
}   