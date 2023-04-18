//controllers are used for declaring all the end points
const db = require('../models/index.js')
const  jwt = require('jsonwebtoken')
function jwtSignUser(userInstance){
    const ONE_WEEK = 60 * 60 * 24 * 7
    return jwt.sign(userInstance, process.env.JWT_SECRET,{
        expiresIn: ONE_WEEK
    })
}

async function register (req,res){
    let userInstance = await db.sequelize.models.User.findOne
    ({where:{email:req.body.email}})

    if(userInstance == null){
        await db.sequelize.models.User.create(req.body)
        userInstance = await db.sequelize.models.User.findOne({where:{email:req.body.email}})
        const userJson = userInstance.toJSON()
        res.json({
            message:'The user has signed up',
            token: jwtSignUser(userJson),
            email: userInstance.email
        })
    } else{
        console.log("The user has already signed up")
        res.json({errorMessage:'The user has alreadu signed up'})
    }
}
async function login (req,res){
    const userInstance = await db.sequelize.models.User.findOne({where:{email:req.body.email}})
    
    if (userInstance === null) {
        res.json({
            errorMessage:'The email is not in the database'
        })
    } else {
        const isPasswordValid = await userInstance.comparePassword(req.body.password)
        if (!isPasswordValid) {
            res.json({
                errorMessage:'The password was incorrect'
            })
        } else {
            const userJson = userInstance.toJSON()
            res.json({
                message:'You have successfully logged in',
                token: jwtSignUser(userJson),
                email: userInstance.email
            })
        }
    }

    
}
async function deleteAccount(req,res){
    const userInstance = await db.sequelize.models.User.findOne({where:{email:req.body.email}})
    const isPasswordValid = await userInstance.comparePassword(req.body.password)
    if (!isPasswordValid) {
        res.json({
            errorMessage:'You have entered the wrong password'
        })
    } else {
        userInstance.destroy()
        res.json({message:'Your account was successfully deleted'})
    }
}
async function verifyToken(req,res){
    let verified
    let decoded
    let exp
    jwt.verify(req.body.token, process.env.JWT_SECRET,function(err,result){
        if(!err){
            decoded = result
            exp = result.exp
        } else {
            console.log(err)
        }
    })
    if (Date.now() >= exp * 1000){
        verified = false
        console.log('The token has expired')
    } else if(decoded==undefined){
        console.log('The verification was invalid')
        verified = false
    } else {
        verified = true
    }
    res.json({
        result:decoded,
        ver:verified
    })
}

module.exports = {
    verifyToken,
    deleteAccount,
    login,
    register
}
