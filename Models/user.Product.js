import mongoose from "mongoose";

const prouctSchema = new mongoose.Schema
({
    jewelry:{type:String,required:true},
    watch:{type:String,required:true},
    shoes:{type:String,required:true},
    books:{type:String,required:true},
    cosmetics:{type:String,required:true},
    CraftLayer:{type:String,required:true},
    ArtGear:{type:String,required:true},
   createdBy:{type:String,required:true}
},{timestamps:true})

const productModel = mongoose.model("tbl_users_products",prouctSchema);
export default productModel;   

