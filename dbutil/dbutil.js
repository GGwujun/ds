var mysql = require('mysql'); //mysql Module  
var db = {};


db.select = function (sql) {
	var promise = new Promise(function (resolve, reject) {
		var result = null;
		var mysql = require('mysql');

		var connection = mysql.createConnection({
			host: 'rm-wz9153808r60uremw.mysql.rds.aliyuncs.com',
			user: 'root',
			password: 'Gao876337',
			database: 'frontender'
		});

		connection.connect(function (err) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			console.log('connected as id ' + connection.threadId);
		});

		connection.query(sql, function (err, results, fields) {
			var data = {};
			if (err) {
				data.success = false;
				data.status = 0;
				data.error = err;
				reject(data);
			} else {
				if (results.length > 0) {
					data.status = 1;
					data.success = true;
					data.data = results;
					resolve(data);
				} else {
					resolve({ status: 0 });
				}
			}
		}
		);
		connection.end();
	})

	return promise;
}


db.uptate = function (sql, paramobj) {
	var result = null;
	var mysql = require('mysql');

	var connection = mysql.createConnection({
		host: 'rm-wz9153808r60uremw.mysql.rds.aliyuncs.com',
		user: 'root',
		password: 'Gao876337',
		database: 'frontender'
	});

	connection.connect(function (err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	});

	connection.query(sql, paramobj);
	connection.end();
}


db.delete = function (sql) {
	var promise = new Promise(function (resolve, reject) {
	var result = null;
	var mysql = require('mysql');

	var connection = mysql.createConnection({
		host: 'rm-wz9153808r60uremw.mysql.rds.aliyuncs.com',
		user: 'root',
		password: 'Gao876337',
		database: 'frontender'
	});

	connection.connect(function (err) {
		if (err) {
			console.error('error connecting: ' + err.stack);
			return;
		}
		console.log('connected as id ' + connection.threadId);
	});

	connection.query(sql,function(err, results, fields){
		var data = {};
			if (err) {
				data.success = false;
				data.status = 0;
				data.error = err;
				reject(data);
			} else {
				data.status = 1;
				data.success = true;
				data.data = results;
				resolve(data);
			}
	});
	connection.end();
	})

	return promise;
}


db.insert = function (sql, paramobj) {
	var promise = new Promise(function (resolve, reject) {
		var result = null;
		var mysql = require('mysql');

		var connection = mysql.createConnection({
			host: 'rm-wz9153808r60uremw.mysql.rds.aliyuncs.com',
			user: 'root',
			password: 'Gao876337',
			database: 'frontender'
		});

		connection.connect(function (err) {
			if (err) {
				console.error('error connecting: ' + err.stack);
				return;
			}
			console.log('connected as id ' + connection.threadId);
		});

		connection.query(sql, paramobj, function (err, results, fields) {
			var data = {};
			if (err) {
				data.success = false;
				data.status = 0;
				data.error = err;
				reject(data);
			} else {
				resolve(results);
			}
		}
		);
		connection.end();
	})

	return promise;
}


module.exports = db;