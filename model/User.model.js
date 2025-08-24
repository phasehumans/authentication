import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema= new mongoose.Schema({
    name: String,
    password: String,
    email: String,
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String,
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },

}, {
    timestamps: true
})

// pre-save hook (middleware) : runs when password field is created or modified
userSchema.pre("save", async function (next) {
    if(this.isModified('password')){
        this.password= await bcrypt.hash(this.password, 10)  // 10 salt
        // hashing is compute intensive task so await needed
    }
    next()
})

const User= mongoose.model("User", userSchema)

export default User