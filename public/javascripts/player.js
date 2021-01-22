
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
    // event.target.playVideo();
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

// Tìm chord 

var keywords;

$('#seach-box').keyup(function () {
    keywords = $("#seach-box").val();

});
function searchChord(){
  console.log(typeof(keywords))
  $.post(crrLocation,{title: keywords},(data)=>{

    // $('#hopam').html(JSON.stringify(data))
    // $('#songName').html(JSON.stringify(data[0].title))

    $('#chord').html(parseChordPro(data))

  })

}


function parseChordPro(template, transpose) {
	if( typeof transpose == "undefined" ) {
		transpose = false;
	}
	var chordregex= /\[([^\]]*)\]/;
	var inword    = /[a-z]$/;
	var buffer    = [];
	var chords    = [];
	var last_was_lyric = false;
	var transpose_chord = function( chord, trans ) {
		var notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
		var regex = /([A-Z][b#]?)/g;
		var modulo = function(n, m) {
				return ((n % m) + m) % m;
		}
		return chord.replace( regex, function( $1 ) {
			if( $1.length > 1 && $1[1] == 'b' ) {
				if( $1[0] == 'A' ) {
					$1 = "G#";
				} else {
					$1 = String.fromCharCode($1[0].charCodeAt() - 1) + '#';
				}
			}
			var index = notes.indexOf( $1 );
			if( index != -1 ) {
				index = modulo( ( index + trans ), notes.length );
				return notes[index];
			}
			return 'XX';
		});
	}
	if (!template) return "";

	template.split("\n").forEach(function(line, linenum) {
		/* Comment, ignore */
		if (line.match(/^#/)) {
			return "";
		}
		/* Chord line */
		if (line.match(chordregex)) {
			if( !buffer.length ) {
				buffer.push('<div class="lyric_block">');
				last_was_lyric = true;
			} else if( !last_was_lyric ) {
				buffer.push('</div><div class="lyric_block">');
				last_was_lyric = true;
			}
			var chords = "";
			var lyrics = "";
			var chordlen = 0;
			line.split(chordregex).forEach(function(word, pos) {
				var dash = 0;
				/* Lyrics */
				if ((pos % 2) == 0) {
					lyrics = lyrics + word.replace(' ', "&nbsp;");
				  /*
				   * Whether or not to add a dash (within a word)
				   */
					if (word.match(this.inword)) {
						dash = 1;
					}
				  /*
				   * Apply padding.  We never want two chords directly adjacent,
				   * so unconditionally add an extra space.
				   */
					if (word && word.length < chordlen) {
						chords = chords + "&nbsp;";
						lyrics = (dash == 1) ? lyrics + "-&nbsp;" : lyrics + "&nbsp&nbsp;";
						for (i = chordlen - word.length - dash; i != 0; i--) {
							lyrics = lyrics + "&nbsp;";
						}
					} else if (word && word.length == chordlen) {
						chords = chords + "&nbsp;";
						lyrics = (dash == 1) ? lyrics + "-" : lyrics + "&nbsp;";
					} else if (word && word.length > chordlen) {
						for (i = word.length - chordlen; i != 0; i--) {
							chords = chords + "&nbsp;";
						}
					}
				} else {
					/* Chords */
					chord = word.replace(/[[]]/, "");
					if(transpose !== false) {
						chord = transpose_chord(chord, transpose);
					}
					chordlen = chord.length;
					chords = chords + '<span class="chord" data-original-val="' + chord + '">' + chord + '</span>';
				}
			}, this);
			buffer.push('<span class="line">' + chords + "<br/>\n" + lyrics + "</span><br/>");
			return;
		}
		/* Commands, ignored for now */
		if (line.match(/^{.*}/)) {
			if( !buffer.length ) {
				buffer.push('<div class="command_block">');
				last_was_lyric = false;
			} else if( last_was_lyric ) {
				buffer.push('</div><div class="command_block">');
				last_was_lyric = false;
			}
			//ADD COMMAND PARSING HERE
			//reference: http://tenbyten.com/software/songsgen/help/HtmlHelp/files_reference.htm
			// implement basic formatted text commands
			var matches = line.match(/^{(title|t|subtitle|st|comment|c):\s*(.*)}/, "i");
			if( matches.length >= 3 ) {
				var command = matches[1];
				var text = matches[2];
				var wrap="";
				//add more non-wrapping commands with this switch
				switch( command ) {
					case "title":
					case "t":
						command = "title";
						wrap = "h1";
						break;
					case "subtitle":
					case "st":
						command = "subtitle";
						wrap = "h4";
						break;
					case "comment":
					case "c":
						command = "comment";
						wrap    = "em";
						break;
				}
				if( wrap ) {
					buffer.push('<' + wrap + ' class="' + command + '">' + text + '</' + wrap + '>' );
				}
			}
			// work from here to add wrapping commands
			return;
		}
		/* Anything else */
		buffer.push(line + "<br/>");
	}, this);
	return buffer.join("\n");
}