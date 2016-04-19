function XHR(type,data){
  return $.ajax({
    type:type,
    url:'proxy.php',
    dataType:'json',
    data:data,
    cache: false,
    async: true,
    beforeSend:function(){

    }
  }).always(function(){

  }).fail(function(){

  });
}
function test(route,key, id){
  XHR('get', {path: route} ).done(function(json){
    $(id).html(json[key]);
  })
}
function contact(route, id){
  XHR('get', {path: route} ).done(function(json){
    console.log(json);
  })
}
function people(){
  XHR('get', {path:'/people/'}).done(function(json){
    var x = '';
    $.each(json.faculty, function(i, item){
      x+= '<div class="person"><h2>' +item.name+'</h2><p>' +item.tagline+ '</p><img src="'+item.imagePath+'" alt="" /></div>';
    });
    $('#people').html(x);
  });
}

function degrees(){
  XHR('get', {path:'/degrees/'}).done(function(json){
    var x = '';
    $.each(json.undergraduate, function(i, item){
      x+= '<div class="degree"><p class="degreeTitle">' +item.title+ '</p><p class="degreeDesc">'+item.description+'</p></div>';
    });
    $('#undergraduate').html(x);
    x = '';
    $.each(json.graduate, function(i, item){
      if(item.title){
        x+= '<div class="degree"><p class="degreeTitle">' +item.title+ '</p><p class="degreeDesc">'+item.description+'</p></div>';
      }
    });
    $('#graduate').html(x);
  });
}
function minors(){
  XHR('get', {path:'/minors/'}).done(function(json){
    var x = '';
    $.each(json, function(i, item){
      x+= '<div class="minor"><h2>' +item.title+'</h2></div>';
    });
    $('#minors').html(x);
  });
}
function sendForm(){
		$.ajax({
			method:'post',
			url:'http://ist.rit.edu/~istdev/assets/includes/contact/contactSubmit.php',
			dataType:'json',
			data:{name:$('#input01').val(),message:$('#contactMessage').val(),email:$('#input03').val(),phone:$('[name="phone1"]').val()+'-'+$('[name="phone2"]').val()+'-'+$('[name="phone3"]').val()},
			success:function(d){
				if(d.success){
					$('#contactSuccess').show();
					$('#contactSuccessFeedback').html(d.success);
					$('#contactFailure, #contactForm').hide();
				}else{
					$('#contactSuccess').hide();
					$('#contactFailureFeedback').html(d.failure);
					$('#contactFailure, #contactForm').show();

				}
			}
		});
	}
