const Joi = require("joi")
const validate = require("./validate")

const registerSchema = Joi.object({
    emailOrUserName: Joi.alternatives().try(
        Joi.string().email({tlds: false}),
        Joi.string().alphanum().min(5).max(30)
    ).strip()
    // .message({
    //     'alternatives.match' : 'must be a valid email or username'
    // })
    ,
    password: Joi.string().alphanum().min(6).required().trim().message({
        'string.empty' : 'password is required',
        'string.alphanum' : 'password must contain number or alphanum',
        'string.min' : 'password must have a least 6'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().trim().message({
        'any.only' : 'confirm password not match',
        'string.empty' : 'confirm password is required'
    }),
    email: Joi.forbidden().when('emailOrUserName', {
        is: Joi.string().email({tlds: false}),
        then: Joi.string().default(Joi.ref('emailOrUserName'))
    }),
    userName: Joi.forbidden().when('emailOrUserName', {
        is: Joi.string().alphanum().min(5).max(30),
        then: Joi.string().default(Joi.ref('emailOrUserName'))
    })
})
exports.validateRegister = validate(registerSchema)

const loginSchema = Joi.object({
    emailOrUserName: Joi.string().required(),
    password: Joi.string().required()
})

exports.validateLogin = validate(loginSchema)