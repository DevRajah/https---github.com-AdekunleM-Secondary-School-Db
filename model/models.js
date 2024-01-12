const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registrationSchema = new mongoose.Schema({
    name: {
        type: String, 
        require: true
    },
    email: {
        type: String, 
        require: true
    },
    password: {
        type: String, 
        require: true
    },
}, {timestamps: true});


const scoreSchema = new mongoose.Schema({
    maths: {
        type: Number,
        require: true
    },
    english: {
        type: Number, 
        require: true
    }, 
    
    civic: {
        type: Number,
        require: true
    },
    basicScience: {
        type: Number, 
        require: true
    }, 
    socialStudies: {
        type: Number,
        require: true
    }, 
    email: { 
        type: Schema.Types.String, 
        ref: 'registerModel', 
        required: true 
    },
    userId: { 
        type: Schema.Types.ObjectId,
        ref: 'registerModel', 
        required: true
    }
})

const scoreModel = mongoose.model('scores', scoreSchema);

const registerModel = mongoose.model('Registers', registrationSchema);

module.exports = {
    registerModel,
    scoreModel,
}; 
