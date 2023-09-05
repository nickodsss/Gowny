const bcrypt = require('bcryptjs')
const salt = bcrypt.genSaltSync(10)

function hashPassword(plainPassword) {
    return bcrypt.hashSync(plainPassword, salt)
}

function comparePassword(plainPassword, salt) {
    return bcrypt.compareSync(plainPassword, salt);
}

module.exports = { hashPassword, comparePassword }