const mySqlConnection = require('../dbHelper/mySQLHelper');
const bearerTokensDBHelper = require('')(mySqlConnection);
const userDBHelper = require()(mySqlConnection);
const bodyParser = require('body-parser');
const express = require('express');

module.exports = function(){
  var app = express();

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  return app;
}
