import { NextFunction , Request , Response  } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const JWT_PASSWORD = process.env.JWT_PASSWORD!;
export const userMiddleware = (req: Request  , res: Response , next : NextFunction) =>{

    const header = req.headers["authorization"];
    const decoded = jwt.verify( header as string ,JWT_PASSWORD)
    if (decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next()
    }else {
        res.status(403).json({
            message : "you are not logged in"
        })
    }
}