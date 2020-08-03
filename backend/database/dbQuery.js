var mysql = require("mysql");
var mysqlConfig = require("../config").mysql;
var pool  = mysql.createPool(mysqlConfig);

module.exports = {

  queryMyMarkerList : function() {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM EstateList ORDER BY `id`;', function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  queryInsertMarker: function(data) {

    return new Promise(function(resolve, reject) {
      let params = [data.date, data.price, data.address];
      let sqlQuery = mysql.format("INSERT INTO EstateList(date, price, address) VALUES(?, ?, ?);", params);

      pool.query(sqlQuery, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  queryRemoveMarker: function(data) {
    return new Promise(function(resolve, reject) {
      let params = [data.id];
      let sqlQuery = mysql.format("DELETE FROM EstateList WHERE `id`= ?;", params);

      pool.query(sqlQuery, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },

  queryGetDailyRevenue: function() {
    return new Promise(function(resolve, reject) {
      // let params = [];
      let sqlQuery = "SELECT Date(`date`) AS `dt`, SUM(`fan_revenue`) AS `sum` FROM `ads_revenue` GROUP BY `dt` ORDER BY `dt` DESC;";
      // let sqlQuery = "SELECT * FROM `ads_revenue`;"
      // let sqlQuery = mysql.format("", params);

      pool.query(sqlQuery, function (error, results, fields) {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

}