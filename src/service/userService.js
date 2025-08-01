const { findUser, createUser } = require("../repository/userRepository");

async function registerUser(userDetails) {
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber
    });
    if(user) {
        throw {reason: 'user is already regestered with give email and mobile number'}
    }

    const newUser = await createUser({
        name: userDetails.name,
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber,
        password: userDetails.password
    });

    if(!newUser) {
        throw {reason: 'not able to create user', statusCode: 500}
    }

    return newUser
}

module.exports = {registerUser}