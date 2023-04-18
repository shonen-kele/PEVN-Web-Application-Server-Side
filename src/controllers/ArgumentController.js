const db = require('../models/index.js')

async function createArgument(req,res){

    //Returning the count of arguments under a particular user
    const argumentCount = await db.sequelize.models.Argument.count({
        where:{email:req.body.email}
    })
    const argumentInstance = await db.sequelize.models.Argument.findOne({where:{
        title:req.body.title,
        email:req.body.email
    }})

    if(argumentInstance == null){
        await db.sequelize.models.Argument.create({
            email: req.body.email,
            title: req.body.title,
            argument: body.argument,
            argumentIndex: argumentCount+1
        })
        res.json({message:'Your argument was created'})
    } else {
        res.json({errorMessage:'You have already created this argument'})
    }
}
async function destroyArgument(req,res){
    const argumentInstance = await db.sequelize.models.Argument.findOne
    ({where:{
        id:req.params.id
    }})
    if(argumentInstance == null){
        res.json({errorMessage:'The argument does not exist'})
    } else {
        await argumentInstance.destroy()
        res.json({message:'The argument was destroyed'})
    }
}

async function editArgument(req,res){
    //TODO: Make it acceptable for axios and express
    const argumentInstance = await db.sequelize.models.Argument.findOne({where:{id:req.params.id}})
    if(argumentInstance){
        await argumentInstance.update({title:query.title})
        await argumentInstance.update({argument:query.argument})
        res.json({error:false})
    } else {
        res.json({error:true})
    }
}
async function displayArguments(req,res){
    console.log(req.query.email)
    if(req.query.email){
        console.log('logging req.query',req.query)
        const argumentInstances = await db.sequelize.models.Argument.findAll({where:{email:req.query.email}})
        
        if(argumentInstances.length == 0){
            res.json({errorMessage:'You have made no argument'})
        } else{
            res.json({arguments:argumentInstances})
        }
    } else if(req.params.id){
        const argumentInstance = await db.sequelize.models.Argument.findOne({
            where:{id:req.params.id}
        })
        if(argumentInstance){
            res.json({
                argumentId: argumentInstance.id,
                argumentBody: argumentInstance.argument,
                argumentTitle: argumentInstance.title
            })
        } else {
            res.json({
                errorMessage:`The argument with id ${id} does not exist or there was an internal error`
            })
        }
    } else if(req.query.id){
        const argumentInstances = await db.sequelize.models.Argument.findAll({where:{id:req.query.id}})
        res.json({arguments:argumentInstances})
    } else if(req.query.id===null){
        res.json({errorMessage:'You have saved no arguments'})
    }else {
        const {rows} = await db.sequelize.models.Argument.findAndCountAll({
            limit:30,
            offset: req.query.offset
        })
        res.json({arguments:rows})
    }
}
async function watchArgument(req,res){
    const userInstance = await db.sequelize.models.User.findOne({
        where:{email:req.body.email}
    })
    console.log('logging savedId',userInstance.savedId)
    if(!userInstance.savedId.includes(req.body.id)){
        await userInstance.update({
            savedId: db.sequelize.fn('array_append',db.sequelize.col('savedId'),req.body.id)
        })
        res.json({message:'You are now watching the argument'})
    } else {
        res.json({
            message:'You are already watching this argument'
        })
    }
}
async function getWatchedId(req,res){
    console.log('logging req.params.email',req.params.email)
    const userInstance = await db.sequelize.models.User.findOne({
        where:{email:req.params.email}
    })
    console.log('logging userInstance',userInstance)
    res.json({watchedId:userInstance.savedId})
}

module.exports = {
    watchArgument,
    displayArguments,
    editArgument,
    destroyArgument,
    createArgument,
    getWatchedId
}
