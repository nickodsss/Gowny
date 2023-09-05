const express = require('express')
const router = express.Router()
const StoreController = require('../controllers/storeController')
const { authorization } = require('../middlewares/authorization')

router.get('/store', StoreController.readStore)
router.get('/store/:id', StoreController.readStoreDetail)
router.post('/store', authorization, StoreController.createStore)
router.delete('/store/:id', authorization, StoreController.deleteStore)

module.exports = router