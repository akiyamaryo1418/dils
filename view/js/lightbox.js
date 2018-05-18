
// ライトボックスを開く
function openLightbox(){

	$(",#"+ "").fadeIn();   // 第1引数・・・背景？(class)  第2引数・・・拡大写真(class)
	$('body').addClass("overflow");
}

// ライトボックスを閉じる
function closeLightbox(){

	$('body').removeClass("overflow");
}
