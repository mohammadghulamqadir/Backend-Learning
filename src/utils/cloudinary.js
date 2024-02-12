import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return "File is not found"
        //upload the file on the cloudinary 
        await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })//file has been uploaded Successfully
        // console.log("File has been Uploaded", response.url);
        fs.unlink(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath)//remove the locally saved temp file as the upload operation got failed.
        return null
    }
}

// cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//     { public_id: "olympic_flag" },
//     function (error, result) { console.log(result); });

export { uploadOnCloudinary }