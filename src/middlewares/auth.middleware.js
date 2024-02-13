//check the user existed or not

import JWT from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if (!token) {
            new ApiError(401, "Unauthorized Request")
        }

        const decodeToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const user = await User.findById(decodeToken?._id).select("-password -refreshToken")

        if (!user) {
            //ToDo: 
            throw new ApiError(401, "invalid Access Token")
        }

        req.user = user;
        next()//middleware majority used in conrtoller
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})