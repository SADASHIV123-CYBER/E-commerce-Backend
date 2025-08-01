const dotenv = require('dotenv');
const { propfind } = require('../routes/userRouter');
dotenv.config();

// exporting env variables 
module.exports = {
     PORT : process.env.PORT,
     DB_URL: process.env.DB_URL,
     JWT_SECRET: process.env.JWT_SECRET,
     JWT_EXPIRY: process.env.JWT_EXPIRY
}