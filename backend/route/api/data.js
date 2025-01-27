var express = require('express');
var router = express.Router();
const controllerAPI = require('../../controller');

router
.get ('/getMarkers', controllerAPI.getMyMarker)
.post ('/addMarkers', controllerAPI.addMarker)
.post ('/delMarkers', controllerAPI.delMarker)

.get ('/getRevenue', controllerAPI.getDailyRevenue)


module.exports = router;
