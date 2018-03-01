$(document).delegate('#complete ','click',function(){
    var self = $(this);
    var nameEle = $(".name");
    var imgCodeEle = $(".imgCode");
    var phone = $(".phone");
    var cardEle = $(".card");
    var cardNameEle = $(".cardName");
    var cardOpenEle = $(".cardOpen");

    if(nameEle.val().trim() == ''){
        errMsg('请填写姓名');return;
    }
    if(phone.val().trim() == ''){
        errMsg('请填写手机号');return;
    }
    if(cardEle.val().trim() == ''){
        errMsg('请填写常用银行卡号');return;
    }
    if(cardNameEle.val().trim() == ''){
        errMsg('请填写常用开户人姓名');return;
    }
    if(cardOpenEle.val().trim() == ''){
        errMsg('请填写常用开户行');return;
    }
    if(imgCodeEle.val().trim() == ''){
        errMsg('请填写图片验证码');return;
    }
    disableButton(self);

    var tokenName = $("input[name='tokenName']").val();
    var token = $("input[name='token']").val();

    $.post('/index/complete',{
        name:nameEle.val().trim(),
        imgCode:imgCodeEle.val().trim(),
        phone:phone.val().trim(),
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
            errMsg('信息补全成功');
        }else if(json.code == 1001) {
            errMsg('图片验证码错误');
        }else{
            successMsg('补全失败');
        }
    });
});
