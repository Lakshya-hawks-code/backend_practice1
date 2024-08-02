import mongoose from "mongoose";

const stateSchema = new mongoose.Schema
({
    id:{type:Number,required:true},
    name:{type:String,required:true},
    country_id:{type:Number,required:true},
    country_code:{type:String,required:true},
    country_name:{type:String,required:true},
    state_code:{type:String,required:true},
})

const stateModel = mongoose.model("tbl_states",stateSchema);
export default stateModel;