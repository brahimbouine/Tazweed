var express = require('express');
require('express-group-routes');
const login = require('./routes/login').login
const addItems = require('./routes/Items').addItems
const GetItems = require('./routes/Items').GetItems
const orders = require('./routes/Orders')

// const getOrder = require('./routes/getOrder');


        

const isAuthenticated = require('./middlewares/authMiddleware').authMiddleware;
//Router
exports.router = (() => {
    var apiRouter = express.Router();
    apiRouter.route('/login').post(login);
    apiRouter.route('/addItems').post(addItems);
    apiRouter.route('/GetItems').get(GetItems);
    apiRouter.route('/GetOrders').get(orders.GetOrders);

    // apiRouter.group("", (middleware) => {
    //     middleware.use(isAuthenticated);
    //     //User Routes
    //   //  middleware.route('/GetNews').post(news.GetNews);
    // });

    return apiRouter;
})()