console.log('loaded')
// $('#process-line').width(0);
$("#lesson-name-header").hide();
$("#lessonID").hide();
$('#toTopBtn').fadeOut();

// Animation
$("#lesson-name").change(()=>{
    $("#lesson-name").animate({opacity:0},fast,linear);
    $("#lesson-name").animate({opacity:1},slow,linear);
})

$(".lesson").on('scroll', ()=> { 
    let holder = $(".lesson").scrollTop()*100  / ($(".lessonContent").height() - $(".lesson").height());
    $('#process-line').width(holder);

    if($(".lesson").scrollTop() > 20) {
        let title = $("#lesson-name-header").html();
        $("#lesson-name").html(title);


    }else{
        $("#lesson-name").html('Tool học nhạc nho nhỏ của Akkii');
    }

})

// JSONPARSER
const edjsParser = edjsHTML();

$(document).ready(()=>{ 
    
    //Khi load trang hoàn tất, kích sidebar
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });


    //Lấy id bài rồi in ra
    let holder = $("#lessonID").html().split('"');

    $.getJSON('/javascripts/data/bai'+holder[1]+'.json',(res)=>{

        let html = edjsParser.parse(res);
        $("#lesson-name-header").html(res.blocks[0].data.text);
        document.title = res.blocks[0].data.text;

        $('#lessonContent').html(html);
    }).fail(function() {
        $("#lesson-name-header").html("LỖI KHÔNG TẢI ĐƯỢC BÀI, vui lòng quay lại sau");
        $("#lesson-name-header").show();
    })
    
})




// AJAX
function loadJSONthenParse(number){
    $(".lesson").animate({
        scrollTop: 0
    }, 1000);
    $.getJSON('/javascripts/data/bai'+number+'.json',(res)=>{
        let html = edjsParser.parse(res);
        $("#lesson-name-header").html(res.blocks[0].data.text);
        document.title = res.blocks[0].data.text;
        $("#lessonID").html('"'+number+'"');
        $('#lessonContent').html(html);


    }).fail(function() {
        $("#lesson-name-header").html("LỖI KHÔNG TẢI ĐƯỢC BÀI, vui lòng quay lại sau");
        $("#lesson-name-header").show();
        setTimeout(()=>{
            $("#lesson-name-header").hide();
        },5000)

    
})
}

// Xử lí nút back and next

$("#back-button").click(()=>{
    let holder = $("#lessonID").html().split('"');
    let numberID = parseInt(holder[1]);
    if (numberID>0){
        loadJSONthenParse(numberID-1);
    }



})
$("#next-button").click(()=>{
    let holder = $("#lessonID").html().split('"');
    let numberID = parseInt(holder[1]);
    if (numberID<3){
        loadJSONthenParse(numberID+1);
    }

})

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