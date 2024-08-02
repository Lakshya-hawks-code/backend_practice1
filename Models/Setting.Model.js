import mongoose from "mongoose";

const settingSchema = new mongoose.Schema
({
    option:{type:String,required:true},
    optionValue:{type: mongoose.Schema.Types.Mixed,required:true},
    label:{type:String,required:true},
    createdBy:{type:String}
},{timestamps:true});

const settingModel = mongoose.model("tbl_settings",settingSchema);
export default settingModel;