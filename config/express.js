const mySqlConnection = require('../databaseHelpers/mySQLHelper');
const bearerTokensDBHelper = require('../databaseHelpers/accessTokenDBHelper')(mySqlConnection);
const userDBHelper = require('../databaseHelpers/userDBHelper')(mySqlConnection);
const bodyParser = require('body-parser');
const express = require('express');
const expressValidator = require('express-validator');
const app = express();
const oAuth2Server = require('node-oauth2-server');
const oAuthModel = require('../authorization/accessTokenModel')
                                          (userDBHelper,bearerTokensDBHelper);

app.oauth = oAuth2Server({
    model: oAuthModel,
    grants: ['password'],
    debug: true
})

const authRoutesMethods = require('../authorization/authRoutesMethods')
                                          (userDBHelper);

const authRouter = require('../authorization/authRouter')
                                          (express.Router(),app,authRoutesMethods);


module.exports = function(){
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(app.oauth.errorHandler());
  app.use('/auth',authRouter);
  return app;
};
