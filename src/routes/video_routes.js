import Router from "express"
import { upload } from "../middlewares/multer_middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { deleteVideo, getVideoById, publishAVideo, togglePublishStatus, updateVideo } from "../controllers/vedio_controller.js"

const router = Router()

router.route("/upload-video").post(verifyJwt, upload.fields([
    {name: "videoFile"},{name: "thumbnail" }]),publishAVideo )

router.route("/updateVideoData").patch(upload.single("thumbnail"), updateVideo)

router.route("/get-video-byId").get(verifyJwt, getVideoById)

router.route("/deleteVedio").delete(verifyJwt, deleteVideo)

router.route("/togglePublishStatus").post(verifyJwt, togglePublishStatus)

export {router}