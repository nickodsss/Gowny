const { Dress } = require('../models/index')

async function DeleteDress() {
    return Dress.destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true,
    })
}

module.exports = DeleteDress