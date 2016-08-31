// dashboard.js
$(function(){
	
	// ============================= SPACE ==================================
	var count = 4;
	var t, cd_ln;

	function timer(){
		t = setTimeout(function(){
			count--;
			$('.code_msg').text("Checking CODE in : "+ count)
			if( count != 0 )
				timer();
			else{
				count = 4;
				$('.code_msg').text("Please wait...")
				clearTimeout(t);
				ajx_checkCode();
			}
		}, 1000);
	}
		
	function ajx_checkCode(){
		$.ajax({
			method: "POST",
			url: "/space/code/check",
			data: { code: $('#space_code').val() }
		})
		  	.done(function( msg, textStatus, jqXHR ) {
		  		if( jqXHR.status == 200 ){
		  			$('.code_msg').attr('color','green');
		  			$('.code_msg').html('&nbsp;<i class="fa fa-check" aria-hidden="true"></i> CODE is unique');
		    		console.log(jqXHR.status);
		  		}
		  		else{
		  			$('.code_msg').html('&nbsp;<i class="fa fa-times" aria-hidden="true"></i> CODE is available');
		  		}
		  	});
	}

	if( $('#space_content').length == 1 ){	

		$('#space_code').keyup(function(e){
			e.preventDefault();
			if($(this).val().length < 5){
				$('.code_msg').text("Add atleast "+ (5 - parseInt($(this).val().length)) +" more letters")
			}
			else{
				clearTimeout(t)
				count = 4;
				timer();
				// clearTimeout(myVar);
			}
		})
	}
})