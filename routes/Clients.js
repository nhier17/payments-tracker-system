const express = require('express');
const router = express.Router();
//controllers
const {
    registerClients,
    getAllClients,
    getSingleClient,
    updateClient,
    deleteClient,
    currentClient
} = require('../controllers/ClientsControllers');

router.route('/').get(getAllClients).post(registerClients);
router.route('/currentClient').get(currentClient);
router.route('/updateClient').patch(updateClient);
router.route('/:id').get(getSingleClient).delete(deleteClient);




module.exports = router;