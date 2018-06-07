
// マイページ
$(function(){
    Initialize();
});

// 初期化
function Initialize(){
	// アドレスの「?」以降のパラメータを取得
    var id = sessionStorage.getItem('userId');

	var param = { 'id' : id };

    data= {
    	'model'  : 'user',
    	'action' : 'illustIndex',
    	'list'   :  param
    }

    $.ajax({
    	url      : '../../api/controller.php',
    	type     : 'POST',
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){
    	console.log(data);
    	var result = data[0].iconPath.replace('view/', '');
    	$('#mypagepreview').append($('<img src="'+result+'">'));
    	$('.penname').val(data[0].userName);
    	$('.mail').val(data[0].address);
    	sessionStorage.setItem('iconPath', result);

    	trimingIllust('.creatoricon', data[0].iconWidth, data[0].iconHeight);

    	if(data[0].id != -999) {
    		for(var index = 0; index < data.length; index++){
        		var result = data[index].img.replace('view/', '');
                $('.illustbox').append($('<li></li>')
                              .append($('<div></div>').attr({'class' : 'imgbox', 'id' : data[index].id })
                              .append($('<img src="'+result+'">')))
                              .append($('<div></div>').attr({'class': 'textbox'})
                              .append($('<p>'+data[index].imgname+'</p>'))
                              ));
                trimingIllust('#'+data[index].id+'', data[index].width, data[index].height);
            }

    	}
    }).fail(function(){
    	alert('Nodata');
    });
}

// ユーザー名の編集
function editUserName(){
	var name = window.prompt("ユーザ名を入力してください","");
	$('.penname').html(name);
}

// アイコン
//Vue.jsの処理
new Vue({
	el: '#mypagebox',   // ここを変更
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
		},
		// アップロードした画像を表示
		createImage(file){
			var reader = new FileReader();
			reader.onload = (e) => {
				// まずは表示
				this.uploadedImage = e.target.result;
			};
			trimingIllust('.creatoricon')
			reader.readAsDataURL(file);
			// console.log(file.width);
		},
	},
})

//トリミング
function trimingIllust(_class, _width = 150, _height = 150){
	var resizeClass    = _class + ' img';

	var baseWidth  = $(_class).width();
	var baseHeight = $(_class).height();

	// 画像の元サイズを取得
	var newlWidth  = _width;
	var newlHeight = _height;

	// 画像サイズ、表示位置の設定
	if(_width > _height ) {
		newlWidth = baseWidth;
		newlHeight = _height * (baseWidth / _width);
	} else {
		newlHeight = baseHeight;
		newlWidth = _width * (baseHeight / _height);
	}
	var newTop = (baseHeight / 2) - (newlHeight / 2);
	var newLeft = (baseWidth / 2) - (newlWidth / 2);

	$(resizeClass).each(function(){
		$(this).height(newlHeight);
		$(this).width(newlWidth);
		$(this).css("height", newlHeight+"px");
		$(this).css("top", newTop+"px");
		$(this).css("width",newlWidth+"px");
		$(this).css("left", newLeft+"px");
	});
}

function illustTriming(){

	var resizeClass = '.imgbox img';
	var thumnailWidth  = 150;
	var thumnailHeight = 150;

	$(resizeClass).each(function(){

		$(this).height(thumnailHeight);
		$(this).width(thumnailWidth);
		$(this).css("height", 150+"px");
		$(this).css("top", 0);
		$(this).css("width", 150+"px");
		$(this).css("left", 0);

	});
}

// アカウント編集
function sendAccountEdit(){

	var data = new FormData($('#mypageiconform').get(0));
	data.append('model', 'user');
	data.append('action', 'edit');

	var id = sessionStorage.getItem('userId');
    var name = $('.penname').val();
    var address = $('.mail').val();
    var param = [id, name , 'datafile', address];
	data.append('list', param);

    var file = $('#imgadd');
	if(checkSendData(name, file, address)){
		$.ajax({
	    	url         : '../../api/controller.php',
	    	type        : 'POST',
	    	dataType    : 'json',
	    	processData : false,
	    	contentType : false,
	    	data        :  data,
	    	timeout     :  1000,
	    }).done(function(data, dataType){
	    	if(data == 'success') {
	    		alert('編集内容を登録しました。');
		    	location.href = "../html/mypage.html";
	    	} else {
	    		alert(data);
	    	}

	    }).fail(function(){
	    	alert('Nodata');
	    });
	}


}

//バリデーションチェック
function checkSendData(_name, _file, _address){

	var flag = true;
	var message = '';

	if(_name == ""){
		message = 'ユーザ名を入力してください。';
		flag = false;
	}else if(_name.includes(',') == true){
		message = 'カンマは使用できません。';
		flag = false;
	}

    var lg = _file[0].files.length;
    var items = _file[0].files;
    if (lg > 0) {
    	for (var i = 0; i < lg; i++) {
            var fileSize = items[i].size;
            if(fileSize >= 2000000){

            	if(message != '') {
            		message += '\n';
            	}
            	message += 'アイコンのファイルサイズは 2MB より小さくしてください。';
            	flag = false;
            }
        }
    }

    if(_address == ""){
    	if(message != '') {
    		message  += '\n';
    	}
    	message += 'メールアドレスを入力してください。';
    	flag = false;
	}else{
		regexp = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
		// バリデーションチェック
		if(!regexp.test(_address)){
			if(message != '') {
	    		message  += '\n';
	    	}
			message += '半角英数字と記号で記入してください。\n例) sample@test.com';
			flag = false;
		}else{

		}
	}

    if(!flag) {
    	alert(message);
    	var path = sessionStorage.getItem('iconPath');
    	$('#mypageicon').attr('src', path);
    }

	return flag;
}

// アカウントの削除
function deleteAccount() {

	var id = sessionStorage.getItem('userId');
	var param = {'id' : id};
    var data ={'model':'user', 'action':'delete', 'list':param};

    if(window.confirm('このアカウントを削除しますか？\n削除すると作品などのデータも削除されます。')){
    	$.ajax({
        	url         : '../../api/controller.php',
        	type        : 'POST',
        	dataType    : 'json',
        	data        :  data,
        	timeout     :  1000,
        }).done(function(data, dataType){
        	sessionStorage.removeItem('userId');
        	location.href = "../html/index.html";
        }).fail(function(){
        	alert('Nodata');
        });
	}
}

// ログアウト
function logout(){
	sessionStorage.removeItem('userId');
    location.href = "../html/index.html";
}

// 編集画面へ
function moveEdit(){
	location.href = "../html/edit.html"
}