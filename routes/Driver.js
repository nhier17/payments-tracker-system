const express = require('express');
const router = express.Router();
//controllers
const {
    registerDriver,
    getAllDrivers,
    getSingleDriver,
    currentDriver,
    updateDriver,
    deleteDriver
} = require('../controllers/DriverControllers');

router.route('/').get(getAllDrivers);
router.route('/currentDriver').get(currentDriver);
router.route('/registerDriver').post(registerDriver);
router.route('/updateDriver').patch(updateDriver);
router.route('/drivers/:id').delete(deleteDriver);

module.exports = router;