import PostModel from "../../../../DB/model/post.model.js"
import cloudinary from "../../../services/cloudinary.js"
import { paginate } from "../../../services/pagination.js"



export const createPost= async(req,res,next)=>{
try {
    if (!req.files.length) {
        return res.status(400).json({message:"image is requird"})
    } else {
       
    const {caption}=req.body
    
    const image=[]
    const imagepublicIds=[]
    for (const file of req.files) {
        const {secure_url,public_id} = await cloudinary.uploader.upload(file.path,{folder:`insatgram/post`})
          image.push(secure_url)
          imagepublicIds.push(public_id)
    }
    req.body.image=image
    req.body.imagepublicIds=imagepublicIds
    req.body.createdby= req.user._id
    const post = await PostModel.create(req.body)
     return res.status(201).json({message:"post is created successfly",post})
    
    }  
} catch (error) {
    return next(Error("fail to create post",{cause:404}))  
    
}

}

export const Likes= async(req,res,next)=>{
    try {
       
        const {id}=req.params
          
          const post = await PostModel.findByIdAndUpdate(id,{$set:{Likes:req.user._id}})

          return res.status(200).json({message:" likeeeeees",post})
            
        }  
     catch (error) {
        return next(Error("fail to like",{cause:401}))  
        
    }
    
}
export const UnLikes= async(req,res,next)=>{
    try {
       
        const {id}=req.params
          
          const post = await PostModel.findByIdAndUpdate(id,{$pull:{Likes:req.user._id}})

          return res.status(200).json({message:" Unlikeeeeees",post})
            
        }  
     catch (error) {
        return next(Error("fail to unlike",{cause:404}))  
        
    }
    
}


export const posts =async(req,res,next)=>{
    const{page,size}=req.query
    const{skip,limit}=paginate(page,size)
    const posts= await PostModel.findOne({_id:req.params.id}).select("caption")
    .populate({

        path:"comment",
        populate:({

            path:"replys",
            select:"text"
        })
    }).skip(skip).limit(limit)
     if (!posts) {
          return next(Error("not fonud  post ",{cause:404}))  
     } else {
     
        return res.status(200).json({ message: "this posts", posts })
     

     }
 
 }



 export const deletepost= async(req,res,next)=>{

    const {PostId}=req.params
    const findpost = await PostModel.findOne({PostId})
    if (!findpost) {
     return res.status(201).json({massage:"not found"})
        
    } else {
     const post = await PostModel.deleteOne({PostId})
     return res.status(201).json({massage:"post deleted",post})
        
    }

 }

  