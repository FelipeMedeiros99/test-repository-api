import Joi from "joi";


const signupUserSchema = Joi.object({
    name: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
    passwordConfirmation: Joi.string().valid(Joi.ref("password")).required()
});


export { signupUserSchema };