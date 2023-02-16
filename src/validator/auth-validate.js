const Joi = require("joi")
const validate = require("./validate")

const registerSchema = Joi.object({
    firstName: Joi.string().trim().required().message({
        'any.required' : 'first name is required',
        'string.empty' : 'first name is required',
        'string.base' : 'first name must be a string'
    }),
    lastName: Joi.string().trim().required().message({
        'string.empty' : 'last name is required'
    }),
    email: Joi.string().email({tlds: false}).message({
        'any.required' : 'email is required',
        'string.email' : 'must be valid email',
        'string.empty' : 'email is required'
    }),
    password: Joi.string().alphanum().min(6).required().message({
        'string.empty' : 'password is required',
        'string.alphanum' : 'password must contain number or alphanum',
        'string.min' : 'password must have a least 6'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().message({
        'any.only' : 'confirm password not match',
        'string.empty' : 'confirm password is required'
    })
})
exports.registerSchema = validate(registerSchema)

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
})

exports.loginSchema = validate(loginSchema)