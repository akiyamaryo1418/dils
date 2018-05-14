
// イラスト一覧ページ
$(function(){
    Initialize();
    moveHeadButton();
});

// 初期化
// 作品一覧表示を行っている
function Initialize(){
    data = {
    	'model'  : 'illustration',
    	'action' : 'index',
    	'list'   : 'a'
    }

    $.ajax({
    	url      : '/dils/api/controller.php',
    	type     : 'POST',
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){

    	for(var index = 0; index < data.length; index++){
    		var result = data[index].img.replace('view/', '');
    		$('.masonry').append($('<div></div>').attr('id', data[index].id)
    		             .append($('<div></div>').html(
    		            		 '<img src="'+result+'"'+
    		            		 'width="'+data[index].width+"' "+
    		            		 'height="'+data[index].height+"' "+
    		            		 'alt="'+data[index].imgname+'">'))
    		             .append($('<p></p>').html(data[index].imgname)));
    	}

    	/*for(var index = 0; index < data.length; index++){

    		var result = data[index].img.replace('view/', '');
    		$('.masonry').append($('<div></div>').attr('id', data[index].id)
    		             .append($('<div></div>').html(
    		            		 '<img src="'+result+" ' "+
    		            		 'width="'+data[index].width+" ' "+
    		            		 'height="'+data[index].height+" ' "+
    		            		 'alt="'+data[index].imgname+'">'))
    		             .append($('<p></p>').html(data[index].imgname)));
    	}*/
    }).fail(function(){
    	alert('NoData');
    });
}

// ページの先頭へ戻るボタン
function moveHeadButton(){
	var topButton = $('#pagetopbutton')
	topButton.hide();

	$(window).scroll(function(){
		if($(this).scrollTop()>100){
			// 画面を100pxスクロールしたらボタン表示
			topButton.fadeIn();
		}else{
			// 画面が100より上ならボタン表示はしない
			topButton.fadeOut();
		}
	});

	topButton.on('click', function(){
		$('body,html').animate({
			scrollTop: 0},500);
		    return false;
		});
}

// トップページへ移動
function moveTopPage(){
	location.href = "/dils/html/index.html";
}

// 制作者一覧へ移動
function moveDesignerIndex(){
	location.href = "/dils/html/designerindex.html";
}

// ログインページへ移動
function moveLoginPage(){
	location.href = "/dils/html/login.html";
}

// マイページへ移動
function moveMyPageButton(){
	location.href = "/dils/html/mypage.html";
}

// 新規登録ボタン
function moveInsertButton(){
	location.href = "/dils/html/insert.html";
}

// ライトボックス




// 編集ボタン
/*function moveEditButton(){

	// ページ遷移の際にIDをアドレスの後ろにつける処理
	var id = escape($('name').value);

	location.href = "/dils/html/edit.html?"+id;
}*/

// ソート時のボタン(非同期)
function sortButton(){

	var param = "";

	data = {
		'model'  : 'indexsort',
		'action' : 'sort',
		'list'   :  param
	};

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

// フィルタ検索機能(ジャンル)
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
