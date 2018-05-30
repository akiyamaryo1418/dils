
$(function(){
<<<<<<< HEAD
<<<<<<< HEAD

	$('.illustbox').on('click', '.imgbox', function(){

		//alert('aaa');
	    var id = $(this).attr("id");


=======
	$('.illustbox').on('click', '.imgbox', function(){
		var id = $(this).attr("id");
>>>>>>> yamasaki
	    viewInitialize(id);
	    $('#imageId').val(id);
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

<<<<<<< HEAD
    alert('!!');

    var param={ 'user' : id, 'illust' : illustid };

    data= {
    	'model'  : 'user',
    	'action' : 'illustIndex',
=======
    var param={ 'user' : id, 'illust' : illustid };
    var data= {
    	'model'  : 'illustration',
    	'action' : 'selectIllust',
>>>>>>> yamasaki
    	'list'   :  param
    }

    $.ajax({
    	url      : '../../api/controller.php',
    	type     : 'POST',
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){
<<<<<<< HEAD
    	for(var index = 0; index < 20; index++){
            $('.illustbox').append($('<li></li>')
                          .append($('<div></div>').attr({'class': 'imgbox'}))
                          .append($('<div></div>').attr({'class': 'textbox'})
                          .append($('<p>作品タイトル</p>'))
                          .append($('<p>カテゴリー</p>').attr({'class':'category'}))));

        }
    	//alert('Success');
=======
    	var result = data[0].img.replace('view/', '');
    	$('#editimgbox').append($('<img src="'+result+'">'));
    	$('#title').val(data[0].name);
    	trimingLightBox();
>>>>>>> yamasaki
    }).fail(function(){
    	alert('Nodata');
    });
}

<<<<<<< HEAD
// ライトボックスを開く
function openLightbox(id,pass){

	data = {
		'model'  : 'evaluation',
		'action' : 'index',
		'list'   :  id
	}

	//alert(JSON.stringify(id));

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
=======
>>>>>>> yamasaki

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

<<<<<<< HEAD
    data = {
    	'model'  : 'evaluation',
    	'action' : 'insert',
    	'list'   :  param
    };

    $.ajax({
    	type     : 'POST',
    	url      : '../../api/controller.php',
=======
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
>>>>>>> origin/akiyama
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/akiyama
}
=======
	});
}

>>>>>>> yamasaki
