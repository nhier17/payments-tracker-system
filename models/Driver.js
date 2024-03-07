const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

//deine driver schema

const DriverSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name']
    },
    email: {
        type: String,
        required: [true, 'Please enter a valid email address'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a valid password'],
    }
});
//hash password
DriverSchema.pre('save', async function (){
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
DriverSchema.methods.comparePassword= async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
}

const Driver = mongoose.model('Driver', DriverSchema);

module.exports = Driver;