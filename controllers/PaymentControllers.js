const Payment = require('../models/Payments');
//error handlers
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

//create a payment
const createPayment = async (req, res) => {
    try {
    const { amount, driverId, clientId,paymentMethod } = req.body;
    //initialize payment gateaway
    const paymentGateway = new PaymentGateway();
    const paymentResponse = await paymentGateway.processPayment({
        amount,
        paymentMethod
    });
    //handle payment response
    if (paymentResponse.success) {
   
    const payment = new Payment({
        amount,
        driverId,
        clientId
    });
    await payment.save();
    res.status(StatusCodes.CREATED).json({ payment });
} else {
    res.status(StatusCodes.BAD_REQUEST).json({ error: paymentResponse.message });
}
    } catch (error) {
        res.status(500).json({ error: "Failed to create payment" });
    }
}

//get all payments
const getAllPayments = async (req, res) => {
    try {
       const payments = await Payment.find(); 
       res.status(StatusCodes.OK).json({ payments });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve payments" });
    }
};

//get a single payment

const getSinglePayment = async (req, res) => {
    try {
        const {id: paymentId } = req.params;
        const payment = await Payment.findOne({_id: paymentId});

        if (!payment) {
            throw new CustomError.NotFoundError(`No payment with id ${paymentId}`);
        }

        res.status(StatusCodes.OK).json({ payment });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve payment" });
    }
};
//delete payment

const deletePayment = async (req, res) => {
    try {
        const {id: paymentId } = req.params;
        const payment = await Payment.findOne({_id: paymentId});

        if (!payment) {
            throw new CustomError.NotFoundError(`No payment with id ${paymentId}`);
        }

        await payment.remove();
        res.status(StatusCodes.OK).json({ message: "Payment deleted" });
          } catch (error) {
        res.status(StatusCodes.NTERNAL_SERVER_ERROR).json({ error: "Failed to delete payment" });
    }
};



module.exports = {
    createPayment,
    getAllPayments,
    getSinglePayment,
    deletePayment
}