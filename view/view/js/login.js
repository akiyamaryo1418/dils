
// ログインページ
$(function(){

});

// ログインボタン
function inputLoginButton(){

	if(checkValidation() == false)
		return;

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

// バリデーションチェック
function checkValidation(){

	var checkflag = true;
	var name = $('[name="user"]').val();
	var password = $('[name="password"]').val();
	var string = "";

	if(name == ""){
		string = 'ユーザ名を入力してください。';
		if(password == "")
			string = string + '\n';
	}

	if(password == "")
		string = string + 'パスワード入力してください。';

	if(string != ""){
		alert(string);
		checkflag = false;
	}

	return checkflag;
}
