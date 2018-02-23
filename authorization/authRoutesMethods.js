let userDBHelper;

module.exports = injectedUserDBHelper => {

    userDBHelper = injectedUserDBHelper

    return {
        registerUser: registerUser,
        login:login
    };
}

function registerUser(req,res){

  const username = req.body.username;
  const password = req.body.password;

  if (!isString(username) || !isString(password)){

       return sendResponse(res, "Invalid Credentials", true)
   }

   userDBHelper.doesUserExist(username, (sqlError, doesUserExist) => {

      //check if the user exists
      if (sqlError !== null || doesUserExist){

        //message to give summary to client
        const message = sqlError !== null ? "Operação mal sucedida" : "Usuário existente"

        //detailed error message from callback
        const error =  sqlError !== null ? sqlError : "Usuário já existe"

        sendResponse(res, message, sqlError)

        return
      }
     userDBHelper.registerUserInDB(username, req.body.password, dataResponseObject => {

       //create message for the api response
       const message =  dataResponseObject.error === null  ? "Registro feito com sucesso" : "Falha ao registrar usuário"

       sendResponse(res, message, dataResponseObject.error)
     })
    });
 }

 function login(registerUserQuery, res){


}

function sendResponse(res,message,error){
    res
        .status(error != null ? error != null ? 400:200:400)
        .json({
            'message':message,
            'error':error
        });

}



function isString(parameter) {

    return parameter != null && (typeof parameter === "string"
                                        || parameter instanceof String) ? true : false;
}
