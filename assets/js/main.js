(function ($) {
	
	// bind a click event to the 'skip' link
    $(".navigation a").keydown(function(event) {

        // strip the leading hash and declare
        // the content we're skipping to
        var skipTo = "#" + this.href.split('#')[1];

        // Setting 'tabindex' to -1 takes an element out of normal 
        // tab flow but allows it to be focused via javascript
        $(skipTo).attr('tabindex',  -1).on('blur focusout', function() {

            // when focus leaves this element, 
            // remove the tabindex attribute
            $(this).removeAttr('tabindex');
		}).focus(); // focus on the content container
	});
	
	var findInsiders = function (elem) {
		var tabbable = elem.find('select, input, textarea, button, a').filter(':visible');
		var firstTabbable = tabbable.first();
		var lastTabbable = tabbable.last();
		/*set focus on first input*/
	    firstTabbable.focus();
		/*redirect last tab to first input*/
	    lastTabbable.on('keydown', function(e) {
			if ((e.which === 9 && !e.shiftKey)) {
				e.preventDefault();
				firstTabbable.focus();
			}
		});
		/*redirect first shift+tab to last input*/
	    firstTabbable.on('keydown', function(e) {
			if ((e.which === 9 && e.shiftKey)) {
				e.preventDefault();
				lastTabbable.focus();
			}
		});
		/* allow escape key to close insiders div */
	    elem.on('keyup', function(e) {
			if (e.keyCode === 27) {
				elem.hide();
			};
		});
	};
	
	$('.closeModalButton').click(function(e) {
		console.log("klikk");
		e.preventDefault();
		$('.insiders').hide();
	});
	
	// REMOVE OUTLINE ON CLICKABLE ITEMS WHEN USING MOUSE
	document.body.addEventListener('mousedown', function() {
		document.body.classList.add('using-mouse');
	});
	
	// Re-enable focus styling when Tab is pressed
	document.body.addEventListener('keydown', function(event) {
		if (event.keyCode === 9) {
			document.body.classList.remove('using-mouse');
		}
	});
	
	// HAMBURGER MENU
	$('.hamburger').click(function() {
		// ADD IS-ACTIVE CLASS TO ICON
		$(this).toggleClass('is-active');
		$(this).next().toggleClass('openMenu');
		$('body').toggleClass('is-active');
	});
	
	$('.navigation li a').click(function() {
		if ( $('.hamburger').css('display') == 'block' ) {
			$('body').toggleClass('is-active');
		}
		$(this).parentsUntil('navigationContainer').toggleClass('openMenu');
		$(this).parentsUntil('navigationContainer').prev().toggleClass('is-active');
	});
	
	$('.bodyOverlay').click(function() {
		$('body').toggleClass('is-active');
		$(this).next().toggleClass('is-active');
		$(this).next().next().toggleClass('openMenu');
	});
	
	// MODAL MENU BUTTON
	$('.modalMenuToggle').click(function(e) {
		e.preventDefault();
		$('body').toggleClass('showVerticalNav');
	});
	
	$('.navigationContainer').click(function(e) {
		e.preventDefault();
		
		if ( $('body').hasClass('showVerticalNav') ) {
			$('body').removeClass('showVerticalNav');
		}
	});
	
	// NEXT STOP BUTTONS
	$('.nextStopModal').click(function() {
		
		var modalVisible = $('.open'),
		videoURL = modalVisible.find('iframe').attr('src'),
		dataplay = modalVisible.find('iframe').attr('data-play');
		
		$(this).parent().parent().fadeOut().removeClass('open');
		replaceURL = videoURL.replace("&autoplay=1", "");
		modalVisible.find('.ytIframe').prop('src','');
		modalVisible.find('.ytIframe').prop('src', replaceURL);
		
		var iframe = modalVisible.find('iframe'),
		iframeURL = iframe.attr('src');
		iframe.attr("src", "");
		iframe.attr("src", iframeURL);
		
		modalVisible.fadeOut();
	});
	
	// VIDEO MODAL
	$('.openModal').click(function(e) {
		e.preventDefault();
		
		$('.insiders').show();
		findInsiders($('.insiders'));
		
		var id = $(this).attr('id');
		
		$('body').addClass('modalIsVisible');
		
		$("div[data-id=" + id + "]").fadeIn().addClass('open');
		
			var modalVisible = $('.open'),
			//bottomModalNav = modalVisible.next(),
		    videoURL = modalVisible.find('iframe').attr('src'),
            dataplay = modalVisible.find('iframe').attr('data-play');
			modalVisible.find('.externalLink').focus();
			
			//bottomModalNav.fadeIn();
		
			//for check autoplay
		    //if not set autoplay=1
		    if ( dataplay == 0 ) {
		        if ( modalVisible.length ) {
					modalVisible.find('.ytIframe').attr('src',videoURL+'&autoplay=1');
			        modalVisible.find('.ytIframe').attr('data-play',1);
				}
		     } else {
		        var videoURL = modalVisible.find('.ytIframe').attr('src');
		        replaceURL = videoURL.replace("&autoplay=1", "");
		        modalVisible.find('.ytIframe').prop('src','');
		        modalVisible.find('.ytIframe').prop('src', replaceURL);
		
		        modalVisible.find('.ytIframe').attr('data-play',0);
		     }
	});
	
	$('.closeModalButton').click(function() {
		
		$('body').removeClass('modalIsVisible');
		
		var modalVisible = $('.open'),
		videoURL = modalVisible.find('iframe').attr('src'),
		dataplay = modalVisible.find('iframe').attr('data-play');
		
		$(this).parent().parent().fadeOut().removeClass('open');
		replaceURL = videoURL.replace("&autoplay=1", "");
		modalVisible.find('.ytIframe').prop('src','');
		modalVisible.find('.ytIframe').prop('src', replaceURL);
		
		var iframe = modalVisible.find('iframe'),
		iframeURL = iframe.attr('src');
		iframe.attr("src", "");
		iframe.attr("src", iframeURL);
	});
	
	$('.navigation li a').click(function() {
		
		$('body').removeClass('modalIsVisible showVerticalNav is-active');
		
		$(this).parent().parent().parent().removeClass('openMenu');
		
		var modalVisible = $('.open'),
		hamburgerIcon = $('.hamburger'),
		videoURL = modalVisible.find('iframe').attr('src'),
		dataplay = modalVisible.find('iframe').attr('data-play');
		
		modalVisible.fadeOut().removeClass('open');
		replaceURL = videoURL.replace("&autoplay=1", "");
		modalVisible.find('.ytIframe').prop('src','');
		modalVisible.find('.ytIframe').prop('src', replaceURL);
		
		hamburgerIcon.removeClass('is-active');
		
		var iframe = modalVisible.find('iframe'),
		iframeURL = iframe.attr('src');
		iframe.attr("src", "");
		iframe.attr("src", iframeURL);
	});
	
	$('.nextStopModal').click(function() {
		
		$('body').removeClass('modalIsVisible');
		
		var modalVisible = $('.open'),
		//bottomModalNav = modalVisible.next(),
		videoURL = modalVisible.find('iframe').attr('src'),
		dataplay = modalVisible.find('iframe').attr('data-play');
		
		//bottomModalNav.fadeOut();
		
		$(this).parent().parent().fadeOut().removeClass('open');
		replaceURL = videoURL.replace("&autoplay=1", "");
		modalVisible.find('.ytIframe').prop('src','');
		modalVisible.find('.ytIframe').prop('src', replaceURL);
		//modalVisible.find('.ytIframe').attr('data-play',0);
	});
	
	/*
	$('.modal').click(function() {
		
		$('body').removeClass('modalIsVisible');
		
		var modalVisible = $('.open'),
		videoURL = modalVisible.find('iframe').attr('src'),
		dataplay = modalVisible.find('iframe').attr('data-play');
		
		$(this).fadeOut().removeClass('open');
		replaceURL = videoURL.replace("&autoplay=1", "");
		modalVisible.find('.ytIframe').prop('src','');
		modalVisible.find('.ytIframe').prop('src', replaceURL);
	});
	*/
	// OPEN INTRO VIDEO MODAL FROM SPLASH SECTION
	$('.openIntroVideo').click(function(e) {
		e.preventDefault();
		$(this).parentsUntil('splash').find('.introVideo').fadeIn();
	});
	
	$(document).keyup(function(e) {
		if (e.key === "Escape") { // escape key maps to keycode `27`
	        $('.modal').fadeOut();
			$('html, body').removeClass('modalOpen modalIsVisible');
			$('header').css('opacity', '1');
			
			var modalVisible = $('.open'),
			hamburgerIcon = $('.hamburger'),
			videoURL = modalVisible.find('iframe').attr('src'),
			dataplay = modalVisible.find('iframe').attr('data-play');
			
			modalVisible.fadeOut().removeClass('open');
			$('body').removeClass('modalIsVisible');
			replaceURL = videoURL.replace("&autoplay=1", "");
			modalVisible.find('.ytIframe').prop('src','');
			modalVisible.find('.ytIframe').prop('src', replaceURL);
			
			hamburgerIcon.removeClass('is-active');
			
			var iframe = modalVisible.find('iframe'),
			iframeURL = iframe.attr('src');
			iframe.attr("src", "");
			iframe.attr("src", iframeURL);
		}
	});
	
	// DOT NAVIGATION
	$(function() {
		$(window).on("load", function(pager) {
			var eventElemArray = [];
			var _count = 0;
			var _countFix = 0;
			$(window).on('load scroll resize', function() {
				eventElemArray = [];
				_count = 0;
				$('[data-nav]').each(function(i, pager) {
					eventElemArray.push($(pager).offset().top);
				});
				for (var _i = 0; _i < eventElemArray.length; _i++) {
					if ($(window).scrollTop() + ($(window).height() * 0.5) > eventElemArray[_i]) {
						_count++;
					}
				}
				
				if (_count !== _countFix) {
					_countFix = _count;
					$('.navigation li').removeClass('current');
					$('.navigation li').eq(_count - 1).addClass('current');
				}
			});
			$('.navigation li').on('click', function() {
				var speed = 700;
				var href = $(this).attr('data-nav-href');
				var offset = $(this).attr('data-nav-offset') | 0;
				var target = $(href == '' ? 'html': href);
				var position = target.offset().top + offset
			    $('body,html').animate({
					scrollTop: position
				},
				speed);
				return false;
			});
		});
	});
	
	// AOS INIT
	$(function() {
		AOS.init();
	});
		
	// SMOOTH SCROLL
	$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function() {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target: $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				//setTimeout(function(){	
				$('html,body').animate({
					scrollTop: target.offset().top
				},
				1000);
				return false;
			}
		}
	});
	
	// FIX HEADER ON SCROLL
	/*
	function stickyHeader() {
		$('header').toggleClass('fixed');
	}
	
	$(window).scroll(function() {  
	    if ( $(window).scrollTop() > 50 ) {
	        $('header').addClass('fixed');
	    }
	    else {
	        $('header').removeClass('fixed');
	    }  
	});
	*/
	
	// FIX HEADER ON SCROLL
	function stickyHeader() {
		$('header.fixed').toggleClass('reveal');
	}
	
	$(window).scroll(function() {  
	    if ( $(window).scrollTop() > 150 ) {
	        $('header.fixed').addClass('reveal');
	    }
	    else {
	        $('header.fixed').removeClass('reveal');
	    }  
	});
	
})(jQuery);