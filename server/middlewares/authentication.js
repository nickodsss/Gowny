const { User } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')

const authentication = async (request, response, next) => {
    try {
        const { access_token } = request.headers
        if (!access_token) {
            throw { name: 'Unauthenticated' }
        }

        const payload = verifyToken(access_token)
        if (!payload) {
            throw {
                name: 'JsonWebTokenError'
            }
        }

        const user = await User.findOne({
            where: {
                id: payload.id
            }
        })

        request.additionalData = {
            userId: payload.id,
            username: payload.username,
            email: payload.email,
            role: payload.role
        }
        next()
    } catch (err) {
        next(err)
    }
}

module.exports = { authentication }