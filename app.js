import express from "express";
 const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import backendRoutes from "./Routes/backendRoutes.js";


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cors());

mongoose.connect(process.env.DB,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(()=>
    {
        console.log("database connection successfully");
    })
    .catch((err)=>
    {
        console.log("Database not connect",err);
    })

   app.use("/api/v1",backendRoutes);

const port = 5000;
app.listen(port,()=>
{
    console.log(`listing the port number on ${port}`);
})