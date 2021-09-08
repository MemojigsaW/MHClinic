const mongoose = require('mongoose');


const Mental = new mongoose.Schema({
    uid:{
        type:String,
        required:true
    },
    anxiety:{
        type:"Number",
        default:-1
    },
    depression:{
        type:"Number",
        default:-1
    },
    panic:{
        type:"Number",
        default:-1
    }
});

module.exports = mongoose.model('Mental', Mental);