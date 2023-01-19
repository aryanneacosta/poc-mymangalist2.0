import Joi from 'joi';
export var NewSerieSchema = Joi.object({
    name: Joi.string().required(),
    author: Joi.string().required(),
    genre: Joi.string().valid('shounen', 'shoujo', 'seinen', 'josei'),
    image: Joi.string().required()
});
