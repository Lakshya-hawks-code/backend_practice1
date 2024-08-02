import mongoose from "mongoose";
const passenerSchema = new mongoose.Schema
({
    passName:{type:String,required:true},
    passEmail:{type:String,required:true},
    passAadhar:{type:String,required:true},
    passPhone:{type:String,required:true},
    passAddress:{type:String,required:true},
    passPinCode:{type:String,required:true},
    passPan:{type:String,required:true}
},
{timestamps:true})

const passModel = mongoose.model("tbl_user_pass",passenerSchema);
export default passModel;


