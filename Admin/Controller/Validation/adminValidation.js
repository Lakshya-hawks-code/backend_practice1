import Joi from "joi";

export const createSchema = Joi.object
({
    name: Joi.string().required(),
    email:Joi.string().email().required(),
    phone: Joi.string().required(),
    role:Joi.string().required(),
    status:Joi.number().required(),
    password: Joi.string().required(),
    image:Joi.string(),
    // address: Joi.string().required(),
    // country: Joi.string().required(),
    // state: Joi.string().required(),
    // city: Joi.string().required(),
})

export const loginSchema = Joi.object
({
    email:Joi.string().email().required(),
    password: Joi.string().required(),
})

export const editSchema = Joi.object
({
    name: Joi.string().required(),
    email:Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    image:Joi.string()

})

export const forgotPassSchema = Joi.object
({
    email:Joi.string().email().required(),
})

export const resetPasswordSchema = Joi.object
({
    password: Joi.string().required(),
    resetToken: Joi.string().required()
})

export const changePasswordSchema = Joi.object
({
    oldPassword:Joi.string().required(),
    newPassword:Joi.string().required()
})

export const createRoleSchema = Joi.object
({
    name:Joi.string().required(),
    modules:Joi.array().items
    (
        Joi.object
        ({
            name:Joi.string().required(),
            permissions:Joi.array().items
            (
                Joi.string().valid('view','add','edit','delete','admin','status')
            )
        }),
    ).default([]),
    createdBy:Joi.string().required()
})

 
export const editRoleSchema = Joi.object
({
    name:Joi.string().required(),
    modules:Joi.array().items
    (
        Joi.object
        ({
            name:Joi.string().required(),
            permissions:Joi.array().items
            (
                Joi.string().valid('view','add','edit','delete','admin','status')
            )
        })
    ).default([])
})



export const deleteRoleSchema = Joi.object
({
    id:Joi.string().required()
})


export const countrySchema = Joi.object
    ({
        id:Joi.number().required(),
        name:Joi.string().required(),
        iso3:Joi.string().required(),
        iso2:Joi.string().required(),
        numeric_code:Joi.string().required(),
        capital:Joi.string().required(),
        capital:Joi.string().required(),
        currency:Joi.string().required(),
        region_id:Joi.string().required(),
        region_id:Joi.string().required(),
        nationality:Joi.string().required(),
        timezones:Joi.array().items
        (
            Joi.object
            ({
                zoneName:Joi.string().required(),
                gmtOffset:Joi.number().required(),
                gmtOffsetName:Joi.string().required(),
                abbreviation:Joi.string().required(),
                tzName:Joi.string().required(),
            })
        ).default([]),
        emoji:Joi.string().required(),
        emojiU:Joi.string().required()
})

export const stateSchema = Joi.object
({
    countryId:Joi.string().required(),
    id:Joi.number().required(),
    name:Joi.string().required(),
    country_id:Joi.string().required(),
    country_code:Joi.string().required(),
    country_name:Joi.string().required(),
    state_code:Joi.string().required(),
})


export const statusUpdateSchema = Joi.object
({
    id:Joi.string().required(),
    status:Joi.number().required(),
})