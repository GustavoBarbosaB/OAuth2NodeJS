let mySqlConnection;
module.exports = injectedMySqlConnection => {

  mySqlConnection = injectedMySqlConnection;

  return {
    saveRefreshToken: saveRefreshToken,
    findRefreshToken: findRefreshToken,
    deleteRefreshToken: deleteRefreshToken
  }
}
const dateFormat=require('dateformat');
function saveRefreshToken(refreshToken,expires,userID) {
    const query =  `INSERT INTO refresh_tokens (refresh_token,expires,user_id) VALUES ('${refreshToken}','${dateFormat(expires,"yyyy-mm-dd HH:MM:ss")}',${userID});`;

    console.log('saveRefreshtoken query:',query);

    return mySqlConnection.query(query)
        .then(result=>{
            return Promise.resolve(result);
        }).catch(err=>{
            console.log('saveRefreshToken error');
            return Promise.reject(err);
        });
}

function findRefreshToken(refreshToken){
    const getUserIDQuery = `SELECT * FROM refresh_tokens WHERE refresh_token = '${refreshToken}';`
    //console.log('findRefreshToken: ',getUserIDQuery);
    return mySqlConnection.query(getUserIDQuery)
        .then(result=>{
            //console.log('Resultado:',result.length===0);
            return Promise.resolve(result !== null && result.length!==0 ? result[0] : null);
        })
        .catch(err=>{
            return Promise.reject(err);
        });
}

function deleteRefreshToken(refreshToken){
    const getUserIDQuery = `DELETE FROM refresh_tokens WHERE refresh_token = '${refreshToken}';`
    console.log('deleteRefreshToken:',getUserIDQuery);
    return mySqlConnection.query(getUserIDQuery)
        .then(result=>{
            return Promise.resolve(result);
        })
        .catch(err=>{
            return Promise.reject(err);
        });
}
