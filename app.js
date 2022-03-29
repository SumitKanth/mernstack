const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({path:"./config.env"});   // Path for conn.js DB and port

const port = process.env.PORT;

// Middle Ware
const middileware = (req, res, next) => {
    console.log("Hello, I am middle ware");
    next();
}

require("./db/conn");   // mongoose connection

// const user = require("./model/userSchema"); // Schema

// Routers
app.use(express.json());
app.use(require("./router/auth"));

// Routes
app.get("/", (req, res) => {
    res.send("This is an home page from app.js");
})

app.get("/about", middileware, (req, res) => {
    res.send("This is an about page!");
})

app.get("/contact", (req, res) => {
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