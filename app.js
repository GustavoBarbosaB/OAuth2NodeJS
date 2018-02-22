const port = 8080;
const portEnv = process.env.PORT;
const app = require(`./config/express`)();

const http = require(`http`).Server(app);

http.listen(portEnv || port,()=>{
  console.log(`Servidor funcionando nas portas`+ port +`ou` + portEnv+`!`);
});
