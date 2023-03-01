const Joi = require('joi')

module.exports - {
    createArgument(req,res){
        const titleTemplate = Joi.string().max(100)
        const argumentTemplate =  Joi.string().max(5000).min(50)
        const {titleError} = titleTemplate.validate(req.body.title)
        const {argumentError} = argumentTemplate.validate(req.body.argument)

        if(titleError){
            res.json({error:'The title is too long'})
            return true
        } else if (argumentError){
            res.json({error:`The argument was either too long or too short 
            <br/>
            The argument must be at least 50 characters short or 5000 characters long.`})
            return true
        } else {return false}
    },
}