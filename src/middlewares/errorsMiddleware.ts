import { Request, Response, NextFunction } from "express";

type Errors = {
    message: string;
    status: number
}


export function handlerError(err: Errors, req: Request, res: Response, next: NextFunction) {
    try {
        if(err.status!==500){
            return res.status(err.status).send(err.message)
        }
        console.log(err)
        return res.status(500).send("Internal server error")
    } catch (e) {
        console.log(e)
        res.status(500).send("Internal server error")
    }
}