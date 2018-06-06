
// イラスト編集ページ
$(function(){
    Initialize();

});

// 初期化
function Initialize(){
	var id = sessionStorage.getItem('userId');
	if(id != null) {
		$('#loginlink').html('<li></li>').attr({'id':'mypagelink'})
        .html('<a href="mypage.html">マイページ</a>');
	}
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
			var files = e.target.files || e.dataTransfer.files;
			if(!files.length)
				return;
			this.createImage(files[0]);
			triming('.box1 ');
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
			triming('.box2 ');
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
			triming('.box3 ');
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
			triming('.box4 ');
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
	var thumnailWidth  = 250;
	var thumnailHeight = 250;
	var iw, ih;


	$(resizeClass).each(function(){
		var w = $(this).width();   // 画像の幅(原寸)
		var h = $(this).height();  // 画像の高さ(原寸)

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

//画像新規登録
function inputUpdateButton(){


	var flag = true;
	for(var index = 0; index < 4; index++){

        var name = $('.text'+(index+1)+'').val();
        var file = $('#img'+(index+1)+'');

        if(checkSendData(name, file)) {
        	console.log("success");
        }
        else {
        	flag = false;
        	return;
        }
	}



	if(flag) {
		// 毎回通信する
		for(var index = 0; index < 4; index++){

			var data = new FormData($('#send').get(0));
			data.append('model',  'illustration');
			data.append('action', 'insert');
			var name = $('.text'+(index+1)+'').val();
	    	var category = $('#categoryid_'+(index+1)+'').val();

	    	var id = sessionStorage.getItem('userId');
	    	var fileName = 'img'+ (index + 1) + '';
	        var param = [ id, name, fileName, category ];
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
	    		if(data == 'success') {
	    			alert('画像の登録が完了しました。');
	    			location.href= "../html/mypage.html";
	    		} else {
	    			//console.log(data);
	    			return;
	    		}
	    		console.log(data);
	    	}).fail(function(){
	    		alert('NoData');
	    	});
	    }

		/*var promises = [];
		for(var index = 0; index < 4; index++) {
		    (function(index) {
		        promises.push(Test(index));
		    })(index);
		}

		Promise.all(promises).then(function(_data) {
			for(var index = 0; index < 4; index++) {
				console.log(_data[index]);
				var file = $('#img'+(index+1)+'').val();
				if(file != '') {
					$.ajax({
						url         : '../../api/controller.php',
						type        : 'POST',
						dataType    : 'json',
						processData : false,
				    	contentType : false,
						data        :  _data[index],
						timeout     :  1000,
					}).done(function(data, dataType){
						console.log(data);
					}).fail(function(){
						alert('NoData');
					});
				}
			}

		});*/


	}


}

/*function Test(index) {
	console.log(index);
	return new Promise(function(resolve, reject) {
		var data = new FormData($('#send').get(0));
		data.append('model',  'illustration');
		data.append('action', 'insert');
		var name = $('.text'+(index+1)+'').val();
		var category = $('#categoryid_'+(index+1)+'').val();

		var id = sessionStorage.getItem('userId');
		var fileName = 'img'+ (index + 1) + '';
	    var param = [ id, name, fileName, category ];
		data.append('list', param);

	    resolve(data);

		/*$.ajax({
			url         : '../../api/controller.php',
			type        : 'POST',
			dataType    : 'json',
			processData : false,
	    	contentType : false,
			data        :  data,
			timeout     :  1000,
		}).done(function(data, dataType){
			console.log(data);

		}).fail(function(){
			alert('NoData');
		});
	});
}*/


//バリデーションチェック
function checkSendData(_name, _file){

	if(_name == '' && _file.val() == '') {
		// return false;
	}

	if(_name != '' && _file.val() == '') {
		alert('ファイルに画像がありません。');
		return false;
	}

	if(_name == '' && _file.val() != '') {
		alert('作品のタイトルを入力してください。');
		return false;
	}

	// 入力文字数が30文字を超えた場合
    if(_name.length > 20 && _file.val() != ''){
    	alert('タイトルは20文字までしか登録できません。');
    	return false;
    }

    var lg = _file[0].files.length;
    var items = _file[0].files;
    if (lg > 0) {
    	for (var i = 0; i < lg; i++) {
            var fileSize = items[i].size;
            if(_name != '' && fileSize >= 2000000){
            	alert('作品タイトル「 '+_name+ ' 」のファイルサイズが大きすぎます。\nファイルサイズは 2MB より小さくしてください.');
            	return false;
            }
        }
    }
	return true;
}
