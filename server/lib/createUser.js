const { User } = require('../models/index.js')
const dataUser = require('../sampleData/user.json')
const { hashPassword } = require('../helpers/bcrypt.js')
dataUser.forEach((el) => {
    el.password = hashPassword(el.password)
})

function CreateUser() {
    return User.bulkCreate(dataUser);

}

module.exports = { CreateUser }