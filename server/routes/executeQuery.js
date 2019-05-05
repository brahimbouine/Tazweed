const dynamicDb = require('../config/dynamicConnection');

module.exports = {
	selectQuery(sqlQuery) {
		// console.log(sqlQuery,companyCode);
		return new Promise((resolve, reject) => {
			dynamicDb.connectDbAndReturn().then(db => {
				let sql = sqlQuery;
				db.query(sql, (err, result) => {
					if (err) {
						console.log('error', err);
						db.end();
						reject(err);
					} else {
						db.end();
						resolve(result);
					}
				})
			}).catch((err) => {
				reject(err);
			})
		})
	},
	selectQuery2(dbObject, sqlQuery, companyCode, ) {
		return new Promise((resolve, reject) => {
			let sql = sqlQuery;
			dbObject.query(sql, (err, result) => {
				if (err) {
					console.log('error', err);
					// db.end();
					reject(err);
				} else {
					resolve(result);
				}
			})
		})
	},
	insertQuery(sqlQuery, postData) {
		// console.log('sqlQuery',sqlQuery,companyCode);
		return new Promise((resolve, reject) => {
			dynamicDb.connectDbAndReturn().then(db => {
				let sql = sqlQuery;
				db.query(sql, postData, (err, result) => {
					if (err) {
						db.end();
						console.log('error', err);
						reject(err);
					} else {
						db.end();
						resolve(result);
					}
				})
			}).catch((err) => {
				console.log('error', err);
				reject(err);
			})
		})
	},
	deleteQuery(sqlQuery, companyCode) {
		// console.log(sqlQuery,companyCode);
		return new Promise((resolve, reject) => {
			dynamicDb.connectDbAndReturn(companyCode).then(db => {
				let sql = sqlQuery;
				db.query(sql, null, (err, result) => {
					if (err) {
						console.log('err', err)
						db.end();
						reject(err);
					} else {
						console.log('result', result)
						db.end();
						resolve(result);
					}
				})
			}).catch((err) => {
				console.log('err', err)
				reject(err);
			})
		})
	}
}