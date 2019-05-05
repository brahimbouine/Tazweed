var express = require('express');
require('express-group-routes');
const login = require('./routes/login').login
// const getOrder = require('./routes/getOrder');


        

const isAuthenticated = require('./middlewares/authMiddleware').authMiddleware;
//Router
exports.router = (() => {
    var apiRouter = express.Router();
    apiRouter.route('/login').post(login);

    apiRouter.group("", (middleware) => {
        middleware.use(isAuthenticated);
        //User Routes
      //  middleware.route('/GetNews').post(news.GetNews);
    });

    return apiRouter;
})()