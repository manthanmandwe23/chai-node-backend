// This is a custom response formatter class.
// It helps you send consistent API responses.
// Instead of manually writing JSON every time, you standardize it.

// we create this structure
// constructor( statusCode, data, message = "success" )
// to send this response
// new ApiResponse(200, users, "Users fetched")

// why we done this.success = statusCode < 400 Is the status code less than 400 success = true and if not success = false
// Why 400?
// In HTTP
// 200–299 → Success
// 300–399 → Redirection
// 400–499 → Client error
// 500–599 → Server error
// All errors start from 400 and above.

// for more info read ApiResponse.md file in nodejs notes folder
class ApiResponse
{
    constructor( statusCode, data, message = "success" )
    {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export {ApiResponse}