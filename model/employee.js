const mongoose = require("mongoose");
const Joi = require("joi");


const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 44
    },
    salary: {
        type: Number,
        required: true
    }

});

const Employee = mongoose.model('Employee', employeeSchema);
function validate(employee) {
    const schema = {
        name: Joi.string().min(3).required(),
        salary: Joi.number().integer().required()
    }
    return Joi.validate(employee, schema);
}
function validateUpdate(employee) {
    const schema = {
        name: Joi.string().min(3).required(),
        salary: Joi.number().integer().required()
    }
    return Joi.validate(employee, schema);
}

exports.Employee = Employee;
exports.validate = validate;
exports.validateUpdate = validateUpdate;
