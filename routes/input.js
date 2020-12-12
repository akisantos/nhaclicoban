var express = require('express');
var router = express.Router();
var fs = require('fs');


router.get('/', function(req, res, next) {
    res.render('testroute', { title: 'Nhạc Lý Cơ Bản' });
});

router.post('/upload', function(req, res) {

    let data = req.body.data;
    console.log(data, typeof(data))
    let convertedData = JSON.parse(data);
    console.log(convertedData)
    fs.writeFileSync('./public/javascripts/data.json', data);
    res.send('Ok')
});



module.exports = router;