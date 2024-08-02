import express from "express";
const router = express.Router();
import * as adminController from "../Controller/adminController.js"
import * as adminRoleController from "../Controller/adminRoleController.js";
import * as settingController from "../Controller/settingControler.js";
import * as commonController from "../Controller/commonController.js";
import {verifyToken} from "../../Middleware/adminMiddleWare.js";
import upload from "../../config/Multer.js";

//  User Details
router.post("/create-user",adminController.createUser);
router.post("/login-user",adminController.loginUser);
router.post("/get-users",verifyToken,adminController.getallUser);
router.post("/view-user",verifyToken,adminController.singleUser);
router.post("/edit-users",verifyToken,adminController.editUser);
router.post("/status-update",verifyToken,adminController.statusUpdate);
router.post("/forgot-password",verifyToken,adminController.forgotPassword);
router.post("/reset-password",verifyToken,adminController.resetPassword);
router.post("/change-password",verifyToken,adminController.changePassword);
router.post("/logout",verifyToken,adminController.logout);
router.post("/upload-image",verifyToken,upload.single("image"),adminController.editAdminImage);

// User Roles  
router.post("/create-role",verifyToken,adminRoleController.createRole);
router.post("/get-role",verifyToken,adminRoleController.getrole);
router.post("/edit-role",verifyToken,adminRoleController.editRole);
router.post("/delete-role",verifyToken,adminRoleController.deleteRole);
router.post("/get-role-details",verifyToken,adminRoleController.getroledetails);

// User Setting
router.post("/create-setting",verifyToken,settingController.createSetting);
router.post("/get-setting",verifyToken,settingController.getAllSetting);


// Common Fields

router.post("/create-country",verifyToken,commonController.createCountry);
router.post("/get-country",verifyToken,commonController.getCountry);
router.post("/create-state",verifyToken,commonController.createStates);



export default router;  