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
	            save_document();
	            break;
	        }
	    }
	});

	$('#editor').keydown(function (e) {
	    var keyCode = e.keyCode || e.which;

	    if (keyCode === 9) {
	        e.preventDefault();
	        var start = this.selectionStart;
	        var end = this.selectionEnd;

	        // set textarea value to: text before caret + tab + text after caret
	        spaces = "    ";
	        this.value = this.value.substring(0, start) + spaces + this.value.substring(end);

	        // put caret at right position again
	        this.selectionStart = this.selectionEnd = start + spaces.length;
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

	$('.basic_collapse_btn').click(function(e){
		e.preventDefault();
		var self = $('#basic_collapse_btn')
		if( $('#collapse1').hasClass('in') ){
			console.log(self.closest('span'))
			self.removeClass('fa-chevron-down').addClass('fa-chevron-up');
		}
		else{
			self.removeClass('fa-chevron-up').addClass('fa-chevron-down');
		}
	});

	$('.jq_save_doc').click(function(e){
		e.preventDefault();
		save_document();
	});

	$('.jq_clear_txt').click(function(e){
		e.preventDefault();
		if(confirm("Sure you want to cleanup the editor?")){
			$('#editor').val("");
			$('.preview').html("");
		}
	});

	function save_document(){
		alert("Document to be saved");
	}
		
});