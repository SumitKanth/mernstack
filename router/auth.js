const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("This is an home page from router");
})

router.post("/register", (req, res) => {
    console.log(req.body);  // Ye console h data show kr rha h
    res.json({message:req.body});   // Ye postman m res ko json m krke udr show kr rhi h
    // res.send("Done");    // used if res.json is commented
})

module.exports = router;