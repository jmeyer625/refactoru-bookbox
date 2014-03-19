$(function(){
	
	var getDialogCoords = function(){
		var width = $(window).width();
		var height = $(window).height();
		return {windowWidth: width, windowHeight: height}
	}
	$('.rec').css('display', 'inline-block');

	var $container = $('.masonry');
	$container.imagesLoaded(function(){
		$container.masonry({
			columnWidth: 280,
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
		var id = $(this).closest('.dialog').attr('data-id')
		$.ajax('/addLike', {
			type: 'POST',
			data: {
				bookId: id
			},
			success: function(data) {
				$('.like-dialog-div').fadeOut();

				
			}
		});
	});
	$(document).on('click', '.addDislike', function(){
		var id = $(this).closest('.dialog').attr('data-id')
		$.ajax('/addDislike',{
			type: 'POST',
			data: {
				bookId: id
			},
			success: function(data) {
				$('.dislike-dialog-div').fadeOut(function(){
					var bookDiv = $('.rec[data-id='+id+']');
					var title = bookDiv.find('.title').text();
					bookDiv.fadeOut(function(){
						var newEl = $('.removed.template').clone()
						newEl.find('.title').text(title);
						newEl.removeClass('template');
						bookDiv.empty().append(newEl.show());
						bookDiv.fadeIn();
					});
				});
				
			}
		});
	})
	$(document).on('click', '.addRead', function(){
		var id = $(this).closest('.dialog').attr('data-id')
		$.ajax('/addRead', {
			type: 'POST',
			data: {
				bookId: id
			},
			success: function(data) {
				$('.dislike-dialog-div').fadeOut(function(){
					var bookDiv = $('.rec[data-id='+id+']')
					var title = bookDiv.find('.title').text();
					bookDiv.fadeOut(function(){
						var newEl = $('.removed.template').clone()
						newEl.find('.title').text(title);
						newEl.removeClass('template');
						bookDiv.empty().append(newEl.show());
						bookDiv.fadeIn();
					})
				});
			}
		});
	});
	
})