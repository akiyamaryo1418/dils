
// イラスト一覧ページ
$(function(){
    Initialize();
    moveHeadButton();

    //$('#thumbnail').mk_thumbnails();

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
    	url      : '/dils_test/api/controller.php',
    	type     : 'POST',
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){
    	//$('.masonry').masonry({itemSelector: '.item', columnWidth: 400 });
    	for(var index = 0; index < data.length; index++){
    		var result = data[index].img.replace('view/', '');
    		$('.masonry').append($('<div></div>').attr({'id':data[index].id, 'class':'item', 'name':'illustration'})
    				     .html(  '<img src="'+result+'"'+
    		            		 'width="'+data[index].width+'"'+
    		            		 'height="'+data[index].height+'"'+
    		            		 'alt="'+data[index].imgname+'">')
    		             .append($('<p></p>').html(data[index].imgname)));
    	}

    	$('.masonry').masonry({itemSelector: '.item', columnWidth: 400 });

    	//$('.masonry').attr({'id':"thumbnail", 'data-masonry':'{"itemSelector": ".item", "columnWidth": 400 }'})

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


    // カテゴリの動的生成
    categorydata = {
    		'model'  : 'category',
    		'action' : 'info',
    		'list'   : 'a'
    };

    // idとnameの値を取得してきてます。
    $.ajax({
    	type:'POST',
		url:'/dils_test/api/controller.php',
		dataType:'json',
		data:categorydata,
		timeout:1000,
    }).done(function(categorydata, dataType){
    	// 最初にhtml()に設定しておく
    	//===============================================
    	var $input = $('<input type="checkbox" />').attr({'name':'checkbox', 'id': categorydata[0].id, 'value':categorydata[0].id, 'checked':'checked', 'onchange':'searchCategory();'});
		var $label = $('<label></label>').attr({'for':categorydata[0].name, 'class':'check_css'}).html(categorydata[0].name);
    	$('.SearchBoxfilter').html($input).append($label);
    	//===============================================

    	// 以下はappend()で追加するのみ
    	for(var index = 1; index < categorydata.length; index++){
    		var $input = $('<input type="checkbox" />').attr({'name':'checkbox', 'id': categorydata[index].id, 'value':categorydata[index].id, 'checked':'checked', 'onchange':'searchCategory();'});
    		var $label = $('<label></label>').attr({'for':categorydata[index].name, 'class':'check_css'}).html(categorydata[index].name);
    		$('.SearchBoxfilter').append($input).append($label);
    	}
    }).fail(function(){
    	alert('NoData');
    })




    /*$.fn.mk_thumbnails = function(options){

        return this.each(function(){
            var opts = $.extend({}, $.fn.mk_thumbnails.defaults, options);

            var thumbnailSet = $(this).find('a').wrap('<section>');
            var thumbnail = $(this).wrapInner('<div>').children().addClass('thumbnailSet');

            var mk_thumbnail = function(){
                var thumbnail_w,
                    thumbnailSet_w = $('#thumbnail').width()-1,
                    section_w,
                    margin = thumbnailSet_w*0.01;

                section_w = (thumbnailSet_w/opts.thumbnail_count);
                thumbnail_w = section_w - (margin*2 + 2 + opts.padding*2);

                $('.thumbnailSet section, .thumbnailSet a').css({
                    'width': thumbnail_w,
                    'height': thumbnail_w
                });
                $('.thumbnailSet a').css({
                    'display': 'table-cell',
                    'vertical-align': 'middle',
                });
                $('.thumbnailSet section').css({
                    'background': '#FFF',
                    'border': '1px solid #CCC',
                    'box-shadow': '1px 1px 1px #CCC',
                    'float': 'left',
                    'margin': margin,
                    'padding': opts.padding
                });
                $('.thumbnailSet').find('img').css({
                    'max-width': '100%',
                    'height': 'auto'
                });

                };

            mk_thumbnail();
            $(window).on("resize",function(){
                setTimeout(function(){
                    mk_thumbnail();
                }, 300);
            });
        });
    };

    $.fn.mk_thumbnails.defaults = {
        padding: 5,
        thumbnail_count: 4
    };*/
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
		url      : '/dils_test/api/controller.php',
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

	var param = $('#category_id').serializeArray();

	// 必要な情報はチェックボックスの状態
	data = {
		'model'  : 'categoryfilter',
		'action' : 'sort',
		'list'   :  param
	};

	console.log(param);
	alert(JSON.stringify(param));

	$.ajax({
		url      : '/dils_test/api/controller.php',
		type     : 'POST',
		dataType : 'json',
		data     :  data,
		timeout  :  1000,
	}).done(function(data, dataType){
		for(var index = 0; index < data.length; index++){
    		var result = data[index].img.replace('view/', '');
    		$('.masonry').append($('<div></div>').attr({'id':data[index].id, 'class':'item', 'name':'illustration'})
    				     .html(  '<img src="'+result+'"'+
    		            		 'width="'+data[index].width+'"'+
    		            		 'height="'+data[index].height+'"'+
    		            		 'alt="'+data[index].imgname+'">')
    		             .append($('<p></p>').html(data[index].imgname)));
    	}

    	$('.masonry').masonry({itemSelector: '.item', columnWidth: 400 });
		//alert('Success');
	}).fail(function(){
		alert('NoData');
	});
}
