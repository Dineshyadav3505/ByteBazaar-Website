import mongoose, { Schema } from "mongoose";

// User Schema
const userSchema = new Schema({
    fullName: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    phoneNumber: { 
        type: String,
        minlength: [10,"Phone number must be 10 digits"],
        maxlength: [10,"Phone number must be 10 digits"],
        required: true
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        default: "user"  
    },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);