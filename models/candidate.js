const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

//define person schema
const candidateSchema = new mongoose.Schema({

    name: {
        type: String,// datatype kya hai
        required: true // name hona hi cahiye.
    },
    party:{
        type :String,
        required :true 
    },
    age :{
        type :String,
        required:true
    },
    votes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            votedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    voteCount: {
        type: Number,
        default: 0
    }

});

//create person model
const candidate = mongoose.model('candidate', candidateSchema);
module.exports = candidate;