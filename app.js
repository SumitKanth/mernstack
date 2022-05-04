const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

dotenv.config({path:"./config.env"});   // Path for conn.js DB and port

const port = process.env.PORT;

// Middle Ware
// const middileware = (req, res, next) => {
//     console.log("Hello, I am middle ware");
//     next();
// }

require("./db/conn");   // mongoose connection

// const user = require("./model/userSchema"); // Schema

// Routers
app.use(express.json());
app.use(require("./router/auth"));

// Routes
// app.get("/about", middileware, (req, res) => {
//     res.send("This is an about page!");
// })

// app.get("/about",  (req, res) => {
//     res.send("This is an about page!");
// })

app.get("/contact", (req, res) => {
    res.cookie("Test", "Sumit", {
        expires: new Date(Date.now() + 30000),
        httpOnly:true
    });        // Checking cookie is working in contact page or not
    res.send("This is an contact page!");
})

app.get("/signin", (req, res) => {
    res.send("This is an signin page!");
})

app.get("/signup", (req, res) => {
    res.send("This is an signup page!");
})


// Server
app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})