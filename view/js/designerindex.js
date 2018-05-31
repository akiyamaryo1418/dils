
// デザイナー一覧ページ
$(function(){
	Initialize();
});

// 初期化
// デザイナー一覧を表示している
function Initialize(){
	data = {
		'model'  : 'user',
		'action' : 'index',
		'list'   : 'a'
	};

	$.ajax({
		type:'POST',
		url:'../../api/controller.php',
		dataType:'json',
		data:data,
		timeout:1000,
	}).done(function(data, dataType){
		for(var index = 0; index < data.length; index++){
			var result = data[index].img.replace('view/', '');
			$('#listbox').append($('<li></li>').attr({'class' : 'illustratorList' })
					     .append($('<a></a>').attr({'onclick':'moveDesignerDetails('+id+')'})
					    		 .html('<img src="'+result+'"'+
					                                 'alt="'+data[index].imgname+'">'))
					     .append($('<p></p>').html(data[index].userName)));
		}
		triming();
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		alert('NoData');
	});

	var id = location.search;
    if(id.charAt(0) == '?'){
    	id = id.substring(1);
        $('#loginlink').html('<li></li>').attr({'id':'mypagelink'})
                       .html('<a href="mypage.html?'+id+'">MYPAGE</a>');
    }
}
// フィルタ
function filterDesigner(){
	var param = $('#filter').serializeArray();

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
		$('.illustratorList').remove();
		for(var index = 0; index < data.length; index++){
			var result = data[index].img.replace('view/', '');
			$('#listbox').append($('<li></li>').attr({'class' : 'illustratorList' })
					     .append($('<a></a>').attr({'onclick':'moveDesignerDetails('+id+')'})
					    		 .html('<img src="'+result+'"'+
					                                 'alt="'+data[index].imgname+'">'))
					     .append($('<p></p>').html(data[index].userName)));
		}
		triming();
	}).fail(function(){
		alert('NoData');
	});
}

//トリミング
function triming(){

	var resizeClass    = '.illustratorList img';
	var thumnailWidth  = 130;
	var thumnailHeight = 130;
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
			$(this).height(thumnailHeight);
			$(this).css("top",0);    // 画像のセンター合わせ
			$(this).css("left", 0);
		}
	});
}

// 制作者詳細へ移動
// 引数・・・制作者ID
function moveDesignerDetails(id){
	var param = id;
	location.href = "../html/designerdetails.html?"+param;
}
