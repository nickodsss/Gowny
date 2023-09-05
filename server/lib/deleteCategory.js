const { Category } = require('../models/index')

async function DeleteCategory() {
    return Category.destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true,
    })
}

module.exports = DeleteCategory