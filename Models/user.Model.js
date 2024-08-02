import mongoose from "mongoose";

const userSchema = new mongoose.Schema
({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    password_salt:{type: String, required: true },
    access_token:{type:String,required:false},
    last_login:{type:Date,required:false},
    address: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    admin: { type: String, required: true },
},{timestamps:true});

const userModel = mongoose.model("tbl_users",userSchema);
export default userModel;