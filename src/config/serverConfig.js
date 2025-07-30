const dotenv = require('dotenv');
dotenv.config();

// exporting env variables 
module.exports = {
     PORT : process.env.PORT
}