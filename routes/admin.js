var express = require('express');
var router = express.Router();
var db = require('../dbutil/dbutil');
var moment = require('moment');


/*用户获取文章列表*/
router.get('/selectArticle', function (req, res, next) {
	var query = req.query;
	if(query.uid == 1000)
		var sql = 'select * from article';
	else
		var sql = 'select * from article where uid ='+query.uid;
	
	db.select(sql)
		.then(function (data) {
			if (data.status == 1) {
				let Data = {
					list: {
						current_page: 1,
						data: data.data,
						per_page: "12",
						total: 0
					},
					status: 200,
					success: true
				}
				res.json(Data);
				res.end();
			}
		}).catch(function (err) {

		})
});


router.get('/findArticle', function (req, res, next) {
	var query = req.query;
	var sql = 'select * from article where id=' + query.id;
	db.select(sql)
		.then(function (data) {
			if (data.status == 1) {
				let Data = {
					article_info: data.data[0],
					status: 200,
					success: true
				}
				res.json(Data);
				res.end();
			}
		}).catch(function (err) {

		})
});


router.post('/deleteArticle', function (req, res, next) {
	let params = req.body;
	let sql = 'delete from article where id in (' + params.id+')';
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




//保存文章

router.post('/saveArticle', function (req, res, next) {
	let params = req.body;
	params.tabs = params.tabs.join(',');
	if (params.id) {
		var sql = 'UPDATE article SET ? WHERE id =' + params.id;
		db.uptate(sql, params);
		var data = {
			success: true,
			status: 1
		}
		res.json(data);
		res.end();
	} else {
		var sql = 'insert into article SET ?';
		db.insert(sql, params)
			.then(function (data) {
				var insertid = data.insertId;
				var sql = 'select * from article where id=' + insertid;
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
				console.log(err)
			})
	}
});


module.exports = router;
