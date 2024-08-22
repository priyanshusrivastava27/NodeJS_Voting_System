const mongoose = require('mongoose');
 const bcrypt = require('bcrypt');

//define person schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,// datatype kya hai
         required: true // name hona hi cahiye.
    },
    age: {
        type: Number
    },
    Email: {
        type: String,
        //required: true,
        // unique: true // unique hona cahiye.
    },
    mobile: {
        type: String,
        // required: true
    },
    address: {
        type: String
    },
    aadharCardNumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['voter', 'admin'],// work mai yhi teen value save krga 
        default: 'voter'

    },
    isvoted: {
    type: Boolean,
    default: false
     }   

});

userSchema.pre('save', async function(next){
    const person = this;

    // Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();
    try{
        // hash password generation
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        
        // Override the plain password with the hashed one
        person.password = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // Use bcrypt to compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        throw err;
    }
}

//create person model
const User = mongoose.model('User', userSchema);
module.exports = User;