console.log('loaded')
// $('#process-line').width(0);
$("#lesson-name-header").hide();
$("#lessonID").hide();

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

    // Xử lí nút back and next
    let numberID = parseInt(holder[1]);
    console.log(numberID)
    if (numberID>0 && numberID+1<=2){
        let back= numberID-1;
        let next= numberID+1;
        $("#back-button").attr("href","/lesson/"+back);
        $("#next-button").attr("href","/lesson/"+next);
    }else{
        $("#back-button").attr("href","/lesson/"+0);
        $("#next-button").attr("href","/lesson/"+1);  
    }

    
})
