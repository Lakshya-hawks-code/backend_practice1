import Joi from "joi";

export const createUserSchema = Joi.object
({
    name: Joi.string().required(),
    email:Joi.string().email().required(),
    phone: Joi.string().required(),
    password: Joi.string().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    admin: Joi.string().required(),
})

export const loginUserSchema = Joi.object
({
    email:Joi.string().email().required(),
    password: Joi.string().required(),
})

export const editUserSchema = Joi.object
({
    id:Joi.string().required(),
    name: Joi.string().required(),
    email:Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
})


export const forgotPasswordSchema = Joi.object
({
    email:Joi.string().email().required(),
})

export const resetPasswordSchema = Joi.object
({
    resetToken:Joi.string().required(),
    password:Joi.string().required()
})

export const changePasswordSchema = Joi.object
({
    oldPassword:Joi.string().required(),
    newPassword:Joi.string().required()
})

export const createdProductSchema = Joi.object
({
    jewelry:Joi.string().required(),
    watch:Joi.string().required(),
    shoes:Joi.string().required(),
    books:Joi.string().required(),
    cosmetics:Joi.string().required(),
    CraftLayer:Joi.string().required(),
    ArtGear:Joi.string().required(),
    createdBy:Joi.string()  // optional
})   
