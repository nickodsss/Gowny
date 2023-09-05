const { User } = require('../models/index')

async function DeleteUser() {

    return User.destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true,
    })
}

module.exports = DeleteUser