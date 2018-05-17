
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
    	url      : '../../api/controller.php',
    	type     : 'POST',
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){

    	for(var index = 0; index < data.length; index++){
    		var result = data[index].img.replace('view/', '');
    		$('.masonry').append($('<div></div>').attr({'id':'illustid_'+data[index].id, 'class':'item', 'name':'illustration'})
    				     .html(  '<img src="'+result+'"'+
    		            		 'alt="'+data[index].imgname+'">')
    		             .append($('<p></p>').html(data[index].imgname)));

    		console.log(data[index].width);
    		console.log(data[index].height);
    	}

    	triming();
    	$('.masonry').append($('<div></div>').attr({'class': 'cle' }));
    	$('.masonry').masonry({itemSelector: '.item', columnWidth : 300 });

    }).fail(function(){
    	alert('NoData');
    });


    // カテゴリの動的生成
    categorydata = {
    		'model'  : 'category',
    		'action' : 'info',
    		'list'   : 'a'
    };

    // idとnameの値を取得してきてます。
    $.ajax({
    	type:'POST',
		url:'../../api/controller.php',
		dataType:'json',
		data:categorydata,
		timeout:1000,
    }).done(function(categorydata, dataType){
    	for(var index = 0; index < categorydata.length; index++){
    		$('.SearchBoxfilter').append('<input type="checkbox" name="checkbox" id="categoryid_'+ categorydata[index].id +'" value="'+ categorydata[index].id +'" checked="checked" onchange="searchCategory();">')
            .append($('<label></label>').attr({'for':'categoryid_'+categorydata[index].id, 'class':'check_css'}).html(categorydata[index].name));
    	}
    }).fail(function(){
    	alert('NoData');
    })
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
	location.href = "../html/index.html";
}

// 制作者一覧へ移動
function moveDesignerIndex(){
	location.href = "../html/designerindex.html";
}

// ログインページへ移動
function moveLoginPage(){
	location.href = "../html/login.html";
}

// マイページへ移動
function moveMyPageButton(){
	location.href = "../html/mypage.html";
}

// 新規登録ボタン
function moveInsertButton(){
	location.href = "../html/insert.html";
}

// ライトボックス




// ソート時のボタン
function sortButton(){

	var param = $('#sortindex').serializeArray();

	// 必要な情報はチェックボックスの状態
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

		//alert('Success');
	}).fail(function(){
		alert('NoData');
	});
}

// フィルタ検索機能(ジャンル)
function searchCategory(){

	var param = $('#SearchAndFilter').serializeArray();
	alert(JSON.stringify(param));

	// 必要な情報はチェックボックスの状態
	data = {
		'model'  : 'illustration',
		'action' : 'index',
		'list'   :  param
	};

	//console.log(param);
	//alert(JSON.stringify(param));

	$.ajax({
		url      : '../../api/controller.php',
		type     : 'POST',
		dataType : 'json',
		data     :  data,
		timeout  :  1000,
	}).done(function(data, dataType){
		$('.item').remove();

		for(var index = 0; index < data.length; index++){
    		var result = data[index].img.replace('view/', '');
    		$('.masonry').append($('<div></div>').attr({'id':'illustid_'+data[index].id, 'class':'item', 'name':'illustration'})
    				     .html(  '<img src="'+result+'"'+
    		            		 'alt="'+data[index].imgname+'">')
    		             .append($('<p></p>').html(data[index].imgname)));
    	}

        triming();
        $('.masonry').append($('<div></div>').attr({'class': 'cle' }));
    	$('.masonry').masonry({itemSelector: '.item', columnWidth: 300 });
	}).fail(function(){
		alert('NoData');
	});
}

// トリミング
function triming(){

	var resizeClass    = '.item img';
	var thumnailWidth  = 250;
	var thumnailHeight = 250;
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
	});
}

// チェックボックス
function checkBox(id){
	if($('input[value="'+id+'"').prop('checked') == true){
		for(var index = 1; index <= id; index++){
			$('input[value="'+index+'"]').prop('checked', true);
		}
	}else{
		for(var index = 5; index >= id; index--){
			$('input[value="'+index+'"]').prop('checked', false);
		}
	}
}
