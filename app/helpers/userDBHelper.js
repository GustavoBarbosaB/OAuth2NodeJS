let mySqlConnection;

module.exports = injectedMySqlConnection => {

  mySqlConnection = injectedMySqlConnection;

  return {

   registerUserInDB: registerUserInDB,
   getUserFromCredentials: getUserFromCredentials,
   doesUserExist: doesUserExist
 };
}

function registerUserInDB(username, password, registrationCallback){

  const registerUserQuery = `INSERT INTO users (username, user_password) VALUES ('${username}', SHA('${password}'))`;

    return mySqlConnection.query(registerUserQuery)
        .then(result=>{
            return Promise.resolve(result);
        })
        .catch(err=>{
            return Promise.reject(err);
        });
}

function getUserFromCredentials(username, password) {
    const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND user_password = SHA('${password}')`;
    console.log('getUserFromCrendentials query is: ', getUserQuery);

    return mySqlConnection.query(getUserQuery)
        .then(result => {
            return Promise.resolve(result !== null && result.length === 1 ?
                result[0] : null);
        }).catch(err=>{
            return Promise.reject(err);
        });

}
function doesUserExist(username,callback) {

  const doesUserExistQuery = `SELECT * FROM users WHERE username = '${username}'`;

  return mySqlConnection.query(doesUserExistQuery)
      .then(results=>{
          return Promise.resolve(results !== null ? results.length > 0 ? true : false : null);
      }).catch(err=>{
        return Promise.reject(err);
      });
}
