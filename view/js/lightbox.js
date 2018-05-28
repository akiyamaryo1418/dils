
$(function(){
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
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){
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
}


