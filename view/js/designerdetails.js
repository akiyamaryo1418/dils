
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
		// console.log(JSON.stringify(data));
		// console.log(data);
		var result = data[0].iconPath.replace('view/', '');
		$('.creatoricon').append($('<img src="'+result+'">'));
		$('.penname').html(data[0].userName);

		console.log(data);
		console.log(data.length);
		if(data[0].id != -999) {
			// ここで値を取得し、表示する
			for(var index = 0; index < data.length; index++){
				var result = data[index].img.replace('view/', '')
				$('.creatorillustbox').append($('<li></li>').attr({'class' : 'imgbox'})
				                      .append($('<a></a>').attr({'onclick': 'openLightbox('+data[index].id+',"'+result+'")'})
						              .append($('<img>').attr({'src': result}))));
			}
		}
	}).fail(function(){
		alert('NoData');
	});

	var id = sessionStorage.getItem('userId');
	if(id != null) {
		$('#loginlink').html('<li></li>').attr({'id':'mypagelink'})
        .html('<a href="mypage.html">MYPAGE</a>');
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
		console.log(data);
		$('.imgbox').remove();
		if(data[0].id != -999) {
			for(var index = 0; index < data.length; index++){
				var result = data[index].img.replace('view/', '')
				$('.creatorillustbox').append($('<li></li>').attr({'class' : 'imgbox'})
				                      .append($('<a></a>').attr({'onclick': 'openLightbox('+data[index].id+',"'+result+'")'})
						              .append($('<img>').attr({'src': result}))));
			}
		}

	}).fail(function(){
		alert('NoData');
	});
}

// ライトボックスを開く
function openLightbox(id,pass){
	data = {
			'model'  : 'evaluation',
			'action' : 'index',
			'list'   :  id
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

		$('#detailslightbox').append($('<img src="'+pass+'">'));
		lightboxtriming();
		var intaverage =  6 - Math.floor(data[1].review);

		for(var index = 1; index <= 5; index++){
			$('#star'+index+'').prop('checked', false);

		}

		for(var index = 1; index < data.length; index++){
			var starmark = '';
			for(var starindex = 1; starindex <= index; starindex++){
				starmark = starmark + '★';
			}

			$('.commentbox').append($('<dl class="lightboxview"></dl>')
                            .append($('<dt></dt>').html(data[index].created_at))
                            .append($('<dd></dd>').html(data[index].comment)));
		}

		if(intaverage != 6){
			$('#star'+intaverage+'').prop({'checked': 'checked'});
		}

		for(var index = 1; index <= 5; index++){
			$('#star'+index+'').prop({'disabled':'disabled'});
		}

		// 見えないようにしている
		$('.idmem').append($('<input type="radio" name="illustid" value="'+id+'" class="id" checked="checked" display:none>'));
	}).fail(function(){
        alert('no');
	})
}

function closeLightbox(){
	$('.lightboxview').remove();
	$('.id').remove();
	//$('body').removeClass("overflow");
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

function lightboxtriming(){
	var resizeClass    = '#detailslightbox img';
	var thumnailHeight = 700;
	var thumnailWidth  = 750;
	var iw, ih;

	$(resizeClass).each(function(){
		//====固定値====
		$(this).height(thumnailHeight);
		$(this).width(thumnailWidth);
		$(this).css("height", 700+"px");
		$(this).css("top", 0);
		$(this).css("width", 750+"px");
		$(this).css("left", 0);
        //==============
	});
}

// コメント送信(評価)
function postText(){
	// アドレスの「?」以降のパラメータを取得
	var adrsid = location.search;
	// 先頭の「?」をカット
	adrsid = adrsid.substring(1);
	id = unescape(adrsid);

	var param = $('#sendeva').serializeArray();
	var comment = param[2]['value'];

    // 入力文字数が30文字を超えた場合
    if(comment.length > 30){
    	alert('入力文字数が多すぎます。');
    	return;
    }

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
    	//alert(JSON.stringify(data));
    	//location.href = "../html/designerdetails.html?"+id;
    	$('.lightboxview').remove();
    	$('.id').remove();
    }).fail(function(){
    	alert('Fail');
    });
}