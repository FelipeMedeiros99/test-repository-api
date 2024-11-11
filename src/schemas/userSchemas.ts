import Joi from "joi";


const signupUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    passwordConfirmation: Joi.string().valid(Joi.ref("password")).required()
});

const loginUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
})


export { signupUserSchema, loginUserSchema };