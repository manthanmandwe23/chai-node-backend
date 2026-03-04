// as we seen in asyncHandler file we handle error but we did not mentioned proper format menas what error will incclude like it will take error status code, message or what therefore we want proper error structure which we will do here
// search "nodejs api error" on google it will give you all error

class ApiError extends Error {
    constructor(
        statusCode,
        message = "something went wrong",
        errors = [],
        stack = ""
    ) {
        super( message )
        this.statusCode = statusCode
        this.data = null
        this.message = message                                     
        this.success = false
        this.errors = errors

        if (stack) {
            this.stack = stack
        } else {
            Error.captureStackTrace(this, this.constructor)
        }
            
    }
}

export {ApiError}