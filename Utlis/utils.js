import crypto from "crypto";
import Jwt from "jsonwebtoken";

export function isEmailValid(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
} 
 
export function randomString()
{
    return new Promise(async(resolve,rejects)=>
    {
        let length = 60;
        let result = '';
        let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let charactersLength = characters.length;
        for(let i=0;i<length;i++)
        {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        resolve(result);
    })
} 

export function generatePassword(password,password_salt)
{
    return new Promise(async(resolve,rejects)=>
    {
        let hash = crypto.pbkdf2Sync(password,password_salt,1000,64,"sha512").toString("base64");
        resolve(hash);
    })
}

export function generateToken(userId) {
    console.log(process.env?.JWT_SECERET , 'generateToken JWT_SECRET_KEY');
    return Jwt.sign(userId, process.env?.JWT_SECERET , { expiresIn: '1h' });
};


export function verifyJWTToken(Authorization) {
    return new Promise(async (resolve, reject) => {
   Jwt.verify(Authorization, process.env?.JWT_SECERET, async (err, data) => {
            if (err) {
                console.log('Authorization Expried or Forbidden');
                resolve(false);
            } else {
                resolve(data);
            } 
        });

    })
}