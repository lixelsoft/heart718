const db = require('../database/dbQuery');
const isValidCoordinates = require('is-valid-coordinates')
const isNumber = require('is-number');

module.exports = {

  getMyMarker : function (req, res, next) {
    
    db.queryMyMarkerList()
      .then((result) => {

        res.status(200).json({
          markerList: result
        });
      })
      .catch(err => {
        console.log(err);
        res.status(403).json("Error");
      });
  },


  addMarker: function(req, res) {
    // data format
    /**
     * {

     * }
     */
    var data = {
      ...req.body
    };

    db.queryInsertMarker(data)
      .then(() => {
        res.status(200).json();
      })
      .catch(err => {
        res.status(403).json("Error");
      });
  },

  delMarker: function(req, res) {
    // data format
    /**
     * {
     *  id: 3,
     * }
     */
    var data = {
      ...req.body
    };

    db.queryRemoveMarker(data)
      .then(() => {
        res.status(200).json();
      })
      .catch(err => {
        res.status(403).json("Error");
      });
  }

}