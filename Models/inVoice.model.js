import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema
({
    companyName:{type:String,required:true},
    companyAddress:{type:String,required:true},
    companyCity:{type:String,required:true},
    companyState:{type:String,required:true},
    companyZip:{type:String,required:true},
    companyPostCode:{type:String,required:true},
    companyPhone:{type:String,required:true},
    companyEmail:{type:String,required:true},
    clientName:{type:String,required:true},
    shipName:{type:String,required:true},
    shipAddress:{type:String,required:true},
    shipPhone:{type:String,required:true},
    description:{type:String,required:true},
    qunatitiy:{type:String,required:true},
    unitPrice:{type:String,required:true},
    total:{type:String,required:true},
    subtotal:{type:String,required:true},
   discount:{type:String,required:true},
   taxRate:{type:String,required:true},
   totalTax:{type:String,required:true},
   logo:{type:String,required:true},
  balanceDue:{type:String,required:true}

},{timestamps:true})

const invoiceModel = mongoose.model("tbl_user_invoics",invoiceSchema);
export default invoiceModel;

