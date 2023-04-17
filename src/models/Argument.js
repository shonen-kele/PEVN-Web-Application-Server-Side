module.exports = (sequelize,DataTypes) =>{
    const Argument = sequelize.define("Argument",{
        email:{
            type: DataTypes.STRING,
        },
        title: DataTypes.STRING,
        argument: DataTypes.STRING(5000),
        argumentIndex: DataTypes.INTEGER //to count how many arguments the user has
    })
    return Argument
}