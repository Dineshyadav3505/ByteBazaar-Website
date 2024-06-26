import mongoose from "mongoose";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import  { User } from "../../models/user/user.model.js";
import  Address from "../../models/user/userAddress.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Order from "../../models/order/order.model.js";

const option = {
  httpOnly: true,
  secure: true
};

const userAddress = asyncHandler(async (req, res) => {
  const { name, addressLine1, addressLine2, city, pincode, phoneNumber } = req.body;
  const user = req.user; // Assuming req.user is defined
  
  if (!user) {
    throw new ApiError(401, "Please login to add address");
  }
  
  if (![name, addressLine1, addressLine2, city, pincode, phoneNumber]){
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
    name,
    addressLine1,
    addressLine2,
    city,
    pincode,
    phoneNumber,
  });
  const id = (userAddress._id.toString())

  const addressId = (userAddress.id.toString());

  // Update the user's order with the new address
  await Order.updateMany({ userId: user._id }, { $set: { userAddress: addressId } });

  return res
    .status(201)
    .json(
      new ApiResponse(201, userAddress, "User address created successfully")
    );
});

const updateUserAddress = asyncHandler(async (req, res) => {
    const { addressLine1, addressLine2, city, pincode, phoneNumber } = req.body;
    const user = req.user; // Assuming req.user is defined
    const addressId = req.params.addressId; // Changed from req.params._id
  
    if (!user) {
      throw new ApiError(401, "Please login to update address");
    }
  
  
    if (![name, addressLine1, addressLine2, city, pincode, phoneNumber].some((field) => field)) {
      throw new ApiError(400, "All fields are required");
    }
  
    if (pincode.length !== 6) {
      throw new ApiError(400, "Invalid pincode");
    }
  
    if (phoneNumber.length !== 10) {
      throw new ApiError(400, "Invalid phone number");
    }
  
    const updatedAddress = await Address.findOneAndUpdate(
      { _id: addressId, user: user._id },
      { name,
        addressLine1, 
        addressLine2, 
        city, 
        pincode, 
        phoneNumber },
      { new: true }
    );
  
    if (!updatedAddress) {
      throw new ApiError(404, "Address not found");
    }
  
    return res
      .status(200)
      .json(
        new ApiResponse(200, updatedAddress, "User address updated successfully")
    );
});

const deleteUserAddress = asyncHandler(async(req, res) => {
    const address = await Address.findByIdAndDelete(req.params.addressId);
    return res
    .status(200)
    .clearCookie("accessToken", option)
    .json(new ApiResponse(200, address, "User address deleted successfully"))
});

const allUserAddress = asyncHandler(async (req, res) => {
    const user = req.user;
    const addresses = await Address.find({
      user: user._id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, addresses, "User addresses fetched successfully"));
});

export { 
    userAddress,
    updateUserAddress,
    deleteUserAddress,
    allUserAddress
};