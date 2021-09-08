const express = require('express');
const mongoose = require('mongoose');
const Mental = require('../models/mental');
const User = require('../models/User');
const router = express.Router();


router.post('/:id', async (req,res)=>{
    try{
        const data = await User.findById(req.params.id);
        const n_Mental = new Mental({
            uid:req.params.id,
            anxiety:req.body.anxiety,
            depression:req.body.depression,
            panic:req.body.panic
        })
        const new_save = await n_Mental.save()
        return res.json(new_save);
    }catch (e) {
        return res.status(500).json({
            err:e
        })
    }
})

router.get('/:id', async (req,res)=>{
    try{
        const mental = await Mental.findOne({uid:req.params.id})
        if (mental){
            return res.json(mental);
        }else{
            return res.status(400).json({
                err:"UID not found"
            })
        }
    }catch (e) {
        return res.status(500).json({
            err:e
        })
    }
})

router.patch('/:id', async (req,res)=>{
    try{
        const data = await Mental.findOneAndUpdate({uid:req.params.id}, req.body);
        res.json(data);
    }catch (e) {
        res.status(500).json({
            err:e
        })
    }
})

module.exports = router;