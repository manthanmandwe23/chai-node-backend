import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../controllers/tweet_controller.js";

const router = Router()

router.route("/createTweet").post(verifyJwt, createTweet)
router.route("/getUserTweets").get(verifyJwt, getUserTweets)
router.route("/updateTweet").patch(verifyJwt, updateTweet)
router.route("/deleteTweet").delete(verifyJwt, deleteTweet)

export default router