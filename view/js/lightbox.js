
// ライトボックスを開く
function openLightbox(id){

	data = {
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
        //alert(JSON.stringify(data));
		//$('.imgbox').html('<img src="'+data.img+'" alt="'+data.img+'">');
		$(".lightbox_view, #illustid_"+id+"").fadeIn();   // 第1引数・・・背景？(class)  第2引数・・・拡大写真(class)
		$('body').addClass("overflow");
		alert('s');
	}).fail(function(){
        alert('no');
	})

	//alert('#lightboxid_'+id);


}

// ライトボックスを閉じる
function closeLightbox(){

	$(".masonry, ").fadeOut();
	$('body').removeClass("overflow");
}
