const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

dotenv.config({path:"./config.env"});   // Path for conn.js DB and port

// Step 1 Heroku copy client to server
// step 2 use PORT dynamic for heroku

const port = process.env.PORT || 5000;  // process.env.PORT for heroku and 5000 for local system

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

// app.get("/contact", (req, res) => {
//     res.cookie("Test", "Sumit", {
//         expires: new Date(Date.now() + 30000),
//         httpOnly:true
//     });        // Checking cookie is working in contact page or not
//     res.send("This is an contact page!");
// })

// app.get("/signin", (req, res) => {
//     res.send("This is an signin page!");
// })

// app.get("/signup", (req, res) => {
//     res.send("This is an signup page!");
// });

// Step 3 Heroku npm run build in server/client and this code
if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/bulid"));
}

// Server
app.listen(port, () => {
    console.log(`Server is running at ${port}`)
}) 