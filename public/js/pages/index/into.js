$(document).delegate('#submit ','click',function(){
    var self = $(this);
    var imgCodeEle = $(".imgCode");
    var numberEle = $(".number");
    var cardEle = $(".card");
    var cardNameEle = $(".card_name");



    if(numberEle.val().trim() == ''){
        errMsg('请填写转入数量');return;
    }

    if(cardEle.val().trim() == ''){
        errMsg('请填写银行卡号');return;
    }
    if(cardNameEle.val().trim() == ''){
        errMsg('请填写开户人姓名');return;
    }

    if(imgCodeEle.val().trim() == ''){
        errMsg('请填写图片验证码');return;
    }
    disableButton(self);

    var tokenName = $("input[name='tokenName']").val();
    var token = $("input[name='token']").val();

    $.post('/index/into',{
        imgCode:imgCodeEle.val().trim(),
        number:numberEle.val().trim(),
        card:cardEle.val().trim(),
        cardName:cardNameEle.val().trim(),
        tokenName:tokenName,
        token:token
    },function(json){
        enableButton(self);
        $("input[name='tokenName']").val(json.data.tokenName);
        $("input[name='token']").val(json.data.token);
        if (json.code == '0000'){
            window.location.href='/index/intoSuccess';
        }else if(json.code == 1001) {
            errMsg('图片验证码错误');
        }else{
            successMsg('转入申请失败请重试');
        }
    });
});
