import { Request, Response, NextFunction } from "express"
import prisma from "../config/db"
import { saveTest } from "../repositories/testsRepository";


export async function addTestController(req: Request, res: Response) {
    const testData = req.body;
    await saveTest(testData)
    res.send(201)
}

export async function returnTestsController(req: Request, res: Response) {
    
}