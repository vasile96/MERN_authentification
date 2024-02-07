const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoDB_URL');

const connectDB = async() => {
    try{
        await mongoose.connect(db, {
            //useNewUrlParser: true,
            //useUnifiedTopology: true,
            //useCreateIdex: true,
            //useFindAndModify: false
        });
        console.log('MongoDB connected successfully!');

    } catch(err) {
        console.log(err.message);
        //exit process with a fail code
        process.exit(1);
    }
};
module.exports = connectDB;