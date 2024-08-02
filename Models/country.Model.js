import mongoose from "mongoose";
const countrySchema = new mongoose.Schema
({
    id:{type:Number,required:true},
    name:{type:String,required:true},
    iso3:{type:String,required:true},
    iso2:{type:String,required:true},
    numeric_code:{type:String,required:true},
    capital:{type:String,required:true},
    currency:{type:String,required:true},
    region_id:{type:String,required:true},
    nationality:{type:String,required:true},
    timezones:
    {
        type:
        [{
            zoneName:{type:String,required:true},
            gmtOffset:{type:Number,required:true},
            gmtOffsetName:{type:String,required:true}, 
            abbreviation:{type:String,required:true},
            tzName:{type:String,required:true},
        }]
    },
    emoji:{type:String,required:true},
    emojiU:{type:String,required:true}
})

const countryModel = mongoose.model("tbl_countries",countrySchema);
export default countryModel;