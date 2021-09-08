const express = require("express");
const Review = require("../models/Review");
const Clinic = require("../models/Clinic");
const router = express.Router();


//todo make private
router.post('/', async (req,res)=>{
    try{
        const n_review = new Review({
            uid:req.body.uid,
            cid:req.body.cid,
            rating:req.body.rating,
            text:req.body.text
        });
        const result = await n_review.save();

        const listClinics = await Review.find({
            cid:req.body.cid
        })
        if (listClinics.length !== 0){
            let sumRating=0;
            listClinics.forEach((element, index)=>{
                sumRating += element.rating;
            });

            const avgRating = (3+sumRating)/(listClinics.length+1);
            const data = await Clinic.findByIdAndUpdate(req.body.cid, {
                rating:avgRating,
                num_rater:listClinics.length
            });
            return res.json({
                n_review:result,
                n_clinic:data
            });
        }else{
            return res.json(result);
        }
    }catch (e) {
        return res.status(500).json({
            err:e
        })
    }
});

router.get('/:cid&:pg&:lmt', async (req,res)=>{
    try{
        const cid = req.params.cid;
        const page = parseInt(req.params.pg);
        const limit = parseInt(req.params.lmt);
        const result = await Review.find({cid:cid})
            .sort({date:-1})
            .skip(page*limit)
            .limit(limit);
        const countResult = await Review.find({cid:cid}).count();
        res.json({
            reviews:result,
            total:countResult
        });
    }catch (e) {
        res.status(500).json({
            err:e
        })
    }
});

module.exports=router;