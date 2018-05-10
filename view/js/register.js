$(function(){

});

// 新規登録ページ情報
// 登録ボタン押したとき
function inputRegistrationButton(){

	// バリデーションチェックの関数を呼び出す
	checkValidation();

	// 新規ユーザ情報
	var param = "";

	data = {
		'model'  : 'user_register',
		'action' : 'register',
		'list'   :  param
	}

    $.ajax({
    	url      : '/dils/api/controller.php',
    	type     : 'POST',
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){
        alert('Success');
    }).fail(function(){
    	alert('Nodata');
    });
}

// バリデーションチェック
function checkValidation(){

    validationName();
    validationPassword();
}

// ユーザ名
function validationName(){

	var name = "";

	if(name != ""){
		if(!name.match(/^[\u3040-\u30ff\u30a0-\u30ff\u30e0-\u9fcf]+$/)){
    		alert('ユーザ名 : 全角文字のみです');
    	}
	}else{
		alert('ユーザ名 : 空白文字が入っています。');
	}
}

// パスワード
function validationPassword(){

	var password = "";

	if(password.length < 8){
		alert('パスワード : 最低8文字必要です。');
	}
}
