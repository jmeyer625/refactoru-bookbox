$(function(){
	$('.rec').css('display', 'inline-block');

	var $container = $('.masonry');
	$container.imagesLoaded(function(){
		$container.masonry({
			columnWidth: 300,
			itemSelector: '.rec'
		})
	});

	$(document).on('mouseenter', '.rec', function(){
		$(this).find('.rec-hover').show()
	});
	$(document).on('mouseleave', '.rec', function(){
		$(this).find('.rec-hover').hide()
	});
	$(document).on('click', '.like', function(){

	});

	$(document).on('click', '.dislike', function(){

	});
})