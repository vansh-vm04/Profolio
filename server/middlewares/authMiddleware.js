const jwt = require('jsonwebtoken')
const User = require('../models/User')

const jwtAuthMiddleware = async(req,res,next)=>{
    const authorization = await req.headers.authorization;
    // console.log(authorization)
    try {
        if(!authorization){
        console.log("Token not found")
        return res.status(404).json({error:"token not found"});
    }
    
        const token = authorization;
        // console.log(token);
        const payload = await jwt.verify(token,process.env.JWT_SECRET);
        const data = await User.findById(payload.id);
        req.user = data;
        // console.log(data)
        next();
    } catch (err) {
        console.log(err)
        res.status(401).json({error:"Unauthorized user"});
    }
}

module.exports = {jwtAuthMiddleware};