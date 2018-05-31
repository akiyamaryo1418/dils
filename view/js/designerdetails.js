
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

	//alert(JSON.stringify(param));

	// 必要な情報はチェックボックスの状態

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

		$('#detailslightbox').append($('<img src="'+pass+'">'));
		lightboxtriming();
		for(var index = 0; index < data.length; index++){
			$('.commentbox').append($('<dl class="lightboxview"></dl>')
                            .append($('<dt></dt>').html(data[index].created_at))
                            .append($('<dd></dd>').html(data[index].comment)));
		}
		var intaverage =  6 - Math.floor(data[0].review);
		if(intaverage != 6){
			$('#star'+intaverage+'').attr({'checked': 'checked'});
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
	alert(JSON.stringify(param));

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
    	alert(JSON.stringify(data));
    	location.href = "../html/designerdetails.html?"+id;
    }).fail(function(){
    	alert('Fail');
    });
}