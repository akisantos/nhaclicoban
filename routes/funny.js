var express = require('express');
var router = express.Router();
const yts = require( 'yt-search' )
const hac = require('hopamchuan');
var chordprojs = require("chordprojs")
const markdown = require('html-to-markdown')


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

    res.render('youtubeplayer', { title: data});
});

router.post('/player/:id', function(req, res, next) {
    let songChord;
    let holder = req.body.title;

    hac.autocomplete(holder,(song)=>{
        songChord = JSON.parse(song)
        if (songChord !== undefined){

            let id = songChord.data[0].id;
            hac.get(id,(list)=>{
                console.log(list)
                res.send(list[0].chordPro)
            })
        }else{
            res.send('Lỗi!')
        }

    })




});

async function youtubeSearch(keywords){
    
    const r = await yts(keywords)

    const videos = r.videos.slice( 0, 10 )
    return videos;
}

module.exports = router;