import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import  {User } from "../models/user/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

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

  const existedUser = await User.findOne({
    $or: [{ phoneNumber }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or Phone Number already exists");
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
    throw new ApiError(400, "Enter email id and Phone Number to login");
  }

  const user = await User.findOne({
    $or: [{ phoneNumber }, { email }]
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const passwordCheck = await user.isPasswordCorrect(password);

  if (!passwordCheck) {
    throw new ApiError(401, "Invalid user credentials");
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

export { 
  registerUser, 
  loginUser,
  logoutUser
};