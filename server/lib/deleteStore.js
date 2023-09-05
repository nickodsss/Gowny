const { Store } = require('../models/index')

async function DeleteStore() {
    return Store.destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true,
    })
}

module.exports = DeleteStore