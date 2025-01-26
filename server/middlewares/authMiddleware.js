const jwt = require('jsonwebtoken')
const User = require('../models/User')

const jwtAuthMiddleware = async(req,res,next)=>{
    const authorization = await req.headers.authorization;
    // console.log(authorization)

    if(!authorization){
        console.log("Token not found")
        return res.status(404).json({error:"token not found"});
    }
    try {
        const token = await authorization;
        // console.log(token);
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(payload.id);
        next();
    } catch (err) {
        console.log(err)
        res.status(401).json({error:"Unauthorized user"});
    }
}

module.exports = {jwtAuthMiddleware};