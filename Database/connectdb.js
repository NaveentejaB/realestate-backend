const mongoose = require("mongoose");
 
const ConnectDB = async()=>{
    try{
        const connect = await mongoose.connect('mongodb+srv://kokilasaikrishna:kokilasaikrishna@cluster0.basg9bm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log("Database connected sucessfully..");
       // return { statusCode: 200, message: "Database connected successfully." };
    }catch(error){
        console.error("error connecting to Database",error.message);
        //return { statusCode: 500, message: "Error connecting to Database: " + error.message };
    }
};


module.exports = ConnectDB;