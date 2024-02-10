import mongoose, { Schema, model } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";



const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowersace: true,
        trim: true,
        index: true//to create a searchable field for optimize.
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowersace: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,//Cloudinary URL
        required: true,
    },
    coverImage: {
        type: String,//Cloudinary URL
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    refreshToken: {
        type: String
    }

}, { timestamps: true })


UserSchema.pre("save", async function (next) {
    // if(this.isModified("password")){
    //     this.password = bcrypt.hash(this.password, 10)
    //     next()
    // }

    // alternative Code with not    

    if (!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password, 10)
    next()


    //brcypt 

    UserSchema.methods.isPasswordCorrect = async function (password) {
        return await bcrypt.compare(password, this.password)//it returns true and false
        //user always send the data in the string not in en crypted form and compare the encrypted form.

        //JWT is bearer token. if you got the tken then you get data. 

    }
    //we want only change when use password field when password field changes
})
/**
 * pre is hook with functions are
 * validate
 * save
 * remove
 * deleteOne
 * updateOne
 * init is synchoronous
 */

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}
UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}
//both are JWT Tokens

export const User = model("User", UserSchema)//it is directly connected with mongo dataBase