const { Favorite, Dress } = require('../models')

class FavoriteController {
    static async readFavorite(request, response, next) {
        try {
            const result = await Favorite.findAll({
                include: Dress,
                where: {
                    UserId: request.additionalData.userId
                }
            })
            response.status(200).json(
                result
            )
        } catch (err) {
            next(err)
        }
    }

    static async addFavorite(request, response, next) {
        try {
            const { id } = request.params
            const result = await Favorite.findOrCreate({
                where: {
                    DressId: id,
                    UserId: request.additionalData.userId,
                },
                defaults: {
                    DressId: id,
                    UserId: request.additionalData.userId,
                    // totalPerson: 1
                    // Nanti buat booking
                }
            })
            response.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async deleteFavorite(request, response, next) {
        try {
            const { id } = request.params
            const result = await Favorite.destroy({
                where: {
                    DressId: id,
                    UserId: request.additionalData.userId
                }
            })
            if (!result) {
                throw { name: 'ErrorDelete' }
            }

            response.status(200).json({
                message: `Success to delete`
            })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = FavoriteController