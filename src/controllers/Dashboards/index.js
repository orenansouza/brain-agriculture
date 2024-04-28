const dashboardService = require('../../services/Dashboards')

exports.totalFarms = async (req, res) => {
  try {
    const result = await dashboardService.totalFarms()
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.totalFarmsTotalArea = async (req, res) => {
  try {
    const result = await dashboardService.totalFarmsTotalArea()
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.totalPerState = async (req, res) => {
  try {
    const result = await dashboardService.totalPerState()
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.totalPerCultivation = async (req, res) => {
  try {
    const result = await dashboardService.totalPerCultivation()
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.cultivationAndVegetationArea = async (req, res) => {
  try {
    const result = await dashboardService.cultivationAndVegetationArea()
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}
