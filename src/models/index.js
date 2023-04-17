const fs = require('fs')
const path = require('path')
const {Sequelize,DataTypes} = require('sequelize')
require('dotenv').config()
let db = {}

//The database (sequelize object)
const sequelize = new Sequelize(
    "yessaydatabase",
    "postgres",
    process.env.PGPASSWORD,
    {
        host:"localhost",
        dialect:"postgres",
    }
)



//reading all the model files in a directory then adding them to the db dictionary
fs
.readdirSync(__dirname)
.filter((file)=>file!=="index.js")
.forEach((file)=>{
    const model = require(path.join(__dirname,file))(sequelize,DataTypes)
    let filename = file.toString().substring(0,file.length-3)
    sequelize.models[filename] = model
})

db.sequelize = sequelize
db.Sequelize = Sequelize

//The exports
module.exports = db