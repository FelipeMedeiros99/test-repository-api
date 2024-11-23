import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";

export function validSchemaMiddleware(schema: ObjectSchema) {

    return (req: Request, res: Response, next: NextFunction) => {
        const { body: userRegistrationData } = req;
        
        const validation = schema.validate(userRegistrationData)

        if(validation.error){
            throw {message: validation.error?.message || validation.error, status: 400}
        }

        next()
    }
}

