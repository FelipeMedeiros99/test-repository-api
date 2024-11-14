import { ErrorType } from "../types/errorTypes"

export function validateStructureToken(token: string | undefined) {
    const errorDefault: ErrorType = { message: "", status: 401 };

    if (!token) {
        throw { ...errorDefault, message: "Token is required in the Authorization header" };
    }

    if (!token.startsWith("Bearer ")) {
        throw { ...errorDefault, message: "Token format must be 'Bearer <Token>'" };
    }
}