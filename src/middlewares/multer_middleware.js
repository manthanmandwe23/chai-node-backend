import multer, { diskStorage } from "multer"
import path from "path"
import fs from "fs"

//Instead of multer we can also use express-fileupload

// const uploadPath = path.join(process.cwd(), "Public/temp");

// if (!fs.existsSync(uploadPath)) {
//   fs.mkdirSync(uploadPath, { recursive: true });
// }
// here we use multer because express cannot handle the fileupload therefore we use multer
// First Multer stores file temporarily on our server
// Then we upload that file to Cloudinary
// here we are storing file in diskStorage and specifing the path './Public/temp'
// to readmore visit multer&skipMiddlewareFunction.md file from nodejs notes folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Public/temp")
    },
    //then we are deciding filename here we are keeping original name given by user
    filename: function ( req, file, cb )
    {
    //   below code line is the way to store filename here we will not use it we will keep file name simple
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        //original name means name given by user 
     cb(null, file.originalname)
        
  }
}) 

// here we are making upload a middleware
export const upload = multer( {storage} )