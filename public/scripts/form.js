$(function(){
	$('.ui.selection.dropdown')
  		.dropdown();
  	$('.ui.checkbox')
	  .checkbox()
	;

	$('.form-page').hide();
	$('.form-page[data-section=1]').show();

	$(document).on('click', '.next', function(e){
		e.preventDefault();
		var thisForm = $(this).closest('.form-page')
		thisForm.hide()
		var nextFormData = parseInt(thisForm.attr('data-section')) + 1;
		$('.form-page[data-section='+nextFormData+']').show();

	})
});


