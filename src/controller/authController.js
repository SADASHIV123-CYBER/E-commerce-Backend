const { loginUser } = require("../service/authService");

async function login(req, res) {
    try {
    const loginPayload = req.body; 

    const responce = await loginUser(loginPayload);

    res.cookie('jwtToken', responce, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        success: true,
        message: 'loged in successfully',
        error: {},
        data: {}
    })        
    } catch (error) {
        console.log(error);
        
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error,
            data: {}
        })
    }
}

module.exports = login