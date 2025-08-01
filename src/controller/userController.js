const { registerUser } = require("../service/userService");

async function createUser(req, res) {
    try {
        const user = await registerUser(req.body);
        console.log("user" ,user);
        

        res.status(200).json({
            success: true,
            message: 'Successfully created the user',
            error: {},
            data: user
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: error,
            data: {}
        });
    }
}

module.exports = createUser;
