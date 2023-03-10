//The routes file is used for declaring all the routes which points to the endpoints
const AuthenticationController = require("./controllers/AuthenticationController.js")
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy.js")
const ArgumentController = require('./controllers/ArgumentController.js')
const ArgumentControllerPolicy = require('./policies/ArgumentControllerPolicy.js')

module.exports = (app) =>{
    app.post("/register",(req,res) => {
        const error = AuthenticationControllerPolicy.register(req,res)
        if(!error){
            AuthenticationController.register(req,res)
        }
    }),
    app.post("/login",(req,res)=>{
        const error = AuthenticationControllerPolicy.login(req,res)
        if(!error){
            AuthenticationController.login(req,res)
        }
    }),
    app.post('/deleteAccount',(req,res)=>{
        AuthenticationController.deleteAccount(req,res)
    }),

    app.post('/createArgument',(req,res)=>{
        const error = ArgumentControllerPolicy.createArgument(req,res)
        if(!error){
            ArgumentController.createArgument(req,res)
        }
    }),
    app.post('/destroyArgument',(req,res)=>{
        ArgumentController.destroyArgument(req,res)
    }),
    app.post('/displayPersonalArguments',(req,res)=>{
        ArgumentController.displayPersonalArguments(req,res)
    })
}