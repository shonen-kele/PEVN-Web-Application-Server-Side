const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cors = require("cors")
const DataTypes = require("sequelize")
const db = require("./models")

const app = express()
app.use(morgan("combine")) //Creates morgan logs
app.use(bodyParser.json()) //To parse json files I guess
app.use(cors()) //To make it available with the client (security risk)

require("./routes.js")(app)

db.sequelize.sync().then(
    app.listen(8080,()=>{console.log("The server has started")})
)
