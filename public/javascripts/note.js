document.title =' Note bạn đã lưu'
$("#lesson-name-header").hide();
$("#lessonID").hide();
$('#toTopBtn').fadeOut();

let x = localStorage.getItem('crrNote');
console.log(x)
if (x !== null){
    let t = x;
    $('#total').html('Tổng: ' + t )

    for(let i=1; i<=x;i++){
        let temp = localStorage.getItem('note'+i);
        let holder = JSON.parse(temp);
        console.log(holder)
        let protocol =window.location.protocol;
        $('#lessonContent').append('<a href="'+protocol+"/funny/player/"+holder.content+'">'+holder.title+'</a> <br>');
    }
}


$('#delete-all').click(()=>{
    localStorage.clear();
    localStorage.setItem('crrNote',0);
    window.location.reload();
})

$(document).ready(()=>{
    
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });
})