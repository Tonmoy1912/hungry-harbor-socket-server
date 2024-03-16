import { Request,Response } from "express";

export function ItemUpdate(req:any,res:Response){
    try{
        //broad cast the message to all 
        req.io.emit("itemsUpdate");
        return res.status(200).json({ok:true,message:"itemsUpdate event emitted."});
    }
    catch(err:any){
        return res.status(500).json({ok:false,message:err.message});
    }
}