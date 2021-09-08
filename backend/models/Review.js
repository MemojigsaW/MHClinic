const mongoose = require('mongoose');

const Review = new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now
    },
    uid:{
        type:String,
        required:true
    },
    cid:{
        type:String,
        required:true
    },
    rating:{
        type:"Number",
        default:3
    },
    text:{
        type:String,
        default:""
    }
})

module.exports = mongoose.model("Review", Review);