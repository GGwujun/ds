var express = require('express');
var router = express.Router();
var db = require('../dbutil/dbutil');

/* GET users listing. */
router.post('/login', function (req, res, next) {
    let params = req.body;
    var sql = "select * from user where loginid='" + params.username + "'";
    db.select(sql)
        .then(function (data) {
            let Data = null;
            if (data.status == 1) {
                var userdata = data.data[0];
                if (userdata.password === params.password) {
                    Data = {
                        userinfo: userdata,
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
