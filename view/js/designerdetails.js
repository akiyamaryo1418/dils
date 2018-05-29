
// デザイナー詳細ページ
$(function(){
    Initialize();

    $('.creatorillustbox').on('click', '.imgbox', function(){
	    $(".lightbox_view").fadeIn(100);
	});

	$(".close").on('click', function(){
	    $(".lightbox_view").fadeOut(100);
	    $('#detailslightbox').empty();

	});
});

// 初期化処理
function Initialize(){

	// URLからIDの取得
	var id = location.search;

	CreateCategory().then(function(){
		return InitIllust(id);
	}).then(function(){
		//alert('a');
	}).catch(function(){
		alert('n');
	});

	if(id.charAt(0) == '?'){
    	id = id.substring(1);
        $('#loginlink').html('<li></li>').attr({'id':'mypagelink'})
                       .html('<a href="mypage.html?'+id+'">MYPAGE</a>');
    }


}

// カテゴリーボックスの生成
function CreateCategory(){

	return new Promise(function(resolve, reject){
	    var data = {
	    		'model'  : 'category',
	    		'action' : 'info',
	    		'list'   : null,
	    };

	    $.ajax({
	    	type:'POST',
			url:'../../api/controller.php',
			dataType:'json',
			data:data,
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

// ユーザー情報と作品一覧の表示
function InitIllust(_id){

	return new Promise(function(resolve, reject){

		// アドレスの「?」以降のパラメータを取得
		var adrsid = location.search;
		// 先頭の「?」をカット
		adrsid = adrsid.substring(1);
		id = unescape(adrsid);

		console.log(id);

		var param = { 'id' : id };
		data = {
			'model'  : 'user',
			'action' : 'illustIndex',
			'list'   :  param
		};

		/*var param = {'id' : 21, 'array' : $('#SearchAndFilter').serializeArray()};
	    var data = {
	    	'model'  : 'user',
	    	'action' : 'illustIndex',
	    	'list'   :  param,
	    }*/


	    $.ajax({
	    	url      : '../../api/controller.php',
	    	type     : 'POST',
	    	dataType : 'json',
	    	data     :  data,
	    	timeout  :  1000,
	    }).done(function(data, dataType){
	    	//console.log(data);
	    	//===ただの表示===
	    	/*for(var index = 0; index < data.length; index++){
	    		var result = data[index].img.replace('view/', '');
	    		$('.masonry').append($('<div></div>').attr({'id':'illustid_'+data[index].id, 'class':'item', 'name':'illustration'})
	    				     .append($('<a></a>').attr({'onclick':'openLightbox('+data[index].id+',"'+result+'")'})
	    				     .html('<img src="'+result+'"'+
	    		            	   'alt="'+data[index].imgname+'">'))
	    		             .append($('<p></p>').html(data[index].imgname)));


	    	}
	        //================

	    	triming();
	    	$('.masonry').append($('<div></div>').attr({'class': 'cle' }));
	    	$('.masonry').masonry({itemSelector: '.item', columnWidth : 300 });
	    	*/

	    	console.log(JSON.stringify(data));
			var result = data[0].iconPath.replace('view/', '');
			$('.creatoricon').append($('<img src="'+result+'">'));
			$('.penname').html(data[0].userName);

			// ここで値を取得し、表示する
			for(var index = 0; index < data.length; index++){
				var result = data[index].img.replace('view/', '')
				$('.creatorillustbox').append($('<li></li>').attr({'class' : 'imgbox'})
				                      .append($('<a></a>').attr({'onclick': 'openLightbox('+data[index].id+',"'+result+'")'})
						              .append($('<img>').attr({'src': result}))));
			}
	    	resolve();
	    	//===============
	    }).fail(function(){
	    	alert('NoData');
	    	reject();
	    });
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

//ライトボックスを開く
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
			$('#detailslightbox').append($('<img src="'+pass+'">'));
			lightboxtriming();
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



function closeLightbox(){
	$('lightbox_view').remove();
	$('.id').remove();
	//$('body').removeClass("overflow");
}



function lightboxtriming(){
	var resizeClass    = '#detailslightbox img';
	var thumnailHeight = 700;
	var thumnailWidth  = 750;
	var iw, ih;

	$(resizeClass).each(function(){

		/*var w = $(this).width();   // 画像の幅(原寸)
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
		}*/

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

// イラストが選択された後の処理
function selectIllustration(){

}
