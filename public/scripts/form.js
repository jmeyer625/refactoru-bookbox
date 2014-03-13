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
		thisForm.hide();
		var nextFormData = parseInt(thisForm.attr('data-section')) + 1;
		$('.form-page[data-section='+nextFormData+']').show();
		if (nextFormData === 3) {
			$('.passage-div[data-passage=0]').css('display', 'block');
		}

	});
	$(document).on('click', '.next-passage', function(e){
		e.preventDefault();
		var thisPassage = $(this).closest('.passage-div');
		thisPassage.hide();
		var nextPassage = parseInt(thisPassage.attr('data-passage')) + 1;
		$('.passage-div[data-passage='+nextPassage+']').show();
		
	});
	$(document).on('click', '.prev', function(e){
		e.preventDefault();
		var thisForm = $(this).closest('.form-page')
		var nextFormData = parseInt(thisForm.attr('data-section')) - 1;
		if (nextFormData === 0) {
			return false;
		} else {
			thisForm.hide();
			$('.form-page[data-section='+nextFormData+']').show();
		}
		
		

	});
	$(document).on('click', '.prev-passage', function(e){
		e.preventDefault();
		var thisPassage = $(this).closest('.passage-div');
		thisPassage.hide();
		var nextPassage = parseInt(thisPassage.attr('data-passage')) - 1;
		if (nextPassage === -1) {
			$('.form-page[data-section=2]').show()
		} else {
			$('.passage-div[data-passage='+nextPassage+']').show();
		}
		
		
	});

});


