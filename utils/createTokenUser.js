//create token user
const createTokenUser = (user) => {
    return { name: user.name, userId: user._id, role: user.role };
};

module.exports = createTokenUSer;