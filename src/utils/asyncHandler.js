// req → request object
// res → response object
// next → function to pass control to next middleware

// so in our project when ever we will write code we need to check if it got resolve or throwed error so to write trycatch or promises in every code we created a async wrapper a utility function where we handled all things and we done it using 2 ways using promise and using try catch
// next(err) sends error to Express error middleware.
// why we dont used async await in promises you can see it in nodejs notes file in promises&async.md 
const asyncHandler = ( fn ) =>
{
    return (req, res, next) =>
    {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err))
    }
}

export { asyncHandler }

// const asyncHandler = ( fn ) => async (req, res, next) =>
// {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status( error.code || 500 ).json( {
//             success: false,
//             message: error.message
//         })
//     }
// }

