const mongoose = require('mongoose');

const connectDb = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('MongoDB Connected');
    }catch(err){
        console.error("MongoDB Connection Failed", err);
        process.exit(1);
    }
};

module.exports = connectDb;
