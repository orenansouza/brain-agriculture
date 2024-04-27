const express = require('express')
const cors = require('cors')
const { createConnection } = require('typeorm')

require('dotenv').config()

const ormConfig = require('./ormconfig')
const routes = require('./src/routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

async function startApp() {
  try {
    await createConnection(ormConfig)
    console.log('Connected to the database')

    const port = process.env.API_PORT || 3333
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  } catch (error) {
    console.error('Error connecting to the database:', error)
  }
}

startApp()
