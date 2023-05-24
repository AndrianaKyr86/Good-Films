var express = require("express");
var router = express.Router();
var db = require("../model/helper");
require("dotenv").config();

// variables needed for bcrypt to do the encryption
const saltRounds = 10;
// variable needed for creating the token
const supersecret = process.env.SUPER_SECRET;

/** all paths start with /api/users  **/

// var jwt = require("jsonwebtoken");
// var bcrypt = require("bcrypt");
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
