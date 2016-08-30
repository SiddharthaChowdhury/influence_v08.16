// wysiwyg.js
$(document).ready(function(){

	$('#summernote').summernote({
		height: 590,                 					// set editor height
		minHeight: null,             					// set minimum height of editor
		maxHeight: null,             					// set maximum height of editor
		focus: true, 									// set focus to editable area after initializing summernote    

		callbacks: {										
        	onImageUpload : function(file, editor, welEditable) {
        		console.log('initiated')
				saveFile(file[0], editor, welEditable);
	        },
	        onChange : function($editable, sHtml){
	        	// console.log($editable);
	        	$('.preview').html($editable)
	        },
    	}          					 
	});

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
	});


});