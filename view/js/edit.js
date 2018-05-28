
// イラスト編集ページ
$(function(){
    //Initialize();


});

// 初期化
function Initialize(){

	/*data = {
		'model'  : 'illustration',
		'action' : 'insert',
		'list'   : 'a'
	}

	$.ajax({
		url      : '../../api/controller.php',
		type    ih : 'POST',
		dataType : 'json',
		data     :  data,
		timeout  :  1000,
	}).done(function(data, dataType){
		alert('Success');
	}).fail(function(){
		alert('NoData');
	});*/
}

//======Vue.jsの処理======
new Vue({
	el:'.box1',
	data() {
		return {
			uploadedImage: '',
		};
	},
	methods: {
		onFileChange(e){
			//alert('DD');
			var files = e.target.files || e.dataTransfer.files;
			if(!files.length)
				return;
			this.createImage(files[0]);
			triming('.box1 ');
		},
		deleteFileChange(){
			/*var reader = new FileReader();
			reader.onload = (e) => {
				this.uploadedImage = '';
			}*/


			this.uploadedImage = '';
			resetcss('.box1 ');
			//reader.readAsDataURL('');
		},
		// アップロードした画像を表示
		createImage(file){
			var reader = new FileReader();
			reader.onload = (e) => {
				// 表示
				this.uploadedImage = e.target.result;
			};
			reader.readAsDataURL(file);
		},
	},
})

new Vue({
	el:'.box2',
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
				// 表示
				this.uploadedImage = e.target.result;
			};
			reader.readAsDataURL(file);
		},
	},
})

new Vue({
	el:'.box3',
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
				// 表示
				this.uploadedImage = e.target.result;
			};
			reader.readAsDataURL(file);
		},
	},
})

new Vue({
	el:'.box4',
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
				// 表示
				this.uploadedImage = e.target.result;
			};
			reader.readAsDataURL(file);
		},
	},
})

new Vue({
	el:'.box5',
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
				// 表示
				this.uploadedImage = e.target.result;
			};
			reader.readAsDataURL(file);
		},
	},
})

new Vue({
	el:'.box6',
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
				// 表示
				this.uploadedImage = e.target.result;
			};
			reader.readAsDataURL(file);
		},
	},
})

new Vue({
	el:'.box7',
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
				// 表示
				this.uploadedImage = e.target.result;
			};
			reader.readAsDataURL(file);
		},
	},
})

new Vue({
	el:'.box8',
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
				// 表示
				this.uploadedImage = e.target.result;
			};
			reader.readAsDataURL(file);
		},
	},
})
//========================

//トリミング
function triming(boxclass){


	var resizeClass    = boxclass + '.img-box img';
	//alert(resizeClass);
	var thumnailWidth  = 250;
	var thumnailHeight = 250;
	var iw, ih;

	alert('dds');

	$(resizeClass).each(function(){
		var w = $(this).width();   // 画像の幅(原寸)
		var h = $(this).height();  // 画像の高さ(原寸)

		/*$(this).css("height", "");
		$(this).css("top", "");
		$(this).css("width", "");
		$(this).css("left", "");

		// 横長の画像の場合
		/*if(w >= h){
			iw = (thumnailHeight / h * w - thumnailWidth) / 2
			$(this).height(thumnailHeight);    // 高さをサムネイルに合わせる
			$(this).css("top", 0);
			$(this).css("left", "-"+iw+"px");  // 画像のセンター合わせ
		}

		// 縦長の画像の場合
		else{
			ih = (thumnailWidth / w * h - thumnailHeight) / 2
			$(this).width(thumnailWidth);      // 幅をサムネイルに合わせる
			$(this).css("top","-"+ih+"px");    // 画像のセンター合わせ
			$(this).css("left", 0);
		}*/
		$(this).height(thumnailHeight);
		$(this).width(thumnailWidth);
		$(this).css("height", 250+"px");
		$(this).css("top" , 0);
		$(this).css("width", 250+"px");
		$(this).css("left", 0);
	});
}

function resetcss(boxclass){

	var resizeClass = boxclass + '.img-box img';

	$(resizeClass).each(function(){
		$(this).removeAttr('style');
	});
}

// 画像新規登録
function inputUpdateButton(){

    var id = location.search;
	id = id.substring(1);
	//id = 8;

    // 毎回通信する
    for(var index = 0; index < 8; index++){

    	var data = new FormData($('#send').get(0));
    	data.append('model',  'illustration');
    	data.append('action', 'insert');

    	var name = $('.text'+(index+1)+'').val();

    	var fileName = 'img'+ (index + 1) + '';
        var param = [ id, name, fileName ];
        data.append('list', param);



        if(name != '') {

        	//console.log(JSON.stringify(param));
        	$.ajax({
        		url         : '../../api/controller.php',
        		type        : 'POST',
        		dataType    : 'json',
        		processData : false,
            	contentType : false,
        		data        :  data,
        		timeout     :  1000,
        	}).done(function(data, dataType){
         		console.log(JSON.stringify(data));
        		location.href= "../html/mypage.html?" + id;
        	}).fail(function(){
        		alert('NoData');
        	});
        }
    }
}

//バリデーションチェック
function checkValidation(){



	alert('作品名を入力してください');
	return false;
}
