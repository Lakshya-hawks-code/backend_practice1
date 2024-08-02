import userModel from "../../Models/user.Model.js";
import adminModel from "../../Models/admin.Model.js";
import adminRoleModel from "../../Models/adminRoleModels.js";
import { createUserSchema, loginUserSchema, editUserSchema, forgotPasswordSchema, resetPasswordSchema, changePasswordSchema } from "../Controller/Validation/userValidation.js";
import { randomString, isEmailValid, generatePassword, generateToken, verifyJWTToken } from "../../Utlis/utils.js";
import nodemailer from 'nodemailer';
import path from "path";
import exceljs from "exceljs";
import fs from "fs"
import xlsx from "xlsx";
import XLSX from "xlsx";
import _ from "underscore";



export const createUser = async (req, res) => {
    const request = req.body;
    try {
      await createUserSchema.validateAsync(request);
      const emailaddress = request?.email?.toLowerCase();
      if (!isEmailValid(emailaddress)) {
        throw new Error("Invalid email address format");
      }
      const user = await userModel.findOne(
        { email: emailaddress }, 
        { email: 1, password: 1, password_salt: 1 }
      );
      if (!user) {
        const password_salt = await randomString();
        const hashPassword = await generatePassword(request?.password, password_salt);
        request.password = hashPassword;
        request.password_salt = password_salt;
        const newUser = new userModel(request);
        await newUser.save();
        res.json({ status: 200, message: "User registered successfully" });
      } else {
        res.json({ status: 400, message: "User already registered" });
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
      return res.json({
        code: 400,
        message: error.message,
      });
    }
  };


export const loginUser = async(req,res) =>
{
    let request = req.body;

    try {
        await loginUserSchema.validateAsync(request);
        let emailaddress = request?.email?.toLowerCase();
        const otp = Math.floor(Math.random() * (999999 - 10 + 1)) + 10;
        if (isEmailValid(emailaddress)) {
            let checkUserDetails = await userModel.findOne({ email: emailaddress }, { email: 1, password_salt: 1, password: 1, twofactorauth: 1 });
            console.log(checkUserDetails, 'checkUserDetails');
            if (!checkUserDetails) { throw new Error('Email does not exist'); }
            let passwordSting = await generatePassword(request?.password?.toString(), checkUserDetails?.password_salt);
            if (passwordSting != checkUserDetails?.password) { throw new Error('invalid Password '); }
            const loginToken = generateToken({ id: checkUserDetails._id?.toString(), email: checkUserDetails.email });
            await userModel.updateOne({ _id: checkUserDetails._id }, { access_token: loginToken, last_login: new Date().toISOString(), });
            return res.json({
                code: 200,
                data: { access_tokens: loginToken, role: "Admin" },
                message: "Account login successfuly."
            })

        } else {
            //  EMAIL FORMAT Invalid
            return res.json({
                code: 400,
                message: "Invalid email address!"
            })
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        })

    }
}



// EXCEL GENERATING CODE USING XlSX

export const getallUser = async (req, res) => {
    try {
        let data = await userModel.find();
        let workbook = xlsx.utils.book_new();
        if (data?.length) {
            let sheetRow = 2;
            let replenishWorkSheet = xlsx.utils.aoa_to_sheet([], { cellStyles: true });
            xlsx.utils.book_append_sheet(workbook, replenishWorkSheet);
            let table_columns = ["Name", "Email", "Phone", "Address", "Country", "State", "City"];
            xlsx.utils.sheet_add_aoa(replenishWorkSheet, [table_columns], { origin: 'A1' });

            for (const element of data) {
                let xlsxSetdata = {
                    'Name': element?.name,
                    'Email': element?.email,
                    'Phone': element?.phone,
                    'Address': element?.address,
                    'Country': element?.country,
                    'State': element?.state,
                    'City': element?.city
                };
                xlsx.utils.sheet_add_aoa(replenishWorkSheet, [Object.values(xlsxSetdata)], { origin: `A${sheetRow}` });
                sheetRow++;
            }

            // Auto-fit column widths
            let totalSheetrange = xlsx.utils.decode_range(replenishWorkSheet['!ref']);
            let col_length = [];
            for (let R1 = totalSheetrange.s.r; R1 <= totalSheetrange.e.r; ++R1) {
                for (let C1 = totalSheetrange.s.c; C1 <= totalSheetrange.e.c; ++C1) {
                    col_length.push({ wch: 21 });
                }
            }
            replenishWorkSheet['!cols'] = col_length;

            // Write the workbook to a file
            let fileName = `public/customers/CustomersListExport`;
            xlsx.writeFile(workbook, `${fileName}.xlsx`);

            // Response
            let filexlsx = `${fileName}.xlsx`;
            if (filexlsx) {
                return res.json({ code: 200, message: "Successfully exported customer xlsx sheet" });
            } else {
                return res.status(400).json({ code: 400, message: "Failed to export customer xlsx sheet" });
            }
        } else {
            return res.status(404).json({ code: 404, message: "No user data found" });
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.status(500).json({ code: 500, message: error.message });
    }
}

// JOIN THREE TABLE CODE 
//   export const getallUser = async(req,res) =>
//   {
//      try {
//         const user = await userModel.findOne({_id:USER_ID},{admin:1});
//         const adminuser = await adminModel.findById({_id:user.admin},{role:1});
//         const adminuserRole = await adminRoleModel.findById({_id:adminuser.role},{name:1})
//         res.json({status:200,data:adminuserRole,message:"User Find successfully"})
//      } catch (error) {
//         console.error('An error occurred:', error.message);
//         return res.json({
//             code: 400,
//             message: error.message
//         })
//      }
//   }

export const editUser = async (req, res) => {
    const request = req.body;
    try {
        await editUserSchema.validateAsync(request);
        let user = await userModel.updateOne(USER_ID, { $set: request });
        if (user) {
            res.json({ status: 200, message: "Update Data Sucessfully" })
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        })
    }
}


export const deteUser = async (req, res) => {
    try {
        const user = await userModel.deleteOne(USER_ID);
        if (user) {
            res.json({ status: 200, message: "User Delete Successfully" });
        }
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        })
    }
}

// Email Send Using Nodemailer

const transporter = nodemailer.createTransport
    ({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'lakshyasharmahawkscode@gmail.com',
            pass: 'boafmrxbmsecefdn',
        },
    })

export const forgotPassword = async (req, res) => {
    const request = req.body;
    try {
        await forgotPasswordSchema.validateAsync(request);
        const { email } = request;
        let user = await userModel.findOne({ email: email }, { email: 1, password: 1, password_salt: 1 });
        if (!user) {
            res.json({ status: 400, message: "User Not Found" });
        }
        const resetToken = generateToken({ id: user?.id, type: "ForgotPassword" });
        const resetLink = `http://localhost:5000/api/v1/user/forgot-password/${resetToken}`
        const emailOption =
        {
            from: "lakshyasharmahawkscode@gmail.com",
            to: user.email,
            subject: "Password Reset",
            html: `Hi, please follow this link to reset your password. This link is valid for 10 minutes: <a href='${resetLink}'>Click Here</a>`
        }
        await transporter.sendMail(emailOption);
        res.json({
            status: 200,
            data: resetLink,
            message: "Forgot Password Successfully"
        })
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        })
    }
}


export const resetPassword = async (req, res) => {
    const request = req.body;
    try {
        await resetPasswordSchema.validateAsync(request);
        const { resetToken, password } = request;
        let user = await verifyJWTToken(resetToken);
        console.log(user);
        if (!user) {
            res.json({ status: 400, message: "Invalid Url Please again letter !" });
        }
        if (user && user.type === "ForgotPassword") {
            let userdata = await userModel.findById(user?.id, {});
            if (!userdata) {
                res.json({ status: 400, message: "User Not Found" });
            }
            const password_salt = await randomString();
            const hashPassword = await generatePassword(password, password_salt);
            let result = await userModel.findByIdAndUpdate(user?.id, { password_salt: password_salt, password: hashPassword });
            res.json({
                status: 200,
                message: "Reset Password Successfully"
            })
        }
    } catch (error) {
        return res.json({
            code: 400,
            message: error.message
        })
    }
}


export const changePassword = async (req, res) => {
    const request = req.body;

    try {
        await changePasswordSchema.validateAsync(request);
        const { oldPassword, newPassword } = request;
        const user = await userModel.findOne(USER_ID, { password_salt: 1, password: 1 });

        console.log(user);

        if (!user) {
            return res.json({ status: 400, message: "User not found" });
        }

        const hashPassword = await generatePassword(oldPassword, user.password_salt);

        if (hashPassword !== user.password) {
            return res.json({ status: 400, message: "Incorrect Current Password" });
        }

        const newHashPassword = await generatePassword(newPassword, user.password_salt);

        user.password = newHashPassword;
        await user.save();

        return res.json({ status: 200, message: "Password Change Successfully" });
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        });
    }
};


export const logout = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const user = await verifyJWTToken(token);
        console.log(user);
        if (!user) {
            res.json({ status: 200, message: "User not found" });
        }
        const data = await userModel.updateOne({ _id: user?.id }, { $unset: { access_token: 1 } });
        console.log(data);
        res.json
            ({
                status: 200,
                message: "User Logout Successfully"
            })
    } catch (error) {
        console.error('An error occurred:', error.message);
        return res.json({
            code: 400,
            message: error.message
        });
    }
}

