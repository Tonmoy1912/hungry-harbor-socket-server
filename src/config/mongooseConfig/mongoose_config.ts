import mongoose from "mongoose";

export async function connectDb() {
    try{
        await mongoose.connect(process.env.MONGO_URL || "");
        console.log("socket server connected to database");
    }
    catch(err:any){
        console.log(err.message);
    }
}