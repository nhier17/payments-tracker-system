const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

//define user schema
const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username']
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, 'Please provide a valid email address']
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide a valid password'],
        minlength: 6,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'admin'
    }
});
//hash password
userShema.pre('save', async function() {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
//compare password

userShema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = mongoose.model('User', userShema);