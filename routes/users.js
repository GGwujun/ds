var express = require('express');
var router = express.Router();
var db = require('../dbutil/dbutil');
var moment = require('moment');

/* GET users listing. */
router.post('/selectUser', function (req, res, next) {
	var sql = 'select * from user';
	db.select(sql)
		.then(function (data) {
			if (data.status == 1) {
				let Data = {
					list: data.data,
					status: 200,
					success: true
				}
				res.json(Data);
				res.end();
			}
		}).catch(function (err) {

		})
});


router.get('/findUser', function (req, res, next) {
	var query = req.query;
	var sql = 'select * from user where id=' + query.id;
	db.select(sql)
		.then(function (data) {
			if (data.status == 1) {
				let Data = {
					userinfo: data.data[0],
					status: 200,
					success: true
				}
				res.json(Data);
				res.end();
			}
		}).catch(function (err) {

		})
});



router.get('/GetUser', function (req, res, next) {
	var query = req.query;
	var sql = 'select * from user where loginid=' + query.loginid;
	db.select(sql)
		.then(function (data) {
			if (data.status == 1) {
				let Data = {
					data: data.data[0],
					status: 200,
					success: true
				}
				res.json(Data);
				res.end();
			}
		}).catch(function (err) {

		})
});


router.get('/GetUserid', function (req, res, next) {
	var query = req.query;
	var sql = 'select * from user where id=' + query.id;
	db.select(sql)
		.then(function (data) {
			if (data.status == 1) {
				let Data = {
					data: data.data[0],
					status: 200,
					success: true
				}
				res.json(Data);
				res.end();
			}
		}).catch(function (err) {

		})
});



router.post('/saveUser', function (req, res, next) {
	let params = req.body;
	if (params.id) {
		var sql = 'UPDATE user SET username=? WHERE id =' + params.id;
		db.uptate(sql, params);
		var data = {
			success: true,
			status: 1
		}
		res.json(data);
		res.end();
	} else {
		var sql = 'insert into user SET ?';
		db.insert(sql, params)
			.then(function (data) {
				var insertid = data.insertId;
				var sql = 'select * from user where id=' + insertid;
				db.select(sql)
					.then(function (data) {
						if (data.status == 1) {
							let Data = {
								data: data.data[0],
								status: 200,
								success: true
							}
							res.json(Data);
							res.end();
						}
					}).catch(function (err) {

					})

			}).catch(function (err) {

			})
	}
});



router.post('/updateUserAccess', function (req, res, next) {
	let params = req.body;
	if (params.id) {
		var sql = 'UPDATE user SET ? WHERE id =' + params.id;
		db.uptate(sql, params);
		var data = {
			success: true,
			status: 1,
			data: {
				access: params
			}
		}
		res.json(data);
		res.end();
	}
});


router.post('/deleteUser', function (req, res, next) {
	let params = req.body;
	let sql = 'delete from user where id in (' + params.id + ')';
	db.delete(sql)
		.then(function (data) {
			if (data.status == 1) {
				let Data = {
					status: 200,
					success: true
				}
				res.json(Data);
				res.end();
			}
		}).catch(function (err) {

		})
});




//根据字段值更新值

router.post('/updateUser', function (req, res, next) {
	let params = req.body;
	let flag = params.flag;
	let value = params.value;
	var sql = 'UPDATE user SET ' + flag + '=' + value + ' WHERE id =' + params.id;
	db.uptate(sql, { flag: value });
	var data = {
		success: true,
		status: 200
	}
	res.json(data);
	res.end();
});


//注册接口

router.post('/regest', function (req, res, next) {
	let params = req.body;
	var loginid = req.body.loginid
	var passWord = req.body.passWord
	var sql = "select * from user where loginid='" + loginid + "'";
	db.select(sql)
		.then(function (data) {
			if (data.status == 1) {
				var data = {
					success: false,
					msg: '该账号已被注册'
				}
				res.json(data)
			} else {
				var sql = 'insert into user SET ?';
				params.username = loginid;
				db.insert(sql, params)
					.then(function (data) {
						var insertid = data.insertId;
						var sql = 'select * from user where id=' + insertid;
						db.select(sql)
							.then(function (data) {
								if (data.status == 1) {
									let Data = {
										data: data.data[0],
										status: 200,
										success: true
									}
									res.json(Data);
									res.end();
								}
							}).catch(function (err) {

							})

					}).catch(function (err) {

					})
			}
		})
});


//登陆接口

router.post('/login', function (req, res, next) {
	let params = req.body;
	var sql = "select * from user where loginid='" + params.loginid + "'";
	db.select(sql)
		.then(function (data) {
			let Data = null;
			if (data.status == 1) {
				var userdata = data.data[0];
				if (userdata.password === params.password) {
					Data = {
						data: userdata,
						status: 200,
						success: true
					}
				} else {
					Data = {
						data: { message: '密码错误' },
						status: 200,
						success: false
					}
				}
			} else {
				Data = {
					data: { message: '账号不存在' },
					status: 200,
					success: false
				}
			}
			res.json(Data);
			res.end();
		})
		.catch(function (err) {
			console.log(err)
		})
});

module.exports = router;
