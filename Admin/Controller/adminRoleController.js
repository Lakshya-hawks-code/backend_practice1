import adminRoleModel from "../../Models/adminRoleModels.js";
import adminModel from "../../Models/admin.Model.js";
import {createRoleSchema,editRoleSchema,deleteRoleSchema} from "../Controller/Validation/adminValidation.js";

export const createRole = async(req,res) =>
{
    const request = req.body;
    try {
        await createRoleSchema.validateAsync(request);
        request.status = 1;
        const newRole = new adminRoleModel(request);
        const saveRole = await newRole.save();
        res.json
        ({
            status:200,
            data:saveRole,
            message:"Role Create Successfully"
        })
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        }); 
    }
}


// export const getrole = async(req,res) =>
// {
//     try {
//         const role = await adminRoleModel.find({},{name:1,modules:1,status:1,createdAt:1,updatedAt:1});
//         res.json
//         ({
//             status:200,
//             data:role,
//             message:"User Find Successfully",
//         })
//     } catch (error) {
//         console.error('An error occurred:', error.message);
//         return res.json({
//             code: 400,
//             message: error.message
//         }); 
//     }
// }


 export const getrole = async(req,res) =>
 {
    try {
        const user = await adminRoleModel.find({},{_id:0,createdAt:0,updatedAt:0,__v:0});
        await Promise.all
        (
            user.map(async(element)=>
            {
                if(element?.createdBy)
                {
                    let newdb = await adminModel.findOne({_id:element.createdBy},{name:1});
                    element.createdBy = newdb?.name || "-";
                }
                else
                {
                    element.createdBy = "___";
                }
            })
        )
    res.json
    ({
        status:200,
        data:user,
        message:"User Find Successfully"
    })
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        }); 
    }
 }

export const editRole = async(req,res) =>
{
    const request = req.body;
    try {
        await editRoleSchema.validateAsync(request);
        const user = await adminRoleModel.updateOne(USER_ID,{$set:request});
        res.json
        ({
            status:200,
            data:user,
            message:"Role Update Successfully"
        })
    } catch (error) {
        return res.json({
            code: 400,
            message: error.message
        }); 
    }
}



export const deleteRole = async(req,res) =>
{
    const request = req.body;
    try {
        await deleteRoleSchema.validateAsync(request)
        const userId = request.id;
        const admin = await adminRoleModel.findByIdAndDelete(userId);
        res.json
        ({
            status:200,
            data:admin,
            message:"Role Delete Successfully"
        })
    } catch (error) {
        return res.json({
            code: 400,
            message: error.message
        }); 
    }
}



export const getroledetails = async(req,res) =>
{
    try {
        const user = await adminModel.findOne({_id:USER_ID},{role:1});
        const adminrole = await adminRoleModel.findById({_id:user.role});
        const data = 
        {
            "Dashboard":
            {
                "permissions": adminrole.modules[0].permissions,
                "_id":"65cb61868c827a1200ff690b"
            },
            "Settings":
            {
                "permissions":adminrole.modules[1].permissions,
                "_id":"65cb61868c827a1200ff690c"
            },
            "Sub Admin":
            {
                "permissions":adminrole.modules[2].permissions,
                "_id":"65cb61868c827a1200ff690d"
            }
        }  
    res.json
    ({
        status:200,
        data:data,
        message:"User Login Successfully"
    })
    } catch (error) {
        return res.json({
            code: 400,
            message: error.message
        });
    }
}