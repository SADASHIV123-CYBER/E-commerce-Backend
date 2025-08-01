const express = require('express');
const serverConfig = require('./src/config/serverConfig');
const { connectDB } = require('./src/config/dbConfig');
const userRouter = require('./src/routes/userRouter');
const { authRouter } = require('./src/routes/authRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/users', userRouter);
app.use('/auth', authRouter)

app.get('/ping', (req, res) => {
    return res.json({
        message: 'pong'
    })
})


app.listen(serverConfig.PORT,  () => {
    connectDB();
    console.log(`server started at port' ${serverConfig.PORT}`);
})