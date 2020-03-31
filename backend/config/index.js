module.exports = {

  mysql : {
    host : process.env.NODE_MYSQL_HOST || "3.34.48.162",
    port : 3306,
    user : process.env.NODE_MYSQLDB_USER || "root",
    password : process.env.NODE_MYSQLDB_PASSWORD || "11fkeldh",
    multipleStatements: true,
    database : 'real_estate'
  },
  
  backend: {
    port: 3300
  }

}