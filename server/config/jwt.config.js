const jwt = require('jsonwebtoken')
const JWT_SECRET = "2LaHP5u9K3LaiIMBPcGUb0kK0Od2KB2Q"

module.exports = {

    generateTokenForUserLogin: (userData) => {  
        return jwt.sign({
            userid: userData,

        },
        JWT_SECRET,
        {
        })
    },
    parseAuthorization: (authorization) => {
        return (authorization != null) ? authorization.replace('Bearer ', '') : null
    },
    getUserData: (authorization) => {
        var userId = -1
        var token = module.exports.parseAuthorization(authorization);
        // console.log(token);
        if(token != null) {
            try {
                var jwtToken = jwt.verify(token, JWT_SECRET)
                if(jwtToken != null) {
                    return jwtToken
                }
            } catch(err) {
            }
        }
        return jwtToken
    }
}