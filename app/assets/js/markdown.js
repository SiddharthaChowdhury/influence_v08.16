$(function(){

	$("#editor").keyup(function(){
	    console.log();
	    var converter = new showdown.Converter(),
	    text      = $(this).val(),
	    html      = converter.makeHtml(text);
	    $('.preview').html(html);
	});

															
	$(window).bind('keydown', function(event) {			
	    if (event.ctrlKey || event.metaKey) {
	        switch (String.fromCharCode(event.which).toLowerCase()) {
	        case 's':                              	// DETECT <ctrl> + S
	            event.preventDefault();
	            alert('ctrl-s');
	            break;
	        case 'k': 								// DETECT <ctrl> + K
	            event.preventDefault();
	            alert('ctrl-f');
	            break;
	        // case 'g':
	        //     event.preventDefault();
	        //     alert('ctrl-g');
	        //     break;
	        }
	    }
	});
		
});