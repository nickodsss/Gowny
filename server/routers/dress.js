const express = require('express')
const router = express.Router()
const DressController = require('../controllers/dressController')
const { authorization } = require('../middlewares/authorization')

router.get('/dress', DressController.readDress)
router.get('/dress/:id', DressController.readDressDetail)
router.post('/dress', authorization, DressController.createDress)
router.put('/dress/:id', authorization, DressController.updateDress)
router.delete('/dress/:id', authorization, DressController.deleteDress)

// Tambahin edit isBooked

module.exports = router