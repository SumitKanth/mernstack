const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {
        try{

            const token = req.cookies.jwtoken;
            const verifyToken = jwt.verify(token, process.env.SECRETKEY);   // verifyToken m user ka pura detail aa chuka h
            const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token": token}); // pura data aa gya user ka

            if(!rootUser){
                throw new Error('User not found');
            }
            
                req.token = token;
                req.rootUser = rootUser;
                req.userID = rootUser._id;

                next();
            

        }catch(err){
            res.status(401).send('Unauthorized: No token provided');
            console.log(err);
        }
}

module.exports = Authenticate