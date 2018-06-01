// ライトボックスを開く
function openLightbox(id,pass){

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
		$('.iconbox').append('<img class="iconimg" src="'+data[0]+'">');
		$('.illustname').html(data[0]);
		$('.illustratorname').html(data[0]);
		icontriming(data[0], data[0]);

		$('.imgbox').append('<img class="lightboxview" id="lightboxid_"'+id+'"  src="'+pass+'">')
		$(".lightbox_view, #lightboxid_"+id+"").fadeIn();   // 第1引数・・・背景？(class)  第2引数・・・拡大写真(class)
		$('body').addClass("overflow");
		lightboxtriming();


		var intaverage =  6 - Math.floor(data[0].review);


		for(var index = 1; index <= 5; index++){
			$('#star'+index+'').prop('checked', false);
		}

		for(var index = 0; index < data.length; index++){
			var starmark = '';
			for(var starindex = 1; starindex <= index + 1; starindex++){
				starmark = starmark + '★';
			}

			$('.commentbox').append($('<dl class="lightboxview"></dl>')
                            .append($('<dt></dt>').html(data[index].created_at))
                            .append($('<dd></dd>').html(starmark)));
		}

		if(intaverage != 6){
			$('#star'+intaverage+'').prop({'checked':'checked'});
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
	var resizeClass    = '.imgbox img';
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

//評価送信
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

//ライトボックスを閉じる
function closeLightbox(){
	var memid = $('.id').val();

	//alert(memid);
	$(".lightbox_view, #lightboxid_"+memid+"").fadeOut();
	$('.lightboxview').remove();
	$('.iconimg').remove();
	$('.id').remove();
	$('body').removeClass("overflow");
}

//評価送信
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