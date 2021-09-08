const jwt = require('jsonwebtoken');
require('dotenv').config();


function auth(req,res,next){
    const token = req.header('x-auth-token');

    if (!token){
        return res.status(400).json({
            err:"token missing, not authroized"
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        console.log(decoded);
        req.uid = decoded;
        next();
    }catch (e){
        return res.status(400).json({
            err:'invalid token'
        })
    }
}

module.exports=auth;