const {Schema, model} = require('mongoose');
const Joi = require("joi");

const schema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    });


const schemaCreate = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required(),
    phone: Joi.number().min(0).required(),
    favorite: Joi.bool(),
});

const schemaPatch = Joi.object({
    favorite: Joi.bool().required(),
}).min(1).message("missing field favorite");


const Contact = model('contact', schema);

module.exports = {
    Contact, schemaCreate, schemaPatch
}

