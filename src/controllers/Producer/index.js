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
