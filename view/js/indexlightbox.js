// ライトボックスを開く
<<<<<<< HEAD
<<<<<<< HEAD
function openLightbox(id,pass,width, height){
=======
function openLightbox(id,pass){
>>>>>>> inouesaki
=======
function openLightbox(id,pass,width, height){
>>>>>>> origin/inouesaki

	var data = {
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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/inouesaki
		var icon = data[0].filePath.replace('view/', '');
		$('.iconbox').append('<img class="iconimg" src="'+icon+'">');
		$('.illustname').html(data[0].imageName);
		$('.illustratorname').html(data[0].userName);
		icontriming(data[0].width, data[0].height);

		$('.imgbox').append('<img class="lightboxview" id="lightboxid_"'+id+'"  src="'+pass+'">')
		$(".lightbox_view, #lightboxid_"+id+"").fadeIn();   // 第1引数・・・背景？(class)  第2引数・・・拡大写真(class)
		$('body').addClass("overflow");
		lightboxtriming(width, height);

		var intaverage =  6 - Math.floor(data[1].review);

		for(var index = 1; index <= 5; index++){
			$('#star'+index+'').prop('checked', false);
		}

		for(var index = 1; index < data.length; index++){
			var starmark = '';
			for(var starindex = 1; starindex <= data[index].point; starindex++){
				starmark = starmark + '★';
			}

			$('.commentbox').append($('<dl class="lightboxview"></dl>')
                            .append($('<dt></dt>').html(data[index].created_at))
                            .append($('<dd></dd>').html(starmark)))
                            .append($('<pre class="comment"></pre>').html(data[index].comment));
		}

		if(intaverage != 6){
			$('#star'+intaverage+'').prop({'checked':'checked'});
		}

		for(var index = 1; index <= 5; index++){
			$('#star'+index+'').prop({'disabled':'disabled'});
		}

        $('.stop-scrolling').css("overflow", "hidden");


<<<<<<< HEAD
=======
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

>>>>>>> inouesaki
=======
>>>>>>> origin/inouesaki
		// 見えないようにしている
		$('.idmem').append($('<input type="radio" name="illustid" value="'+id+'" class="id" checked="checked" display:none>'));
	}).fail(function(){
        alert('no');
	})
}

<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/inouesaki
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
	var baseWidth = $('.imgbox').width();
	var baseHeight = $('.imgbox').height();

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

	var resizeClass = '.imgbox img';
	$(resizeClass).each(function(){
		$(this).height(newlHeight);
		$(this).width(newlWidth);
		$(this).css("height", newlHeight+"px");
		$(this).css("top", 0);
		$(this).css("width", newlWidth+"px");
		$(this).css("left", newLeft);
	});
}

//評価送信
function sendEvaluation(){
    var param = $('#sendeva').serializeArray();
    var point = param[1]['value'];
    var comment = param[2]['value'];

    if(point < 1){
    	alert('評価点数を決めてください。')
    	return;
    }

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
    	//alert('Success');
    	var memid = $('.id').val();
    	$(".lightbox_view, #lightboxid_"+memid+"").fadeOut();
    	$('.lightboxview').remove();
    	$('.iconimg').remove();
    	$('.comment').remove();
    	$('.id').remove();
    	$('body').removeClass("overflow");
    }).fail(function(){
    	alert('Fail');
    });
}

<<<<<<< HEAD
=======
function lightboxtriming(){
	var resizeClass    = '.imgbox img';
	var thumnailHeight = 700;
	var thumnailWidth  = 750;
	var iw, ih;

	$(resizeClass).each(function(){
		var w = $(this).width();   // 画像の幅(原寸)
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
		}

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

>>>>>>> inouesaki
=======
>>>>>>> origin/inouesaki
//ライトボックスを閉じる
function closeLightbox(){
	var memid = $('.id').val();

	//alert(memid);
	$(".lightbox_view, #lightboxid_"+memid+"").fadeOut();
	$('.lightboxview').remove();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> origin/inouesaki
	$('.iconimg').remove();
	$('.id').remove();
	$('.comment').remove();
	$('body').removeClass("overflow");

	$('.stop-scrolling').css("overflow", "auto");
}

//評価送信
/*function sendEvaluation(){
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
<<<<<<< HEAD
}*/
=======
	$('.id').remove();
	$('body').removeClass("overflow");
}
>>>>>>> inouesaki
=======
}*/
>>>>>>> origin/inouesaki
