
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
  $('#toTopBtn').fadeOut();
  document.title = 'Tự học chơi nhạc cụ'

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
    $(this).toggleClass('active');
    });
})
let vidId = $('#id').text();

function onYouTubePlayerAPIReady() {
    player = new YT.Player('ytplayer', {
      height: '400px',
      width: '90%',
      videoId: vidId,

      events:{
        'onReady': onPlayerReady
      }
    });

    
}
let vidTitle;
function onPlayerReady(event){
    event.target.playVideo();
    vidTitle = event.target.getVideoData().title;
    $('#videoTitle').html(vidTitle)
}

let crrLocation = window.location.href;
$('.fb-comments').attr("data-href",crrLocation);

function search(){
    window.location.href = window.location.protocol +'/funny'
}

// ScrollToTop

$(".lesson").ready(function() {
    $(".lesson").scroll(function() {
        if ($(this).scrollTop() > 20) {
        $('#toTopBtn').fadeIn();
    } else {
        $('#toTopBtn').fadeOut();
    }
});
    
$('#toTopBtn').click(function() {
    $(".lesson").animate({
        scrollTop: 0
    }, 1000);
        return false;
    });
});

// Save note
$('#save-note').click(()=>{
    console.log(localStorage.getItem('crrNote'))
    if (localStorage.getItem('crrNote') !== null){
        let x = localStorage.getItem('crrNote');
        x++;
        
        let storeObj = {
            title: vidTitle,
            content: vidId,
            noteOrder: x+1,
        }


        localStorage.setItem('note'+x,JSON.stringify(storeObj));
        localStorage.setItem('crrNote',x);
        $('#save-note').attr('disabled','')
        $('#status').html('Note thành công')
    }else{
        localStorage.setItem('crrNote',1);
        let storeObj = {
            title: vidTitle,
            content: vidId,
            noteOrder: 1,
        }
        localStorage.setItem('note1',JSON.stringify(storeObj));
    }

})