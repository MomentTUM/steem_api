const Joi = require("joi")
const validate = require("../validator/validate")

const createProfileSchema = Joi.object({
    name: Joi.string().trim(),
    image: Joi.string().trim(),
    coverImage: Joi.string().trim()
})

exports.validateCreateProfile = validate(createProfileSchema)
