const express = require('express')
const producerRoutes = require('./Producer')
const dashboardsRoutes = require('./Dashboards')

const routes = express.Router()

routes.get('/', (req, res) => { res.status(200).send({ message: 'API Online' }) })

routes.use('/producer', producerRoutes)
routes.use('/dashboard', dashboardsRoutes)

module.exports = routes