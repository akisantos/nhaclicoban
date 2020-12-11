var express = require('express');
var router = express.Router();

router.get('/lessonList', function(req, res, next) {
    res.render('lessonList', { title: 'Nhạc Lý Cơ Bản' });
  });
  
  module.exports = router;
  