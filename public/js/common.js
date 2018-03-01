/**
 * 错误提示
 * 公共
 * @param msg
 */
function errMsg(msg){
    alert(msg);
    return;
}

/**
 * 正确提示
 * 公共
 * @param msg
 */
function successMsg(msg){
    alert(msg);
}

/**
 * 错误提示
 * 登录注册等
 * @param ele
 * @param msg
 */
function userError(ele,msg){
    ele.parent().nextAll('.wrongMsgRow').first().append('<img src="/img/40wrongMsgImg.png">\n' +
        '                <span>'+msg+'</span>');
    setTimeout(function(){
        ele.parent().nextAll('.wrongMsgRow').first().empty();
    },2000);
    return;
}
function userErrorTwo(ele,msg){
    ele.next('span').append('<img src="/img/22wrongMsgIcon1.png">'+
        '<span class="wrongWords">'+msg+'</span>');
    setTimeout(function(){
        ele.next('span').empty();
    },2000);
    return;
}

/**
 * 禁用按钮
 * @param element
 */
function disableButton(element){
    element.attr("disabled","disabled");
}

/**
 * 启用按钮
 * @param element
 */
function enableButton(element){
    element.removeAttr("disabled");
}

/**
 * 验证邮箱
 * @param email
 * @returns {boolean}
 */
function checkEmail(email){
    var emailVal = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(emailVal.test(email)){
        return true;
    }else{
        return false;
    }
}

/**
 * 验证密码
 * 8-16位字母数字特殊字符
 * @param password
 * @returns {boolean}
 */
function checkPassword(password){
    var pass = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))[^\s]{8,16}$/;
    if(pass.test(password)){
        return true;
    }else{
        return false;
    }
}