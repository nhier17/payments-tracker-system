const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { attachCookiesToResponse, createTokenUser } = require('../utils');

//register user 
const registerUser = async (req, res) => {
    const { email, name, password } = req.body;
    //check email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
        throw new CustomError.BadRequest('Email already exists');
    }
    // register admin
    const isFirtsAccount = (await User.countDocuments({})) === 0;
    const role = isFirtsAccount ? 'admin' : 'user';

    const user = await User.create({name, email, password,role});
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser})
    res.status(StatusCodes.CREATED).json({user: tokenUser});
};
