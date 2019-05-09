const executeCtrl = require('./executeQuery');
const bcrypt = require('bcrypt-nodejs')
const jwtConfig = require('../config/jwt.config')

module.exports = {
    login: (req, res) => {
        console.log(req.body)
        var email = req.body.email;
        var password = req.body.password;
        // var email = req.headers.email;
        // var password = req.headers.password;
        if (email == null || password == null) {
            return res.status(400).json({ 'error': 'error in email or password' })
        }else{
            executeCtrl.selectQuery(`SELECT id,password FROM USERS WHERE email='${email}'`).then(data=>{
                if(data.length >0){
            bcrypt.compare(password, data[0].password, (errBcrypt, resBcrypt) => {
                if (resBcrypt) {
                        return res.status(200).json({
                        'status': 200,
                        success:true,
                        data:{token:jwtConfig.generateTokenForUserLogin(data[0].id)},  
                    })
                 } else {
                    return res.status(302).json({
                        'status': 302,
                        'error': 'error in email or password !'
                    })
                }
                 })
           }else{
            return res.status(302).json({
                'status': 302,
                'error': 'error in email or password !'
            })
           }
            })
        }
    }
}