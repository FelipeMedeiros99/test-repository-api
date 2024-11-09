import Joi from "joi";


const signupUserSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    passwordConfirmation: Joi.string().valid(Joi.ref("password")).required()
});


export { signupUserSchema };