const express = require('express')

const dashboardController = require('../../controllers/Dashboards')

const routes = express.Router()

routes.get('/farms/total', dashboardController.totalFarms)
routes.get('/farms/total/area', dashboardController.totalFarmsTotalArea)
routes.get('/farms/total/state', dashboardController.totalPerState)
routes.get('/farms/total/cultivation', dashboardController.totalPerCultivation)
routes.get('/farms/cultivation-vegenation/area', dashboardController.cultivationAndVegetationArea)

module.exports = routes