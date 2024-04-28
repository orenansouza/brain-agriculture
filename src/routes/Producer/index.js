const express = require('express')
const router = express.Router()

const producerController = require('../../controllers/Producer')

router.post('/create', producerController.create)

module.exports = router
