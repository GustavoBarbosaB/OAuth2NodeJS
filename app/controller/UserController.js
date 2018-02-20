var user = require('../domain/user')();

module.exports = function(app){
  app.get(`/`,function(request,response){

    // var user = app.domain.User;
    console.log(user);

    user.nome = `Gustavo Barbosa`;
    user.password = 123;
    user.email = `gustavo.barbosa@tqi.com.br`;

    response.status(200).send(user);

  });


  app.get(`/authorize`,function(request,response){
    response.status(401).json({
      "message":"Not authorize!",
      "status":401
    });
  });


}
