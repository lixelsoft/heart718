module.exports = {

  mysql : {
    host : process.env.NODE_MYSQL_HOST || "52.78.155.39",
    port : 3306,
    user : process.env.NODE_MYSQLDB_USER || "root",
    password : process.env.NODE_MYSQLDB_PASSWORD || "11fkeldh",
    multipleStatements: true,
    database : 'real_estate'
    // database : 'ads_revenue'

  },
  
  backend: {
    port: 3200
  }

}