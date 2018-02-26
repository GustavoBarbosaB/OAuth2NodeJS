let userDBHelper;
let accessTokensDBHelper;
let refreshTokensDBHelper;

module.exports = (injectedUserDBHelper,injectAccessTokensDBHelper,injectRefreshTokensDBHelper) => {
  userDBHelper = injectedUserDBHelper;
  accessTokensDBHelper = injectAccessTokensDBHelper;
  refreshTokensDBHelper = injectRefreshTokensDBHelper;

  return {
      getClient: getClient,
      getUser: getUser,
      saveToken: saveToken,
      getAccessToken: getAccessToken,
      getRefreshToken: getRefreshToken,
      revokeToken:revokeToken
  };
}
/**
@function
Aqui checamos se o client e o secret estão relacionados a determinado usuário
TUDO CERTO!!
**/
function getClient(clientID,clientSecret){

  console.log('The client is: ',clientID,' and secret is: ',clientSecret);

  return {
    id:'client',
    grants:['password','refresh_token'],
    redirectUris:null
  };

}

/**
@function
Receberá o username e o password e fará o teste se o usuário
está cadastrado.
TUDO CERTO!!
**/
function getUser(username, password){
  return userDBHelper.getUserFromCredentials(username, password)
    .then(result=>{
      console.log('Usuario ',result.username,' encontrado!');
      return result;
    })
    .catch(error=>{
      console.log('getUser error: ',error);
    });
}

/**
@function
método que irá salvar a refreshToken e a accessToken.
TUDO CERTO!!!
**/
function saveToken(token, client, user){
  console.log('user_id is:',user.id);

  return Promise.all([
    accessTokensDBHelper
      .saveAccessTokens(token.accessToken,
                       token.accessTokenExpiresAt,
                       user.id),
    refreshTokensDBHelper
      .saveRefreshToken(token.refreshToken,
                        token.refreshTokenExpiresAt,
                        user.id)
  ]).then(response=>{
      console.log(response);
      return ({
        client:'client',
        user:user,
        accessToken:token.accessToken,
        accessTokenExpiresAt:token.accessTokenExpiresAt,
        refreshToken:token.refreshToken,
        refreshTokenExpiresAt:token.refreshTokenExpiresAt,
        token
      })
    })
    .catch(error=>{
      console.log('saveAccessToken error:',error);
    });
}

/**
@function
Aqui iremos checar se o usuario possui uma token, caso positivo
retornaremos a mesma.
TUDO CERTO!!
**/
function getAccessToken(bearerToken){
    console.log('entrouaqui');
  return accessTokensDBHelper
    .getUserIDFromBearerToken(bearerToken)
          .then(accessToken=>{
              //console.log(accessToken);
            if(!accessToken) return false;
            return {
                accessToken: accessToken.access_token,
                accessTokenExpiresAt: accessToken.expires,
                scope:['read','write'],
                user: accessToken.user_id,
                client:'client'
            }
          })
          .catch(error =>{
            console.log('getAccessToken error: ',error)
          });
}

/**
@function
Aqui consultaremos se existe a refreshToken em questão
TUDO CERTO!
**/
function getRefreshToken(refreshToken){
  if(!refreshToken || refreshToken==='undefined') return false;
  return refreshTokensDBHelper
    .findRefreshToken(refreshToken)
    .then(result=>{
        console.log('getRefreshToken: ',result);
      return {
        refreshToken: result.refresh_token,
        refreshTokenExpiresAt: result.expires,
        client:{id:'client'},
        user:{id:result.user_id},
        scope:['read','write']
      };

    })
    .catch(error=>{
      console.log("getRefreshToken - Err: ",error);
    });
}

/**@function
Aqui revogamos as tokens criadas.
TUDO CERTO!
**/
function revokeToken(token) {
    console.log('revokeToken: ',token);
  return refreshTokensDBHelper
    .deleteRefreshToken(token.refreshToken)
    .then(result=>{
      return !!result;
  }).catch(function (err) {
    console.log("revokeToken - Err: ", err)
  });
}
