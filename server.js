require('dotenv').config()

const TAG = "server.js"
const express = require('express')
const app = express()
app.use(express.json())

const routesAuthentication = require('./routes/route.authentication')
const routesTutor = require('./routes/route.tutor')
const routesStudent = require('./routes/route.student')
const constants = require('./utils/constants')
const basicUtils = require('./utils/basic.utils')

app.use(routesAuthentication)
app.use(routesTutor)
app.use(routesStudent)
const port = process.env.PORT || 6061

const db = require('./models/index').sequelize

db.authenticate().then(() => {
    basicUtils.logger(TAG, constants.messages.DB_CONN_SUCCESS)
}).catch((error) => {
    basicUtils.logger(TAG, constants.messages.DB_CONN_ERROR)
    basicUtils.logger(TAG, error)
})

app.listen(port, () => {
    console.log(TAG, `Scholie-Backend running on port ${port}`)
})