import adminModel from "../../Models/admin.Model.js";
import {
  createSchema,
  loginSchema,
  editSchema,
  forgotPassSchema,
  resetPasswordSchema,
  changePasswordSchema,
  statusUpdateSchema
} from "../Controller/Validation/adminValidation.js";
import {
  randomString,
  isEmailValid,
  generatePassword,
  generateToken,
  verifyJWTToken,
} from "../../Utlis/utils.js";
import {
  generateAvatar
} from "../../Utlis/generateAvatar.js";


export const createUser = async (req, res) => {
  const request = req.body;
  try {
    await createSchema.validateAsync(request);
    const emailaddress = request ?.email ?.toLowerCase();
    if (!isEmailValid(emailaddress)) {
      throw new Error("Invalid email address format");
    }
    const user = await adminModel.findOne({
      email: emailaddress
    }, {
      email: 1,
      password: 1,
      password_salt: 1
    });
    if (!user) {
      const password_salt = await randomString();
      const hashPassword = await generatePassword(request ?.password, password_salt);
      request.password = hashPassword;
      request.password_salt = password_salt;
      request.createdby = USER_ID;
      if(!request?.image)
      {
        const newProfileImage = await generateAvatar(request?.name);
        console.log(newProfileImage,"newProfileImage");
        request.image = newProfileImage;
      }
      const newUser = new adminModel(request);
      await newUser.save();
      res.json({
        status: 200,
        message: "User registered successfully"
      });
    } else {
      res.json({
        status: 400,
        message: "User already registered"
      });
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
    return res.json({
      code: 400,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  let request = req.body;

  try {
    await loginSchema.validateAsync(request);
    let emailaddress = request ?.email ?.toLowerCase();
    const otp = Math.floor(Math.random() * (999999 - 10 + 1)) + 10;
    if (isEmailValid(emailaddress)) {
      let checkUserDetails = await adminModel.findOne({
        email: emailaddress
      }, {
        email: 1,
        password_salt: 1,
        password: 1,
        twofactorauth: 1
      });
      console.log(checkUserDetails, "CheckUserDetails");
      if (!checkUserDetails) {
        throw new Error("Email does not exist");
      }
      let passwordSting = await generatePassword(
        request ?.password ?.toString(),
        checkUserDetails ?.password_salt
      );
      if (passwordSting != checkUserDetails ?.password) {
        throw new Error("invalid Password ");
      }
      const loginToken = generateToken({
        id: checkUserDetails._id ?.toString(),
        email: checkUserDetails.email,
      });
      await adminModel.updateOne({
        _id: checkUserDetails._id
      }, {
        access_token: loginToken,
        last_login: new Date().toISOString()
      });
      return res.json({
        code: 200,
        data: {
          access_tokens: loginToken,
          role: "Admin"
        },
        message: "Account login successfuly.",
      });
    } else {
      //  EMAIL FORMAT Invalid
      return res.json({
        code: 400,
        message: "Invalid email address!",
      });
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
    return res.json({
      code: 400,
      message: error.message,
    });
  }
};

export const getallUser = async (req, res) => {
  try {
    const {
      country,
      state,
      city
    } = req.body;
    const filter = {};
    if (country) filter.country = {
      $regex: new RegExp(country, "i")
    };
    if (state) filter.state = {
      $regex: new RegExp(state, "i")
    };
    if (city) filter.city = {
      $regex: new RegExp(city, "i")
    };

    const users = await adminModel.find(filter, {
      name: 1,
      email: 1,
      phone: 1,
      address: 1,
      country: 1,
      state: 1,
      city: 1,
    });

    res.json({
      status: 200,
      data: users,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    console.error("An error occurred:", error.message);
    return res.json({
      code: 400,
      message: error.message,
    });
  }
};

export const singleUser = async (req, res) => {
  try {
    let user = await adminModel.findOne({
      _id: USER_ID
    }, {
      name: 1,
      email: 1,
      phone: 1,
      address: 1,
      country: 1,
      state: 1,
      city: 1
    });
    res.json({
      status: 200,
      data: user,
      message: "User Get Successfully"
    });
  } catch (error) {
    return res.json({
      code: 400,
      message: error.message,
    });
  }
};

export const editUser = async (req, res) => {
  const request = req.body;
  try {
    await editSchema.validateAsync(request);
    let user = await adminModel.updateOne({
      _id: USER_ID
    }, {
      $set: request
    });
    if (user) res.json({
      status: 400,
      message: "Update Data Successfully"
    });
  } catch (error) {
    return res.json({
      code: 400,
      message: error.message,
    });
  }
};

export const forgotPassword = async (req, res) => {
  const request = req.body;
  try {
    await forgotPassSchema.validateAsync(request);
    const {
      email
    } = request;
    let user = await adminModel.findOne({
      email: email
    });
    if (!user) {
      res.json({
        status: 200,
        message: "User not found"
      });
    }
    const resetToken = generateToken({
      id: user ?.id,
      type: "ForgotPassword"
    });  
    const resetUrl = `Hi please follow this link to reset your password. This link is valid till 10 minute from now. <a href ='http://localhost:5000/api/v1/admin/forgot-password/${resetToken}'>Click Here</>`;
    res.json({
      status: 200,
      data: resetUrl,
      message: "Forgot Password Successfully",
    });
  } catch (error) {
    return res.json({
      code: 400,
      message: error.message,
    });
  }
};

export const resetPassword = async (req, res) => {
  const request = req.body;
  try {
    await resetPasswordSchema.validateAsync(request);
    let {
      password,
      resetToken
    } = request;
    const user = await verifyJWTToken(resetToken);
    if (!user) {
      res.json({
        status: 400,
        message: "Incorrect Url Please again provide token",
      });  
    }
    if (user && user.type === "ForgotPassword") {
      const findUser = await adminModel.findById(user ?.id, {});
      if (!findUser) {
        res.json({ 
          status: 400,
          message: "User not found"
        });
      }
      let password_salt = await randomString();
      let hashPassword = await generatePassword(password, password_salt);
      const result = await adminModel.findByIdAndUpdate(user ?.id, {
        password_salt: password_salt,
        password: hashPassword,
      });
      res.json({
        status: 200,
        message: "Password Reset Successfully"
      });
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
    return res.json({
      code: 400,
      message: error.message,
    });
  }
};

export const changePassword = async (req, res) => {
  const request = req.body;

  try {
    await changePasswordSchema.validateAsync(request);
    const {
      oldPassword,
      newPassword
    } = request;
    const user = await adminModel.findOne(USER_ID, {
      password_salt: 1,
      password: 1,
    });

    console.log(user);

    if (!user) {
      return res.json({
        status: 400,
        message: "User not found"
      });
    }

    const hashPassword = await generatePassword(
      oldPassword,
      user.password_salt
    );

    if (hashPassword !== user.password) {
      return res.json({
        status: 400,
        message: "Incorrect Current Password"
      });
    }

    const newHashPassword = await generatePassword(
      newPassword,
      user.password_salt
    );

    user.password = newHashPassword;
    await user.save();

    return res.json({
      status: 200,
      message: "Password Change Successfully"
    });
  } catch (error) {
    console.error("An error occurred:", error.message);
    return res.json({
      code: 400,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const user = await verifyJWTToken(token);
    if (!user) {
      res.json({
        status: 200,
        message: "User not found"
      });
    }
    await adminModel.updateOne({
      _id: user ?.id
    }, {
      $unset: {
        access_token: 1
      }
    });
    res.json({
      status: 200,
      message: "User Logout Successfully",
    });
  } catch (error) {
    console.error("An error occurred:", error.message);
    return res.json({
      code: 400,
      message: error.message,
    });
  }
};

export const editAdminImage = async (req, res) => {
  try {
    if (!req.file) {
      res.json({
        status: 400,
        message: "Image Not Upload"
      });
    }
    const currentDomain = process.env.domain ?
      process.env.domain :
      req ?.hostname;
    const imagePath = `${currentDomain}/uploads/${req.file.filename}`;
    await adminModel.updateOne({
      _id: USER_ID
    }, {
      image: imagePath
    });
    res.json({
      status: 200,
      url: imagePath,
      message: "Image Upload Successfully",
    });
  } catch (error) {
    console.error("An error occurred:", error.message);
    return res.json({
      code: 400,
      message: error.message,
    });
  }
};



export const statusUpdate = async(req,res) =>
{
  const request = req.body;
  try {
    await statusUpdateSchema.validateAsync(request);
    // request.createdby = USER_ID;
    const filter = {_id:request.id};
    const updateData = {'$set':request};
    const userStatus = await adminModel.updateOne(filter,updateData);
    res.json
    ({
      status:200,
      data:userStatus,
      message:"User status update successfully",
    })
  } catch (error) {
    console.error("An error occurred:", error.message);
    return res.json({
      code: 400,
      message: error.message,
    });
  }
}