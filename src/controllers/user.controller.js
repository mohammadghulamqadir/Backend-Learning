import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
    /*
     * get user detail from frontend
     * validation(For email and username) fro not empty
     * check if user already exists(by username or email)
     * check for images and avatar
     * upload them to cloudinary 
     * create user object - create entry in DB
     * remove password and refresh token field from response
     * check for user creation 
     * return response
    */
    const { fullName, email, username, password } = req.body
    console.log(`Email: ${email}`);
    console.log(`FullName: ${fullName}`);
    console.log(`Username: ${username}`);
    // if (fullname === "") {
    //     throw new ApiError(400, "Fullname is required.")
    // }
    if (
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw ApiError(400, "All feilds are required")
    }
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username Already Existed ")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path
    // console.log(req.files)
    // console.log(req.body)
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar File is required")
    }
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)
    // console.log(avatar);
    // console.log(coverImage);
    // if (!avatar) {
    //     throw new ApiError(400, "Avatar is required")
    // }

    const user = await User.create({
        fullName,
        avatar: avatar?.url || "",
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const CreatedUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!CreatedUser) {
        throw new ApiError(500, "Something went Wrong while registering the User")
    }

    return res.status(201).json(new ApiResponse(200, CreatedUser, "User registered Successfully"))
})

export { registerUser, }