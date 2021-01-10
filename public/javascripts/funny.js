$(document).ready(()=>{ 
    
    //Khi load trang hoàn tất, kích sidebar
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Phím tắt
    $('#seach-box').keypress(function(e){
        if(e.which == 13){
            $('#search-submit').click();
        }
    });

    
})


// Searchbox
var keywords;

$('#seach-box').keyup(function () {
    keywords = $("#seach-box").val();

});

$("#search-submit").click(()=>{
    var ele = document.getElementsByName('instrument'); 
    let instrumentType = ['100 Top Song','piano tutorial','guitar tutorial','ukulele tutorial'];
    let pos=0; 
    $("#ress").html('Chờ tí xíu nha 😅');
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked){
            pos = i;
            $('#theloai').html("Thể loại: "+ele[i].value)
            
        }
    } 
    let LocationLink = window.location.href;

    let holder = keywords +' ' +instrumentType[pos];
    if (holder !=='' && holder !== undefined){

        $.post(LocationLink+'/keywords',{"data":holder}, function(result){
            console.log(result)
            $("#ress").html('Yay! Có hàng rồi nè 😎');
            $('.searchResult').html('')
            if (result !==undefined && result !== null){

                result.forEach((data) => {

                    let crrLocation = LocationLink + '/player/' + data.videoId;
                    $('.searchResult').append('<a href='+crrLocation+' ><div class="media"><img class="d-flex mr-3" src="'+data.thumbnail+'" style="width:15%"><div class="media-body"><h4 class="mt-0">'+data.title + data.author.name+'</h4><h5>Thời lượng: '+data.timestamp+'</h5><p>'+data.description+'</p></div></div></a><br>')
                });
            }
    
        }).catch((error) => {
            $("#theloai").html('Lỗi! Xin thử lại: ', error);
        });
    }else{
        $('#ress').html('Bạn phải nhập gì vào chứ')
    }


})

// Tự động load khi xong trang
$(document).ready(()=>{
    let LocationLink = window.location.href;
    $.post(LocationLink+'/keywords',{"data":'top 100 piano guitar song'}, function(result){
        console.log(result)
        $("#ress").html('Yay! Bạn không biết chơi bài gì? Xem qua thử nhé! 😎');
        $('.searchResult').html('')
        if (result !==undefined && result !== null){

            result.forEach((data) => {

                let crrLocation = LocationLink + '/player/' + data.videoId;
                $('.searchResult').append('<a href='+crrLocation+' ><div class="media"><img class="d-flex mr-3" src="'+data.thumbnail+'" style="width:15%"><div class="media-body"><h4 class="mt-0">'+data.title + data.author.name+'</h4><h5>Thời lượng: '+data.timestamp+'</h5><p>'+data.description+'</p></div></div></a><br>')
            });
        }

    }).catch((error) => {
        $("#theloai").html('Lỗi! Xin thử lại: ', error);
    });
})
