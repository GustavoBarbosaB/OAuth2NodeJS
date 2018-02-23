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

  mySqlConnection.query(registerUserQuery, registrationCallback);
}

function getUserFromCredentials(username, password, callback) {

  const getUserQuery = `SELECT * FROM users WHERE username = '${username}' AND user_password = SHA('${password}')`;

  console.log('getUserFromCrendentials query is: ', getUserQuery);

  mySqlConnection.query(getUserQuery, (dataResponseObject) => {

      callback(false, dataResponseObject.results !== null && dataResponseObject.results.length  === 1 ?  dataResponseObject.results[0] : null);
  });
}

function doesUserExist(username) {

  const doesUserExistQuery = `SELECT * FROM users WHERE username = '${username}'`;

  const sqlCallback = (dataResponseObject) => {


      const doesUserExist = dataResponseObject.results !== null ? dataResponseObject.results.length > 0 ? true : false : null;

      callback(dataResponseObject.error, doesUserExist);
  };

  mySqlConnection.query(doesUserExistQuery, sqlCallback);
}
