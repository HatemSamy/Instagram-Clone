import { findById } from "../../../../DB/DBMethods.js";
import userModel from "../../../../DB/model/User.model.js";
import { asynchandlier } from "../../../services/erroeHandling.js";

 export const disPlayProfile = asynchandlier(async(req,res,next)=>{

   const userProfile = await findById({model:userModel,filter:{_id:req.user._id},select:("userName email age gallary")})

   return res.status(201).json({massage:"welcome back",userProfile})

})