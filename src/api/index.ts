import {Router,Response,Request} from 'express';
import orderRouer from './order';

const router=Router();

router.get("/",function(req:Request,res:Response){
    return res.status(200).json({ok:true,message:"api router working.."});
});

router.use("/order",orderRouer);

export default router;