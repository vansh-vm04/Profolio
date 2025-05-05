const User = require('../models/User')
const {generateToken} = require('../utils/jwt')

//Signup route
const registerUser = async(req,res)=>{
    const {username,email,password} = req.body;

    try {
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(409).json({error:"User already exist"})
        }
        else{
            const userDetials = {
                username:username,
                email:email,
                password:password
            }
            const newUser = await new User(userDetials);
            const response = await newUser.save();
            if(response){
                const token = await generateToken(response.id);
                const user = await User.findOne({email:email});
                return res.status(200).json({
                    id:user.id,
                    username:user.username,
                    email:user.email,
                    token:token
                });
            }
            else{
                return res.status(500).json({error:"Internal error"});
            }
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({error:error.message});
    }
}

//Login route
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    console.log(email)

    try {
        const user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({error:"User not found"});
        }

        const isPasswordMatch = await user.comparePassword(password);
        if(isPasswordMatch){
            return res.status(200).json({
                id:user.id,
                username:user.username,
                email:user.email,
                token:generateToken(user.id)
            })
        }
        else{
            return res.status(401).json({error:"Invalid credentials"})
        }
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports = {registerUser,loginUser};