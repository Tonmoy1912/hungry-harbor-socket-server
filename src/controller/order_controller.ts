import { Request, Response } from "express";
import { AcceptOrderBody, DeliveredOrReadyOrderBody, UserCancelOrderBody } from "../types/requestBody";

export async function acceptOrder(req:any,res:Response) {
    try{
        const body:AcceptOrderBody=req.body;
        req.io.to(body.userId).emit("acceptOrder",{...body});
        // status=accepted or status=cancelled
        return res.status(200).json({ok:true,message:"acceptOrder event emitted."});
    }
    catch(err:any){
        return res.status(500).json({ok:false,message:err.message});
    }
}

export async function deliveredOrder(req:any,res:Response) {
    try{
        const body:DeliveredOrReadyOrderBody=req.body;
        req.io.to(body.userId).emit("deliveredOrder",{...body});
        return res.status(200).json({ok:true,message:"deliveredOrder event emitted."});
    }
    catch(err:any){
        return res.status(500).json({ok:false,message:err.message});
    }
}

export async function readyOrder(req:any,res:Response) {
    try{
        const body:DeliveredOrReadyOrderBody=req.body;
        req.io.to(body.userId).emit("readyOrder",{...body});
        return res.status(200).json({ok:true,message:"readyOrder event emitted."});
    }
    catch(err:any){
        return res.status(500).json({ok:false,message:err.message});
    }
}

export async function userCancelOrder(req:any,res:Response) {
    try{
        const body:UserCancelOrderBody=req.body;
        req.io.to(process.env.HH_OWNER_ROOM).emit("userCancelOrder",{...body});
        return res.status(200).json({ok:true,message:"userCancelOrder event emitted."});
    }
    catch(err:any){
        return res.status(500).json({ok:false,message:err.message});
    }
}
