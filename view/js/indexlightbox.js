// ライトボックスを開く
function openLightbox(id,pass,width, height){

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
		var icon = data[0].filePath.replace('view/', '');
		$('.iconbox').append('<img class="iconimg" src="'+icon+'">');
		$('.illustname').html(data[0].imageName);
		$('.illustratorname').html(data[0].userName);
		icontriming(data[0].width, data[0].height);

		$('.imgbox').append('<img class="lightboxview" id="lightboxid_"'+id+'"  src="'+pass+'">')
		$(".lightbox_view, #lightboxid_"+id+"").fadeIn();   // 第1引数・・・背景？(class)  第2引数・・・拡大写真(class)
		$('body').addClass("overflow");
		lightboxtriming(width, height);

		console.log(data);
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


		// 見えないようにしている
		$('.idmem').append($('<input type="radio" name="illustid" value="'+id+'" class="id" checked="checked" display:none>'));
	}).fail(function(){
        alert('no');
	})
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
		$(this).css("background-color", "#fff");
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
    	$('.id').remove();
    	$('.comment').remove();
    	$('[name="kanso"]').val('');
    	$('body').removeClass("overflow");
    }).fail(function(){
    	alert('Fail');
    });
}

//ライトボックスを閉じる
function closeLightbox(){
	var memid = $('.id').val();

	//alert(memid);
	$(".lightbox_view, #lightboxid_"+memid+"").fadeOut();
	$('.lightboxview').remove();
	$('.iconimg').remove();
	$('.id').remove();
	$('.comment').remove();
	$('[name="kanso"]').val('');
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
}*/