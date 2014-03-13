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
		var thisForm = $(this).closest('.form-page');
		thisForm.animate({'right':'2000px'}, 400, function(){
			thisForm.hide()
			thisForm.css('right','');
			var nextFormData = parseInt(thisForm.attr('data-section')) + 1;
			var newForm = $('.form-page[data-section='+nextFormData+']');
			newForm.css('left','2000px');
			newForm.show();
			if (nextFormData === 3) {
				$('.passage-div[data-passage=0]').css('display', 'block');
			}
			newForm.animate({'left':''}, 400, function(){
				newForm.css('left','');
			});
			
		});
		

	});
	$(document).on('click', '.next-passage', function(e){
		e.preventDefault();
		var thisPassage = $(this).closest('.passage-div');
		thisPassage.animate({'right':'2000px'}, 400, function(){
			thisPassage.hide();
			thisPassage.css('right','');
			var nextPassage = parseInt(thisPassage.attr('data-passage')) + 1;
			var newPassage = $('.passage-div[data-passage='+nextPassage+']')
			newPassage.css('left','2000px');
			newPassage.show();
			newPassage.animate({'left':''},400, function(){
				newPassage.css('left','');
			});
		})
		
		
	});
	$(document).on('click', '.prev', function(e){
		e.preventDefault();
		var thisForm = $(this).closest('.form-page')
		var nextFormData = parseInt(thisForm.attr('data-section')) - 1;
		if (nextFormData === 0) {
			return false;
		} else {
			thisForm.animate({'left':'2000px'}, 400, function(){
				thisForm.hide()
				thisForm.css({'left':''})
				var newForm = $('.form-page[data-section='+nextFormData+']');
				newForm.css({'right':'2000px'})
				newForm.show();
				newForm.animate({'right':''}, 200, function(){
					newForm.css('right','');
				});
			});
		}
	});
	$(document).on('click', '.prev-passage', function(e){
		e.preventDefault();
		var thisPassage = $(this).closest('.passage-div');
		thisPassage.animate({'left':'2000px'}, 400, function(){
			thisPassage.hide();
			thisPassage.css('left','');
			var nextPassage = parseInt(thisPassage.attr('data-passage')) - 1;
			if (nextPassage === -1) {
				var newForm = $('.form-page[data-section=2]');
				newForm.css({'right':'2000px'});
				newForm.show();
				newForm.animate({'right':''}, 200);
			} else {
				var newForm = $('.passage-div[data-passage='+nextPassage+']');
				newForm.css({'right':'2000px'});
				newForm.show();
				newForm.animate({'right':''}, 200, function(){
					newForm.css('right','');
				});
			}
		});
	});

});


