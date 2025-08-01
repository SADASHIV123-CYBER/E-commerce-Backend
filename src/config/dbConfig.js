const { default: mongoose } = require("mongoose");
const serverConfig  = require('./serverConfig')

async function connectDB() {
    try {
        await mongoose.connect(serverConfig.DB_URL);
        console.log("successfully connected to MongoDB");
    } catch (error) {
        console.log("not able to connect MongoDB");
        console.log(error);
    }
}

module.exports = {
    connectDB
}