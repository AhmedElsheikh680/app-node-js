const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
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




router.get('/', async (req, res)=>{
    const emps = await Employee.find().sort('name');
    res.send(emps);
});

router.get('/:id', async (req, res)=>{
    const emp =  await Employee.findById(req.params.id);
    if(!emp){
        return res.status(404).send('This Employee Not Found!!');
    }
    res.send(emp);
});

router.post('/', async (req, res)=>{

    const {error} = validate(req.body);
    if(error) {
        return  res.send(error.details[0].message);
    }
    const emp=new Employee({
            name: req.body.name,
            salary: req.body.salary
        }
    )
    await emp.save();
    res.send(emp);
});

router.put('/:id', async (req, res)=>{
    const {error} = validateUpdate(req.body);
    if(error) {
        return res.send(error.details[0].message);
    }
    const emp  = await Employee.findByIdAndUpdate(req.params.id,
        {name: req.body.name},
        {new: true})
    if(!emp){
        return res.status(404).send('Invalid ID!!');
    }
    return res.send(emp);
});

router.delete('/:id', async (req, res)=> {
    const emp = await Employee.findByIdAndRemove(req.params.id);
    if(!emp) {
        return  res.status(404).send('Employee Not Found!!');
    }
    res.send(emp);
});

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



module.exports=router;