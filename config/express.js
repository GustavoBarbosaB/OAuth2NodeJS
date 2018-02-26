// Diretorios
const baseDir = '../app/';
const baseHelper = baseDir+'helpers/';
const baseModel = baseDir+'models/';
const baseRoutes = baseDir+'routes/';
const baseRoutesMethod = baseRoutes+'methods/';
//-------------------------------------------

const mySqlConnection = require(baseHelper+'mySQLHelper');
const bearerTokensDBHelper = require(baseHelper+'accessTokenDBHelper')(mySqlConnection);
const refreshTokensDBHelper = require(baseHelper+'refreshTokenDBHelper')(mySqlConnection);
const userDBHelper = require(baseHelper+'userDBHelper')(mySqlConnection);
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const OAuth2Server = require('express-oauth-server');
const oAuthModel = require(baseModel+'accessTokenModel')
                                          (userDBHelper,bearerTokensDBHelper,refreshTokensDBHelper);

app.oauth = new OAuth2Server({
    model: oAuthModel
})

//Criação das instancias para as rotas do oauth2
const authRoutesMethods = require(baseRoutesMethod+'authRoutesMethods')
                                          (userDBHelper);

const authRouter = require(baseRoutes+'authRouter')
                                          (express.Router(),app,authRoutesMethods);

//Criação das instancias para as rotas protegidas pelo oAuth2
const restrictedAreaRoutesMethods = require(baseRoutesMethod+'restrictedAreaRoutesMethods');

const restrictedAreaRoutes = require(baseRoutes+'restrictedAreaRoutes')(express.Router(),app,restrictedAreaRoutesMethods);



module.exports = function(){

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/oauth',authRouter);
    app.use('/restrictedArea',restrictedAreaRoutes);

  return app;
}

