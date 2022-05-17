const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/authenticate");

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
                res.status(422).json({error: "User already their"});
        }
        else if(password != cpassword){
            res.status(422).json({error: "Password is not maching"});
        }
        else{
            const user = new User({name, email, phone, work, password, cpassword});
            // yaha pe middleware use ho rha h ( userSchema.js m hashing the password )
            const userRegister = await user.save();

            // console.log(`${user} registered successfully`);
            // console.log(`${userRegister}`);

            res.status(201).json({message: "User registered successfully"});
        }
        
    
        // Extra code 
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

/*
router.get('/signin', async (req, res) => {
    const {email, cpassword} = req.body;
    if(!email || !cpassword){
        res.status(404).json({message: "Plz fill details"});
    }

    try{
        const matchEmail = await User.findOne({email:email});
        const cpass = await User.findOne({cpassword:cpassword});
        
        if(!matchEmail || !cpass){
            res.status(404).json({message:"Invail details"});
        }
        else if(matchEmail &&  cpass){
            res.status(200).json({message: "You are logined"});
        }


    } catch (err) {
        console.log(err);
    }       

})
*/

// login route
router.post('/signin', async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(404).json({error: "Plz fill the details"});
        }
        
        const userLogin = await User.findOne({email: email});


        // console.log("Email", userLogin);
        
        if(userLogin){
            const isMatchPass = await bcrypt.compare(password, userLogin.password);
            // console.log("password", isMatchPass);

            // JWT
            const token = await userLogin.generateAuthToken();
            console.log("Token",token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            
            if(!isMatchPass){
                res.status(404).json({message: "Invalid Credientials pass "});
            }
            else{
                res.status(200).json({message: "User login successfully"});
            }

        }
        else{
            res.status(404).json({message: "Invalid Credientials email"});
        }
        

    } catch (err) {
        console.log(err);
    }
})

// about us page 
router.get("/about", authenticate,  (req, res) => {
    // res.send("This is an about page!");  // do baar send nii krte skte header --> Cannot set headers after they are sent to the
    // client
    res.send(req.rootUser); // ye authenticate wale function se aa rha h authenticate.ja wale page se
})


// get user data for contact us and home
router.get("/getdata", authenticate, (req, res) => {
    res.send(req.rootUser);     // Iska data console m network m milta h
});


router.post("/contact", authenticate, async (req, res) => {
    try {
        
        const {name, email, phone, message} = req.body;

        if(!name || !email || !phone || !message){
            console.log("Error in contact form");
            return res.json({error:"Plz fill the contact form"});
        }

        const userContact = await User.findOne({_id:req.userID});

        if(userContact){

            const userMessage = await userContact.addmessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({message: "User Contacted successfully"});

        }

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;