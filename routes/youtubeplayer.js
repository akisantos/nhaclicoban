var express = require('express');
var router = express.Router();


// router.get('/', function(req, res, next) {
//     res.render('youtubeplayer', { vidId: 'Cùng xem nào!' });
// });

router.get('/:id', function(req, res) {

    let data = req.params.id;
    res.render('youtubeplayer', { vidId: data });

});


module.exports = router;
