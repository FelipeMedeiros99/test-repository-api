import { Request, Response, NextFunction } from "express";
import { validateStructureToken } from "../services/testsServices";


export function validToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers?.authorization;
    validateStructureToken(token);

}