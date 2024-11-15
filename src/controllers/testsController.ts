import { Request, Response, NextFunction } from "express"


export async function addTestController(req: Request, res: Response) {
    res.send(200)
}