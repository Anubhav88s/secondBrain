import {model, Schema} from "mongoose";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL!)


const UserSchema = new Schema ({
    username :{type: String , unique: true},
    password : String
})

export const UserModel = model("User" , UserSchema);

const ContentSchema = new Schema ({
    title: String ,
    type : String ,
    link : String , 

    // Array of tag IDs, referencing the 'tag' collection
    tags : [{type : mongoose.Types.ObjectId  , ref : 'Tag'  }],   

    // The 'userId' field is mandatory to link content to a user
    userId : [{type: mongoose.Types.ObjectId, ref:'User', requried :true }]  
})
// Creating a model for the 'Content' collection to interact with the database
export const ContentModel = model("Content" , ContentSchema);

const LinkSchema = new Schema ({
    hash : String,
    userId : {type: mongoose.Types.ObjectId , ref : 'User' , required : true , unique : true }
}) 

export const LinkModel = model("Link" , LinkSchema);