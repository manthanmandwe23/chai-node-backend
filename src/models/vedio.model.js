// if we search mongoose and visit the side and go to middleware section we can see we can write number of middleware in mongoose and we can inject our own plugins, as on on site we can see plugins like pre {do something before data get saved}, post {do something after data get saved}
// for more detail about mongooseAggregatePaginate read Plugins&AggregationPipeline.md file from nodejs notes

//always remeber jwt is our bearer token 
import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const vedioSchema = new Schema( {
    vedioFile: {
        type: String, //cloudinary url
        required: true
    },
    thumbnail: {
        type: String, //cloudinary url
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String, 
        required: true
    },
    duration: {
        type: Number, //from cloudinary
        required: true
    },
    views: {
        type: Number,
        default: 0, // default views will be 0
    },
    // is publically available or not
    isPublished: {
        type: Boolean,
        default: true
    },
    Owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true } )
//videoSchema.plugin(mongooseAggregatePaginate) adds pagination functionality to your schema so you can use aggregatePaginate() on aggregation queries to get paginated results (with page, limit, totalDocs, etc.).
vedioSchema.plugin(mongooseAggregatePaginate)
// A plugin in Mongoose is just a reusable function that adds extra features to your schema.
// for more detail about plugin read plugins.md file from nodejs notes
export const Video = mongoose.Model("Video", vedioSchema)