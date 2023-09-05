const { Store } = require('../models/index.js')
const dataStore = require('../sampleData/store.json')

function CreateStore() {
    return Store.bulkCreate(dataStore);

}

module.exports = { CreateStore }