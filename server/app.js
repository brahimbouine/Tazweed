const express = require('express')
const http = require('http')
var fs = require('fs');

// const bodyParser = require('body-parser')
const app = express()
const apiRouter = require('./apiRouter').router
const port=process.env.PORT || 3000

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
    next();
});
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())
app.get('/', (req, res) => {
    console.log('Resonding on root route')
    fs.readFile(__dirname + '/index.html', 'utf8', function(err, text){
        res.send(text);
    })
   // res.send('./index.html')
})
app.use('/api', apiRouter)
const server = http.Server(app)
server.listen(3001,() => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`app listen on ${host}:${port}`)
})








