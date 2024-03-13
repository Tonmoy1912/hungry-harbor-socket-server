import { Request, Response } from "express";


export function request_validation(req:Request,res:Response,next:any){
    try{
        console.log(req.headers["pass-code"]);
        if(req.headers['pass-code']!=process.env.PASS_CODE){
            return res.status(400).json({ok:false,message:"Access denied"});
        }
        next();
    }
    catch(err:any){
        return res.status(500).json({ok:false,message:err.message});
    }
}