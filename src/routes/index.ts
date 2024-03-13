import {Router,Response,Request} from 'express';

const router=Router();

router.get("/",function(req:Request,res:Response){
    return res.status(200).json({ok:true,message:"api router working.."});
})

export default router;