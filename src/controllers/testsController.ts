import { Request, Response, NextFunction } from "express"
import prisma from "../config/db"


export async function addTestController(req: Request, res: Response) {
    const testData = req.body;
    await prisma.tests.create({
        data: testData
    })
    res.send(201)
}