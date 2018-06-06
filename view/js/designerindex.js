
// デザイナー一覧ページ
$(function(){
	Initialize();
});

// 初期化
// デザイナー一覧を表示している
function Initialize(){
	filterDesigner();

	var id = sessionStorage.getItem('userId');
	if(id != null) {
		$('#loginlink').html('<li></li>').attr({'id':'mypagelink'})
        .html('<a href="mypage.html">マイページ</a>');
	}
}
// フィルタ
function filterDesigner(){
	/*var param = $('#filter').serializeArray();
	var data = {
		'model'  : 'user',
		'action' : 'index',
		'list'   :  param
	};

	$.ajax({
		url      : '../../api/controller.php',
		type     : 'POST',
		dataType : 'json',
		data     :  data,
		timeout  :  1000,
	}).done(function(data, dataType){

		$('.illustratorList').remove();
		if(data != null) {
			for(var index = 0; index < data.length; index++){
				var result = data[index].img.replace('view/', '');
				var id = data[index].id;
				$('#listbox').append($('<li></li>').attr({'class' : 'illustratorList' })
						     .append($('<a></a>').attr({'onclick':'moveDesignerDetails('+id+')'})
						    		 .html('<img src="'+result+'"'+
						                                 'alt="'+data[index].imgname+'">'))
						     .append($('<p></p>').html(data[index].userName)));
			}
		}
		triming();
	}).fail(function(){
		alert('NoData');
	});*/
	var param = {'name' : $('[name="search"]').val()};
	var data = {
			'model'  : 'user',
			'action' : 'index',
			'list'   :  param
		};

		$.ajax({
			url      : '../../api/controller.php',
			type     : 'POST',
			dataType : 'json',
			data     :  data,
			timeout  :  1000,
		}).done(function(data, dataType){

			$('.illustratorList').remove();
			if(data != null) {
				for(var index = 0; index < data.length; index++){
					var result = data[index].img.replace('view/', '');
					var id = data[index].id;
					$('#listbox').append($('<li></li>').attr({'class' : 'illustratorList' })
							     .append($('<a></a>').attr({'onclick':'moveDesignerDetails('+id+')'})
							    		 .html('<img src="'+result+'"'+
							                                 'alt="'+data[index].imgname+'">'))
							     .append($('<p></p>').html(data[index].userName)));
					triming(data[index].width, data[index].height);
				}
			}

		}).fail(function(){
			alert('NoData');
		});
}

//トリミング
function triming(_width, _height){

	var resizeClass    = '.illustratorList img';

	// 表示できる大きさを取得
	var baseWidth = 130;//$('.leftcontents #detailslightbox').width();
	var baseHeight = 130;//$('.leftcontents #detailslightbox').height();

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

	//var resizeClass = '#detailslightbox img';
	$(resizeClass).each(function(){
		$(this).height(newlHeight);
		$(this).width(newlWidth);
		$(this).css("height", newlHeight+"px");
		$(this).css("top", newTop+"px");
		$(this).css("width",newlWidth+"px");
		$(this).css("left", newLeft+"px");
	});


	/*$(resizeClass).each(function(){
		var w = $(this).width();   // 画像の幅(原寸)
		var h = $(this).height();  // 画像の高さ(原寸)
		console.log(w+'___'+h);

		// 横長の画像の場合
		if(w >= h){
			iw = (thumnailHeight / h * w - thumnailWidth) / 2
			$(this).height(thumnailHeight);    // 高さをサムネイルに合わせる
			$(this).css("top", 0);
			$(this).css("left", "-"+iw+"px");  // 画像のセンター合わせ
		}

		// 縦長の画像の場合
		else{
			ih = (thumnailWidth / w * h - thumnailHeight) / 2
			$(this).width(thumnailWidth);      // 幅をサムネイルに合わせる
			$(this).height(thumnailHeight);
			$(this).css("top",0);    // 画像のセンター合わせ
			$(this).css("left", 0);
		}
	});*/
}

// 制作者詳細へ移動
// 引数・・・制作者ID
function moveDesignerDetails(id){
	sessionStorage.setItem('viewUserId', id);
	location.href = "../html/designerdetails.html";
}
