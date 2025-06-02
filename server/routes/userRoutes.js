const express = require('express')
const router = express.Router();
const {registerUser,loginUser,googleLogin} = require('../controllers/userController');
const { jwtAuthMiddleware } = require('../middlewares/authMiddleware');

router.get('/verify',jwtAuthMiddleware,async(req,res)=>{
    const user = await req.user;
    console.log("From verify: "+user)
    res.status(200).json({
        message: 'Token is valid',
        user:user
      });
})

router.post('/signup',registerUser);

router.post('/login',loginUser);

router.post('/login/google',googleLogin)

module.exports = router;