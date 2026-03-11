import { Router } from "express";
import { changeCurrentPassword, getCurrentUser, getUserChannelProfile, getUserWatchHistory, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar, updateUserCoverImage } from "../controllers/user_controller.js";
import { upload } from "../middlewares/multer_middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()
// here we created router aur create route for registerUser FUNC but where to call it aur import it we do it in app.js
//to read more read multer&skipMiddlewareFunction.md file from nodejs notes
//here uploads.fields from multer internally
//Multer provides different methods to handle different upload types
//to know about more upload types read uploadTypes.md from nodejs notes
router.route( "/register" ).post( upload.fields([
     {  // here we define name and said we will only accept the field with name = avatar so when we design the frontend it should also have same name 
        name: "avatar",
        //  number of files we will accecpt like number of avatar image we will accept
         maxCount: 1
    }, {
        name: "coverImage",
        maxCount:1
    }
]),
// (req, res) => {
//     console.log(req.files);
//     res.json({ message: "Multer worked" });
//   },
registerUser )

router.route("/login").post(loginUser)

router.route("/logout").post( verifyJwt,logoutUser)

router.route("/refresh-token").post(refreshAccessToken)

router.route("/change-password").post(verifyJwt, changeCurrentPassword)

router.route("/get-user").get(verifyJwt, getCurrentUser)

router.route("/update-account").patch(verifyJwt, updateAccountDetails)

router.route("/update-avatar").patch(verifyJwt, upload.single("avatar"), updateUserAvatar)

router.route("/update-coverImage").patch(verifyJwt, upload.single("coverImage"), updateUserCoverImage)

router.route("/c/:username").get(verifyJwt, getUserChannelProfile)

router.route("/history").get(verifyJwt, getUserWatchHistory)

export default router

// other options to use with path along with multer
// {
//   fieldname,
//   originalname,
//   encoding,
//   mimetype,
//   destination,
//   filename,
//   path,
//   size
// }