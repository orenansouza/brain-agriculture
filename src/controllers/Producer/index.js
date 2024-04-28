const producerService = require('../../services/Producer')

exports.create = async (req, res) => {
  try {
    const result = await producerService.create(req.body)
    if (result.error) {
      return res.status(result.statusCode).send(result)
    }

    return res.status(201).send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
};

exports.findAll = async (req, res) => {
  try {
    let { page, limit } = req.query
    page = page ? Number(page) : 1
    limit = limit ? Number(limit) : 10

    const result = await producerService.findAll({ page, limit })
    return res.status(200).send(result)
  } catch (error) {
    return res.status(500).send(error)
  }
}

exports.update = async (req, res) => {
  try {
    const result = await producerService.update(req.params.id, req.body)
    if (result.error) {
      return res.status(result.statusCode).send(result)
    }

    return res.status(200).send(result)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

exports.delete = async (req, res) => {
  try {
    const result = await producerService.delete(req.params.id)
    if (result.error) {
      return res.status(result.statusCode).send(result)
    }

    return res.status(204).send()
  } catch (error) {
    return res.status(500).send(error)
  }
}