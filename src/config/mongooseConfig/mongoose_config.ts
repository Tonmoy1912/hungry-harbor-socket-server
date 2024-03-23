import mongoose from "mongoose";

export async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL || "");
        console.log("socket server connected to database");
        let db = mongoose.connection;
        db.on('disconnected',async function () {
            // console.log('Disconnected from MongoDB');
            await mongoose.connect(process.env.MONGO_URL || "");
        });
    }
    catch (err: any) {
        console.log(err.message);
    }
}