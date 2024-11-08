import { Request, Response } from "express"

export async function signupUserController(req: Request, res: Response) {
    res.status(200).send(req.body)   
}