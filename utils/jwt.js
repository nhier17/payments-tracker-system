const JWT = require('jsonwebtoken');

//create jwt token
const createJWT = ({ payload }) => {
    const token = JWT.sign(payload, process.env.JWT_SECRET, 
        { expiresIn: process.env.JWT_LIFETIME });
    return token;
};
// is token valid
const isTokenValid = ({ token }) => JWT.verify(token, process.env.JWT_SECRET);

// attach cookies to response
const attachCookiesToResponse = ({ res, user}) => {
    const token = createJWT({ payload: user });
    res.cookie('token', token, {
        expires: new Date(Date.now() + process.env.JWT_LIFETIME * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });

    };

    module.exports = {
        createJWT,
        isTokenValid,
        attachCookiesToResponse,
    };
