console.log('loaded')
$('#process-line').width(0);

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