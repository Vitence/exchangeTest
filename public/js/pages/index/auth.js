function cardJust(){
    $("#card_just").click()
}
function cardBack(){
    $("#card_back").click()
}
function cardHand(){
    $("#card_hand").click()
}

var arr1 = [];
var arr2 = [];
var arr3 = [];
$("#card_just").change(function(){
    var obj = document.getElementById('card_just');
    var file = obj.files;
    var imgObjPreview;
    imgObjPreview = document.getElementById("card_just_view");
    imgObjPreview.src = URL.createObjectURL(file[0]);
    arr1[0] = file[0];
});

$("#card_back").change(function(){
    var obj = document.getElementById('card_back');
    var file = obj.files;
    var imgObjPreview;
    imgObjPreview = document.getElementById("card_back_view");
    imgObjPreview.src = URL.createObjectURL(file[0]);
    arr2[0] = file[0];
});

$("#card_hand").change(function(){
    var obj = document.getElementById('card_hand');
    var file = obj.files;
    var imgObjPreview;
    imgObjPreview = document.getElementById("card_hand_view");
    imgObjPreview.src = URL.createObjectURL(file[0]);
    arr3[0] = file[0];
});

$("#submit").click(function(){
    var self = $(this);
    var nameEle = $(".name");
    var cardNumber = $(".card_number");

    if(nameEle.val().trim() == ''){
        errMsg('请填写姓名');return;
    }
    if(cardNumber.val().trim() == ''){
        errMsg('请填写身份证号码');return;
    }
    if(arr1.length < 0){
        errMsg('请上传正面身份证照');return;
    }
    if(arr2.length < 0){
        errMsg('请上传反面身份证照');return;
    }
    if(arr3.length < 0){
        errMsg('请上传手持身份证照');return;
    }
    disableButton(self);

    var tokenName = $("input[name='tokenName']").val();
    var token = $("input[name='token']").val();

    var form = new FormData();
    form.append("file1", arr1[0]);
    form.append("file2", arr2[0]);
    form.append("file3", arr3[0]);
    form.append("name", nameEle.val().trim());
    form.append("cardNumber", cardNumber.val().trim());
    form.append("tokenName", tokenName);
    form.append("token", token);

    $.ajax({
        type: 'post',
        url: '/index/authentication',
        data:  form,
        dataType: 'json',
        contentType: false,
        processData: false,
        success: function (json) {
            enableButton(self);
            $("input[name='tokenName']").val(json.data.tokenName);
            $("input[name='token']").val(json.data.token);
            if (json.code == '0000'){
                window.location.href='/index/authenticationing';
            }else{
                successMsg('系统错误，请重试');
            }
        }
    });
});