var express = require('express');
var router = express.Router();
var db = require('../dbutil/dbutil');
var moment = require('moment');

function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}

/*用户获取文章列表*/
router.get('/selectArticle', function (req, res, next) {
	var query = req.query;
	var sql = 'select * from article';
	db.select(sql)
		.then(function (data) {
			if (data.status == 1) {
				let Data = {
					data: data.data,
					per_page: "12",
					total: 0,
					current_page: 1,
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
					data: data.data[0],
					status: 200,
					success: true
				}
				Data.data.replies = [];
				res.json(Data);
				res.end();
			}
		}).catch(function (err) {

		})
});



router.post('/deleteArticle', function (req, res, next) {
	let params = req.body;
	let sql = 'delete from article where id in (' + params.id+')';
	console.log(params)
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



router.post('/replies', function (req, res, next) {
	let params = req.body;
	let reply_id = uuid();
	params.reply_id = reply_id;
	var sql = 'insert into reply SET ?';
	db.insert(sql, params)
		.then(function (data) {
			let Data = {
				reply_id: reply_id,
				status: 200,
				success: true
			}
			res.json(Data);
			res.end();
		}).catch(function (err) {
			console.log(err)
		})
});

module.exports = router;
