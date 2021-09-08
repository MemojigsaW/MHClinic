const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/User');
const Clinic = require('../models/Clinic');
const clinicUpload = require('../Middleware/clinicMulterMiddleware');
const router = express.Router();

const conn = mongoose.connection;
let gfs;
conn.once('open', ()=>{
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'Clinic'
    });
    console.log("gfs on Clinic established")
})

router.post('/upload', clinicUpload.single("image"), async (req,res)=>{

    if (req.file===undefined || req.file===null){
        return res.status(500).json({
            err:"file is null"
        })
    }

    try{
        const n_clinic = new Clinic({
            title:req.body.title,
            view:req.file.id,
            description:req.body.description,
            city:req.body.city,
            address:req.body.address,
            postal:req.body.postal
        });

        const data = await n_clinic.save();
        return res.json(data);
    }catch (e) {
        return res.status(500).json({
            err: e
        })
    }
})

router.get('/:loc?', async (req,res)=>{
    const loc = req.params.loc;
    try{
        let data;
        if (loc){
            data = await Clinic.find({city:loc})
        }else{
            data = await Clinic.find();
        }
        return res.json(data);
    }catch (e) {
        return res.status(500).json({
            err:e
        })
    }
})

router.get('/image/:id', async (req,res)=>{
    try{
        const oid = new mongoose.Types.ObjectId(req.params.id);
        gfs.find({_id:oid}).toArray((err,files)=>{
            if (!files||files.length===0){
                res.status(404).json({
                    err:"no files found"
                })
            }else{
                files.forEach(unit_file=>{
                    gfs.openDownloadStream(unit_file._id).pipe(res);
                })
            }
        })
    }catch (e) {
        res.status(500).json({
            err:e
        })
    }
})

router.get('/id/:id', async (req,res)=>{
    try{
        const oid = new mongoose.Types.ObjectId(req.params.id);
        const result = await Clinic.findById(oid);
        return res.json(result);
    }catch (e) {
        return res.status(500).json({
            err:e
        })
    }
})

module.exports = router;