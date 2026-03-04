import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () =>
{
    try
    {
        //MONGOOSE gives us return object so we can store this connection in a variable and we can name it any thing
        // we have different database for production, development, testing therefore we do this connectionInstance.connection.host to check where we are connecting   
        const connectionInstance = await mongoose.connect( `${ process.env.MONGO_URI }/${ DB_NAME }` )
        console.log(`\n mongodb connected !! DB host: ${connectionInstance.connection.host}`);
        
        // console.log(connectionInstance);
        
    } catch (error) {
        console.log("Mongodb Connection error: ", error);
        process.exit(1)
    }
}

export default connectDB 