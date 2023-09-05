const { Dress, Image, Store, Category } = require('../models')
const { getPagination } = require('../helpers/pagination')
const { Op } = require('sequelize')
const { sequelize } = require('../models')


class DressController {
    static async readDress(request, response, next) {
        try {

            const where = {}
            const { name, CategoryId, grade, StoreId } = request.query

            if (name) {
                where.name = { [Op.iLike]: `%${name}%` }
            }

            if (CategoryId) {
                where.CategoryId = CategoryId
            }

            if (grade) {
                where.grade = grade
            }

            if (StoreId) {
                where.StoreId = StoreId
            }

            const page = request.query.page ? parseInt(request.query.page) : 1
            const perPage = request.query.perPage ? parseInt(request.query.perPage) : 12

            if (page <= 0 || perPage <= 0) {
                throw { name: 'Minimum page is 1' }
            }

            const { count, rows } = await Dress.findAndCountAll(
                {
                    where,
                    include: [Store, Category, Image],
                    offset: (page - 1) * perPage,
                    limit: perPage,
                    distinct: true,
                    order: [["id", "ASC"]]
                }
            )

            const result = getPagination({
                data: rows,
                count,
                page,
                perPage
            })

            if (count <= 0) {
                throw { name: 'Dress Not found' }
            }

            response.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async readDressDetail(request, response, next) {
        try {
            const { id } = request.params
            const result = await Dress.findOne({
                where: {
                    id
                },
                include: [Store, Category, Image]
            })

            if (!result) {
                throw { name: 'ErrorData' }
            }

            response.status(200).json(result)
        } catch (err) {
            next(err)
        }
    }

    static async createDress(request, response, next) {
        const trx = await sequelize.transaction()
        try {
            const { name, description, grade, price, mainImage, CategoryId, StoreId, imageUrl1, imageUrl2, imageUrl3 } = request.body

            const result = await Dress.create({
                name,
                description,
                grade,
                price,
                mainImage,
                CategoryId,
                StoreId
            }, { transaction: trx })

            if (!imageUrl1 || !imageUrl2 || !imageUrl3) {
                throw { name: 'Minimum add 3 images' }
            }

            const addImageResult = await Image.bulkCreate([
                {
                    name: imageUrl1,
                    DressId: result.id
                },
                {
                    name: imageUrl2,
                    DressId: result.id
                },
                {
                    name: imageUrl3,
                    DressId: result.id
                }
            ], { transaction: trx })

            await trx.commit()
            response.status(201).json({ result, addImageResult })
        } catch (err) {
            await trx.rollback()
            next(err)
        }
    }

    static async updateDress(request, response, next) {
        const trx = await sequelize.transaction()
        try {
            const { id } = request.params
            const { name, description, grade, price, mainImage, CategoryId, imageUrl1, imageUrl2, imageUrl3 } = request.body

            const result = await Dress.update({
                name,
                description,
                grade,
                price,
                mainImage,
                CategoryId
            }, {
                where: {
                    id
                },
                transaction: trx
            })
            if (!result[0]) {
                throw { name: 'ErrorEdit' }
            }

            const destroy = await Image.destroy({
                where: {
                    DressId: id
                },
                transaction: trx
            })

            const updateImage = await Image.bulkCreate([
                {
                    name: imageUrl1,
                    DressId: id
                },
                {
                    name: imageUrl2,
                    DressId: id
                },
                {
                    name: imageUrl3,
                    DressId: id
                }
            ], { transaction: trx })
            await trx.commit()
            response.status(201).json({
                message: `Dress with ${id} has been successfully edited `
            })
        } catch (err) {
            await trx.rollback()
            next(err)
        }
    }

    static async deleteDress(request, response, next) {
        const trx = await sequelize.transaction()
        try {
            const { id } = request.params
            const result = await Dress.destroy({
                where: {
                    id
                },
                transaction: trx
            })

            if (!result) {
                throw { name: 'ErrorDelete' }
            }

            await trx.commit()
            response.status(200).json({
                message: `Data with id ${id} has been successfully deleted`
            })

        } catch (err) {
            await trx.rollback()
            next(err)
        }
    }
}

module.exports = DressController