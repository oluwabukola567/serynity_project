const mongoose= require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    sname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    
   
    age: {
        type: Number,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 255,
        unique: true
    },

    phone: {
        type: String,
        required: true,
    },
    
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    }
});

function validateSchema(user) {
    const schema = Joi.object({
        fname: Joi.string().min(3).max(100),
        sname: Joi.string().min(3).max(100),
        age: Joi.number(),
        phone: Joi.string(),
        email: Joi.string().email().min(10).max(255),
        password: Joi.string().min(8).max(1024)
    });
    return schema.validate(user)
};



const User  = mongoose.model('User', userSchema);

module.exports.User = User;

module.exports.validate = validateSchema;





