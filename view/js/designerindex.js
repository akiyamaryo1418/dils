
// デザイナー一覧ページ
$(function(){
	Initialize();
});

// 初期化
// デザイナー一覧を表示している
function Initialize(){
	filterDesigner();

	var id = sessionStorage.getItem('userId');
	if(id != null) {
		$('#loginlink').html('<li></li>').attr({'id':'mypagelink'})
        .html('<a href="mypage.html">MYPAGE</a>');
	}
}
// フィルタ
function filterDesigner(){
	var param = $('#filter').serializeArray();
	var data = {
		'model'  : 'user',
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
		if(data != null) {
			for(var index = 0; index < data.length; index++){
				var result = data[index].img.replace('view/', '');
				var id = data[index].id;
				$('#listbox').append($('<li></li>').attr({'class' : 'illustratorList' })
						     .append($('<a></a>').attr({'onclick':'moveDesignerDetails('+id+')'})
						    		 .html('<img src="'+result+'"'+
						                                 'alt="'+data[index].imgname+'">'))
						     .append($('<p></p>').html(data[index].userName)));
			}
		}

	}).fail(function(){
		alert('NoData');
	});
}

// 制作者詳細へ移動
// 引数・・・制作者ID
function moveDesignerDetails(id){
	sessionStorage.setItem('viewUserId', id);
	location.href = "../html/designerdetails.html";
}
