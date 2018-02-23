module.exports = {
  accessRestrictedArea:accessRestrictedArea
}

function accessRestrictedArea(req,res){
  res.cookie('poizinhooo','vai se fuder');
  res.send('Você acessou tranquilamente!');

}
