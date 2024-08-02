import Joi from "joi";
import userModel from "../../Models/user.Model.js";
import productModel from "../../Models/user.Product.js";
import {createdProductSchema} from "../Controller/Validation/userValidation.js";


export const createProduct = async(req,res) =>
{
    const request = req.body;
    try {
       await createdProductSchema.validateAsync(request);
       const user = new productModel(request);
       if(user)
       {
        await user.save();
        res.json({status:200,message:"User Create Successfully"});
       }
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        })
    }
}

export const getallProduct = async(req,res) =>
{
    try {
        const {jewelry,watch} = req.body;
          const filter = {};
          if(jewelry) filter.jewelry = {$regex:new RegExp(jewelry,'i')}
          if(watch) filter.watch = {$regex:new RegExp(watch,'i')}
        const user = await productModel.find(filter, {__v: 0, createdAt: 0, updatedAt: 0 }).lean();
        await Promise.all
        (
            user.map(async(element)=>  
            {
                if(element?.createdBy)
                {
                    const data = await userModel.findOne({_id:element?.createdBy},{name:1});
                    element.createdBy = data?.name || "-"; 
                }
                else
                {
                    element.createdBy = "-"
                }
            })
        )
        res.json({   
            status:200,
            data:user,
            message:"User Find Successfully"});
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        })
    }
}

const singleUserValidation = Joi.object
({
     id:Joi.string().required()
})

export const singleProduct = async(req,res) =>
{
    const request = req.body;
    try {
        await singleUserValidation.validateAsync(request);
      const userId = request.id;
      const user = await productModel.findById(userId,{jewelry:1, watch:1, shoes:1, books:1, cosmetics:1, CraftLayer:1, ArtGear:1 });
      if(user)
      {
        res.json({
            status:200,
            data:user,
            message:"Users find Successfully"});
      }
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        })
    }
}

const editProductValidation = Joi.object
({
     id:Joi.string().required(),
     jewelry:Joi.string().required(),
     watch:Joi.string().required(),
     shoes:Joi.string().required(),
     books:Joi.string().required(),
     cosmetics:Joi.string().required(),
     CraftLayer:Joi.string().required(),
     ArtGear:Joi.string().required(),
})

export const editProduct = async(req,res) =>
{
    const request = req.body;
    try {
        await editProductValidation.validateAsync(request);
        const user = await productModel.updateOne(USER_ID,{$set:request});
        console.log(user);
        res.json
        ({  
            status:200,
            data:user,
            message:"Product Update Successfully"
        })
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        })
    }
}


export const deleteProduct = async(req,res) =>
{
    const request = req.body;
    try {
        const user = await productModel.deleteOne(USER_ID);
        if(user)
        {
            res.json({status:200,message:"User Delete Successfully"});
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        })
    }
}


