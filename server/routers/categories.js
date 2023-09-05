const express = require('express')
const router = express.Router()
const CategoryController = require('../controllers/categoryController')
const { authorization } = require('../middlewares/authorization')

router.get('/categories', CategoryController.readCategories)
router.post('/categories', authorization, CategoryController.createCategories)
router.delete('/categories/:id', authorization, CategoryController.deleteCategories)

module.exports = router