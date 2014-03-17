$(function(){
	var getDialogCoords = function(){
		var width = $(window).width();
		var height = $(window).height();
		return {windowWidth: width, windowHeight: height}
	}
	$('.vertical .item').removeClass('active');
	$('#menu-item-2').addClass('active');
	$('#menu-item-2').addClass('teal');

	$('.rec').css('display', 'inline-block');

	var $container = $('.masonry');
	$container.imagesLoaded(function(){
		$container.masonry({
			columnWidth: 300,
			itemSelector: '.rec'
		});
	});
	$(document).on('mouseenter', '.rec', function(){
		$(this).find('.rec-hover').show();
	});
	$(document).on('mouseleave', '.rec', function(){
		$(this).find('.rec-hover').hide();
	});
	$(document).on('click', '.like', function(){
		var windowCoords = getDialogCoords();
		console.log(windowCoords);
		console.log($('.like-dialog').height());
		$('.like-dialog-div').fadeIn();
		$('.like-dialog-div').find('.like-dialog').css('top', windowCoords.windowHeight/2 - $('.like-dialog').height()/2);
		$('.like-dialog-div').find('.like-dialog').css('left', windowCoords.windowWidth/2 - $('.like-dialog').width()/2);
		$('.like-dialog').attr('data-id', $(this).closest('.rec').attr('data-id'));
	});
	$(document).on('click', '.dislike', function(){
		var windowCoords = getDialogCoords();
		$('.dislike-dialog-div').fadeIn();
		$('.dislike-dialog-div').find('.dislike-dialog').css('top', windowCoords.windowHeight/2 - $('.dislike-dialog').height()/2);
		$('.dislike-dialog-div').find('.dislike-dialog').css('left', windowCoords.windowWidth/2 - $('.dislike-dialog').width()/2);
		$('.dislike-dialog').attr('data-id', $(this).closest('.rec').attr('data-id'));
	});
	$(document).on('click', '.addLike', function(){
		$.ajax('/addLike', {
			type: 'POST',
			data: {
				bookId: $(this).closest('.dialog').attr('data-id')
			},
			success: function(data) {
				console.log(data);
				$('.like-dialog-div').fadeOut();
				
			}
		});
	});
	$(document).on('click', '.addDislike', function(){
		$.ajax('/addDislike',{
			type: 'POST',
			data: {
				bookId: $(this).closest('.dialog').attr('data-id')
			},
			success: function(data) {
				console.log(data);
				$('.dislike-dialog-div').fadeOut();
			}
		});
	})
	$(document).on('click', '.addRead', function(){
		$.ajax('/addRead', {
			type: 'POST',
			data: {
				bookId: $(this).closest('.dialog').attr('data-id')
			},
			success: function(data) {
				console.log(data);
				$('.dislike-dialog-div').fadeOut();
			}
		});
	});
})