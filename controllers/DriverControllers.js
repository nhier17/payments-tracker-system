const Driver = require('../models/Driver');
//error handlers
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

//create driver
const registerDriver = async(req, res ) => {
    try {
        const { name, email, password } = req.body;
        const driver = new Driver({
            name,
            email,
            password
        });
        await driver.save();
        res.status(StatusCodes.CREATED).json({ driver });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Failed to create driver'});
    }
};
//get all drivers

const getAllDrivers = async(req, res) => {
    try {
        const drivers = await Driver.find();
        res.status(StatusCodes.OK).json({drivers});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Failed to get drivers'});
    }
};

//get driver by id

const getDriverById = async(req, res) => {
    try {
        const { id: driverId } = req.params;
        const driver = await Driver.findById(driverId);
        if (!driver) {
            throw new CustomError.NotFoundError('Driver not found')
        }
        res.status(StatusCodes.OK).json({driver});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Failed to get driver'});
    }
};
//show current driver
const currentDriver = async (driver) => {
    res.status(StatusCodes.OK).json({driver: req.driver});
};

//update driver

const updateDriver = async(req, res) => {
    try {
        const { email,name } = req.body;
        if (!email || !name) {
            throw new CustomError.BadRequestError('Email and name are required');
        }
        const driver = await Driver.findOne({_id: req.driver.driverId});
       driver.email = email;
       driver.name = name;
       await driver.save();

        res.status(StatusCodes.OK).json({driver});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Failed to update driver'});
    }
};

//delete driver

const deleteDriver = async(req, res) => {
    try {
        const driver = await Driver.findOneAndDelete({_id: req.driver.driverId});
        if (!driver) {
            throw new CustomError.NotFoundError('Driver not found');
        }
        res.status(StatusCodes.OK).json({driver});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: 'Failed to delete driver'});
    }
};