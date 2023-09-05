const { Category } = require('../models/index.js')
const dataCategory = require('../sampleData/category.json')

function CreateCategory() {
    return Category.bulkCreate(dataCategory);

}

module.exports = { CreateCategory }