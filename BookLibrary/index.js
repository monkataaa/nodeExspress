const env = 'development'
const express = require('express')
const settings = require('./config/settings')[env]
const database = require('./config/database')
const server = require('./config/server')
const routes = require('./config/routes')
const bodyParser = require('body-parser')


database(settings)

const app = express()

server(app)

routes(app)

const port = settings.port
app.listen(port, () => console.log(`server works on port ${port}`))