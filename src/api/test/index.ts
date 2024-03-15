import {Router,Response,Request} from 'express';

const testRouter=Router();

testRouter.get("/hello-world",async function(req:any,res:Response){
    try{
        if(process.env.MODE!="development"){
            return res.status(400).json({ok:false,message:"This works only in development mode"});
        }
        req.io.emit("test-hello-world","sending hello world from socket server");
        return res.status(200).json({ok:true,message:"hello world event emitted"});
    }
    catch(err:any){
        return res.status(500).json({ok:false,message:err.message});
    }
});

export default testRouter;