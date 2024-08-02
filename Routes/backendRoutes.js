import express from "express";
const router = express.Router();
import adminRoutes from "../Admin/Routes/adminRoutes.js";
import userRoutes from "../frontend/Routes/userRoutes.js";


router.use("/admin",adminRoutes);
router.use("/user",userRoutes);

export default router;