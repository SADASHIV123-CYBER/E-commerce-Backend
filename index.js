const express = require('express');
const serverConfig = require('./src/config/serverConfig');
const { connectDB } = require('./src/config/dbConfig');
const userRouter = require('./src/routes/userRouter');
const { authRouter } = require('./src/routes/authRouter');
const productRouter = require('./src/routes/productRouter');
const cloudinary = require('./src/config/cloudinaryConfig')
const fs = require('fs/promises')

// const uploader = require('./src/middlewares')

const cookieParser = require('cookie-parser');
const uploader = require('./src/middlewares/multerMiddleware');
const cartRouter = require('./src/routes/cartRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.text())


app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter)

app.get('/ping', (req, res) => {
    return res.json({
        message: 'pong'
    })
})

app.post('/photo', uploader.single('incommingFile'), async (req, res) => {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log("result from cloudinary", result);
    await fs.unlink(req.file.path);
    return res.json({
        message: 'ok'
    })
});


app.listen(serverConfig.PORT,  () => {
    connectDB();
    console.log(`server started at port' ${serverConfig.PORT}`);
})