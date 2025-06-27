import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel, LinkModel} from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleware } from "./middleware";
import { random } from "./utils"


const app = express();
app.use(express.json());


// TO SIGNUP 
app.post("/api/v1/signup" , async (req,res)=>{
    // zod and hash 

    const username = req.body.username;
    const password = req.body.password;
    try{
    await UserModel.create({
        username : username ,
        password : password
    })

    res.json({
        message : "you are signed up"
    })}
    catch(e){
        res.status(401).json({
            message : "error while signup"
        })
        
    }
})

// TO SIGNIN 
app.post("/api/v1/signin" , async (req,res)=>{

    const username = req.body.username;
    const password = req.body.password;
    const exsitingUser = await UserModel.findOne({
        username ,
        password
    })
    if (exsitingUser){
       const token =  jwt.sign({
        id: exsitingUser._id

        },JWT_PASSWORD)

        res.json({
            token
        })
    }else{
        res.status(403).json({
            message : "incorrect credentials"
        })
    }

})

//TO ADD USER CONTENT 
app.post("/api/v1/content" , userMiddleware , async (req,res)=> {
    const link = req.body.link;
    const type = req.body.type;
    await ContentModel.create({
        link, 
        type,
        //@ts-ignore
        userId : req.userId,
        tags : []

    })

    res.json({
        message : "comment added"
    })
})
//TO GET USER CONTENT
app.get("/api/v1/content" ,userMiddleware, async (req,res)=>{

     // User ID is fetched from middleware
    //@ts-ignore
    const userId = req.userId ;

  
    // Fetch all content associated with the user ID and populate username
    // The `populate` function is used to include additional details from the referenced `userId`.
    // For example, it will fetch the username linked to the userId.
    // Since we specified "username", only the username will be included in the result, 
    // and other details like password won’t be fetched.

     const content =await ContentModel.findOne({
        userId : userId
    }).populate("userId" , "username")                         
    res.json({                                                 
        content
    })

})

// TO DELETE USER CONTENT 
app.delete("/api/v1/content" ,userMiddleware, async (req,res)=>{

    const contentId = req.body.contentId;

    await ContentModel.deleteMany({
        contentId ,
        //@ts-ignore
        userId : req.userId
    })
    res.json({ 
        message: "Deleted" 
    })

})

//for sharing content
app.post("/api/v1/brain/share" ,userMiddleware , async (req,res)=>{
    const share = req.body.share;
    //if share is true 
    //means user want to share link 

    if(share) {
        const existingUser = await LinkModel.findOne({
            //@ts-ignore
            userId : req.userId 
        });

        if( existingUser ){
            res.json({
                hash : existingUser.hash ,
            })
            return ;
        }
        const hash = random(10);
        await LinkModel.create({
            //@ts-ignore
            userId : req.userId ,
            hash : hash
        })

        res.json({
            hash
        })
    }

    //if share is false
    // means user dont want to share link 

    else{
        await LinkModel.deleteOne({
            //@ts-ignore
            userId : req.userId
        })
        res.json({
        message : "Link removed "
        })
    }   
})

app.get("/api/v1/brain/:shareLink" , async (req,res)=>{
    const hash = req.params.shareLink;

    const link = await LinkModel.findOne({
        hash : hash 
    })

    if (!link){
        res.status(411).json({
            message: "sorry incorrect input "
        })
        return ;
    }
    //userId
    const content = await ContentModel.find({
        userId : link.userId
    })

    const user = await UserModel.findOne({
        _id : link.userId
    })

    if (!user){
        res.status(411).json({
            message : "user not found , error should ideally not happen "
        })
        return ;
    }

    res.json({
        username : user.username ,
        content : content
    })
})

app.listen(3000);
