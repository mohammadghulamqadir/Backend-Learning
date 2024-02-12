import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/temp')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
// if (!storage) {
//     console.log("File is not exist");
// }

export const upload = multer({
    storage//it is middleware
})

