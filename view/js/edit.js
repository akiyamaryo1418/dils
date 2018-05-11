
// イラスト編集ページ
$(function(){
    Initialize();

});

// 初期化
function Initialize(){


	data = {
		'model'  : 'edit',
		'action' : 'editload',
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

// 編集完了
function inputUpdateButton(){

	var param = "";

	data = {
		'model'  : 'edit',
		'action' : 'editupdate',
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
