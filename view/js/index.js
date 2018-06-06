
// イラスト一覧ページ
$(function(){
	Initialize();
    moveHeadButton();
});

function Initialize(){

	initCategory().then(function(){
		return initIllust();
	}).then(function(){

	}).catch(function(){
		alert('n');
	});

	var id = sessionStorage.getItem('userId');
	if(id != null) {
		$('#loginlink').html('<li></li>').attr({'id':'mypagelink'})
        .html('<a href="mypage.html">マイページ</a>');
	}
}

function initCategory(){

	return new Promise(function(resolve, reject){

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
	    	resolve();
	    }).fail(function(categorydata, dataType){;
	    	reject();
	    });
	});
}

function initIllust(){

	return new Promise(function(resolve, reject){

		var param = $('#SearchAndFilter').serializeArray();
	    data = {
	    	'model'  : 'illustration',
	    	'action' : 'index',
	    	'list'   :  param
	    }

	    $.ajax({
	    	url      : '../../api/controller.php',
	    	type     : 'POST',
	    	dataType : 'json',
	    	data     :  data,
	    	timeout  :  1000,
	    }).done(function(data, dataType){
	    	console.log(data);
	    	if(data != -999) {
	    		//===ただの表示===
		    	for(var index = 0; index < data.length; index++){
		    		var result = data[index].img.replace('view/', '');
		    		$('.masonry').append($('<div class="item"></div>').attr({'id':'illustid_'+data[index].id, 'name':'illustration', 'onclick':'openLightbox('+data[index].id+',"'+result+'", '+data[index].width+', '+data[index].height+')'})
	    					// .append($('<a></a>').attr(
  				            //		{'onclick':'openLightbox('+data[index].id+',"'+result+'", '+data[index].width+', '+data[index].height+')'})
	    				     .html('<img src="'+result+'"'+
	    		            	   'alt="'+data[index].imgname+'">'));
		    		triming(data[index].id, data[index].width, data[index].height);
		    	}
		        //================
		    	$('#wrapper').append('<div class="cle"></div>');
		    	$('.masonry').masonry({ itemSelector: '.item', columnWidth : 300 });
	    	}
	    	resolve();
	    	//===============
	    }).fail(function(){
	    	alert('NoData');
	    	reject();
	    });
	});
}

//フィルタ検索機能(ジャンル)
function searchCategory(){

	var param = $('#SearchAndFilter').serializeArray();

	// 必要な情報
	data = {
		'model'  : 'illustration',
		'action' : 'index',
		'list'   :  param
	};

	$.ajax({
		url      : '../../api/controller.php',
		type     : 'POST',
		dataType : 'json',
		data     :  data,
		timeout  :  1000,
	}).done(function(data, dataType){
		$('.masonry').remove();
		$('.item').remove();
		$('.cle').remove();
		$('#wrapper').append('<div class="masonry" id="thumbnail"></div>');
		//===ただの表示===
		console.log(data);
		if(data != -999) {
			for(var index = 0; index < data.length; index++){
	    		var result = data[index].img.replace('view/', '');
	    		/*$('.masonry').append($('<div class="item"></div>').attr({'id':'illustid_'+data[index].id, 'name':'illustration'})
	    				     .append($('<a></a>').attr(
	    				    		 {'onclick':'openLightbox('+data[index].id+',"'+result+'", '+data[index].width+', '+data[index].height+')'})
	    				     .html('<img src="'+result+'"'+
	    		            	   'alt="'+data[index].imgname+'">'))
	    		             .append($('<p></p>').html(data[index].imgname)));*/
	    		$('.masonry').append($('<div class="item"></div>').attr({'id':'illustid_'+data[index].id, 'name':'illustration', 'onclick':'openLightbox('+data[index].id+',"'+result+'", '+data[index].width+', '+data[index].height+')'})
	    				     .html('<img src="'+result+'"'+
			            	   'alt="'+data[index].imgname+'">'));
	    		triming(data[index].id, data[index].width, data[index].height);
	    	}
	        //================

	    	$('#wrapper').append('<div class="cle"></div>');
	    	$('.masonry').masonry({ itemSelector: '.item', columnWidth : 300 });
		}


	}).fail(function(){
		alert('NoData');
	});
}

//トリミング
function triming(_id, _width, _height){
	var resizeClass    = '#illustid_'+_id+' img';
	var baseWidth  = 250;
	var baseHeight = 250;

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

	$(resizeClass).each(function() {
		$(this).height(newlHeight);
		$(this).width(newlWidth);
		$(this).css("height", newlHeight+"px");
		$(this).css("top", newTop+"px");
		$(this).css("width",newlWidth+"px");
		$(this).css("left", newLeft+"px");
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

function moveMypage(){
	location.href = "../html/mypage.html";
}
