$(function(){
    Initialize();

});

// 初期化
function Initialize(){
	// アドレスの「?」以降のパラメータを取得
    var id = location.search;
    id = id.substring(1);

    data= {
    	'model'  : 'mypage',
    	'action' : 'mypage',
    	'list'   :  id
    }

    $.ajax({
    	url      : '/dils/api/controller.php',
    	type     : 'POST',
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){
        //alert('Success');
    }).fail(function(){
    	alert('Nodata');
    });
}

// 編集ボタンを押したとき
function inputEditButton(){

}

// 削除ボタンを押したとき
function inputDeleteButton(){
	// アドレスの「?」以降のパラメータを取得
    var id = location.search;
    id = id.substring(1);

    data= {
    	'model'  : 'mypage',
    	'action' : 'mypage',
    	'list'   :  id
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
    	alert('Nodata');
    });
}

// 戻るボタンを押したとき
function inputBackButton(){
    location.href = "/dils/html/index.html";
}
