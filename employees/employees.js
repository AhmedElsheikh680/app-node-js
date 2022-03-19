const express = require('express');
const router = express.Router();


const Joi = require("joi");
const employees =[
    {id: 1, name: 'Ahmed', salary:3000},
    {id: 2, name: 'Ali', salary:5000},
    {id: 3, name: 'Saad', salary:8000},

];


router.get('/', (req, res)=>{
    res.send(employees);
});

router.get('/:id', (req, res)=>{
    const emp =  employees.find(emp=> emp.id == req.params.id);
    if(!emp){
        res.send('This Employee Not Found!!');
    }
    res.send(emp);
});

router.post('/', (req, res)=>{
    const {error} = validate(req.body);
    if(error) {
        return  res.send(error.details[0].message);
    }
    const emp={
        id: req.body.id,
        name: req.body.name,
        salary: req.body.salary
    }
    employees.push(emp);
    res.send(emp);
});

router.put('/:id', (req, res)=>{
    const employee = employees.find(emp=>emp.id == req.params.id);
    if(!employee) {
        return res.send('Employee Not Found!!');
    }
    const {error} = validateUpdate(req.body);
    if(error) {
        return res.send(error.details[0].message);
    }
    employee.name = req.body.name;
    employee.salary = req.body.salary;
    res.send(employee);
});

router.delete('/:id', (req, res)=> {
    const emp = employees.find(emp=>emp.id == req.params.id);
    if(!emp) {
        return res.send("Employee not Found!!");
    }
    const indexEmp = employees.indexOf(emp);
    employees.splice(indexEmp,1);
    res.send(emp);
});

function validate(employee) {
    const schema = {
        id: Joi.number().integer().required(),
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