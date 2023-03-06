const crypto = require('crypto')


async function hashPassword (user){
    if(!user.changed('password')){
        console.log('The password was changed')
        return
    }
    user.salt = crypto.randomBytes(16).toString('hex')
    console.log('The salt entered into the database was ' + user.salt)
    const hash = crypto.pbkdf2Sync(user.password,user.salt,1000,64,'sha512')
    .toString('hex')
    user.password = hash
}

module.exports = (sequelize,DataTypes) =>{
    const User = sequelize.define("User",{
        email: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        salt: DataTypes.STRING
    },{
        hooks:{
            beforeSave: hashPassword
        }
    })

    User.prototype.comparePassword = function (password)  {
        const hash = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex')
        result = hash === this.password
        if(!result){
            console.log(password)
            console.log(this.password)
            console.log(hash)
            console.log(this.salt)
        }
        return hash === this.password
    }

    return User;
}
