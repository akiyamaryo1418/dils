$(function(){
	Initialize();
});

// 初期化
function Initialize(){
	data = {
		'model'  : 'designer',
		'action' : 'index',
		'list'   : 'a'
	};

	$.ajax({
		type:'POST',
		url:'/CustomerManagementWebSystem/Api/controller.php',
		dataType:'json',
		data:data,
		timeout:1000,
	}).done(function(data, dataType){
		for(var index = 0; index < data.length; index++){
			$('.designer_list').append($('<div></div>').attr('id', data[index].id)
					           .append($('<div></div>').html('<img src='data[index].img
					        		                          'alt='data[index].imgname'>'))
					           .append($('<p></p>').html(data[index].imgname)));
		}
	}).fail(function(XMLHttpRequest, textStatus, errorThrown){
		//alert('Error : ' + errorThrown);
	});
}
