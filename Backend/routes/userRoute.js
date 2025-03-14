const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); 

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    }});
//POST a new user
router.post('/',async(req,res)=>{
    const {name,email, password}=req.body;
    try {
        const addUser= new User({name,email,password});
        await addUser.save();
        res.status(201).json(addUser);
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})
//patch a user
router.patch('/:id', async(req,res)=>{
    const {id}=req.params;
    const {name,email,password}=req.body;
    try {
        const updUser= await User.findByIdAndUpdate(id);
        if(name){updUser.name=name;}
        if(email){updUser.email=email;}
        if(password){updUser.password=password;}
        await updUser.save();
        res.status(200).json({message:"User updated successfully"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
})

router.delete('/:id',async(req, res)=>{
    const {id}=req.params;
    try {
        const delUser= await User.findByIdAndDelete(id);
        if(!delUser){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({message:"User deleted successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})
module.exports=router;