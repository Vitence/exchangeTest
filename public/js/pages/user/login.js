
/**
 * 登陆
 */
$(document).delegate('#login','click',function(){
    var self = $(this);

    var emailEle         = $("#email");
    var passwordEle      = $("#password");
    var imgCodeEle       = $("#imgCode");

    var account       = emailEle.val().trim();
    var password      = passwordEle.val().trim();
    var imgCode       = imgCodeEle.val();
    if (!checkEmail(account)){
        userError(emailEle,'邮箱格式错误');return;
    }


    disableButton(self);

    var tokenName = $("input[name='tokenName']").val();
    var token = $("input[name='token']").val();

    $.post('/user/login',{
        account:account,
        password:password,
        tokenName:tokenName,
        token:token,
        imgCode:imgCode
    },function(json){
        enableButton(self);
        var preUrl =document.referrer;
        $("input[name='tokenName']").val(json.data.tokenName);
        $("input[name='token']").val(json.data.token);
        if (json.code == '0000'){
            if(preUrl.indexOf('user') > 0 || preUrl.indexOf('password') > 0){
                window.location.href='/';
            }else{
                window.location.href=preUrl;
            }
        }else if(json.code == 1001){
            userError(password,'图片验证码错误');
        }else if(json.code == 1002){
            userError(emailEle,'邮箱格式错误');
        }else if(json.code == 1003){
            userError(password,'请填写8-16位字母加数字密码');
        }else if(json.code == 1005){
            userError(emailEle,'邮箱未注册');
        }else{
            errMsg('登陆失败');
        }
    });
});

$(document).delegate('.imgCode', 'click', function(){
    var self = $(this);
    $.get('/user/getImgCode',{},function(json){
        if(json.code == '0000'){
            self.attr("src",json.data);
        }else{
            errMsg('获取图片验证码错误,请刷新页面重试！');
        }
    })
});