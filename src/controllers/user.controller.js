import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

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
    const { fullname, email, username, password } = req.body
    console.log(`Email: ${email}`);
    console.log(`Fullname: ${fullname}`);
    console.log(`Username: ${username}`);
    // if (fullname === "") {
    //     throw new ApiError(400, "Fullname is required.")
    // }
    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw ApiError(400, "All feilds are required")
    }
    const existedUser = User.findOne({
        $or: [{ username }, { email }]
    })
    if (existedUser) {
        throw new ApiError(409, "User with email or username Already Existed ")
    }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar File is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar is required")
    }

    User.create({
        fullname,
        avatar: avatar.url,
        // coverImage: 
    })

})

export { registerUser, }