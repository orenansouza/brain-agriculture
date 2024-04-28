const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.totalFarms = async () => {
  const farms = await prisma.producer.groupBy({
    by: ['farm_name'],
    _count: true
  })

  return farms.map(farm => {
    return {
      farm_name: farm.farm_name,
      total: farm._count
    }
  })
}

exports.totalFarmsTotalArea = async () => {
  const farms = await prisma.producer.groupBy({
    by: ['farm_name', 'total_area']
  })
  return farms
}

exports.totalPerState = async () => {
  const farms = await prisma.producer.groupBy({
    by: ['state'],
    _count: true
  })

  return farms.map(farm => {
    return {
      state: farm.state,
      total: farm._count
    }
  })
}

exports.totalPerCultivation = async () => {
  const farms = await prisma.producer.groupBy({
    by: ['cultivation_name'],
    _count: true
  })

  return farms.map(farm => {
    return {
      cultivation_name: farm.cultivation_name,
      total: farm._count
    }
  })
}

exports.cultivationAndVegetationArea = async () => {
  const farms = await prisma.producer.groupBy({
    by: ['farm_name', 'cultivable_area', 'vegetation_area'],

  })

  return farms.map(farm => {
    return {
      farm_name: farm.farm_name,
      cultivation_area: farm.cultivable_area,
      vegetation_area: farm.vegetation_area,
    }
  })
}