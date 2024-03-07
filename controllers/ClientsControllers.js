const Client = require('../models/Clients');
//error handlers
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

//create client
const registerClients = async(req, res ) => {
    try {
        const { name, email, password } = req.body;
        const client = new Driver({
            name,
            email,
            password
        });
        await client.save();
        res.status(StatusCodes.CREATED).json({ client });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Failed to create client'});
    }
};
//get all clients

const getAllClients = async(req, res) => {
    try {
        const clients = await Client.find();
        res.status(StatusCodes.OK).json({clients});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Failed to get clients'});
    }
};

//get single client

const getSingleClient = async(req, res) => {
    try {
        const { id: clientId } = req.params;
        const client = await Client.findById(clientId);
        if (!driver) {
            throw new CustomError.NotFoundError('Client not found')
        }
        res.status(StatusCodes.OK).json({client});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Failed to get client'});
    }
};
//show current client
const currentClient = async (client) => {
    res.status(StatusCodes.OK).json({client: req.client});
};

//update clien

const updateClient = async(req, res) => {
    try {
        const { email,name } = req.body;
        if (!email || !name) {
            throw new CustomError.BadRequest('Email and name are required');
        }
        const client= await Client.findOne({_id: req.client.clientId});
       client.email = email;
       client.name = name;
       await client.save();

        res.status(StatusCodes.OK).json({client});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Failed to update client'});
    }
};

//delete client

const deleteClient = async(req, res) => {
    try {
        const {id: clientId} = req.params;
        const client = await Client.findById(clientId);
        if (!client) {
            throw new CustomError.NotFoundError('Client not found');
        }
        await client.remove();
        res.status(StatusCodes.OK).json({msg: 'Client deleted successfully'});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Failed to delete client'});
    }
};

module.exports = {
  registerClients,
  getAllClients,
  getSingleClient,
  currentClient,
  updateClient,
  deleteClient
}