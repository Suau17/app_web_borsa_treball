import mongoose from 'mongoose';

const connectDB = (url) => 
    mongoose.connect(url).then(()=> console.log('database connection established'))

export default connectDB
/* conection to mongodb
mongoose.connect(connectionString, {
    useNewUrlParser: true,
})
.then(() => {
    console.log('conection sucsesfully established')
}).catch(err => {
    console.log(err)
})

*/