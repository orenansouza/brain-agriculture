const express = require('express')
const router = express.Router()

const producerController = require('../../controllers/Producer')

router.post('/create', producerController.create)
router.get('/', producerController.findAll)
router.put('/:id', producerController.update)
router.delete('/:id', producerController.delete)

module.exports = router
