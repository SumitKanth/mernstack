const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

// Middle Ware
const middileware = (req, res, next) => {
    console.log("Hello, I am middle ware");
    next();
}

require("./db/conn");

// Routes
app.get("/", (req, res) => {
    res.send("This is an home page!");
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