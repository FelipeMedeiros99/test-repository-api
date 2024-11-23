import { Tests } from "@prisma/client";
import Joi from "joi";

export const addTestSchema = Joi.object({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    categoryId: Joi.number().required(),
    teacherDisciplineId: Joi.number().required(),
    periodId: Joi.number().valid(1, 2, 3, 4, 5, 6, 7, 8, 9).required()
})