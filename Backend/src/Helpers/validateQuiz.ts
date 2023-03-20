import Joi from 'joi'

export const PostingSchema= Joi.object({
    Title:Joi.string().required().messages({
        'string.empty':' Field must be filled',   
    }),
    Description:Joi.string().required().messages({
        'string.empty':' Field must be filled',  
    }),
    Code:Joi.string(),  
    userId:Joi.string()
})

export const UpdateSchema= Joi.object({
    Title:Joi.string().required().messages({
        'string.empty':' Field must be filled',   
    }),
    Description:Joi.string().required().messages({
        'string.empty':' Field must be filled',  
    }),
    Code:Joi.string(),  
    userId:Joi.string()
})
