import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
//.use is use to usee middlwares and all type of configuration
app.use( cors( {
    origin: process.env.CORS_ORIGIN,
    credentials: true
    
} ) )
// we need to do below steps while setting up the project
// this line converts all raw text string coming from frontend into js ObjectReads raw request body
// Reads raw request body
// Checks header:
// Content-Type: application/json
//parsing means converting data from one format to another
// Parses JSON string
// Converts it into JavaScript object
// Stores result in:
// req.body
// whole description is in nodejs notes
app.use( express.json( { limit: "16kb" } ) )

app.use( express.urlencoded( { extended: true, limit: "16kb" } ) )
app.use( express.static( "public" ) )
app.use( cookieParser() )

//routes import 
import userRouter from "./routes/user_routes.js"
import videoRouter from "./routes/video_routes.js"
import commentRouter from "./routes/comment_router.js"
import likeRouter from "./routes/like_routes.js"
import tweetRouter from "./routes/tweet_routes.js"
//routes declaration 
app.use("/api/v1/users", userRouter)
app.use("/api/v1/video", videoRouter)
app.use("/api/v1/comment", commentRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/tweet", tweetRouter)

export { app }

// ok so basically we define routes in routes folder in any file like routes.js but for route to run we need to connect it to express app, therefore in app.js we used middleware app.use() which connect our declared routes to express app and forward the request to file where routes are declared am i right

//for more detail visit routes.md in nodejs notes



