import Jwt from "jsonwebtoken";
import {verifyJWTToken} from "../Utlis/utils.js"

export const destroyToken = (userID) =>
 {
    delete userSession[userID];
    return true
 } 


export const verifyToken = async (req, res, next) => {
  let request = req.body;
  var Authorization = req.headers['authorization'];
  if (!Authorization) {
      return res.json({
         status:400,
          message:"Please provide a token in header"
      });
  }
  let data = await verifyJWTToken(Authorization);
  if (data) {
        global.USER_ID = data?.id;
        next(); 
  } else { 
      return res.json({
        status:400,
        message:"Invalid or Exipred Forbidden a token"
      })
  }  
}