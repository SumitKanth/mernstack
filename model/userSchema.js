const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    work:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    cpassword:{
        type: String,
        required: true
    }

});


// We are hashing the password
userSchema.pre('save', async function (next) {
    console.log("Hi from inside");
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next(); // Ab apne aap atuh.js m register wale route m jo save method h wo call ho jaega
});


// Creating collection
const User = mongoose.model("USER", userSchema);

module.exports = User;