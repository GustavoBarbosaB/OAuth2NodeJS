const port = 8080||process.env.PORT;
const app = require(`./config/express`)();
app.set('port', port);

app.listen(port,()=>{
  console.log('Servidor funcionando nas portas', port);
})

