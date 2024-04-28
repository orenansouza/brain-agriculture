const express = require('express')
const ProducerRoutes = require('./Producer')

const routes = express.Router()

routes.get('/', (req, res) => { res.status(200).send({ message: 'API Online' }) })

routes.use('/producer', ProducerRoutes)

module.exports = routes