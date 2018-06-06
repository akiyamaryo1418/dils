
// デザイナー詳細ページ
$(function(){
    Initialize();

    $('.creatorillustbox').on('click', '.imgbox', function(){
	    $(".lightbox_view").fadeIn(100);
	});

	$(".close").on('click', function(){
	    $(".lightbox_view").fadeOut(100);
	    $('#detailslightbox').empty();
	});
});

// 初期化
function Initialize(){
	var id = sessionStorage.getItem('viewUserId');
	var list = $('#SearchAndFilter').serializeArray();
	var param = { 'id' : id, 'param':list};

	data = {
		'model'  : 'user',
		'action' : 'illustIndex',
		'list'   :  param
	};

	$.ajax({
		url      : '../../api/controller.php',
		type     : 'POST',
		dataType : 'json',
		data     :  data,
		timeout  :  1000,
	}).done(function(data, dataType){
		var result = data[0].iconPath.replace('view/', '');
		$('.creatoricon').append($('<img src="'+result+'">'));
		$('.penname').html(data[0].userName);
		if(data[0].id != -999) {
			// ここで値を取得し、表示する
			for(var index = 0; index < data.length; index++){
				var result = data[index].img.replace('view/', '')
				$('.creatorillustbox').append($('<li></li>').attr({'class' : 'imgbox'})
									  .append($('<a></a>').attr({'onclick': 'openLightbox('+data[index].id+', "'+result+'", '+data[index].width+', '+data[index].height+')'})
				                      .append($('<img>').attr({'src': result}))));
			}
		}
	}).fail(function(){
		alert('NoData');
	});

	var id = sessionStorage.getItem('userId');
	if(id != null) {
		$('#loginlink').html('<li></li>').attr({'id':'mypagelink'})
        .html('<a href="mypage.html">マイページ</a>');
	}
}

// 前のページへ移動(戻るボタン)
function moveBackButton(){
	location.href = "/dils/view/html/designerindex.html";
}

//フィルタ検索機能(ジャンル)(非同期)
function searchCategory(){

	var list = $('#SearchAndFilter').serializeArray();
	var id = sessionStorage.getItem('viewUserId');
	var param = { 'id' : id, 'param' : list};


	// 必要な情報
	var data = {
		'model'  : 'user',
		'action' : 'illustIndex',
		'list'   :  param
	};

	$.ajax({
		url      : '../../api/controller.php',
		type     : 'POST',
		dataType : 'json',
		data     :  data,
		timeout  :  1000,
	}).done(function(data, dataType){
		//alert(data.length);
		//console.log(data);
		$('.imgbox').remove();
		if(data[0].id != -999) {
			for(var index = 0; index < data.length; index++){
				var result = data[index].img.replace('view/', '')
				$('.creatorillustbox').append($('<li></li>').attr({'class' : 'imgbox'})
				                      .append($('<a></a>').attr(
				                    		  {'onclick': 'openLightbox('+data[index].id+', "'+result+'", '+data[index].width+', '+data[index].height+')'})
						              .append($('<img>').attr({'src': result}))));
			}
		}

	}).fail(function(){
		alert('NoData');
	});
}

// ライトボックスを開く
function openLightbox(id,pass, width, height){
	var param = {'id': id};
	data = {
			'model'  : 'evaluation',
			'action' : 'index',
			'list'   :  param,
		};

	$.ajax({
        url      : '../../api/controller.php',
        type     : 'POST',
        dataType : 'json',
        data     :  data,
        timeout  :  1000,
	}).done(function(data, dataType){
		var icon = data[0].filePath.replace('view/', '');
		$('.iconbox').append('<img class="iconimg" src="'+icon+'">');
		$('.illustname').html(data[0].imageName);
		$('.illustratorname').html(data[0].userName);
		icontriming(data[0].width, data[0].height);

		$('#detailslightbox').html($('<img src="'+pass+'">'));
		lightboxtriming(width, height);
		var intaverage =  6 - Math.floor(data[1].review);

		for(var index = 1; index <= 5; index++){
			$('#star'+index+'').prop('checked', false);
			$('#starbutton'+index+'').prop('checked', false);

		}

		for(var index = 1; index < data.length; index++){
			var starmark = '';
			for(var starindex = 1; starindex <= data[index].point; starindex++){
				starmark = starmark + '★';
			}

			$('.commentbox').append($('<dl class="comment"></dl>')
                            .append($('<dt></dt>').html(data[index].created_at))
                            .append($('<dd></dd>').html(starmark)))
                            .append($('<pre class="comment"></pre>').html(data[index].comment));
		}

		if(intaverage != 6){
			$('#star'+intaverage+'').prop({'checked': 'checked'});
		}

		for(var index = 1; index <= 5; index++){
			$('#star'+index+'').prop({'disabled':'disabled'});
		}

		$('.stop-scrolling').css("overflow", "hidden");

		// 見えないようにしている
		$('.idmem').append($('<input type="radio" name="illustid" value="'+id+'" class="id" checked="checked" display:none>'));
	}).fail(function(){
        alert('no');
	})
}

function closeLightbox(){
	$('.lightboxview').remove();
	$('.comment').remove();
	$('[name="kanso"]').val('');
	$('.id').remove();
	$('.stop-scrolling').css("overflow", "auto");
	// $('body').removeClass("overflow");
}

function icontriming(width, height){
	var resizeClass    = '.iconbox img';
	var iconHeight     =  60;
	var iconWidth      =  60;
	var iw, ih;

	$(resizeClass).each(function(){
		$(this).css("height", 60+"px");
		$(this).css("top",  0);
		$(this).css("width", 60+"px");
		$(this).css("left", 0);
	});
}

function lightboxtriming(_width, _height){

	// 表示できる大きさを取得
	var baseWidth = $('.leftcontents #detailslightbox').width();
	var baseHeight = $('.leftcontents #detailslightbox').height();

	// 画像の元サイズを取得
	var newlWidth  = _width;
	var newlHeight = _height;

	// 画像サイズ、表示位置の設定
	if(_width > _height ) {
		var num = 2;
		if(baseWidth >= newlWidth*num) {
			newlWidth *= num;
			newlHeight *= num;
		} else {
			newlWidth = baseWidth;
			newlHeight = _height * (baseWidth / _width);
		}

	} else {
		newlHeight = baseHeight;
		newlWidth = _width * (baseHeight / _height);
	}
	var newTop = (baseHeight / 2) - (newlHeight / 2);
	var newLeft = (baseWidth / 2) - (newlWidth / 2);

	var resizeClass = '#detailslightbox img';
	$(resizeClass).each(function(){
		$(this).height(newlHeight);
		$(this).width(newlWidth);
		$(this).css("height", newlHeight+"px");
		$(this).css("top", newTop);
		$(this).css("width",newlWidth+"px");
		$(this).css("left", newLeft+"px");
		$(this).css("background-color", "#fff");
	});
}

// コメント送信(評価)
function postText(){
	var param = $('#sendeva').serializeArray();
	var point = param[1]['value'];
	var comment = param[2]['value'];

	if(point < 1){
    	alert('評価点数を決めてください。')
    	return;
    }

    // 入力文字数が30文字を超えた場合
    if(comment.length > 30){
    	alert('入力文字数が多すぎます。\n入力できる文字数は30文字までです。');
    	return;
    }

    var result = confirm("内容を登録しますか？");
    if(result){
		data = {
		    	'model'  : 'evaluation',
		    	'action' : 'insert',
		    	'list'   :  param
		};

		$.ajax({
			type     : 'POST',
			url      : '../../api/controller.php',
			dataType : 'json',
			data     :  data,
			timeout  :  1000,
		}).done(function(data, dataType){
			//$(".lightbox_view").fadeOut(100);
			//$('.lightboxview').remove();

			$('.comment').remove();
			for(var index = 1; index <= 5; index++){
				$('#starbutton'+index+'').prop('checked', false);
			}

			for(var index = 1; index < data.length; index++){
				var starmark = '';
				for(var starindex = 1; starindex <= data[index].point; starindex++){
					starmark = starmark + '★';
				}

				$('.commentbox').append($('<dl class="comment"></dl>')
		                        .append($('<dt></dt>').html(data[index].created_at))
		                        .append($('<dd></dd>').html(starmark)))
		                        .append($('<pre class="comment"></pre>').html(data[index].comment));
			}

			$('[name="kanso"]').val('');
			//$('.id').remove();
		}).fail(function(){
			alert('Fail');
		});
    }
}
