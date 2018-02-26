module.exports = {
  query: query
}

const mySql = require('mysql');

let connection = null;

function initConnection() {
   connection = mySql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'planoCarreiraNodeJS'
  })
}

function query(queryString){

    return new Promise((resolve,reject)=>{
        new initConnection();
        connection.query(queryString, function(error, results, fields){
            if(error) return reject(error);
            resolve(results === undefined ? null : results === null ? null : results);
        });

    });

}
