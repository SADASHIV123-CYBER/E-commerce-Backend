const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/serverConfig');

async function isLoggedIn(req, res, next) {
    const token = req.cookies['jwtToken'];

    if(!token) {
        return res.status(401).json({
            success: false,
            error: 'not authenticated',
            message: 'not token provided',
            data: {}
        })
    }

    try {

        const decode = jwt.verify(token, JWT_SECRET);

        if(!decode) {
            throw {reason: 'something went wrong, not able to decode token'}
        }

        req.user = {
            email: decode.email,
            id: decode.id,
            role: decode.role
        }

        next()
        
    } catch (error) {
        console.log(error);
        
        return res.status(401).json({
            success: false,
            message: 'you are not authorised for this action',
            error: {
                error: 401,
                reason: 'unauthorised user for this action'
            },
            data: {}
        })
    }
}

async function isAdmin(req, res, next) {
    const loggedInUser = req.user
    
    if(loggedInUser.role == "ADMIN") {
        return next()
    } else {
        return res.status(401).json({
        success: false,
        message: 'you are not authorised for this action', 
        error: {
            error: 401,
            reason: 'unauthorised user for this action'
        },
        data: {}
    })
    }

    return res.status(401).json({
        success: false,
        message: 'you are not authorised for this action', 
        error: {
            error: 401,
            reason: 'unauthorised user for this action'
        },
        data: {}
    })
}


module.exports = {
    isLoggedIn,
    isAdmin
}