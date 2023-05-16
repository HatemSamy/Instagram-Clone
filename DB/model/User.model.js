import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs'



const userSchema = new Schema({

    userName: {
        type: String,
        required: [true, 'userName is required'],
        min: [2, 'minimum length 2 char'],
        max: [20, 'max length 2 char']

    },
    fristName: String,
    lastName: String,
    age: {
        type: Number,
        required: true,
        default: "male"
    },
    gender: {type:String, enum: ["male", "female"]},
    email: {
        type: String,
        unique: [true, 'email must be unique value'],
        required: [true, 'userName is required'],
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
    phone: {
        type: String,
    },

    profilePic: {
        type: String,
    },
    coverpic: {
        type: Array,
    },
    gallary: {
        type: Array,
    },
    Follower: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    Following: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }],
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'Admin']
    },


    confirmEmail: {
        type: Boolean,
        default: false,
    },
    isblocked: {
        type: Boolean,
        default: false,
    },
    online: {
        type: Boolean,
        default: false,
    },
    socialLink: Array,
    pdfLink: String,
    story: Array,
    DOB: String,
    lastseen:String,

    accessCode: String
}, {
    timestamps: true
})
userSchema.pre("save", function (next) {

    this.password = bcrypt.hashSync(this.password, parseInt(process.env.SALTROUND))
    next()

})

const userModel = model('User', userSchema)
export default userModel