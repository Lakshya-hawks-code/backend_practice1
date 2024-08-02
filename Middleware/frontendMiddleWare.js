import Jwt from "jsonwebtoken";
import {verifyJWTToken} from "../Utlis/utils.js";

export const destroyToken = (userID) =>
{
   delete userSession[userID];
   return true
} 


export const verifyToken = async(req,res,next) =>
{
    const Authorization = req.headers["authorization"];
    if(!Authorization)
    {
       return res.json({
        status:400,
        message:"Please Provide a token in header"
       });
    }
    const data = await verifyJWTToken(Authorization)
    if(data)
    {
       global.USER_ID = data?.id;
       next()
    }
    else
    {
        res.json({status:400,message:"Expired or forbidden a Token"});
    }
}