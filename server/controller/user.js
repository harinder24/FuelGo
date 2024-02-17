import userModel from "../model/user.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config()
const sendUserData = async(req,res) => {
  
    if(req?.decodedEmail){
        const foundUser = await userModel.findOne({email: req.decodedEmail})
        if(foundUser){
             const data = foundUser
          
                return res.status(201).json({success: true, data: data})
           
        }
    }
    return res.status(401).json({success: false})
}

export{sendUserData}