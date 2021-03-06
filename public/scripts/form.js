$(function(){
	var validateForm = function(form) {
		var reGoodDate = /^(?:(0[1-9]|1[012])[\/.](0[1-9]|[12][0-9]|3[01])[\/.](19|20)[0-9]{2})$/;
		var condition = true
		var inputNames = ['firstName', 'lastName', 'email', 'password', 'gender', 'birthdate', 'address_line_1', 'address_state', 'address_city', 'address_zip'];
		var inputs = form.find('input');
		var errors = [];
		inputs.each(function(i, el){
			if (inputNames.indexOf($(el).attr('name')) !== -1) {
				if (!$(el).val()) {
					errors.push(el);
				}	
			}
			
			if ($(el).attr('name') === 'birthdate') {
				if (!reGoodDate.test($(el).val())) {
					errors.push(el);
				}
			} else {
				console.log('got here')
			}
		});
		return {errors: errors}
	}

	$('.ui.selection.dropdown')
  		.dropdown();
  	$('.ui.checkbox')
	  .checkbox();
	$(document).on('click','.pre', function(){
		$(this).next().trigger('click');
	})


	$('.form-page').hide();
	$('.form-page[data-section=1]').show();

	$(document).on('click', '.next', function(e){
		e.preventDefault();
		var form = $(this).closest('.form-page');
		if (form.attr('data-section')==='1') {
			console.log('test 1');
			var validation = validateForm(form);
			console.log(validation);
			if (validation.errors.length){
				for (var i=0; i<validation.errors.length; i++) {
					$(validation.errors[i]).closest('label').addClass('error')
				}
				$('.modal').modal('show');
				return false
			} else {
				$('label').removeClass('error');
			}
		}
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

	$(document).on('click', '.passage-buttons .button', function(e){
		e.preventDefault();
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		var para = $(this).closest('.passage').find('p');
		var input = $(this).siblings('input')[0];
		if ($(this).hasClass('dislike')) {
			para.removeClass('liked');
			para.removeClass('no-opinion');
			para.addClass('disliked');
			$(input).val(-1);

		} else if ($(this).hasClass('no-opinion')){
			para.removeClass('liked');
			para.removeClass('disliked');
			para.addClass('no-opinion');
			$(input).val(0)

		} else if ($(this).hasClass('like')) {
			para.removeClass('disliked');
			para.removeClass('no-opinion');
			para.addClass('liked');
			$(input).val(1);
		}

	})
	

	
});


