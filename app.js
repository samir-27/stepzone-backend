const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const DBconnection = require('./db')

require('dotenv/config')

const port = process.env.PORT || 4000;

//midleware
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

DBconnection();

const userRoutes  = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const reviewRoutes = require("./routes/reviewRoutes")
const adminRoutes = require("./routes/adminRoutes")
const orderRoutes = require("./routes/orderRoute")
app.use("/api/v1", userRoutes);
app.use("/api/v1", adminRoutes); 
app.use("/api/v1", productRoutes);
app.use("/api/v1", reviewRoutes);
app.use("/api/v1",orderRoutes)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

