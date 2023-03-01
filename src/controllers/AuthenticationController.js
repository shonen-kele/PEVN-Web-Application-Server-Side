//controllers are used for declaring all the end points
const db = require("../models")
const jwt = require('jsonwebtoken')
function jwtSignUser(userInstance){
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(userInstance, 'blur2456',{
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register (req, res){
        let userInstance = await db.sequelize.models.User.findOne
        ({where:{email:req.body.email}})

        if(userInstance == null){
            console.log(db.sequelize.models.User.create)
            await db.sequelize.models.User.create(req.body)
            console.log("The user has signed in")
            userInstance = await db.sequelize.models.User.findOne({where:{email:req.body.email}})
            userJson = userInstance.toJSON()
            res.json({
                message:"The user has singed up",
                token: jwtSignUser(userJson)
            })
        } else{
            console.log("The user has already signed up")
            res.json({error:"The user has already signed up"})
        }
    },
    async login (req,res){
        const userInstance = await db.sequelize.models.User.findOne({where:{email:req.body.email}})
        
        if (userInstance === null) {
            res.json({error:"The email is not in the database"})
        }

        const isPasswordValid = await userInstance.comparePassword(req.body.password)

        if (!isPasswordValid) {
            res.json({error:"The password was incorrect"})
        } else {
            userJson = userInstance.toJSON()
            res.json({
                message:"You have successfully logged in",
                token: jwtSignUser(userJson)
            })
        }
    },
    async deleteAccount(req,res){
        const userInstance = await db.sequelize.models.User.findOne({where:{email:req.body.email}})
        if (userInstance.password != req.body.password._value) {
            res.json({error:"You entered the wrong password"})
        } else {
            userInstance.destroy()
            res.json({
                message:"Your account was successfully deleted",
            })
        }
    }
}