$(".selectList li").mousedown(function(){
    var id = $(this).data("id");
    window.location.href='?business_id='+id;
});