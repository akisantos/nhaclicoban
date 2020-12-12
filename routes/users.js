var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.send('Onni chan bake');
  
});

module.exports = router;
