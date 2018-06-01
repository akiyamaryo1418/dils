$(document).ready(function(){
  
  for(var index = 0; index < 21; index++){
    $('.creatorillustbox').append($('<li></li>').attr({'class':'imgbox'}))
                          .append($('<img>').attr({'src':'','alt':''}));
  }
  
  $(".imgbox").click(function(){
    
    
    $(".lightbox_view").fadeIn(100);
    
  });
  
  $(".close").click(function(){
    
    $(".lightbox_view").fadeOut(100);
  });
  
 
  
});