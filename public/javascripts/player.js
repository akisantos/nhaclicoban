
//Youtube Code
// Load the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
// Replace the 'ytplayer' element with an <iframe> and
// YouTube player after the API code downloads.
var player;

// Lấy Id
$(document).ready(()=>{
  $('#id').hide();
  document.title = 'Tự học chơi nhạc cụ'
})
let vidId = $('#id').text();

function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
      height: '50%',
      width: '60%',
      videoId: vidId,
    });
}

let crrLocation = window.location.href;
$('.fb-comments').attr("data-href",crrLocation);