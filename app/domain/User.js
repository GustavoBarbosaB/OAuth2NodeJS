class user{
  constructor(){
    this._name = null;
    this._password = null;
    this._email=null;
  }
  set nome(nameUser){
    this._name = nameUser;
  }
  set password(passwordUser){
    this._password = passwordUser;
  }
  set email(emailUser){
    this._email=emailUser;
  }
}

module.exports = new user();
