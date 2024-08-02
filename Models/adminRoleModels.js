import mongoose from "mongoose";

const adminRoleSchema = new mongoose.Schema
({
    name:
    {
        type:String,
        required:true,
        unique:true
    },
    modules:
    {
        type:
        [{
            name:String,
            permissions:
            [{
                type:String,
                enum:['view','add','edit','delete','admin','status']
            }]
        }],
        default:[]
  },
    createdBy:{type:String},
    status:{type:Number,required:true}
},{timestamps:true})

const adminRoleModel = mongoose.model("tbl_role_admin",adminRoleSchema);
export default adminRoleModel;