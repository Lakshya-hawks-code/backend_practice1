import { createCanvas,loadImage } from "canvas";
import randomColor from "randomcolor";
import path from "path";
import fs from "fs";
 function ensureDirectoryExistence(filePath)
 {
    const directory = path.dirname(filePath);
    if(!fs.existsSync(directory))
    {
        fs.mkdirSync(directory,{recursive:true});
   }
 }

 export async function generateAvatar(name,folderPath="./public/profile",size=100)
 {
    const canvas = createCanvas(size,size);
    const ctx = canvas.getContext('2d');
    // Background Color
    ctx.fillStyle = randomColor({seed:name});
    ctx.fillRect(0,0,size,size); 
    // Text Setting
    ctx.fillStyle = 'white';
    ctx.font = `${size/2}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const text = name.charAt(0).toUpperCase();
    ctx.fillText(text, size / 2, size / 2);
    const buffer = canvas.toBuffer('image/png');
    const filename = `${name}_avatar.png`;
    ensureDirectoryExistence(path.join(folderPath,filename ));
    const filePath = path.join(folderPath,filename);
    fs.writeFileSync(filePath,buffer);
    return `${process.env.domain}/profile/${filename}`
     // return FilePath
 } 