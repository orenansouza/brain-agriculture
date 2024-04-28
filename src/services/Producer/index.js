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

  if (payload.cultivable_area + payload.vegetation_area > payload.total_area) {
    return {
      error: true,
      statusCode: 400,
      errors: ['Área de cultivação com área de vegetação maior que área total']
    }
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
