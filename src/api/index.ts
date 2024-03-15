import {Router,Response,Request} from 'express';
import orderRouer from './order';
import testRouter from './test';

const router=Router();

router.get("/",function(req:Request,res:Response){
    return res.status(200).json({ok:true,message:"api router working.."});
});

router.use("/order",orderRouer);
router.use("/test",testRouter);

export default router;