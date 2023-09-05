const { User } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

const authorization = async (request, response, next) => {
    try {
        if (!request.headers.access_token) {
            throw { name: 'Unauthorized' }
        }

        const payload = verifyToken(request.headers.access_token)

        if (payload.role !== 'Admin') {
            throw { name: 'Unauthorized' }
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { authorization }