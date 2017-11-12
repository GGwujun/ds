var express = require('express');
var router = express.Router();
var db = require('../dbutil/dbutil');
var moment = require('moment');
var jsSHA = require('jssha');


router.get('/token', function (req, res, next) {
    var token = "dsx";
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var echostr = req.query.echostr;
    var nonce = req.query.nonce;


    var oriArray = new Array();
    oriArray[0] = nonce;
    oriArray[1] = timestamp;
    oriArray[2] = token;
    oriArray.sort();

    var original = oriArray.join('');
    var jsSHA = require('jssha');
    var shaObj = new jsSHA(original, 'TEXT');
    var scyptoString = shaObj.getHash('SHA-1', 'HEX');

    if (signature == scyptoString) {
        //验证成功
    } else {
        //验证失败
    }

});

module.exports = router;
