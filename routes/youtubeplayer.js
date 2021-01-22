var express = require('express');
var router = express.Router();
const hac = require('hopamchuan')


// router.get('/', function(req, res, next) {
//     res.render('youtubeplayer', { vidId: 'Cùng xem nào!' });
// });

router.get('/:id', function(req, res) {

    let data = req.params.id;
    videoId = data;


    res.render('youtubeplayer', { vidId: data});

});

router.post('/:id', function(req, res) {

    let data = req.params;
    console.log(data)
    // videoId = data;


    res.render('youtubeplayer', { vidId: data});

});

module.exports = router;
