const errorHandler = async (err, request, response, next) => {
    if (err.name === 'SequelizeValidationError') {
        response.status(400).json(err.errors[0].message)
    } else if (err.name === 'SequelizeUniqueConstraintError') {
        response.status(400).json({
            message: err.errors[0].message
        })
    } else if (err.name === 'Invalid') {
        response.status(401).json({
            message: 'error invalid email or password'
        })
    } else if (err.name === 'JsonWebTokenError') {
        response.status(401).json({
            message: 'Error Authentication'
        })
    } else if (err.name === 'Unauthenticated') {
        response.status(401).json({
            message: 'Error Authentication'
        })
    } else if (err.name === 'ErrorDelete') {
        response.status(404).json({
            message: 'Error not found'
        })
    } else if (err.name === 'Minimum page is 1') {
        response.status(400).json({
            message: 'Minimum page is 1'
        })
    } else if (err.name === 'Dress Not Found') {
        response.status(404).json({
            message: 'Dress not found'
        })
    } else if (err.name === 'ErrorData') {
        response.status(404).json({
            message: 'Error not found'
        })
    } else if (err.name === 'ErrorInput') {
        response.status(400).json({
            message: 'All input column is required'
        })
    } else if (err.name === 'ErrorDelete') {
        response.status(404).json({
            message: 'Error not found'
        })
    } else if (err.name == 'Minimum add 3 images') {
        response.status(401).json({
            message: 'Minimum/Maximum 3 additional images required'
        })
    } else if (err.name === 'ErrorEdit') {
        response.status(404).json({
            message: 'Error not found'
        })
    } else if (err.name === 'Unauthorized') {
        response.status(403).json({
            message: 'Forbidden Error Authorization'
        })
    } else {
        response.status(500).json({
            message: 'Internal Server Error'
        })
    }
}

module.exports = { errorHandler }