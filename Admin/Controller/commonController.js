import countryModel from "../../Models/country.Model.js";
import stateModel from "../../Models/state.Model.js";
import {countrySchema,stateSchema} from "../Controller/Validation/adminValidation.js";

export const createCountry = async(req,res) =>
{
    const request = req.body;
    try {
         await countrySchema.validateAsync(request);
         const country = await countryModel(request);
         await country.save();
        return res.json
         ({
            code:200,
            data:country,
            message:"Country Find Successfully",
         })
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        }); 
    }
}


export const getCountry = async(req,res) =>
{
    try {
        const country = await countryModel.find({},{id:1,name:1,numeric_code:1,emoji:1});
       return res.json
        ({
            code:200,
            data:country,
            message:"Country Find Successfully"
        })
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        }); 
    }
}



export const createStates = async(req,res) =>
{
    const request = req.body;
    try {
        await stateSchema.validateAsync(request);
        const countryId = request?.countryId;
        const country = await countryModel.findById({_id:countryId});
        console.log(country);
        if(!country)
        {
            res.json({status:400,message:"Country Id Not Found"})
        }
        const state = new stateModel(request);
        if(state)
        {
            await state.save();       
            res.json
            ({
                status:200,
                code:state,
                message:"Country Find Successfully"
            })
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
                return res.json({
                    code: 400,
                    message: error.message
                }); 
    }
}

