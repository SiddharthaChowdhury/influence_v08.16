// dashboard.js
$(function(){
	
	// ============================= DASHBOARD ==================================

	if( $('#dashboard_view').length == 1 ){

		$('.jq_asyncFetch').click(function(e){ 			// Fetch async team/space
			if( $(this).attr('data-fetched') == 'false' ){
				var attr = {
					'self' : $(this),
					'uid'  : $(this).attr('data-id'),
					'stat' : $(this).attr('data-fetched'),
					'url'  : "/users/fetch/async/" + $(this).attr('data-fetch'),
					'body' : $(this).closest('.panel').find('.panel-body'),
					'tofetch' : $(this).attr('data-fetch')	
				};
				$.ajax({
					method: "POST",
					url: attr.url,
					dataType: 'json',
					data: { uid: attr.uid },
					statusCode:{
						400: function(resp){
							attr.body.html(resp.responseText);
						},
						200: function(resp){
							var space = '', name;
							 
							for( var i in resp ){
								name = ( attr.tofetch == 'teams' ) ? resp[i]['team_name'] : resp[i]['space_name']+ '<small> CODE:'+ resp[i]['space_code'] +'</small>'

								space+='<div class="single_asyncElement">'
								space+=		'<div class="single_asyncElementTitle">'
								space+=			'<label>'+name+'</label>'
								space+=			'<a href="single_asyncElementConfig" class="pull-right"><i class="fa fa-cog" aria-hidden="true"></i> Configure</a>'
								space+=		'</div>'
								space+='</div>';

								attr.body.html(space);
							}
							attr.self.attr('data-fetched', true);
						}
					}
				});
			}
		});
	}

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
					$('.code_msg').attr('color','#696969');
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
				data: { code: $('#space_code').val() },
				statusCode:{
					400: function(resp){
						$('.code_msg').attr('color','#DF013A');
						$('.code_msg').html('&nbsp;<i class="fa fa-times" aria-hidden="true"></i> CODE is available');
					},
					200: function(resp){
						$('.code_msg').attr('color','#04B431');
			  			$('.code_msg').html('&nbsp;<i class="fa fa-check" aria-hidden="true"></i> CODE is unique');
					}
				}
			});
		}


		$('#space_code').keyup(function(e){
			e.preventDefault();
			if($(this).val().length < 5){
				$('.code_msg').attr('color','#DF013A');
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
	// ============================= PROFILE ==================================

	if( $('#profile_view').length == 1 ){

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