// dashboard.js
$(function(){
	
	// ============================= SPACE ==================================
		
	if( $('#space_content').length == 1 ){	

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


		$('#space_code').keyup(function(e){
			e.preventDefault();
			if($(this).val().length < 5){
				$('.code_msg').attr('color','red');
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
	// ============================= SPACE ==================================

	if( $('#account_view').length == 1 ){

		var placeSearch, autocomplete;
        autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
        {
            types: ['geocode']
        });

        // When the user selects an address from the dropdown,
        // populate the address fields in the form.
        google.maps.event.addListener(autocomplete, 'place_changed', function() {
        	var place = autocomplete.getPlace();
            fillAddress(place.address_components);
            $('#lat').val(autocomplete.getPlace().geometry.location.lat());
            $('#lng').val(autocomplete.getPlace().geometry.location.lng());
            $('#address').val(autocomplete.getPlace().formatted_address);
        });
        

        function fillAddress (address_components) {

            $('#country').val('');
            $('#city').val('');

            for (var i = 0; i < address_components.length; i++) {
                var addressComponent = address_components[i];

                if (addressComponent.types[0] == 'country')
                    $('#country').val(addressComponent['long_name']);

                if (addressComponent.types[0] == 'locality')
                    $('#city').val(addressComponent['long_name']);
            }
        }
	}
})