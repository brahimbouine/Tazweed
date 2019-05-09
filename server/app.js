const express = require('express')
const http = require('http')
var fs = require('fs');

const bodyParser = require('body-parser')
const app = express()
app.use(express.static('lib'));
app.set('view engine','pug')
const apiRouter = require('./apiRouter').router
const port=process.env.PORT || 3001
// const bcrypt = require('bcrypt-nodejs')

// bcrypt.hash('tazweedapp', null, null, (err, bcryptPassword) => {
// console.log(bcryptPassword)
// })
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
    console.log('Resonding on root route')
    res.send('Tazweed server')

});
app.use('/api', apiRouter)
const server = http.Server(app)
server.listen(port,() => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`app listen on ${host}:${port}`)
})








