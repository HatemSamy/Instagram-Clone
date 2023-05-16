import { Schema, model, Types } from "mongoose"





const postSchem = new Schema({

    caption: String,
    image: {
        type: Array,
        required: true,
    },

    creayedBy: {
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
    imagepublicIds: { type: Array }







},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtual: true },
    }
)
postSchem.virtual("comment", {
    ref: "Comment",
    localField: "_id",
    foreignField: "PostId"
}
)



const PostModel = model("Post", postSchem)
export default PostModel