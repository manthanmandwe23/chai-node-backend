import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import ApiError from "../utils/apiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

// for more details about aggregtion pipline read AggregationRules.md from nodejs notes

const createPlaylist = asyncHandler(async (req, res) => {
    //TODO: create playlist
    const {name, description} = req.body
    if (!(name && description)) {
        throw new ApiError(400, "Name And Description is Required")
    }

    const newPlaylist = await Playlist.create({
        name: name,
        description: description,
        owner: req.user?._id
    })

    if (!newPlaylist) {
        throw new ApiError(500, "Unable to create Playlist")
    }

    return res.status(201).json(
        new ApiResponse(201, newPlaylist, "playlist created successfully")
    )
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
    if (!userId) {
        throw new ApiError(400, "UserId is Required")
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new ApiError(400, "Invalid UserId");
    }

    const playlist = await Playlist.find({
        owner: userId
    })

    if (!playlist) {
        throw new ApiError(404, "Playlist Not Found")
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "Playlist fetched Successfully"
        )
    )
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    if (!playlistId) {
        throw new ApiError(400, "playlistId is Required")
    }
    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        throw new ApiError(400, "Invalid playlistId")
    }
    
    // so here we used .populate here .populate is replacement for $lookup because if we did not used .populate here we needed to run aggregation pipeline to join all video document and owner document but here .populate had done every thing here it is like shortcut  

    // to know more you must read populateMethod.md file from nodejs notes
    const playlist = await Playlist.findById(playlistId)
    //"video" is field name
    .populate("video")
    //here we are saying i dont want all fields from user document just give me username email
    .populate("owner", "username email")

    if (!playlist) {
        throw new ApiError(404, "Unable to Find Playlist")
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "Playlist Fetched successfully"
        )
    )
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    if (!playlistId) {
        throw new ApiError(400, "Playlist Id Is Required")
    }
    if (!videoId) {
        throw new ApiError(400, "Video Id Is Required")
    }
    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        throw new ApiError(400, "Invalid playlistId")
    }
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid videoId")
    }
    
    const playlist = await Playlist.findByIdAndUpdate(playlistId, {
        $addToSet:{
            video: videoId
        }
       },
       {
        new : true
       }
    )
    if (!playlist) {
        throw new ApiError(500, "Playlist not found")
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "video AddedTo playlist Successfully"
        )
    )
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    // TODO: remove video from playlist
    const {playlistId, videoId} = req.params
    if (!playlistId) {
        throw new ApiError(400, "Playlist Id Is Required")
    }
    if (!videoId) {
        throw new ApiError(400, "Video Id Is Required")
    }
    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        throw new ApiError(400, "Invalid playlistId")
    }
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
        throw new ApiError(400, "Invalid playlistId")
    }
    
    const playlist = await Playlist.findByIdAndUpdate(playlistId,{
        $pull:{
            video : videoId
        }
        },
        { new : true}
    )
    if (!playlist) {
        throw new ApiError(404, "Playlist Not Found")
    }
     
    return res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "video Removed from playlist Successfully"
        )
    )

})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    if (!playlistId) {
        throw new ApiError(400, "PlaylistId is Required")
    }
    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        throw new ApiError(400, "Invalid playlistId")
    }

    const playlist = await Playlist.findByIdAndDelete(playlistId)
    if (!playlist) {
        throw new ApiError(404, "Playlist Not Found")
    }

    return res.status(204).json(
        new ApiResponse(
            200,
            playlist,
            "Playlist deleted Successfully"
        )
    )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
    if (!playlistId) {
        throw new ApiError(400, "PlaylistId Required")
    }

    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
        throw new ApiError(400, "Invalid PlaylistId")
    }

    if (!(name || description)) {
        throw new ApiError(400, "Name Or Description is Required")
    }

    const updateDetails = {}
    if(name) updateDetails.name = name
    if(description) updateDetails.description = description

   
    // const playlist = await Playlist.findByIdAndUpdate(playlistId, {
    //      $set:{
         // here also if name provided it will update only name and if description is provided it will only update description so we can use both approch above and this
    //         ...(name && {name}),
    //         ...(description && {description})
    //      }
    //   },
    //   {new : true}
    // )

    const playlist= await Playlist.findByIdAndUpdate(playlistId, {
         $set: updateDetails
      },
      {new : true}
    )

    if (!playlist) {
        throw new ApiError(404, "Playlist Not fOUND")
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            playlist,
            "Playlist Updated Successfully"
        )
    )
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}