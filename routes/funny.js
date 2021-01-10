var express = require('express');
var router = express.Router();
const yts = require( 'yt-search' )


router.get('/', function(req, res, next) {
    res.render('funny', { title: 'Cùng học đàn nhé!' });
});

router.post('/keywords', function(req, res) {

    let data = req.body.data;
    console.log(data)

    youtubeSearch(data).then(result=>{
        res.send(result);
    })

});

router.get('/player/:id', function(req, res, next) {
    let data = req.params.id;

    res.render('youtubeplayer', { title: data });
});


async function youtubeSearch(keywords){
    
    const r = await yts(keywords)

    const videos = r.videos.slice( 0, 10 )
    return videos;
}

module.exports = router;