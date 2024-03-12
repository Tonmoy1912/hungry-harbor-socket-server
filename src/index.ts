import express,{Express, Request, Response} from 'express';

const app:Express=express();
const port=process.env.HH_SS_PORT || 8000;

app.use(express.json());
app.use(express.urlencoded());

app.get("/",function(req:Request,res:Response){
    try{
        return res.status(200).json({ok:true,message:"Healthy server"});
    }
    catch(err:any){
        return res.status(500).json({ok:false,message:err.message});
    }
});

app.listen(port,()=>{
    console.log(`The server is running on port ${port}`);
});