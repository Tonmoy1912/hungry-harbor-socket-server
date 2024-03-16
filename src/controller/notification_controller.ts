import { Request, Response } from "express";
import { NotificationBody } from "../types/requestBody";

export async function sendNotification(req:any,res:Response) {
    try{
        const body:NotificationBody=req.body;
        if(body.for_owner){
            req.io.to(process.env.HH_OWNER_ROOM).emit("receivedNotification",{...body});
        }
        else{
            req.io.to(body.userId).emit("receivedNotification",{...body});
        }
        return res.status(200).json({ok:true,message:"receivedNotification event emitted."});
    }
    catch(err:any){
        return res.status(500).json({ok:false,message:err.message});
    }
}