$(function(){
    Initialize();

});

// 初期化
function Initialize(){
    data = {
    	'model'  : 'illustration',
    	'action' : 'illustRendering',
    	'list'   : 'a'
    }

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
		'model'  : 'usersort',
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
