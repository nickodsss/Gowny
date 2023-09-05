const { Store, Dress } = require('../models/index')
class StoreController {
    static async readStore(request, response, next) {
        try {
            const result = await Store.findAll()
            response.status(200).json(
                result
            )
        } catch (err) {
            next(err)
        }
    }

    static async readStoreDetail(request, response, next) {
        try {
            const { id } = request.params
            const result = await Store.findOne({
                include: [Dress],
                where: {
                    id
                }
            })
            if (!result) {
                throw { name: 'ErrorData' }
            }

            response.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async createStore(request, response, next) {
        try {
            const { name, address, phoneNumber, lat, long } = request.body

            if (!name || !address || !phoneNumber) {
                throw { name: 'ErrorInput' }
            }

            const result = await Store.create({
                name,
                address,
                phoneNumber,
                lat,
                long
            })


            response.status(201).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async deleteStore(request, response, next) {
        try {
            const { id } = request.params
            const result = await Store.destroy({
                where: {
                    id
                }
            })
            if (!result) {
                throw { name: 'ErrorDelete' }
            }
            response.status(200).json({
                msg: `Store with id ${id} is successfully deleted`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = StoreController