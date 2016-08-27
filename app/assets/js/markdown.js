$(function(){

	$("#editor").keyup(function(){
	    console.log();
	    var converter = new showdown.Converter(),
	    text      = $(this).val(),
	    html      = converter.makeHtml(text);
	    $('.preview').html(html);
	});

		
});