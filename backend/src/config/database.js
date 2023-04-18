import mongoose from 'mongoose';

const connectDB = (url) => 
    mongoose.connect(url).then(()=> console.log('database connection established'))

export default connectDB
