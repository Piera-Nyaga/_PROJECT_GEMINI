import Joi from 'joi'

export const AddCommentSchema= Joi.object({
    Description:Joi.string()
})