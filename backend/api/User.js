const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const avatarUpload = require('../Middleware/multerMiddleware');
const User = require('../models/User');
require('dotenv').config();


const router = express.Router();
const conn = mongoose.connection;
let gfs;
conn.once('open', ()=>{
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'Avatar'
    });
    console.log("gfs on Avatar established")
})


router.get('/test', (res,req)=>{
    console.log("test API");
})


//Handling Avatars
//todo make private
router.post('/avatar', avatarUpload.single("image"), (req,res)=>{

    if (req.file!==undefined && req.file!==null){
        return res.json({
            oid:req.file.id
        })
    }else if (req.file===undefined &&req.multerError!==null){
        return res.status(400).json({
            err:req.multerError
        })
    }
    else{
        return res.status(400).json({
            err:req.multerError
        })
    }
});
//public
router.get('/avatar/:id', (req,res)=>{

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
//todo make private
router.delete('/avatar/:id', (req,res)=>{
    try{
        const oid = new mongoose.Types.ObjectId(req.params.id);
        gfs.delete(oid, (error)=>{
            if (error){
                return res.status(500).json({
                    err:error
                })
            }else{
                return res.json({
                    msg:"deleted"
                })
            }
        })

    }catch (e){
        return res.status(401).json({
            err:e
        })
    }
})

//Handling user
router.post('/signup', async (req,res)=>{

    const old_user = await User.findOne({username:req.body.username});
    if (old_user){
        return res.status(401).json({
            err:"duplicate name"
        })
    }
    const old_email = await User.findOne({email:req.body.email});
    if (old_email){
        return res.status(401).json({
            err:"duplicate email"
        })
    }

    try{
        bcrypt.genSalt(10, (err, salt)=>{
            if (err) throw err;
            bcrypt.hash(req.body.password, salt, (err, hash)=>{
                if (err) throw err;

                const n_user = new User({
                    username:req.body.username,
                    password:hash,
                    email:req.body.email,
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    gender:req.body.gender,
                    age:req.body.age,
                    maritalStatus:req.body.maritalStatus,
                    location:req.body.location
                });

                n_user.save()
                    .then(data=>{
                        jwt.sign(
                            {id:n_user.id},
                            process.env.JWTSECRET,
                            {expiresIn:3600},
                            (err,token)=>{
                                if (err)throw err;
                                return res.json({
                                    token:token
                                })
                            }
                        )
                    })
            })
        })
    }catch (e){
        return res.status(501).json({
            err:e
        })
    }
})

router.post('/login', async (req,res)=>{
    try{
        const exist_user = await User.findOne({username:req.body.username});
        if (!exist_user){
            return res.status(401).json({
                err:"user does not exist"
            })
        }
        const isMatch = await bcrypt.compare(req.body.password, exist_user.password)
        if (!isMatch){
            return res.status(401).json({
                err:"Invalid Creadentials"
            })
        }else{
            const n_token = await jwt.sign(
                {id:exist_user._id},
                process.env.JWTSECRET,
                {expiresIn: 3600}
            )
            return res.json({
                token: n_token,
            })
        }

    }catch (e) {
        return res.status(501).json({
            err:e
        })
    }
})

router.get('/validate', (req,res)=>{
    const token = req.header('x-auth-token');
    if (!token){
        res.status(400).json({
            err:"missing token, not authorized"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        return res.json({
            uid:decoded
        })
    }catch (e) {
        return res.status(400).json({
            err:"invalid token"
        })
    }
})

router.get('/:id', async (req,res)=>{
    try {
        const oid = new mongoose.Types.ObjectId(req.params.id);
        const data = await User.findById(oid);
        return res.json(data);
    }catch (e) {
        return res.status(500).json({
            err:e
        })
    }
})

//todo make private
//patch info only
router.patch('/:id', async (req, res)=>{
    try{
        const oid = new mongoose.Types.ObjectId(req.params.id);
        let data;
        if (req.body.password!==undefined && req.body.password!==null){
            const salt = await bcrypt.genSalt(10);
            const n_hash = await bcrypt.hash(req.body.password, salt);
            data = await User.findByIdAndUpdate(oid,{
                password:n_hash,
                email:req.body.email,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                gender:req.body.gender,
                age:req.body.age,
                maritalStatus:req.body.maritalStatus,
                location:req.body.location
            })
        }else{
            data = await User.findByIdAndUpdate(oid,{
                email:req.body.email,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                gender:req.body.gender,
                age:req.body.age,
                maritalStatus:req.body.maritalStatus,
                location:req.body.location
            })
        }
        res.json(data);
    }catch (e) {
        console.log(e);
        res.status(500).json({
            err:e
        })
    }
})

//patch avatar only
router.patch('/av/:id', async (req,res)=>{
    try{
        const oid = new mongoose.Types.ObjectId(req.params.id);
        const data = await User.findByIdAndUpdate(oid,{
            avatar:req.body.avatar
        })
        res.json(data);
    }catch (e) {
        console.log(e);
        res.status(500).json({
            err:e
        })
    }
})

module.exports = router;


