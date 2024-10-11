const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const DBconnection = require('./db')

require('dotenv/config')

const port = process.env.PORT || 4000;

//midleware
app.use(bodyParser.json())
app.use(morgan('tiny'))

DBconnection();

const userRoutes  = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const reviewRoutes = require("./routes/reviewRoutes")

app.use("/api/v1",userRoutes)
app.use("/api/v1",productRoutes)
app.use("/api/v1",reviewRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

