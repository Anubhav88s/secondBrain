import {model, Schema} from "mongoose";
import mongoose from "mongoose";

mongoose.connect("mongodb+srv://Anubhav:aVrj9tbgcFe5VK58@cluster0.sqpaz.mongodb.net/brainly");

const UserSchema = new Schema ({
    username :{type: String , unique: true},
    password : String
})

export const UserModel = model("User" , UserSchema);

const ContentSchema = new Schema ({
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