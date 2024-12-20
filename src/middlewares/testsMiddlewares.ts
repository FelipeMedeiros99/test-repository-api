import { Request, Response, NextFunction } from "express";
import { validateStructureToken } from "../services/testsServices";
import { tokenIsInDatabase } from "../repositories/testsRepository";


export async function validToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers?.authorization;
    validateStructureToken(token);
    await tokenIsInDatabase(token as string)   
    next()
}