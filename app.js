var app = require(`./config/express`)();
var http = require(`http`).Server(app);

http.listen(process.env.PORT || 3000,function(){
  console.log(`Servidor funcionando!`);
});
