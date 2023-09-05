const express = require('express')
const router = express.Router()
const FavoriteController = require('../controllers/favoriteController')

router.get('/favorite', FavoriteController.readFavorite)
router.post('/favorite/:id', FavoriteController.addFavorite)
router.delete('/favorite/:id', FavoriteController.deleteFavorite)


module.exports = router