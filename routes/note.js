var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('notepage', { title: 'Nhạc Lý Cơ Bản',lessonID: '"0"' });
});


module.exports = router;
