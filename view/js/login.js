
// ログインページ
$(function(){

});

// ログインボタン
function inputLoginButton(){

	//checkValidation();

	var param = $('#login').serializeArray();

	data = {
		'model'  : 'user',
		'action' : 'login',
		'list'   :  param
	}

	//alert(JSON.stringify(param));

	$.ajax({
		url      : '../../api/controller.php',
		type     : 'POST',
		dataType : 'json',
		data     :  data,
		timeout  :  1000,
	}).done(function(data, dataType){

		//alert(JSON.stringify(id));
		var id = data;
		sessionStorage.setItem('userId', id);

		if(id == -999){
			alert('ユーザ名かパスワードが違います。');
		}else{
			location.href = "../html/index.html";
		}
	}).fail(function(){
		alert('ユーザ名かパスワードが違います。');
	});
}

function debugButton(){
	//location.href = "../html/index.html";
}

// バリデーションチェック
function checkValidation(){
	validationName();
	validationPassword();
}

// ユーザ名
function validationName(){
	var name = "";

	if(name == "")
		alert('ユーザ名を入力してください。');
}

// パスワード
function validationPassword(){
	var password = "";

	if(password == ""){
		alert('パスワードを入力してください。')
	}
	else if(password.length < 8){
		alert('最低8文字必要です。');
	}
}
