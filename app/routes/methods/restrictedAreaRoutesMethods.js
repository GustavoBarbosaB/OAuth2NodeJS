module.exports = {
  accessRestrictedArea:accessRestrictedArea
}

function accessRestrictedArea(req,res){
  res.send('Você acessou tranquilamente!');

}
