import Joi from 'joi';

export const NewSerieSchema = Joi.object({
    name: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().valid('shounen', 'shoujo', 'seinen', 'josei').required(),
    image: Joi.string().required()
})