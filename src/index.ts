import express,{Express, Request, Response} from 'express';
import dotenv from 'dotenv';
dotenv.config();
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { request_validation } from './middleware/request_validation';
import jwt from 'jsonwebtoken';
import router from './api';
import { connectDb } from './config/mongooseConfig/mongoose_config';
import { join_owner_room } from './config/ownerRoom/owner_room';
import schedue from 'node-schedule';
import { createTodaysStats, deleteOldStats, deleteUnsettledOrders } from './controller/scheduled_job';

connectDb();

const app:Express=express();
const port= 8000;

//creating http server
let server=http.createServer(app);

//creating socket server
const io=new Server(server,{
    cors:{
        origin:"*"
    },
});

io.on("connection",(socket)=>{

    // comment out before deployment
    // console.log(`A user is connected with socket id ${socket.id}`);
    socket.on("disconnect",()=>{
        // console.log(`${socket.id} gets disconnected`);
    });

    socket.on("disconnecting",function(){
        let rooms=new Set(socket.rooms);
        rooms.forEach(function(roomId){
            socket.leave(roomId);
        });
    });

    //logic to join a room with userId
    socket.emit("send-token","");
    socket.on('set-token',async function(token:string){
        try{
            let obj:any=jwt.verify(token,process.env.SOCKENT_CONNECT_SECRET||"");
            socket.join(obj._id);
            await join_owner_room(socket,obj._id);
            // console.log("socket rooms",socket.rooms);
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

app.get("/",function(req:any,res:Response){
    try{
        // req.io.emit("broadcast-event","home backend api called");
        return res.status(200).json({ok:true,message:"Healthy server"});
    }
    catch(err:any){
        return res.status(500).json({ok:false,message:err.message});
    }
});

app.use("/api",router);

//global catch
app.use(function (err:any, req:Request, res:Response, next:any) {
    return res.status(500).json({ ok: false, message: err.message });
});

//running the server
server.listen(port,function(){
    console.log(`The server is running on port ${port}`);
});

//scheduling daily job
//will be invoked every day at 3:00 am
schedue.scheduleJob("0 3 * * *",createTodaysStats);
//will be invoked on the first day of every month at 5:00 am
schedue.scheduleJob("0 5 1 * *",deleteOldStats);
//will be invoked in every sunday at 2:00 am
schedue.scheduleJob("0 1 * * 0",deleteUnsettledOrders);