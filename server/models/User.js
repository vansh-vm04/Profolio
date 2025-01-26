const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    resumes:[]
});

userSchema.pre('save',async function(next){
    const person = this;
    if(!person.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.password,salt);
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    const user = this;
    try {
        const isMatch = await bcrypt.compare(candidatePassword,user.password);
        console.log(isMatch);
        return isMatch;
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('User',userSchema);
module.exports = User;