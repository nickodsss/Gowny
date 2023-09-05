const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { User } = require('../models/index')

class UserController {
    static async registerUser(request, response, next) {
        try {
            const { username, email, password, phoneNumber, address } = request.body

            const created = await User.create({
                username,
                email,
                password,
                role: 'User',
                phoneNumber,
                address
            })
            response.status(201).json(
                created
            )

        } catch (err) {
            next(err)
        }
    }

    static async loginUser(request, response, next) {
        try {
            const { email, password } = request.body

            if (!email || !password) {
                throw { name: 'Invalid' }
            }

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if (!user) {
                throw { name: 'Invalid' }
            }

            const isValidPassword = comparePassword(password, user.password)
            if (!isValidPassword) {
                throw { name: 'Invalid' }
            }

            const token = createToken({
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role
            })

            response.status(200).json({
                access_token: token,
                username: user.username,
                email: user.email,
                role: user.role
            })
        } catch (err) {
            next(err)
        }
    }

}

module.exports = UserController