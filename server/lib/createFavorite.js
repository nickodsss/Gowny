const { Favorite } = require('../models/index.js')
const dataFavorite = require('../sampleData/favorite.json')

function CreateFavorite() {
    return Favorite.bulkCreate(dataFavorite);

}

module.exports = { CreateFavorite }