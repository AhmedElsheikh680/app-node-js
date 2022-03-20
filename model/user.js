const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 44
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 1024
    },
    isAdmin: Boolean
});

//jwt
userSchema.methods.generateTokens = function (){
    const token = jwt.sign({_id:this._id, isAdmin:this.isAdmin}, 'privateKey');
    return token;
}

const User = mongoose.model('User', userSchema);

//validation
function userValidate(user) {
    const schema = {
        fullName: Joi.string().min(3).max(44).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(8).max(1024).required()
    }
    return Joi.validate(user, schema);
}


exports.User = User;
exports.userValidate = userValidate;





















