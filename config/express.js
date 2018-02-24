const mySqlConnection = require('../databaseHelpers/mySQLHelper');
const bearerTokensDBHelper = require('../databaseHelpers/accessTokenDBHelper')(mySqlConnection);
const userDBHelper = require('../databaseHelpers/userDBHelper')(mySqlConnection);
const bodyParser = require('body-parser');
const express = require('express');
//const expressValidator = require('express-validator');
const app = express();
const oAuth2Server = require('oauth2-server');
const oAuthModel = require('../authorization/accessTokenModel')
                                          (userDBHelper,bearerTokensDBHelper);

app.oauth = oAuth2Server({
    model: oAuthModel,
    accessTokenLifetime: 60*60*5,//5hours
    grants: ['password','refresh_token'],
    debug: true
})

//Criação das instancias para as rotas do oauth2
const authRoutesMethods = require('../authorization/authRoutesMethods')
                                          (userDBHelper);

const authRouter = require('../authorization/authRouter')
                                          (express.Router(),app,authRoutesMethods);

//Criação das instancias para as rotas protegidas pelo oAuth2
const restrictedAreaRoutesMethods = require('../restrictedArea/restrictedAreaRoutesMethods');

const restrictedAreaRoutes = require('../restrictedArea/restrictedAreaRoutes')(express.Router(),app,restrictedAreaRoutesMethods);

module.exports = function(){

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/restrictedArea',restrictedAreaRoutes);
  app.use(app.oauth.errorHandler());
  app.use('/auth',authRouter);

  return app;
};
