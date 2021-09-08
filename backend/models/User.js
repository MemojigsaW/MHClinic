const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        default:''
    },
    age:{
        type:String,
        default:""
    },
    maritalStatus:{
        type:String,
        default:""
    },
    location:{
        type:String,
        default:""
    },
    avatar:{
        type:String,
        default:"61309a260e9d4340183965c4"
    }
})

module.exports = mongoose.model('User', User);
