import { Schema, model, Types } from "mongoose"





const commentSchem = new Schema({

    text: String,


    PostId: {
        type: Types.ObjectId,
        ref: "Post"
    },

    createdBy: {
        type: Types.ObjectId,
        ref: "User"
    },
    Likes: [{
        type: Types.ObjectId,
        ref: "User"
    }],
    isdeleted: {
        type: Boolean,
        default: false
    },
    deletedBy: {
        type: Types.ObjectId,
        ref: "User"
    },
    replys:[{type: Types.ObjectId,
        ref: "Comment"}]


}, { timestamps: true })


commentSchem.pre('deleteOne',{query:false,document:true},function(next){
    console.log(this);
    next()

   })
const CommentModel = model("Comment", commentSchem)
export default CommentModel