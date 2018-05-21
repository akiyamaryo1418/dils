
// ライトボックスを開く
function openLightbox(id){

	alert('#lightboxid_'+id);
	$(".lightbox_view, #lightboxid_"+id+"").fadeIn();   // 第1引数・・・背景？(class)  第2引数・・・拡大写真(class)
	$('body').addClass("overflow");
}

// ライトボックスを閉じる
function closeLightbox(){

	$(".masonry, ").fadeOut();
	$('body').removeClass("overflow");
}
