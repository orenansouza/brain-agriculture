const yup = require('yup')
const { PrismaClient } = require('@prisma/client')

const { validateCPF } = require('../../utils/validateCPF')
const { validateCNPJ } = require('../../utils/validateCNPJ')

const CULTIVATION_OPTIONS = ['Soja', 'Milho', 'Algodão', 'Café', 'Cana de Açucar']

const prisma = new PrismaClient()
exports.create = async (payload) => {
  const payloadValid = await schema.validate(payload)
    .then(() => { return { valid: true } })
    .catch(error => { return { valid: false, errors: error.errors } })

  if (!payloadValid.valid) {
    return {
      error: true,
      statusCode: 400,
      errors: payloadValid.errors
    }
  }

  const validate_area = validateArea({
    cultivable_area: payload.cultivable_area,
    vegetation_area: payload.vegetation_area,
    total_area: payload.total_area
  })

  if (validate_area.error) {
    return validate_area
  }

  try {
    return prisma.producer.create({
      data: {
        ...payload, cpf_cnpj: Number(payload.cpf_cnpj.replace(/[^\d]+/g, ''))
      }
    })
  } catch (error) {
    return error
  }
}

exports.findAll = async ({ page, limit }) => {
  const skip = (page - 1) * limit

  try {
    const result = await prisma.producer.findMany({
      skip,
      take: limit
    })
    return {
      content: result,
      pagination: {
        page,
        limit,
        totalPage: result.length,
        totalItems: await prisma.producer.count()
      }
    }
  } catch (error) {
    return error
  }
}

exports.update = async (id, payload) => {
  if (!id) {
    return {
      error: true,
      statusCode: 400,
      errors: ['ID é obrigatório']
    }
  }

  const producer = await prisma.producer.findUnique({ where: { id: Number(id) } })
  if (!producer) {
    return {
      error: true,
      statusCode: 400,
      errors: ['ID informado não existe']
    }
  }

  if (payload.cultivable_area || payload.vegetation_area || payload.total_area) {
    const validate_area = validateArea({
      cultivable_area: payload.cultivable_area || producer.cultivable_area,
      vegetation_area: payload.vegetation_area || producer.vegetation_area,
      total_area: payload.total_area || producer.total_area
    })

    if (validate_area.error) {
      return validate_area
    }
  }

  try {
    const producerUpdated = await prisma.producer.update({
      where: { id: Number(id) },
      data: { ...payload }
    })
    return producerUpdated
  } catch (error) {
    return error
  }
}

exports.delete = async (id) => {
  if (!id) {
    return {
      error: true,
      statusCode: 400,
      errors: ['ID é obrigatório']
    }
  }

  const producer = await prisma.producer.findUnique({ where: { id: Number(id) } })
  if (!producer) {
    return {
      error: true,
      statusCode: 400,
      errors: ['ID informado não existe']
    }
  }

  try {
    return prisma.producer.delete({ where: { id: Number(id) } })
  } catch (error) {
    return error
  }
}

function validateArea({ cultivable_area, vegetation_area, total_area }) {
  if (cultivable_area + vegetation_area > total_area) {
    return {
      error: true,
      statusCode: 400,
      errors: ['Área de cultivação com área de vegetação maior que área total']
    }
  }
  return { error: false }
}

const schema = yup.object().shape({
  cpf_cnpj: yup.string().required().test('cpf-cnpj', 'CPF ou CNPJ inválido', function (value) {
    if (!value) return true

    value = value.replace(/[^\d]+/g, '')

    if (value.length === 11) {
      return validateCPF(value) || this.createError({ message: 'CPF inválido' })
    }
    if (value.length === 14) {
      return validateCNPJ(value) || this.createError({ message: 'CNPJ inválido' })
    }
    return this.createError({ message: 'CPF ou CNPJ inválido' })
  }),
  producer_name: yup.string().required(),
  farm_name: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  total_area: yup.number().required(),
  cultivable_area: yup.number().required(),
  vegetation_area: yup.number().required(),
  cultivation_name: yup.string().oneOf(CULTIVATION_OPTIONS, 'Opção de cultivo inválida').required()
})
