const jwt = require('jsonwebtoken');
require('dotenv').config();
try{
module.exports.generateToken = (obj , validity)=>{
    const token = jwt.sign(obj , process.env.JWT_KEY , {expiresIn : validity});
    if(!token) throw new Error('Token not generated');
    return token;
}

module.exports.forwardAuthentication = (req, res ,next)=>{
    if(!req.session.user){
        let r = {
            "status" : "Unsuccessfull",
            "msg" : "Login First"
        }
        res.status(400).json(r);
    }
    next();
}

module.exports.ensureAuthenticated = (req, res ,next)=>{
    if(req.session.user){
        let r = {
            "status" : "Unsuccessfull",
            "msg" : "Already Logged In"
        }
        res.status(400).json(r);
    }
    next();
}

module.exports.verifyToken = (req , res, next)=>{
    let r = {
        "status" : "Unsuccessfull",
        "msg" : "Authorization token not send"
    };
    const head = req.headers['authorization'];
    if(!head) res.status(400).json(r);
    const payload = jwt.verify(head , process.env.JWT_KEY);
    req.payload = payload;
    next();
}

}
catch(err){
    console.log("Auth catch block");
    console.log(err);
    throw err;
}