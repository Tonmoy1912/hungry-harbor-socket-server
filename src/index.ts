import express,{Express, Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { request_validation } from './middleware/request_validation';
import jwt from 'jsonwebtoken';
import router from './routes';

const app:Express=express();
const port=process.env.HH_SS_PORT || 8000;

//creating http server
let server=http.createServer(app);

//creating socket server
const io=new Server(server,{
    cors:{
        origin:process.env.CLIENT_ORIGIN
    }
});

io.on("connection",(socket)=>{

    // comment out before deployment
    console.log(`A user is connected with socket id ${socket.id}`);
    socket.on("disconnect",()=>{
        console.log(`${socket.id} gets disconnected`);
    });

    //logic to join a room with userId
    socket.emit("send-token","");
    socket.on('set-token',function(token:string){
        try{
            let obj:any=jwt.verify(token,process.env.SOCKENT_CONNECT_SECRET||"");
            socket.join(obj._id);
            console.log("socket rooms",socket.rooms);
        }
        catch(err:any){
            socket.disconnect(true);
        }
    });
});

//add middleware
app.use(cors());
app.use(request_validation);
app.use(express.json());
app.use(express.urlencoded());

//attaching io to req in middleware
app.use(function(req:any,res:Response,next:any){
    req.io=io;
    next();
});

app.use("/api",router);

app.get("/",function(req:any,res:Response){
    try{
        // req.io.emit("broadcast-event","home backend api called");
        return res.status(200).json({ok:true,message:"Healthy server"});
    }
    catch(err:any){
        return res.status(500).json({ok:false,message:err.message});
    }
});

//global catch
app.use(function (err:any, req:Request, res:Response, next:any) {
    return res.status(500).json({ ok: false, message: err.message });
});

//running the server
server.listen(port,function(){
    console.log(`The server is running on port ${port}`);
});

