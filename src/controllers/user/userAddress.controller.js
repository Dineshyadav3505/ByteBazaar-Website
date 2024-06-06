import mongoose from "mongoose";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  { User } from "../../models/user/user.model.js";
import  Address from "../../models/user/userAddress.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const option = {
  httpOnly: true,
  secure: true
};

const userAddress = asyncHandler(async (req, res) => {
    const { addressLine1, addressLine2, city, pincode, phoneNumber } = req.body;
    const user = req.user; // Assuming req.user is defined
  
    if (!user) {
      throw new ApiError(401, "Please login to add address");
    }
  
    // console.log(user);
    console.log(addressLine1, addressLine2, city, pincode, phoneNumber)
 
    if (![addressLine1, addressLine2, city, pincode, phoneNumber]){
      throw new ApiError(400, "All fields are required");
    }

    if(pincode.length !== 6){
      throw new ApiError(400, "Invalid pincode");
    }

    if(phoneNumber.length !== 10){
      throw new ApiError(400, "Invalid phone number");
    }
  
    const userAddress = await Address.create({
      user: user._id,
      addressLine1,
      addressLine2,
      city,
      pincode,
      phoneNumber,
    });
  
    return res
      .status(201)
      .json(
        new ApiResponse(201, userAddress, "User address created successfully")
      );
  });


export { 
    userAddress,

};