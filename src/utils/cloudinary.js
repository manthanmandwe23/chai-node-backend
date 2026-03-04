import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import "dotenv/config"

 // Configuration.0
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEYS, 
        api_secret: process.env.CLOUDINARY_API_SECRETE // Click 'View API Keys' above to copy your API secret
    });
    
    // Takes file path from your server
// Uploads it to Cloudinary
    //to know more read uploads.md file in nodejs notes
const uploadOnCloudinary = async (localFilePath) =>
{
    try {
        if ( !localFilePath )
        {
            return null
        }
       
        const response = await cloudinary.uploader.upload( localFilePath, {
            //automatically decide the type weather it is image, vedio, pdf or what
            resource_type: "auto"
        } )
        console.log( "file uploaded successfully on cloudinary", response.url );
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        // fs.unlinkSync( localFilePath )//remove locally saved tempory file on our own server, since file upload operation got failed
        // return null
        if (fs.existsSync(localFilePath)) {
          fs.unlinkSync(localFilePath);
}
    }
}    

export {uploadOnCloudinary}