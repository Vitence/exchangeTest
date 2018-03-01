function getPage(pageAt,totalPage){
    pageAt = parseInt(pageAt);
    totalPage = parseInt(totalPage);
    var html = '<div class="pageingBlock">';
    if(totalPage > 1){
        html += '<span class="clickable" data-page="1">首页</span><span class="clickable" data-page="'+(pageAt-1)+'">上一页</span>';
        for (var i = 1; i <= totalPage; i++){
            html += '<span class="clickable" data-page="'+i+'">'+i+'</span>';
        }
        html += '<span class="clickable" data-page="'+(pageAt +1) +'">下一页</span>\n' +
            '                        <span class="clickable" data-page="'+totalPage+'">尾页</span>\n' +
            '                        <span>跳转到</span>\n' +
            '                        <input type="text" class="pageInput">\n' +
            '                        <input type="button" value="GO" class="pageBtn">';
    }
    html += '</div>';
    return html;
}