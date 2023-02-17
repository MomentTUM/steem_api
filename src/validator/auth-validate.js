const Joi = require("joi")
const validate = require("./validate")

const registerSchema = Joi.object({
    userName: Joi.string().alphanum().min(5).max(30).message({
        "string.empty" : "Username is required",
        "string.min" : "Username must have a least 5"
    }),
    email: Joi.string().email({tlds : false}).message({
        "any.required" : "Email is required",
        "string.email" : "Must be a valid email",
        "string.empty" : "Email is required"
    }),
    password: Joi.string().alphanum().min(6).required().trim().message({
        'string.empty' : 'password is required',
        'string.alphanum' : 'password must contain number or alphanum',
        'string.min' : 'password must have a least 6'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().trim().message({
        'any.only' : 'confirm password not match',
        'string.empty' : 'confirm password is required'
    }).strip(),

   
})
exports.validateRegister = validate(registerSchema)

const loginSchema = Joi.object({
    emailOrUserName: Joi.string().required(),
    password: Joi.string().required()
})

exports.validateLogin = validate(loginSchema)