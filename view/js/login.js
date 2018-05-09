$(function(){

});

function inputLoginButton(){

	var param = "";

	data = {
		'model'  = 'login',
		'action' = 'login',
		'list'   =  param
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