const { Dress } = require('../models/index.js')
const dataDress = require('../sampleData/dress.json')

function CreateDress() {
    return Dress.bulkCreate(dataDress)

}

module.exports = { CreateDress }