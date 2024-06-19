import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
// User Schema
const userSchema = new Schema({
    fullName: { 
        type: String, 
        required: true
    },
    email: { 
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    phoneNumber: { 
        type: String,
        minlength: [10,"Phone number must be 10 digits"],
        maxlength: [10,"Phone number must be 10 digits"],
        required: true
    },
    password: { 
        type: String, 
        required: [true, "Password is required"],
    },
    role: { 
        type: String,         
        default: "user"  
    }
}, { timestamps: true });

// Bcrypt password hashing
userSchema.pre("save", async function(next) {
    try {
        if (!this.isModified("password")) return next();

        this.password = await bcrypt.hash(this.password, 10);
        return next();
    } catch (err) {
        return next(err);
    }
});

// Password verification
userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

// Access Token generation
userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        { 
            _id: this._id ,
            email: this.email,
            phoneNumber: this.phoneNumber,
            fullName: this.fullName
        }, 
        process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRE });
};

const User = mongoose.model("User", userSchema);

export {User};