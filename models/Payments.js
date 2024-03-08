const mongoose = require('mongoose');

const PaymentSchema  =  new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver',
        required: true,
    },
    clientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending',
    },
    transactionId: {
        type: String,
        required: true,
    },
    paymentMethod: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Payment', PaymentSchema);