import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const UserSchema = new Schema( {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,//cloudanary url
        required: true
    },
    coverImage: {
        type: String,
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, "password is required"]
    },
    refreshToken: {
        type:String
    }
}, { timestamps: true } )

// here we are going to hash password their fore we are using pre hook which is a middleware why pre hook because we want to hash password before saving it to database

// 2 ways to write code to encrypt or hash password
// UserSchema.pre( "save", async function (next){
//     if (!this.isModified("password")) {
//         return next()
//     }
//     this.password =await bcrypt.hash( this.password, 10 )
//     next()
// })

// here we use pre() hook because we want to hash pasword before it could get save to database, used bcrypt.hash method to hash password used function(){} instead of ()=>{} arrow func because arrow func did not allow us to use this key word, and we want to hash pass when 1st time we are registering user and when we are modifing password therefore we used if statment where we check isModified means if this is a modification of password field then hash the password otherwise return next() means continue saving process

// to know more read bcryptHash.md file in  nodejs notes
// also here we are writing async func and async func always returns a promise so we should have used try catch to handle promise then why didnt we used it read trycatchpromise.md file in nodejs notes
UserSchema.pre( "save", async function (next){
    if (!this.isModified("password")) {
        return
    } 
    this.password = await bcrypt.hash( this.password, 10 )
} )

// now to check password user is inserting with the password saved in database we need to compare it so like we create middleware we can also create methods, so we can design custom methods how:
// we use userSchema or whatever schema name with methods property inside which we can add as many methods we want
// here we created custom instance method using Schema.methods and here we created async func which compare password entered by user with hashed password stored in db and bcrypt.compare() return boolean value true or false
// to know more read bcryptCompare.md file in nodejs notes
UserSchema.methods.isPasswordCorrect = async function ( password )
{
    //password = inserted by user , this.password = stored in database
    return await bcrypt.compare(password, this.password)
}

//this is the way to generate jwt token where we use jwt.sign() method where we need to pass payload or data which our token will store and need to pass token secrete and expiry

// for more info read jwtToken.md file inside nodejs notes
// to know working and difference  of access token and refresh token read Access&refreshToken.md file inside nodejs notes folder
UserSchema.methods.generateAccessToken = function () {
    return jwt.sign( {
        _id : this._id,
        username: this.username,
        email: this.email,
        fullName: this.fullName
    },
        process.env.ACCESS_TOKEN_SECRETE,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

 
UserSchema.methods.generateRefereshToken = function () {
    return jwt.sign( {
        _id : this._id
    },
        process.env.REFRESH_TOKEN_SECRETE,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", UserSchema)