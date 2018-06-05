
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
    	var result = data[0].iconPath.replace('view/', '');
    	$('#mypagepreview').append($('<img src="'+result+'">'));
    	$('.penname').val(data[0].userName);

    	sessionStorage.setItem('iconPath', result);

    	if(data[0].id != -999) {
    		for(var index = 0; index < data.length; index++){
        		var result = data[index].img.replace('view/', '');
                $('.illustbox').append($('<li></li>')
                              .append($('<div></div>').attr({'class' : 'imgbox', 'id' : data[index].id })
                              .append($('<img src="'+result+'">')))
                              .append($('<div></div>').attr({'class': 'textbox'})
                              .append($('<p>'+data[index].imgname+'</p>'))
                              ));
            }
    		triming();
        	illustTriming();


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
			triming();
			reader.readAsDataURL(file);
		},
	},
})

//トリミング
function triming(){
	var resizeClass    = '.creatoricon img';
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
    var param = [id, name , 'datafile']
	data.append('list', param);

    var file = $('#imgadd');
	if(checkSendData(name, file)){
		$.ajax({
	    	url         : '../../api/controller.php',
	    	type        : 'POST',
	    	dataType    : 'json',
	    	processData : false,
	    	contentType : false,
	    	data        :  data,
	    	timeout     :  1000,
	    }).done(function(data, dataType){
	    	location.href = "../html/mypage.html";
	    }).fail(function(){
	    	alert('Nodata');
	    });
	}


}

//バリデーションチェック
function checkSendData(_name, _file){

	if(_name == '') {
		alert('ユーザー名を入力してください。');
		return false;
	}

    var lg = _file[0].files.length;
    var items = _file[0].files;
    if (lg > 0) {
    	for (var i = 0; i < lg; i++) {
            var fileSize = items[i].size;
            if(fileSize >= 2000000){
            	alert('アイコンのファイルサイズは 2MB より小さくしてください.');

            	// 前のアイコン画像に戻す
            	var path = sessionStorage.getItem('iconPath');
            	$('#mypageicon').attr('src', path);
            	return false;
            }
        }
    }
	return true;
}

// アカウントの削除
function deleteAccount() {

	var id = sessionStorage.getItem('userId');
    var data ={'model':'user', 'action':'delete', 'list':id};

    if(window.confirm('このユーザーを削除しますか？')){
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
	else{

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