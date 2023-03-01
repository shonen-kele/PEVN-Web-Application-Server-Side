const { genSalt } = require('bcrypt')
const bluebird = require('bluebird')
const bcrypt = bluebird.promisifyAll(require('bcrypt'))


async function hashPassword (user){
    const SALT_FACTOR = 8

    if(!user.changed('password')){
        return
    }
    console.log('hellow')

    const salt = await bcrypt.genSalt(SALT_FACTOR)
    const hash = await bcrypt.hash(user.password, salt)
    const hashedPassword = user.setDataValue('password',hash)
    return hashedPassword
}

module.exports = (sequelize,DataTypes) =>{
    const User = sequelize.define("User",{
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    },{
        hooks:{
            beforeCreate: hashPassword,
            beforeUpdate: hashPassword,
            beforeSave: hashPassword
        }
    })

    User.prototype.comparePassword = function (password)  {
        return bcrypt.compareSync(password, this.password, (err,result)=>{
            if(err){
                console.log(err)
                console.log('The data is: ' + password)
                console.log('The hash is: ' + this.password)
            } else if (result == false){
                console.log('the password validity was false')
                console.log(this.password)
                const salt = bcrypt.genSaltSync(8)
                const hash = bcrypt.hashSync(password,salt)
                console.log(hash)
            }
        })
    }

    return User;
}
