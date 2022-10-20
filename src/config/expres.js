import userRouter from '#routes/user.routes.js';
import express from 'express';

const expressApp = express();

// middlewares
expressApp.use(express.json())



// routes
expressApp.use('/', userRouter)
expressApp.use('/register', userRouter)


export default expressApp