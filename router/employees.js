const express = require('express');
const router = express.Router();
const {Employee, validate, validateUpdate} = require('../model/employee');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.get('/', async (req, res)=>{
    const emps = await Employee.find().sort('name');
    res.send(emps);
});

//pagination
router.get('/pages', async (req, res)=>{
   const {page=1, limit=10} = req.query;
   const emps = await Employee.find()
       .sort('name')
       .limit(limit * 1)
       .skip((page -1) * limit).exec();
   res.send(emps);
});

router.get('/:id', async (req, res)=>{
   try {
       const emp =  await Employee.findById(req.params.id);
       if(!emp){
           return res.status(404).send('This Employee Not Found!!');
       }
       res.send(emp);
   }catch(error) {
       res.send('This Employee Not Found!!');
   }
});

router.post('/', auth,async (req, res)=>{

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

router.delete('/:id', [auth,admin] ,async (req, res)=> {
    const emp = await Employee.findByIdAndRemove(req.params.id);
    if(!emp) {
        return  res.status(404).send('Employee Not Found!!');
    }
    res.send(emp);
});





module.exports=router;