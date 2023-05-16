import userModel from "../../../../DB/model/User.model.js";
import { asynchandlier } from "../../../services/erroeHandling.js";
import { paginate } from "../../../services/pagination.js";

export const getAllUsers= asynchandlier(async(req,res,next)=>{
    const{page,size}=req.query
    const {limit,skip}=paginate(page,size)
    const users= await userModel.find({}).skip(skip).limit(limit)
    return res.status(201).json({message:"All users for admin",users})

})
export const ChangeRole= asynchandlier(async(req,res,next)=>{
      const {id}=req.params
      const {newROLE}=req.body

    const USERRole= await userModel.findOneAndUpdate({_id:id},{role:newROLE},{new:true})
    return res.status(201).json({message:"change Role Successfly",USERRole})

})
export const BlockUser= asynchandlier(async(req,res,next)=>{
    const {id}=req.params


  const user= await userModel.findOneAndUpdate({_id:id,role:{$nin:["HR"]}},{isblocked:true},{new:true}).select("userName role email")
  
  if (!user) {
    return res.status(404).json({ message: "User profile not found" });
  }else{

      return next(new Error(" fail to change Role", { casue: 400 }))

  }

})

