let mySqlConnection
const mysql = require('mysql');
module.exports = injectedMySqlConnection => {

  mySqlConnection = injectedMySqlConnection;

  return {
   saveAccessTokens: saveAccessTokens,
   getUserIDFromBearerToken: getUserIDFromBearerToken
 };
}

/**@function
Salvaremos a accessToken
**/
const dateFormat=require('dateformat');
function saveAccessTokens(accessToken,expires, userID) {

    const query = `INSERT INTO access_tokens (access_token,expires,user_id) VALUES ('${accessToken}','${dateFormat(expires,"yyyy-mm-dd HH:MM:ss")}',${userID});`;

    console.log('saveAccessToken query: ',query);

    return mySqlConnection.query(query)
        .then(result=>{
            return Promise.resolve(result);
        }).catch(err=>{
            console.log('saveAccessToken error:',err);
            return Promise.reject(err);
        });
}

function getUserIDFromBearerToken(bearerToken){
    const getUserIDQuery = `SELECT * FROM access_tokens WHERE access_token = '${bearerToken}';`;
    console.log('getUserIDFromBearerToken ',getUserIDQuery);
    return mySqlConnection.query(getUserIDQuery)
        .then(accessToken=>{
            console.log('Resultado da consulta: ',accessToken);
            return Promise.resolve(accessToken !== null ? accessToken[0] : null);
        }).catch(err=>{
            console.log('getUserIDFromBearerToken error', err);
            return Promise.reject(err);
        });
}
