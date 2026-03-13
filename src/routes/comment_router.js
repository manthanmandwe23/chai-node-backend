import Router from "express"
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { addComment, deleteComment, getVideoComments, updateComment } from "../controllers/comment_cobntroller.js"

const router = Router()

router.route("/getVideoComments").get(verifyJwt, getVideoComments )
router.route("/add-Comment").post(verifyJwt, addComment)
router.route("/updateComment").patch(verifyJwt, updateComment)
router.route("/deleteComment").delete(verifyJwt, deleteComment)

export default router