//The routes file is used for declaring all the routes which points to the endpoints
const AuthenticationController = require("./controllers/AuthenticationController.js")
const AuthenticationControllerPolicy = require("./policies/AuthenticationControllerPolicy.js")
const ArgumentController = require('./controllers/ArgumentController.js')
const ArgumentControllerPolicy = require('./policies/ArgumentControllerPolicy.js')

module.exports = (app) =>{
    //login
    app.post("/register",(req,res) => {
        const error = AuthenticationControllerPolicy.registerPolicy(req,res)
        if(!error){
            AuthenticationController.register(req,res)
        }
    }),
    //register
    app.post("/login",(req,res)=>{
        const error = AuthenticationControllerPolicy.loginPolicy(req,res)
        if(!error){
            AuthenticationController.login(req,res)
        }
    }),
    //delete one account
    app.post('/deleteAccount',(req,res)=>{
        AuthenticationController.deleteAccount(req,res)
    }),
    //create argument
    app.post('/arguments',(req,res)=>{
        const error = ArgumentControllerPolicy.createArgumentPolicy(req,res)
        if(!error){
            ArgumentController.createArgument(req,res)
        }
    }),
    //delete one argument
    app.delete('/arguments/:id',(req,res)=>{
        ArgumentController.destroyArgument(req,res)
    }),
    //get all arguments
    app.get('/arguments',(req,res)=>{
        ArgumentController.displayArguments(req,res)
    }),
    //get one argument
    app.get('/arguments/:id',(req,res)=>{

    }),
    //update argument
    app.put('/arguments/:id',(req,res)=>{
        ArgumentController.editArgument(req,res)
    }),
    //update one user watch
    app.put('/users/:email/watch',(req,res)=>{
        ArgumentController.watchArgument(req,res)
    }),
    //get verification
    app.post('/verification',(req,res)=>{
        AuthenticationController.verifyToken(req,res)
    }),
    app.get('/users/:email/watch',(req,res)=>{
        ArgumentController.getWatchedId(req,res)
    })
}