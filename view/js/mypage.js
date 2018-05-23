
// マイページ
$(function(){
    Initialize();

});

// 初期化
function Initialize(){
	// アドレスの「?」以降のパラメータを取得
    var id = location.search;
    id = id.substring(1);


    data= {
    	'model'  : 'user',
    	'action' : 'illustIndex',
    	'list'   :  id
    }

    $.ajax({
    	url      : '../../api/controller.php',
    	type     : 'POST',
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){
    	//$('#mypageicon').html('<img id="mypageicon" v-show>')
    	var result = data[0].img.replace('view/', '');
    	$('#mypagepreview').append('<img src="'+result+'">');
    	$('.penname').html(data[0].username);
    	triming();
    	//alert(JSON.stringify(data[0].username));
    }).fail(function(){
    	alert('Nodata');
    });
}

function editUserName(){
	var name = window.prompt("ユーザ名を入力してください","");

	$('.penname').html(name);
	/*new Vue({
		el: '#penname',
		data: {
			message: '',
			inputMessage: ''
		},
		methods: {
			// getMessageを発火させると文字列が代入される
			getMessage: function(){
			    this.message = name
		    }
		}
	})*/
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

		//alert('dddddd');

		$(this).height(thumnailHeight);
		$(this).width(thumnailWidth);
		$(this).css("height", 150+"px");
		$(this).css("top", 0);
		$(this).css("width", 150+"px");
		$(this).css("left", 0);

	});
}

// ユーザ名編集ボタンを押したとき
//var name = window.prompt("ユーザ名を入力してください。","");

/*new Vue({
	el : '#penname',  // テキスト表示場所のID
	data: {
		message: '',
		inputMessage: ''
	},
	methods: {
		// getMessageを発火させると文字列が代入される
		getMessage: function(){
		    this.message = this.inputMessage
	    }
	}
})*/


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

