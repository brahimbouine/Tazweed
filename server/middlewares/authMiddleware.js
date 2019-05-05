const jwtConfig = require('../config/jwt.config')

function isAuthenticated(req, res, next) {
    var headerAuth = req.headers['authorization']
    var userData = jwtConfig.getUserData(headerAuth)
    // CHECK THE USER STORED 
    if (userData) {
        req.body.userData = userData
        return next();
    }
    // IF A USER ISN'T LOGGED 
    return res.status(401).json({ 
        'status' : 401,
        'error': 'Worng token Auth'
    })
}

module.exports = {
    authMiddleware : isAuthenticated
}