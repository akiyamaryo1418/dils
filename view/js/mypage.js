
// マイページ
$(function(){
    Initialize();
});

// 初期化
function Initialize(){
	// アドレスの「?」以降のパラメータを取得
    var id = location.search;
    id = id.substring(1);


    var param = { 'id' : id };

    var data= {
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
<<<<<<< HEAD
<<<<<<< HEAD
    	$('.penname').html(data[0].username);

    	alert(data.length);
    	for(var index = 0; index < data.length; index++){
            $('.illustbox').append($('<li></li>')
                          .append($('<div></div>').attr({'class': 'imgbox'})
=======
    	$('.penname').html(data[0].userName);
    	console.log(JSON.stringify(result));
    	console.log(JSON.stringify(data[0].userName));

    	for(var index = 0; index < data.length; index++){
    		var result = data[index].img.replace('view/', '');
            $('.illustbox').append($('<li></li>')
                          .append($('<div></div>').attr({'class' : 'imgbox', 'id' : data[index].id })
>>>>>>> origin/akiyama
                          .append($('<img src="'+result+'">')))
                          .append($('<div></div>').attr({'class': 'textbox'})
                          .append($('<p>作品タイトル</p>'))
                          .append($('<p>カテゴリー</p>').attr({'class':'category'}))));
        }


<<<<<<< HEAD

    	triming();
    	illusttriming();
=======
    	triming();
    	illustTriming();
>>>>>>> origin/akiyama
    	//alert(JSON.stringify(data[0].username));
=======
    	$('.penname').html(data[0].userName);

    	if(data[0].id != -999) {
        	for(var index = 0; index < data.length; index++){
        		var result = data[index].img.replace('view/', '');
                $('.illustbox').append($('<li></li>')
                              .append($('<div></div>').attr({'class' : 'imgbox', 'id' : data[index].id })    // ここのIDを修正
                              .append($('<img src="'+result+'">')))
                              .append($('<div></div>').attr({'class': 'textbox'})
                              .append($('<p>作品タイトル</p>'))
                              .append($('<p>カテゴリー</p>').attr({'class':'category'}))));
            }
    	}
    	triming();
    	illustTriming();
>>>>>>> yamasaki
    }).fail(function(){
    	alert('Nodata');
    });
}

// イラストのライトボックスを開く(編集)
function openIllustLightbox(){
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> yamasaki

}

function editUserName(){
	var name = window.prompt("ユーザ名を入力してください","");
<<<<<<< HEAD

=======

=======
	$('.penname').html(name);
>>>>>>> yamasaki
}

// 画像情報の編集
function sendIllustEdit() {

<<<<<<< HEAD
>>>>>>> origin/akiyama
	$('.penname').html(name);
=======
	var param = $('#lightBoxForm').serializeArray();
    var data= {
    	'model'  : 'illustration',
    	'action' : 'edit',
    	'list'   :  param
    }

    $.ajax({
    	url         : '../../api/controller.php',
    	type        : 'POST',
    	dataType    : 'json',
    	data        :  data,
    	timeout     :  1000,
    }).done(function(data, dataType){
    	console.log(data);
    }).fail(function(){
    	alert('Nodata');
    });
>>>>>>> yamasaki
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> yamasaki

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
<<<<<<< HEAD

	var resizeClass = '.imgbox img';
	var thumnailWidth  = 150;
	var thumnailHeight = 150;
>>>>>>> origin/akiyama

	$(resizeClass).each(function(){

		$(this).height(thumnailHeight);
		$(this).width(thumnailWidth);
		$(this).css("height", 150+"px");
		$(this).css("top", 0);
		$(this).css("width", 150+"px");
		$(this).css("left", 0);

	});
}

<<<<<<< HEAD
function illusttriming(){

=======
>>>>>>> yamasaki
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

// アカウント編集登録
function sendAccountEdit(){

<<<<<<< HEAD
	//data = new FormData($('#mypageiconform').get(0));
=======
// アカウント編集登録
function sendAccountEdit(){

>>>>>>> origin/akiyama
	data = new FormData($('#mypageiconform').get(0));
=======
	var data = new FormData($('#mypageiconform').get(0));
>>>>>>> yamasaki
	data.append('model', 'user');
	data.append('action', 'edit');

	var url = location.search;
    var id = url.substring(1);

    var name = $('.penname').text();
    var param = [id, name, 'datafile'];
	data.append('list', param);

	console.log(param);

    $.ajax({
    	url         : '../../api/controller.php',
    	type        : 'POST',
    	dataType    : 'json',
    	processData : false,
    	contentType : false,
    	data        :  data,
    	timeout     :  1000,
    }).done(function(data, dataType){
    	//console.log(data);
    	location.href = "../html/index.html?"+id;
        //alert(data);
    }).fail(function(){
    	alert('Nodata');
    });
}

function deleteAccount() {


	var id = location.search;
	id = id.substring(1);

	var data = {'model':'user', 'action': 'delete', 'list': id};
	console.log(data);

	$.ajax({
    	url         : '../../api/controller.php',
    	type        : 'POST',
    	dataType    : 'json',
    	data        :  data,
    	timeout     :  1000,
    }).done(function(data, dataType){
    	console.log(data);
    	//location.href = "../html/index.html?"+id;
        //alert(data);
    }).fail(function(){
    	alert('Nodata');
    });
}


// 編集画面へ
function moveEdit(){

	var id = location.search;
	id = id.substring(1);

	location.href = "../html/edit.html?"+id;
}

// 削除ボタンを押したとき
function inputDeleteButton(){
	// アドレスの「?」以降のパラメータを取得
    var id = location.search;
    id = id.substring(1);

    data= {
    	'model'  : 'mypage',
    	'action' : 'mypage',
    	'list'   :  id
    }

    $.ajax({
    	url      : '../../api/controller.php',
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
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> origin/akiyama
=======

>>>>>>> yamasaki
