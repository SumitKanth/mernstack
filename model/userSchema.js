const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
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
            message:{
                type: String,
                required: true
            }
        }
    ],
    tokens: [
        {
            token:{
                type: String,
                required:true
            }
        }
    ]

});


// We are hashing the password
userSchema.pre('save', async function (next) {      // 'save' se phele chlana h function ko
    console.log("Hi from inside hashPass");
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next(); // Ab apne aap atuh.js m register wale route m jo save method h wo call ho jaega
});


// We are generating token
userSchema.methods.generateAuthToken = async function(){        // method or userSchema ek instance h 
    // auth.js se generateAuthToken laake deta h ye method
    try{
        let token = jwt.sign({ _id:this._id }, process.env.SECRETKEY);  // jwt.sign mtlb jb user signin kr rha h
        this.tokens = this.tokens.concat({ token: token });  // Schema ke tokens wale m ye token chle jaega
        await this.save();   // Token ko save krta h
        return token;
    } catch(err){
        console.log(err);
    }
} 

// We are Storing the message 
userSchema.methods.addmessage = async function (name, email, phone, message) {
    try{
        this.messages = this.messages.concat({name, email, phone, message});
        await this.save();
        this.messages;

    } catch(err) {
        console.log(err);
    }
}


// Creating collection
const User = mongoose.model("USER", userSchema);

module.exports = User;