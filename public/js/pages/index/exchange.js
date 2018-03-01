var pageAt = 1;
var pageSize = 10;

var business_id = 0;
var start_time = '';
var end_time = '';
var totalPage = 0;

getList();
function getList(){
    $.get('/index/getExchange',{
        page_at:pageAt,
        page_size:pageSize,
        business_id:business_id,
        start_time:start_time,
        end_time:end_time
    },function(json){
        if(json.code == '0000'){
            var items = json.data.list;
            var listHtml = '';
            if(items.length > 0){
                for (var i = 0; i< items.length; i++){
                    var item = items[i];
                    listHtml += `<tr class="dataRow">
                            <td>${item.create_at}</td>
                            <td>${item.title}</td>
                            <td>${item.price}</td>
                            <td>${item.number}</td>
                            <td>${item.total_price}</td>
                            <td>${item.name}</td>
                        </tr>`;
                }
            }
            totalPage = json.data.totalPage;
            var page = getPage(pageAt,json.data.totalPage);
            $(".titleRow").nextAll().remove().end().after(listHtml);
            $(".pageingBlock").remove();
            $(".exchangeContent").append(page);
        }
    })
}
$(".startTime").change(function(){
    start_time = $(".startTime").val();
    if(end_time != ''){
        getList();
    }
});
$(".endTime").change(function(){
    end_time = $(".endTime").val();
    if(start_time != ''){
        getList();
    }
});

$(".selectList li").mousedown(function(){
    business_id = $(this).data("id");
    $(".selectForm").attr("placeholder",$(this).html())
    getList();
});

//页码点击
$(document).delegate('clickable','click',function(){
    var curr = $(this).attr("data-page");
    if(curr < 1 || curr > totalPage){
        return false;
    }

    pageAt = curr;
    getList();
});
//go
$(document).delegate('.pageBtn','click',function(){
    var pageNumber = parseInt($(".pageInput").val());
    if(pageNumber < 1 || pageNumber > totalPage){
        return false;
    }
    pageAt = pageNumber;
    getList();
});