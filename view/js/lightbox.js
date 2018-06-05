
$(function(){

	$('.illustbox').on('click', '.imgbox', function(){
		var id = $(this).attr("id");
		sessionStorage.setItem('imageId', id);
		viewInitialize(id);
		$(".lightbox_view").fadeIn(100);
	});

	$(".close").click(function(){
		$("#editimgbox").empty();
		$(".lightbox_view").fadeOut(100);
	});
});

// 初期化(編集画面での表示)
function viewInitialize(illustid){
	var id = sessionStorage.getItem('userId');
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
    	trimingLightBox(data[0].width, data[0].height);
    	$('#categoryList').val(data[0].category_id);
    }).fail(function(){
    	alert('Nodata');
    });
}


//ライトボックスに表示する画像サイズの変更
function trimingLightBox(_width, _height){

	// 表示できる大きさを取得
	var baseWidth = $('#editimgbox').width();
	var baseHeight = $('#editimgbox').height();

	// 画像の元サイズを取得
	var newlWidth  = _width;
	var newlHeight = _height;

	// 画像サイズ、表示位置の設定
	if(_width > _height) {
		newlWidth = baseWidth;
		newlHeight = _height * (baseWidth / _width);
	} else {
		newlHeight = baseHeight;
		newlWidth = _width * (baseHeight / _height);
	}
	var newTop = (baseHeight / 2) - (newlHeight / 2);
	var newLeft = (baseWidth / 2) - (newlWidth / 2);

	var resizeClass = '#editimgbox img';
	$(resizeClass).each(function(){
		$(this).height(newlHeight);
		$(this).width(newlWidth);
		$(this).css("height", newlHeight+"px");
		$(this).css("top", newTop);
		$(this).css("width", newlWidth+"px");
		$(this).css("left", newLeft);
	});
}

// 編集内容の登録
function sendIllustEdit() {
	var id = sessionStorage.getItem('imageId');
	var list = $('#editForm').serializeArray();
	var param = {'id' : id, 'param': list}

	var data = {
		'model'  : 'illustration',
	    'action' : 'edit',
	    'list'   :  param
	};
	console.log(param);

	$.ajax({
    	type     : 'POST',
    	url      : '../../api/controller.php',
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){
    	location.reload(true);
    	console.log(data);
    }).fail(function(){
    	alert('Fail');
    });
}

function deleteIllust() {

	console.log("test");
	var id = sessionStorage.getItem('imageId');
	var userId = sessionStorage.getItem('userId');
	var param = {'id' : id, 'userId' : userId};

	var result = window.confirm('削除した画像は復元できません。\n本当に、この画像を削除しますか？');
	if(result){
		var data = {
				'model'  : 'illustration',
			    'action' : 'delete',
			    'list'   :  param
			};

			$.ajax({
		    	type     : 'POST',
		    	url      : '../../api/controller.php',
		    	dataType : 'json',
		    	data     :  data,
		    	timeout  :  1000,
		    }).done(function(data, dataType){
		    	console.log(data);
		    	if(data == 'success') {
		    		alert('削除に成功しました。');
		    		location.reload(true);
		    	}


		    }).fail(function(){
		    	alert('Fail');
		    });
	}
	else{

	}

}
