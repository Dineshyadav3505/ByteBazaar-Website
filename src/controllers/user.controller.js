import mongoose from "mongoose";
import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"



const option = {
    httpOnly: true,
    secure:true
}

const registerUser = asyncHandler(async (req, res) => {

    const {fullName, password, email, phoneNumber} = req.body

    if([password, email, phoneNumber].some((field) => field?.trim() === "")) {
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

    if(!createdUser){
        throw new ApiError(500, "User not created")
    }

    return res
    .status(201)
    .json(
        new ApiResponse(201, createdUser, "User created successfully")
    );


});

const loginUser = asyncHandler(async (req , res)=>{
    const { email, username, password } = req.body;
    
    if(!(username || email)){
      throw new ApiError(400,"enter email id and username")
    }
    
    const user = await User.findOne({
      $or: [ {username} , {email} ]
    })
  
    if(!user){
      throw new ApiError(404, " user does not exist")
    }
  
    const passwordcheck = await user.matchPassword(password)
  
    if(!passwordcheck){
      throw new ApiError(401,"Invalid user credentials")
    }
  
    const {accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)
  
    const LoggedInUser = await User.findById(user._id).select("-password -refreshToken" )  
    
    return res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .cookie("refreshToken", refreshToken, option)
    .json(
      new ApiResponse(
        200,
        {
          user : LoggedInUser, accessToken, refreshToken
        },
        "User logged In Successfully"
      )
    )
})

export {
    registerUser,
    loginUser
}