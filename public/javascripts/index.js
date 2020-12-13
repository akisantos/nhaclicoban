console.log('loaded')
$('#process-line').width(0);
$("#lesson-name-header").hide();
$("#lessonID").hide();

$(".lesson").on('scroll', ()=> { 
    let holder = $(".lesson").scrollTop()*100  / ($(".lessonContent").height() - $(".lesson").height());
    $('#process-line').width(holder);

    if($(".lesson").scrollTop() > 20) {
        let title = $("#lesson-name-header").html();
        $("#lesson-name").html(title);
    }else{
        $("#lesson-name").html('&nbsp;');
    }

})


// JSONPARSER
const edjsParser = edjsHTML();
$(document).ready(()=>{
    let holder = $("#lessonID").html().split('"');

    $.getJSON('/javascripts/data/bai'+holder[1]+'.json',(res,status)=>{

        let html = edjsParser.parse(res);
        $("#lesson-name-header").html(res.blocks[0].data.text);

        $('#lessonContent').html(html);
    }).fail(function() {
        $("#lesson-name-header").html("LỖI KHÔNG TẢI ĐƯỢC BÀI, vui lòng quay lại sau");
        $("#lesson-name-header").show();
      })
    
})