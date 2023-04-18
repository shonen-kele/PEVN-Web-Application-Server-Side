const Joi = require('joi')

function registerPolicy (req,res){
    if(req.body.email == undefined || req.body.password == undefined){
        res.json({
            errorMessage:'The email or password is not defined'
        })
        return {
            error:true
        }
    }
    const template = Joi.object({
        email: Joi.string().email(),
        password:Joi.string().regex(
            new RegExp("^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{8,32}$")
        )
    })
    const {error} = template.validate(req.body)
    if(error){
        switch(error.details[0].context.key){
            case "email":
                console.log("The email format is not valid")
                res.json({
                    errorMessage:'The email format was not valid'
                })
                return true
            case "password":
                console.log("The password format is not valid")
                res.json({
                    errorMessage:`You must provide a valid password
                    <br/>
                    1. It must contain only the characters: a-z,A-Z,0-9 and special characters <br/>
                    (!@#$^&*()+=._-{}[])
                    <br/>
                    2. It must only be 8-32 characters in length`
                })
                return true
            default:
            return true
        }
    } else {
        return false
    }
}
function loginPolicy (req,res){
    if (req.body.email == undefined){
        res.json({
            errorMessage:'You have not entered an email'
        })
        return true
    }
    const email = Joi.string().email()
    const {error} = email.validate(req.body.email)
    if(error){
        res.json({errorMessage:'What you provided was not the format of an email'})
        return true
    } else {
        return false
    }
}

module.exports = {
    loginPolicy,
    registerPolicy
}
