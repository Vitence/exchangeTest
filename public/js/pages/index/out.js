$(document).delegate('#out ','click',function(){
    var self = $(this);
    var nameEle = $(".name");
    var cardNumberEle = $(".cardNumber");
    var imgCodeEle = $(".imgCode");
    var numberEle = $(".number");
    var payPasswordEle = $(".payPassword");
    var cardEle = $(".card");
    var cardNameEle = $(".cardName");
    var cardOpenEle = $(".cardOpen");

    if(nameEle.val().trim() == ''){
        errMsg('请填写姓名');return;
    }
    if(cardNumberEle.val().trim() == ''){
        errMsg('请填写身份证号');return;
    }
    if(imgCodeEle.val().trim() == ''){
        errMsg('请填写图片验证码');return;
    }
    if(numberEle.val().trim() == ''){
        errMsg('请填写转出数量');return;
    }
    if(payPasswordEle.val().trim() == ''){
        errMsg('请填写交易密码');return;
    }
    if(cardEle.val().trim() == ''){
        errMsg('请填写银行卡号');return;
    }
    if(cardNameEle.val().trim() == ''){
        errMsg('请填写开户人姓名');return;
    }
    if(cardOpenEle.val().trim() == ''){
        errMsg('请填写开户行');return;
    }

    disableButton(self);

    var tokenName = $("input[name='tokenName']").val();
    var token = $("input[name='token']").val();

    $.post('/index/out',{
        name:nameEle.val().trim(),
        cardNumber:cardNumberEle.val().trim(),
        imgCode:imgCodeEle.val().trim(),
        number:numberEle.val().trim(),
        payPassword:payPasswordEle.val().trim(),
        card:cardEle.val().trim(),
        cardName:cardNameEle.val().trim(),
        cardOpen:cardOpenEle.val().trim(),
        tokenName:tokenName,
        token:token
    },function(json){
        enableButton(self);
        $("input[name='tokenName']").val(json.data.tokenName);
        $("input[name='token']").val(json.data.token);
        if (json.code == '0000'){
            window.location.href='/index/outSuccess';
        }else if(json.code == 1007){
            errMsg('原始登陆密码错误');
        }else if(json.code == 1001) {
            errMsg('图片验证码错误');
        }else if(json.code == 1030) {
            errMsg('余额不足');
        }else{
            successMsg('转出失败请重试');
        }
    });
});

var numberEle = $(".number");
numberEle.keyup(function(){
    var price = 0.99;
    $(".realRollOutNumber").html((isNaN(numberEle.val() * price) ? 0 : numberEle.val() * price) + '元');
});