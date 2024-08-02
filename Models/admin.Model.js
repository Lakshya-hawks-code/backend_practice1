import mongoose from "mongoose";

const adminSchema = new mongoose.Schema
({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: {type: String, required: true},
    status:{type: Number,required: true},
    password: { type: String, required: true },
    password_salt:{type: String, required: true },
    access_token:{type:String,required:false},
    last_login:{type:Date,required:false},
    createdby:{type:String,required:false},
    image:{type:String,required:false},
    address: { type: String, required: false },
    country: { type: String, required: false },
    state: { type: String, required: false },
    city: { type: String, required: false },
},{timestamps:true})

const adminModel =  mongoose.model("tbl_admin_users",adminSchema);
export default adminModel

