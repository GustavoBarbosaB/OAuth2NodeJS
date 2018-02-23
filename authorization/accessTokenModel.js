let userDBHelper;
let accessTokensDBHelper;

module.exports = (injectedUserDBHelper,injectAccesTokensDBHelper) => {
  userDBHelper = injectedUserDBHelper;
  accessTokensDBHelper = injectAccesTokensDBHelper;

  return {
      getClient: getClient,
      grantTypeAllowed: grantTypeAllowed,
      getUser: getUser,
      saveAccessToken: saveAccessToken,
      getAccessToken: getAccessToken
  };
}

function getClient(clientID,clientSecret,callback){
  const client = {
    clientID,
    clientSecret,
    grants:null,
    redirectUris:null
  }
  callback(false,client);
}

function grantTypeAllowed(clientID, grantType, callback){
  console.log('grantTypeAllowed called and clientID is: ', clientID, ' and grantType is: ', grantType);
  callback(false,true);
}

function getUser(username, password, callback){
  userDBHelper.getUserFromCredentials(username, password,callback);

}

function saveAccessToken(accessToken, clientID, expires, user, callback){
  console.log('user_id is:',user.user_id);
  accessTokensDBHelper.saveAccessToken(accessToken, user.user_id, callback);
}

function getAccessToken(bearerToken, callback){
  accessTokensDBHelper.getUserIDFromBearerToken(bearerToken,(userID) => {

    //create the token using the retrieved userID
    const accessToken = {
      user: {
        id: userID,
      },
      expires: null
    };

    //set the error to true if userID is null, and pass in the token if there is a userID else pass null
    callback(userID == null ? true : false, userID == null ? null : accessToken)
  });
}

function createAccessTokenFrom(userID) {

    return Promise.resolve({
        user: {
            id: userID,
        },
        expires: null
    });
}
