$(function(){

});

function inputLoginButton(){

	checkValidation();

	var param = "";

	data = {
    'model':'login',
		'action':'login',
		'list': param
	}

	$.ajax({
		url      : '/dils/api/controller.php',
		type     : 'POST',
		dataType : 'json',
		data     :  data,
		timeout  :  1000,
	}).done(function(data, dataType){
		var id = data;


		location.href = "/dils/html/index.html?"+ id;
		//alert('Success');
	}).fail(function(){
		alert('ユーザ名かパスワードが違います。');
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
