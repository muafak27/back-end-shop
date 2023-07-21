const mongoose = require('mongoose')
const {dbHost, dbPort, dbName} = require('../app/config')
// const autoIncrement = require('mongoose-auto-increment')

mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`)
// autoIncrement.initialize(mongoose.connection);
const db = mongoose.connection


module.exports = db