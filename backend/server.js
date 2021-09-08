const express = require('express');
const path = require('path');
const mongoose = require('mongoose')

const userRoute = require('./api/User');
const mentalRoute = require('./api/MentalScore');
const clinicRoute = require('./api/clinic');
const reviewRoute = require('./api/Review');
const cors = require('cors');

require('dotenv').config();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend/build'));
app.use('/api/user', userRoute);
app.use('/api/mental', mentalRoute);
app.use('/api/clinic', clinicRoute);
app.use('/api/review', reviewRoute);

//Serve React
app.get('/*', (req,res)=>{
    res.sendFile(path.join(__dirname+ '/../frontend/build/index.html'));
})

//MongoDB
mongoose.connect(process.env.DB_CONNECTION, ()=>{
    console.log("Connected to MongoDB");
});


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log("On port:", port);
})




