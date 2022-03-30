const express = require("express");
const router = express.Router();

require("../db/conn");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
    res.send("This is an home page from router");
})

/*
// Saving data in online database using promise
router.post("/register", (req, res) => {
    
    // console.log(req.body);  // Ye console h data show kr rha h
    // res.json({message:req.body});   // Ye postman m res ko json m krke udr show kr rhi h
    // // res.send("Done");    // used if res.json is commented
    

    // Kuch blank n rhe
    const {name, email, phone, work, password, cpassword} = req.body;
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({error: "Plz fill all detailes"});
    }

    // Agr wo user pehele se hi h
    User.findOne({email:email}).then((userExist) => {
        if(userExist){
            // console.log(userExist);
            res.status(422).json({error: "User alreasy their"})
        };
    

    const user = new User({name, email, phone, work, password, cpassword});
    user.save().then(() => {
        res.status(201).json({message:"Register successfully"});
    }).catch((e) => {
        res.status(500).json({error: "Failed to register"});
    })


    }).catch(e => console.log(e));
})
*/


// Saving data in online database using async await
router.post("/register", async (req, res) => {


    const {name, email, phone, work, password, cpassword} = req.body;

    if(!name || !email || !phone || !work || !password || !cpassword)
    {
        return res.status(422).json({error: "Plz fill all detailes"});
    }

    try {
        const userExist = await User.findOne({email:email});

        if(userExist){
                res.status(422).json({error: "User alreasy their"})
        }
        else{
            const user = new User({name, email, phone, work, password, cpassword});
            await user.save();
        }
        
    
        
        // const usrRegister = await user.save();
        
        // if(usrRegister){
        //     res.status(201).json({message:"Register successfully"});
        // }
        // else{
        //     res.status(500).json({error: "Failed to register"});
        // }

    } catch (error) {
        console.log(error);
    }
   

});

module.exports = router;