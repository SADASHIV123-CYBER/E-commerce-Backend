const express = require('express');
const serverConfig = require('./src/config/serverConfig');

const app = express();

app.get('/ping', (req, res) => {
    return res.json({
        message: 'pong'
    })
})

app.listen(serverConfig.PORT,  () => {
    console.log(`server started at port' ${serverConfig.PORT}`);
    
})