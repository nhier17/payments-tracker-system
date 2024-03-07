const express = require('express');
const router = express.Router();

const {
    createPayment,
    getAllPayments,
    getSinglePayment,
    deletePayment
} = require('../controllers/PaymentControllers');


router.route('/').post(createPayment).get(getAllPayments);
router.route('/:id').get(getSinglePayment).delete(deletePayment);

module.exports = router;