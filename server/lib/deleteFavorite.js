const { Favorite } = require('../models/index')

async function DeleteFavorite() {

    return Favorite.destroy({
        cascade: true,
        truncate: true,
        restartIdentity: true,
    })
}

module.exports = DeleteFavorite