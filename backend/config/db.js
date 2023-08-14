const mongoose  = require('mongoose');
const colors = require('colors')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB database ${mongoose.connection.host}`.bgGreen.white);

    } catch (error) {
        console.log(`MONGO Connect Error ${error}`.bgRed.white);
    }
}
module.exports = connectDB;