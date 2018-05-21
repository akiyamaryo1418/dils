
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

    }).fail(function(){
    	alert('Nodata');
    });
}

// アイコン編集ボタンを押したとき
/*function inputIconEditButton(){
    var icon = "";
    icon.addEventListerner("change", function(evt){
    	var file = evt.target.files;
    	alert(file[0].name + "を取得");
    }, false);

    new Vue({
    	el : '',  // アイコン表示場所のID
    	data(){
    		return{
    			uploadedImage: '',
    		};
    	},
    	methods:{
    		onFileChange(e){
    			let files = e.target.files || e.dataTransfer.files;
    			this.createImage(files[0]);
    		},
    		// 選択した画像を表示
    		createImage(file){
    			let reader = new FileReader();
    			reader.onload = (e) => {
    				this.uploadedImage = e.target.result;
    			};
    			reader.readAsDataURL(file);
    		}
    	}
    })
}*/

//Vue.jsの処理
new Vue({
	el: '#previewbox',   // ここを変更
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

	var resizeClass    = '.item img';
	var thumnailWidth  = 200;
	var thumnailHeight = 200;

	$(resizeClass).each(function(){

		$(this).height(thumnailHeight);
		$(this).width(thumnailWidth);
		$(this).css("height", 200+"px");
		$(this).css("top", 0);
		$(this).css("width", 200+"px");
		$(this).css("left", 0);

	});
}

// ユーザ名編集ボタンを押したとき
function inputUsernameEditButton(){
    var name = window.prompt("ユーザ名を入力してください。","");

    new Vue({
    	el : '',  // テキスト表示場所のID
    	data: {
    		text1: ''
    	},
    	methods: {
    		doAction: function(){
    			var str = this.text1;
    			this.message = str;
    		}
    	}
    })
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

// 戻るボタンを押したとき
function inputBackButton(){
    location.href = "../../html/index.html";
}
