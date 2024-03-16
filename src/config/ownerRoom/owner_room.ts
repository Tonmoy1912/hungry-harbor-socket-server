import Owners from "../../model/ownerSchema";

export async function join_owner_room(socket:any,userId:string){
    try{
        const count=await Owners.findOne({user:userId}).countDocuments();
        if(count>0){
            socket.join(process.env.HH_OWNER_ROOM);
        }
        // console.log("owner room joined",socket.rooms);
    }
    catch(err:any){
        console.log("Error on joining owner room",err.message);
    }
}