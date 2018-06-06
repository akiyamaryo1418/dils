
// デザイナー新規登録ページ
$(function(){
	var id = sessionStorage.getItem('userId');
	if(id != null) {
		$('#loginlink').html('<li></li>').attr({'id':'mypagelink'})
        .html('<a href="mypage.html">マイページ</a>');
	}
});

// 新規登録ページ情報
// 登録ボタン押したとき
function inputRegistrationButton(){

	var file = $('#imgadd');
	if(checkValidation(file) == false)
		return;

	data = new FormData($('#previewform').get(0));
	data.append('model', 'user');
	data.append('action', 'register');

	var fileName = 'img';
	var param = [ $('#username').val(), $('#password').val(), fileName, $('#mail').val() ];
	data.append('list', param);

    $.ajax({
    	url         : '../../api/controller.php',
    	type        : 'POST',
    	dataType    : 'json',
    	processData : false,
    	contentType : false,
    	data        :  data,
    	timeout     :  1000,
    }).done(function(data, dataType){
    	location.href = "../html/index.html";
        alert(data);
        sessionStorage.setItem('userId', data);
    }).fail(function(){
    	alert('Nodata');
    });
}

// 一覧画面へ移動
function moveIndex(){
    location.href = "../html/index.html";
}

// Vue.jsの処理
new Vue({
	el: '#previewbox',
	data() {
		return {
			uploadedImage: '',
		};
	},
	methods: {
		onFileChange(e){
			var files = e.target.files || e.dataTransfer.files;
			if(!files.length)
				return;
			this.createImage(files[0]);
			triming();
		},
		// アップロードした画像を表示
		createImage(file){
			var reader = new FileReader();
			reader.onload = (e) => {
				// まずは表示
				this.uploadedImage = e.target.result;
			};
			reader.readAsDataURL(file);
		},
	},
})

//トリミング
function triming(){

	var resizeClass    = '.item img';
	var thumnailWidth  = 200;
	var thumnailHeight = 200;
	//var iw, ih;

	$(resizeClass).each(function(){

		/*var w = $(this).width();
		var h = $(this).height();

		if(w >= h){
			iw = (thumnailHeight/h*w-thumnailWidth)/2
			$(this).height(thumnailHeight);
			$(this).css("top",0);
            $(this).css("left","-"+iw+"px");
		}
		else{
			ih = (thumnailWidth/w*h-thumnailHeight)/2
			$(this).css("top","-"+ih+"px");
            $(this).css("left",0);
		}*/

		//====固定値====
		$(this).height(thumnailHeight);
		$(this).width(thumnailWidth);
		$(this).css("height", 200+"px");
		$(this).css("top", -60+"px");
		$(this).css("width", 200+"px");
		$(this).css("left", -70+"px");
        //==============
	});
}

//バリデーションチェック
function checkValidation(_file){

	var checkflag = true;
	var lg = _file[0].files.length;
	var item = _file[0].files;
	var name = $('[name="user"]').val();
	var password = $('[name="password"]').val();
	var mail = $('[name="mail"]').val();
	var string = "";

	for(var index = 0; index < lg; index++){
		var fileSize = item[index].size;
		if(fileSize > 2000000){
			alert('アイコン画像のファイルサイズが大きすぎます。\nファイルサイズは2MB より小さくしてください。');
			checkflag = false;
		}
	}

	if(name == ""){
		string = 'ユーザ名を入力してください。';
		if(password == "" || mail == "")
			string = string + '\n';
	}else if(name.includes(',') == true){
		string = 'カンマは使用できません。';
		if(password == "" || mail == "")
			string = string + '\n';
	}

	if(mail == ""){
		string = string + 'メールアドレスを入力してください。'
	}else{
		regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
		// バリデーションチェック
		if(!regexp.test(mail)){
			string = string + 'メールアドレスの入力形式が違います。';
			if(password == "")
				string = string + '\n';
		}
	}

	if(password == ""){
		string = string + 'パスワード入力してください。';
	}else if(password.length < 8){
		string = string +'パスワードは最低8文字必要です。';
	}


	if(string != ""){
		alert(string);
		checkflag = false;
	}

	return checkflag;
}

// ユーザ名
/*function validationName(){

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
}*/
