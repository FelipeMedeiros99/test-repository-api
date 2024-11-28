import { Request, Response, NextFunction } from "express"
import prisma from "../config/db"
import { findTests, saveTest } from "../repositories/testsRepository";


export async function addTestController(req: Request, res: Response) {
    const testData = req.body;
    await saveTest(testData)
    res.sendStatus(201)
}

export async function returnTestsController(req: Request, res: Response) {
    const groupBy = req.query?.groupBy as string | undefined
    const allTests = await findTests(groupBy)

    res.status(200).send(allTests)
}