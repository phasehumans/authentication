import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const db = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("mongoDB connected");
        
    })
    .catch((err) => {
        console.log("error connecting mongodb");
        
    })
}

export default db;


/* 
- set admin and password
- ip whitelisting
- get mongo url

*/