module.exports = {
  accessRestrictedArea:accessRestrictedArea
}

function accessRestrictedArea(req,res){
  let body = req.header('Authorization');
  console.log('body: ',body);
  res.cookie(body);
  res.send('Você acessou tranquilamente:');

}
