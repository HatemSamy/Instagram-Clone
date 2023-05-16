import CommentModel from "../../../../DB/model/comment.model.js"
import PostModel from "../../../../DB/model/post.model.js"
import { asynchandlier } from "../../../services/erroeHandling.js"

export const CreateCmmente = asynchandlier(async (req, res, next) => {


    const { PostId } = req.params
    const { text } = req.body
    

    const post = await PostModel.findById(PostId)
    if (!post) {
        return next(Error("not fonud post",{cause:404}))  
    } else {
        const comment = await CommentModel.create({ text, PostId: post._id, createdBy: req.user._id })
         return res.status(200).json({ message: "comment created", comment })


    }
})
export const createReply = asynchandlier(async (req, res, next) => {

    const { PostId,commentId } = req.params
    const { text } = req.body
    console.log(PostId);

   
        const findcomment = await CommentModel.findOne({ _id:commentId ,PostId})
        if (!findcomment) {
        // res.status(404).json({ message: " not fonud Comment or post is deleted" })
        return next(Error("not fonud Comment or post is deleted",{cause:404}))  
        } else {
        const subcomment = await CommentModel.create({ text, PostId, createdBy: req.user._id })
        const updatedcomment = await CommentModel.findByIdAndUpdate( commentId,{$push:{replys:subcomment}} )
         return res.status(200).json({ message: "comment created", updatedcomment })
        
        }



    })
  

    export const deletecomment= async(req,res,next)=>{

        const {commentId,PostId}=req.params
        const findcomment = await CommentModel.findOne({ _id:commentId ,PostId})
        if (!findcomment) {
         return res.status(201).json({massage:"not found"})
            
        } else {
       const comment = await CommentModel.deleteOne({commentId},{new:false})
         return res.status(201).json({massage:"comment deleted",comment})
            
        }
    

       }
   














