const { findUser } = require("../repository/userRepository");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require("../config/serverConfig");

async function loginUser(userDetails) {
    const email = userDetails.email;
    const plainPassword = userDetails.password;

    const user = await findUser({email});

    if(!user) {
        throw {reason: "not found user with give email"}
    }

    const isPasswordMatch = await bcrypt.compare(plainPassword, user.password);

    if(!isPasswordMatch) {
        throw {reason: 'invalid password'}
    }

    const userRole = await user.role ? user.role : "USER"

    const token = jwt.sign({email: user.email, id: user.id, role: user.role}, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
    } );

    return token
}

module.exports = {
    loginUser
}
