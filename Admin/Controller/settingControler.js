import { request } from "express";
import settingModel from "../../Models/Setting.Model.js";
import adminModel from "../../Models/admin.Model.js";
import Joi from "joi";
 
export const createSettingSchema = Joi.object
({
    option:Joi.string().required(),
    label:Joi.string().required(),
    optionValue:Joi.any().required(),
    createdBy:Joi.string().required()
})

export const createSetting = async(req,res) =>
{
  const request = req.body;
  try {
    await createSettingSchema.validateAsync(request);
    const setting = new settingModel(request);
     if(setting)
     {
        await setting.save();
        res.json
    ({
        status:200,
        data:setting,
        message:"Setting Create Successfully"
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


export const getAllSetting = async(req,res) =>
{
    try {
        const {option,label} = req.body;
        const filter = {};
        if(option) filter.option = {$regex: new RegExp(option, "i")}
        if(label) filter.label = {$regex: new RegExp(label, "i")}
        const setting = await settingModel.find(filter);
        await Promise.all
        (
            setting.map(async(element)=>
            {
                if(element?.createdBy)
                {
                    let newdb = await adminModel.findById({_id:element.createdBy},{name:1});
                    element.createdBy = newdb?.name || "-"
                }
                else
                {
                    element.createdBy = "___"
                }
            })
        )
        res.json
        ({
            status:200,
            data:setting,
            message:"Setting Find Successfully"
        })
    } catch (error) {
        console.error('An error occurred:', error.message);
    return res.json({
        code: 400,
        message: error.message
    });
    }
}



export const editSetting = async(req,res) =>
{
   try {
    const setting = await settingModel.updateOne({_id:USER_ID},{$set:request});
    res.json
    ({
        status:200,
        data:setting,
        message:"Setting Update Successfully"
    })
   } catch (error) {
    console.error('An error occurred:', error.message);
    return res.json({
        code: 400,
        message: error.message
    });
   }
} 