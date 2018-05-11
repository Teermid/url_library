const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const routing = require('./routes')
const mongoose = require('mongoose')

const app = express()

// var conn = `mongodb://${config.db.ip}:${config.db.port}/${config.db.name}`
mongoose.connect(`mongodb://${config.db.ip}:${config.db.port}/${config.db.name}`)
var db = mongoose.connection

db.once('open', function () {
  console.log('Connected to DB')
})

db.on('error', function (err) {
  console.log(err)
})

app.use(
  morgan('combined'),
  bodyParser.json(),
  cors()
)

routing(app)

app.listen(config.port, () => {
  console.log('server running..')
})
