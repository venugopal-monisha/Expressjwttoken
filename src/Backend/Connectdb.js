const mongoose = require("mongoose");
const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://admin:admin123@cluster0.sre4wen.mongodb.net/test1234");
        console.log(`MongoDB Connect:${conn.connection.host}`);
    }catch(error){
        console.error("error connecting to mongodb:",error.message);
        process.exit(1);
        
    }
};

module.exports = connectDB;