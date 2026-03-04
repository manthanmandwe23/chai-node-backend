// here we used or called .env because we want to run .env file with file which run as soon as project runs so that all the code from project using variables from .env will get their values
import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config( {
    path: "./.env"
})

const port = process.env.PORT

connectDB()
    .then( () =>
     {  // to handle express error 
        app.on( "error", (error) =>
        {
        console.log("error: ", error);
        throw error
        } )
        
        app.listen( port || 8001, () =>
        {
            console.log(`server is running on port ${port}`);
            
        })
})
    .catch( (error) =>
    {
    console.log("Mongodb connection failed !!!!", error);
    
})

// this is 1 way to connect mongodb
/*    
const app = express()
( async () =>
{
    try {
        await mongoose.connect( `${ process.env.MONGO_URI }/${ DB_NAME }` )
        //we write below code "If any error occurs in the Express server, catch it and show it"
        // this catches Mainly server - related errors, like: 
        // Port already in use app.listen(4000) If port 4000 is already used, error occurs: Error: listen EADDRINUSE: address already in use
        //     .on() is used to listen for events.
        //     "error" This is the event name.
        //    It means: When an error event occurs, execute this function.
        app.on( "error", (error) =>
        {
            console.log("error: ", error);
            throw error
        } )
        
        app.listen( process.env.PORT, () =>
        {
            console.log(`app is listening on port ${process.env.PORT}`);
            
        })
    } catch (error) {
        console.error( "Error: ", error )
        throw error
    }
})()
*/