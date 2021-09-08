const mongoose = require('mongoose');

const Clinic = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    view:{
      type:String,
      required:true
    },
    rating:{
        type:"Number",
        default:3
    },
    num_rater:{
        type:"Number",
        default:0
    },
    description:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    postal:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Clinic', Clinic);