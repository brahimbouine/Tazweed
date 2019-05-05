
const mysql = require('mysql');
const config = require('./config')
module.exports = {
    async  connectDbAndReturn() {
        // console.log('--------------dbName--------------',dbName);
        // connection to database and return database object reference 
        return new Promise(function (resolve, reject) {
            const db1 = mysql.createConnection({
                host: config.development.host,
                user: config.development.username,
                password: config.development.password,
                database: config.development.database,
                charset : 'utf8mb4'
            });
            db1.connect((err) => {
                if (err) {
                    console.log('-' + err);
                    reject(false);
                } else {
                    resolve(db1); // connection success and return database reference
                }
            })
        });
    }
}
