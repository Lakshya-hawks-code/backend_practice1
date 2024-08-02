import express from "express";
const router = express.Router();
import * as userController from "../Controller/userController.js";
import * as productController from "../Controller/user.Product.js";
import * as passengerController from "../Controller/user.Passenger.js";
import {verifyToken} from "../../Middleware/frontendMiddleWare.js"

// User Details
router.post("/create-user",userController.createUser);
router.post("/login-user",userController.loginUser);

router.post("/get-users",verifyToken,userController.getallUser);
router.post("/edit-user",verifyToken,userController.editUser);
router.post("/delete-user",verifyToken,userController.deteUser)
router.post("/forgot-password",verifyToken,userController.forgotPassword);
router.post("/reset-password",verifyToken,userController.resetPassword);
router.post("/change-password",verifyToken,userController.changePassword);
router.post("/logout",verifyToken,userController.logout);

// User Product
router.post("/create-product",verifyToken,productController.createProduct);
router.post("/get-product",verifyToken,productController.getallProduct);
router.post("/view-product",verifyToken,productController.singleProduct);
router.post("/edit-product",verifyToken,productController.editProduct);
router.post("/delete-product",verifyToken,productController.deleteProduct);

// User Passenger
router.post("/create-passenger",verifyToken,passengerController.createPass);
router.post("/get-passenger",verifyToken,passengerController.getPass);

// Invoice User
router.post("/create-invoice",verifyToken,passengerController.createInvoice);
router.post("/get-invoice",verifyToken,passengerController.getInvoice);








export default router;