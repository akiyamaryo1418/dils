
$(function(){
<<<<<<< HEAD
	$('.illustbox').on('click', '.imgbox', function(){
		var id = $(this).attr("id");
	    viewInitialize(id);
	    $(".lightbox_view").fadeIn(100);
	});

	$(".close").click(function(){
		$("#editimgbox").empty();
		triming();
    	illustTriming();
		$(".lightbox_view").fadeOut(100);
	});
});

// 初期化(編集画面での表示)
function viewInitialize(illustid){
	// アドレスの「?」以降のパラメータを取得
    var id = location.search;
    id = id.substring(1);

    var param={ 'user' : id, 'illust' : illustid };
    var data= {
    	'model'  : 'illustration',
    	'action' : 'selectIllust',
    	'list'   :  param
    }

    $.ajax({
    	url      : '../../api/controller.php',
    	type     : 'POST',
=======

	$('.illustbox').on('click', '.imgbox', function(){

		//alert('aaa');
	    var id = $(this).attr("id");
		//var img = $(this).children('img').attr('src');

	    viewInitialize(id);
	    $(".lightbox_view").fadeIn(100);

	});

	$(".close").click(function(){

	    $(".lightbox_view").fadeOut(100);

	});
});

// 初期化(編集画面での表示)
function viewInitialize(illustid){
	// アドレスの「?」以降のパラメータを取得
    var id = location.search;
    id = id.substring(1);

    //alert(illustid);  IDの取得はできた


    var param={ 'user' : id, 'illust' : illustid };

    data= {
    	'model'  : 'illustration',
    	'action' : 'selectIllust',
    	'list'   :  param
    }

    $.ajax({
    	url      : '../../api/controller.php',
    	type     : 'POST',
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){
    	//alert(JSON.stringify(data));
    	var result = data[0].img.replace('view/', '');
    	$('#editimgbox').html($('<img src="'+result+'">'));
    	$('[name="title"]').html(data[0].name);
    	//alert('Success');
    }).fail(function(){
    	alert('Nodata');
    });
}

// ライトボックスを開く
function openLightbox(id,pass){

	data = {
		'model'  : 'evaluation',
		'action' : 'index',
		'list'   :  id
	}


	$.ajax({
        url      : '../../api/controller.php',
        type     : 'POST',
        dataType : 'json',
        data     :  data,
        timeout  :  1000,
	}).done(function(data, dataType){
		$('.imgbox').append('<img class="lightboxview" id="lightboxid_"'+id+'"  src="'+pass+'">')
		$(".lightbox_view, #lightboxid_"+id+"").fadeIn();   // 第1引数・・・背景？(class)  第2引数・・・拡大写真(class)
		$('body').addClass("overflow");
		lightboxtriming();

		var intaverage = Math.floor(data[0].review);

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

function lightboxtriming(){
	var resizeClass    = '.imgbox img';
	var thumnailHeight = 700;
	var thumnailWidth  = 750;
	var iw, ih;

	$(resizeClass).each(function(){
		/*var w = $(this).width();   // 画像の幅(原寸)
		var h = $(this).height();  // 画像の高さ(原寸)

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
			$(this).css("top","-"+ih+"px");    // 画像のセンター合わせ
			$(this).css("left", 0);
		}*/

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

// 評価送信
function sendEvaluation(){
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
>>>>>>> origin/akiyama
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){
<<<<<<< HEAD
    	var result = data[0].img.replace('view/', '');
    	$('#editimgbox').append($('<img src="'+result+'">'));
    	$('#title').val(data[0].name);
    	trimingLightBox();
    }).fail(function(){
    	alert('Nodata');
    });
}


function trimingLightBox(){
	var resizeClass = '.imgbox img';
	var thumnailWidth  = 352;
	var thumnailHeight = 460;

	$(resizeClass).each(function(){

		$(this).height(566);
		$(this).width(800);
		$(this).css("height", 566+"px");
		$(this).css("top", 0);
		$(this).css("width", 800+"px");
		$(this).css("left", -100);

	});
=======
    	//alert('Success');
    }).fail(function(){
    	alert('Fail');
    });
}

// ライトボックスを閉じる
function closeLightbox(){
	var memid = $('.id').val();

	//alert(memid);
	$(".lightbox_view, #lightboxid_"+memid+"").fadeOut();
	$('.lightboxview').remove();
	$('.id').remove();
	$('body').removeClass("overflow");
>>>>>>> origin/akiyama
}



// 評価送信
function sendEvaluation(){
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
    	//alert('Success');
    }).fail(function(){
    	alert('Fail');
    });
}


