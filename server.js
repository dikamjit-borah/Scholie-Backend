require('dotenv').config()

const TAG = "server.js"
const express = require('express')
const app = express()
app.use(express.json())

const routesTutor = require('./routes/route.tutor')
const routesStudent = require('./routes/route.student')

app.use(routesTutor)
app.use(routesStudent)
const port = process.env.PORT || 6061

app.listen(port, () => {
    console.log(TAG, `Scholie-Backend running on port ${port}`)
})