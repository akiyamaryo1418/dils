$(document).ready(function(){
  
  for(var index = 0; index < 20; index++){
        $('.illustbox').append($('<li></li>')
                      .append($('<div></div>').attr({'class':'imgbox'}))
                      .append($('<div></div>').attr({'class': 'textbox'})
                      .append($('<p>作品タイトル</p>'))
                      .append($('<p>カテゴリー</p>').attr({'class':'category'})))                      );
                      
      }
  
  $(".imgbox").click(function(){
    
    var id = $(this).attr("id");
    
    Initialize(id);
    $(".lightbox_view").fadeIn(100);
    
  });
  
  $(".close").click(function(){
    
    $(".lightbox_view").fadeOut(100);
    
  });
  
});

// 初期化
function Initialize(illustid){
	// アドレスの「?」以降のパラメータを取得
    var id = location.search;
    id = id.substring(1);

    var param={ 'user' : id, 'illust' : illustid};
    
    data= {
    	'model'  : 'user',
    	'action' : 'illustIndex',
    	'list'   :  param
    }

    $.ajax({
    	url      : '../../api/controller.php',
    	type     : 'POST',
    	dataType : 'json',
    	data     :  data,
    	timeout  :  1000,
    }).done(function(data, dataType){
      /*for(var index = 0; index < 100; index++){
        $('.myistbox').append($('<ul></ul>')
                      .append($('<li></li')
                      .append($('<div></div>').attr({'class':'imgbox'}))
                      .append($('<div></div>').attr({'class': 'textbox'}))
                      .append($('<p>作品タイトル</p>'))));
      }*/
      
    	alert('Success');
    }).fail(function(){
    	alert('Nodata');
    });
}