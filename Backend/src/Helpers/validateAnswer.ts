import Joi from 'joi'

export const AddAnswerSchema= Joi.object({
    Description:Joi.string()
})