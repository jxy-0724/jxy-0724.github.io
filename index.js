var lastSelected;
var playingAnimation = false;
var infoFlag = false;

window.onload = function() {
	lastSelected = $('#type1');

	$('.menu').click(function(){
		if(lastSelected[0] == this || playingAnimation){
			return;
		}
		let selected = $(this);
		playingAnimation = true;
		if($('.book').is(":visible")){
			$('.main').show();
			$('.book').hide();

			$('.'+lastSelected.prop('id')).addClass('hidden');
			$('.'+selected.prop('id')).removeClass('hidden');
			$('.'+selected.prop('id')).animate({
				opacity : 1
			},200,'linear',
			function(){
				playingAnimation = false;
			});

			$('.title_'+lastSelected.prop('id')).addClass('hidden');
			$('.title_'+selected.prop('id')).removeClass('hidden');
			$('.title_'+selected.prop('id')).animate({
				opacity : 1
			},200,'linear');
		}else{
			$('.'+lastSelected.prop('id')).animate({
				opacity : 0
			},200,'linear',
			function(){
				$(this).addClass('hidden');
				$('.'+selected.prop('id')).removeClass('hidden');
				$('.'+selected.prop('id')).animate({
					opacity : 1
				},200,'linear',
				function(){
					playingAnimation = false;
				});
			});

			$('.title_'+lastSelected.prop('id')).animate({
				opacity : 0
			},200,'linear',
			function(){
				$(this).addClass('hidden');
				$('.title_'+selected.prop('id')).removeClass('hidden');
				$('.title_'+selected.prop('id')).animate({
					opacity : 1
				},200,'linear');
			});
		}

		// $('.'+$(this).prop('id')).removeClass('hidden');
		$('.content').scrollTop(0);

		$('.menu').addClass('trans');
		$(this).removeClass('trans');

		if(infoFlag){
			resetToolbar();
		}

		lastSelected = $(this);
	});
}

function toolbar_info_click(){
	infoFlag = true;

	$('.toolbar').animate({
		'margin-right' : '-=80px'
	},200,
	function(){
		$('#toolbar_info').hide();
		$('.buttons').show();
		$('.toolbar').animate({
			'margin-right' : '+=80px'
		},200)
	});
}

function resetToolbar(){
	infoFlag = false;

	$('.toolbar').animate({
		'margin-right' : '-=80px'
	},200,
	function(){
		$('#toolbar_info').show();
		$('.buttons').hide();
		$('.toolbar').animate({
			'margin-right' : '+=80px'
		},200)
	});
}

function type1_1_click(){
	$('#type1_1_book').offset($('#type1_1').offset());
	$('#type1_1_book').width($('#type1_1').width());

	$('.main').hide();
	$('.book').show();
	$('.book > div').hide();
	$('.book1_1').show();

	$('#type1_1_book').animate({
		'width' : '58%',
		'top' : '20px',
		'left' : '21%'
	},500,
	function(){
		$("#type1_1_book_intro").show();
		$("#type1_1_video").show();
	});
}

function type1_1_video_click(){
	$("#type1_1_book").hide();
	$('.book_type1_1').hide();
	$('.book1_1_video').show();

	$('.book1_1_video')[0].play();
	$('.book1_1_video').on('ended',function(){
		$('.book1_1').hide();
		$('.book1_1_pages').show();

		let swiper = new Swiper('.sc1', {
			direction: 'vertical'
		});

		swiper.on('reachEnd',function(){
			swiper.allowSlidePrev = false;
		})
	});
}

function type2_2_click(){
	$('#type2_2_book').offset($('#type2_2').offset());
	$('#type2_2_book').width($('#type2_2').width());

	$('.main').hide();
	$('.book').show();
	$('.book > div').hide();
	$('.book2_2').show();

	$('#type2_2_book').animate({
		'width' : '58%',
		'top' : '20px',
		'left' : '21%'
	},500,
	function(){
		$("#type2_2_book_intro").show();
		$("#type2_2_video").show();
	});
}

function type2_2_video_click (){
	$("#type2_2_book").hide();
	$('.book_type2_2').hide();
	$('.book2_2_video').show();

	$('.book2_2_video')[0].play();
	$('.book2_2_video').on('ended',function(){
		$('.book2_2').hide();
		$('.book2_2_pages').show();

		let swiper = new Swiper('.sc2', {
			direction: 'vertical'
		});

		swiper.on('reachEnd',function(){
			swiper.allowSlidePrev = false;
		})
	});
}