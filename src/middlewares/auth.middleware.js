import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJwt = asyncHandler( async (req, res, next)=>{
   try {
     // firstly we accessed the access token
     const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
     
     if (!token) {
         throw new ApiError(401, "unauthorized request" )
     }
     
     // we decoded and verify it using jwt package with verify method and decoded token using screte key
     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE)
     
     //since we decode access token we added the _id (userid) to access token using that is we can find the user below we had done that
     const user = await User.findById(decodedToken._id).select(
         "-password -refreshToken"
     )
     if(!user){
         throw new ApiError(400, "invalid token")
     }
     
     // then we added this user object to req.user so we can use it in while writing controllers basically what we are doing we are adding this user data to req or request and giving it a name user so that we can access it insted of user we can give any name like req.manthan or any thing
     req.user = user
     next()
   } catch (error) {
      throw new ApiError(400, error?.message || "invalid access token")
   }
})