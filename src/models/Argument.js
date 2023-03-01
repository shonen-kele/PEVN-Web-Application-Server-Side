module.exports = (sequelize,DataTypes) =>{
    Argument = sequelize.define("Argument",{
        email:{
            type: DataTypes.STRING,
        },
        title: DataTypes.STRING,
        argumentBody: DataTypes.STRING,
        argumentIndex: DataTypes.INTEGER //to count how many arguments the user has
    })
    return Argument
}