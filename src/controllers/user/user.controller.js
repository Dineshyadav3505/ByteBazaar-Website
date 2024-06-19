import mongoose from "mongoose";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  {User } from "../../models/user/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const option = {
  httpOnly: true,
  secure: true
};

const generateAccessToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();

    return { accessToken };

  } catch (error) {
    throw new ApiError(500, "Access Token generation failed");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, password, email, phoneNumber } = req.body;

  if ([password, email, phoneNumber].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }


  const userEmail = await User.findOne({ email });
  if (userEmail) {
    throw new ApiError(409, "Email already exists");
  }

  const userPhoneNumber = await User.findOne({ phoneNumber });
  if (userPhoneNumber) {
    throw new ApiError(409, "Phone number already exists");
  }

  if(phoneNumber.length !== 10){
    throw new ApiError(400, "Phone number must be 10 digits");
  }

  if(password.length < 8 || password.length > 16){
    throw new ApiError(400, "Password must be between 8 and 16 characters");
  }

  const user = await User.create({
    fullName,
    phoneNumber,
    email,
    password,
  });

  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(201, createdUser, "User created successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, phoneNumber, password } = req.body;

  if (!(phoneNumber || email)) {
    throw new ApiError(400, "Email already exists");
  }

  const user = await User.findOne({
    $or: [{ phoneNumber }, { email }]
  });

  if (!user) {
    throw new ApiError(404, "User not created");
  }

  const passwordCheck = await user.isPasswordCorrect(password);

  if (!passwordCheck) {
    throw new ApiError(401, "Incorrect password");
  }

  const {accessToken} = await generateAccessToken(user._id);

  const loggedUser = await User.findById(user._id).select("-password");

  console.log("User logged In Successfully");
  return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedUser,
          accessToken
        },
        "User logged In Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  console.log("user")

  const user = await User.findById(req.user?._id).select("-password");
  console.log("User logged Out Successfully");
  return res
  .status(200)
  .clearCookie("accessToken", option)
  .json(new ApiResponse(200, {user}, "User logged Out"))

});  

const updateAccountDetails = asyncHandler(async (req, res) => {

  const { fullName, email, phoneNumber } = req.body;

  console.log(fullName, email, phoneNumber)

  if(!(fullName || email || phoneNumber)){
    throw new ApiError(400, "Enter the fields to update");
  }

  const user = await User.findByIdAndUpdate(req.user?._id,
    {
      $set:{
        fullName,
        email,
        phoneNumber
      }
    },
    {new: true}
  ).select("-password");
  
  return res
    .status(200)
    .json(
      new ApiResponse(200, user, "User details updated successfully")
    )

});

const getCurrentUser = asyncHandler(async(req, res) => {
  return res
  .status(200)
  .json(new ApiResponse(
      200,
      req.user,
      "User fetched successfully"
  ))
})

const deleteUser = asyncHandler(async(req, res) => {
  const user = await User.findByIdAndDelete(req.user?._id).select("-password");
  return res
  .status(200)
  .clearCookie("accessToken", option)
  .json(new ApiResponse(200, user, "User deleted successfully"))
});
export { 
  registerUser, 
  loginUser,
  logoutUser,
  updateAccountDetails,
  getCurrentUser,
  deleteUser

};