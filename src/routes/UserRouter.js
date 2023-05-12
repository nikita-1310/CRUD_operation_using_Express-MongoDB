const express = require("express");
const router = new express.Router();
const MensRanking = require("../model/UserSchema");

router.post("/mens",async(req,res)=>{   //to create the data
    try{
        const addingMensRecord = new MensRanking(req.body)
        console.log(req.body)
        const insertMen = await addingMensRecord.save(); // to save the data on mongodb
        res.status(201).send(insertMen) // to show the data in postman
    }
    catch(e){
        res.status(400).send(e)
    }
})


// To read the data
router.get("/mens",async(req,res)=>{   
    try{
        const getMens = await MensRanking.find({}).sort({"ranking":1})
        res.send(getMens) // to read the data in postman
    }
    catch(e){
        res.status(400).send(e)
    }
})
// To read the paticular id data
router.get("/mens/:id",async(req,res)=>{   
    try{
        const _id = req.params.id ;
        const getMen = await MensRanking.findById({_id})
        res.send(getMen) // to read the data in postman
    }
    catch(e){
        res.status(400).send(e)
    }
})
// To update the paticular id data
router.patch("/mens/:id",async(req,res)=>{   
    try{
        const _id = req.params.id ;
        const getMen = await MensRanking.findByIdAndUpdate(_id,req.body,{
            new:true
        })
        res.send(getMen) // to update the data in postman
    }
    catch(e){
        res.status(500).send(e) // server error starts from 500
    }
})
// To delete the paticular id data
router.delete("/mens/:id",async(req,res)=>{   
    try{
        const delMen = await MensRanking.findByIdAndDelete(req.params.id)
        res.send(delMen) // to delete the data in postman
    }
    catch(e){
        res.status(500).send(e) // server error starts from 500
    }
})


module.exports = router;