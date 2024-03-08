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
//login user

const login = async (req, res) => {
    const { email, password } = req.body;
    //check email password
    if (!email || !password) {
        throw new CustomError.BadRequest('Email and password are required');
    }
    const user = await User.findOne({ email })
    if (!user) {
        throw new CustomError.BadRequest('Email or password is incorrect');
    }
    //check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new CustomError.BadRequest('password is incorrect');
    }
    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser})
    res.status(StatusCodes.OK).json({user: tokenUser});
}
//logout user
const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        expires: new Date(Date.now() + 1000),
        httpOnly: true
    });
    res.status(StatusCodes.OK).json({ msg: 'user logged out' });
}

module.exports = {
    registerUser,
    login,
    logout
}