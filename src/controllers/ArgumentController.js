const db = require('../models')

module.exports = {
    async createArgument(req,res){

        //Returning the count of arguments under a particular user
        const argumentCount = db.sequelize.models.Argument.count({
            where:{email:req.body.email}
        })
        const argumentInstance = db.sequelize.models.Argument.findOne({where:{
            title:req.body.title,
            email:req.body.email
        }})

        if(argumentInstance == null){
            await db.sequelize.models.Argument.create({
                email: req.body.email,
                title: req.body.title,
                argument: req.body.argument,
                argumentIndex: argumentCount+1
            })
        } else {
            res.json({error:'You have already made this argument'})
        }
    },
    async destroyArgument(req,res){
        const argumentInstance = await db.sequelize.models.Argument.findOne
        ({where:{
            title:req.body.title,
            email:req.body.email
        }})
        if(argumentInstance == null){
            res.json({error:'The argument does not exist'})
        } else {
            argumentInstance.destroy()
            res.json({message:'The argument was destroyed'})
        }
    }
}