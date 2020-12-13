var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Nhạc Lý Cơ Bản',lessonID: '"0"' });
});

router.get('/lesson/:id', function(req,res,next){
  let holder = JSON.stringify(req.params.id);
  res.render('index', { lessonID: holder});
})

module.exports = router;
