import userRouter from '#routes/user.routes.js';
import express from 'express';

const expressApp = express();

// middlewares
expressApp.use(express.json())



// routes
expressApp.use('/user', userRouter)



export default expressApp