
// デザイナー詳細ページ
$(function(){
    Initialize();

    $(".imgbox").on('click', function(){
        alert('dd');
	    $(".lightbox_view").fadeIn(100);

	});

	$(".close").on('click', function(){

	    $(".lightbox_view").fadeOut(100);

	});
});

// 初期化
function Initialize(){
	// アドレスの「?」以降のパラメータを取得
	var adrsid = location.search;
	// 先頭の「?」をカット
	adrsid = adrsid.substring(1);
	id = unescape(adrsid);

	var param = { 'id' : id };

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
		//console.log(JSON.stringify(data));
		// ここで値を取得し、表示する
		for(var index = 0; index < data.length; index++){
			var result = data[index].img.replace('view/', '')
			$('.creatorillustbox').append($('<li></li>').attr({'class' : 'imgbox'})
			                      .append($('<img src="'+result+'">')));
		}
	}).fail(function(){
		alert('NoData');
	});
}

// 前のページへ移動(戻るボタン)
function moveBackButton(){
	location.href = "/dils/view/html/designerindex.html";
}

// ソート時のボタン(非同期)
function sortButton(){
	var param = "";

	data = {
		'model'  : 'indexsort',
		'action' : 'sort',
		'list'   :  param
	};

	$.ajax({
		url      : '../../api/controller.php',
		type     : 'POST',
		dataType : 'json',
		data     :  data,
		timeout  :  1000,
	}).done(function(data, dataType){
		alert('Success');
	}).fail(function(){
		alert('NoData');
	});
}

//フィルタ検索機能(ジャンル)(非同期)
function searchCategory(){

	var category = $('#category_id').val();

	$.ajax({
		url      : '/dils/api/controller.php',
		type     : 'POST',
		dataType : 'json',
		data     :  data,
		timeout  :  1000,
	}).done(function(data, dataType){
		alert('Success');
	}).fail(function(){
		alert('NoData');
	});
}

// イラストが選択された後の処理
function selectIllustration(){
	//var
}
