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
	            alert('ctrl + s');
	            break;
	        // case 'k': 								// DETECT <ctrl> + K
	        //     event.preventDefault();
	        //     getSelectionText();
	        //     break;
	        // case 'g':
	        //     event.preventDefault();
	        //     alert('ctrl-g');
	        //     break;
	        }
	    }
	});

	// function getSelectionText() {
	//     var text = "";
	//     if (window.getSelection) {
	//         text = window.getSelection().toString();
	//         // window.getSelection().remove();
	//         console.log("from IF")
	//     } else if (document.selection && document.selection.type != "Control") {
	//     	console.log("from ELSE")
	//         text = document.selection.createRange().text;
	//     }
	//     alert(text);
	// }

	$('.toggle_autosave').click(function(e){
		e.preventDefault();
		if($(this).attr('data-status') == 'off')
		{
			$(this).find('small').text('Turn OFF auto-save after every 4 mins.');
			$(this).attr('data-status', 'on');
			$(this).find('span').removeClass('fa-toggle-off');
			$(this).find('span').addClass('fa-toggle-on');
		}
		else{
			$(this).find('small').text('Turn ON auto-save after every 4 mins.');
			$(this).attr('data-status', 'off');
			$(this).find('span').removeClass('fa-toggle-on');
			$(this).find('span').addClass('fa-toggle-off');
		}
	})
		
});