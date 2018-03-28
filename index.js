var lastSelected;
var playingAnimation = false;
var infoFlag = false;
var imgs;
var allowScroll = true;

window.onload = function() {
	var queue = new createjs.LoadQueue(false);
	imgs = document.images;
	for(img of imgs){
		let _src = $(img).attr('_src');
		if(_src){
			queue.loadFile(_src);
		}
	}
	for (let i = 1; i <= 20; i++) {
		queue.loadFile('resources/type1_1/pages/page_'+i+'.png');
	}
	for (let i = 1; i <= 19; i++) {
		queue.loadFile('resources/type2_2/pages/page_'+i+'.png');
	}
	queue.on("complete",queueOnComplete);

	$(document).on('touchmove', function (e) {
		if(!allowScroll){
			e.preventDefault();
		}
	});

	lastSelected = $('#type1');

	$('.menu').click(function(){
		if(playingAnimation){
			return;
		}
		allowScroll = true;
		let selected = $(this);
		playingAnimation = true;
		if($('.book').is(":visible")){
			$('.main').show();
			$('.book').hide();

			$('.content').scrollTop(0);

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
				$('.content').scrollTop(0);

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

		$('.menu').addClass('trans');
		$(this).removeClass('trans');

		if(infoFlag){
			resetToolbar();
		}

		lastSelected = $(this);
	});

	init_book1_1();
	init_book2_2();
}

function init_book1_1(){
	let start;
	$('.book1_1_pages').on('touchstart',function(e){
		start = e.touches[0].clientY;
	});
	$('.book1_1_pages').on('touchend',function(e){
		if(playingAnimation){
			return;
		}

		let end = e.changedTouches[0].clientY;
		if(start - end > 50){
			book1_1_showNextImage();
		}
		if(end - start > 50){
			book1_1_showLastImage();
		}
	});
}

function init_book2_2(){
	let start;
	$('.book2_2_pages').on('touchstart',function(e){
		start = e.touches[0].clientY;
	});
	$('.book2_2_pages').on('touchend',function(e){
		if(playingAnimation){
			return;
		}

		let end = e.changedTouches[0].clientY;
		if(start - end > 50){
			book2_2_showNextImage();
		}
		if(end - start > 50){
			book2_2_showLastImage();
		}
	});
}

function queueOnComplete(){
	for(img of imgs){
		let _src = $(img).attr('_src');
		if(_src){
			$(img).attr('src',_src);
		}
	}

	$('.loading').remove();
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
	$('#type1_1_book_intro').hide();
	$("#type1_1_video").hide();

	$('#type1_1_book').animate({
		'width' : '58%',
		'top' : '20px',
		'left' : '21%'
	},500,
	function(){
		$("#type1_1_book_intro").show();
		$("#type1_1_video").show();
		allowScroll = false;

		let start;
		$('.book1_1').on('touchstart',function(e){
			start = e.touches[0].clientY;
		});
		$('.book1_1').on('touchend',function(e){
			let end = e.changedTouches[0].clientY;
			if(start - end > 50){
				type1_1_video_ended();
			}
		});
	});
}

function type1_1_video_click(){
	$("#type1_1_book").hide();
	$('.book_type1_1').hide();
	$('.book1_1_video').show();

	$('.book1_1_video')[0].play();
	$('.book1_1_video').on('ended',type1_1_video_ended);
}

function type1_1_video_ended(){
	$('.book1_1').hide();
	$('.book1_1_pages').show();

	book1_1_imageNo = 1;
	$('.book1_1_pages > img').attr('src','resources/type1_1/pages/page_'+book1_1_imageNo+'.png');
	$('.book1_1_pages > img').show();
	$('.buyPage').hide();
}

var book1_1_imageNo = 1;
// 1~20 序列帧
// 21 购物
const book1_1_imageMaxNo = 21;
function book1_1_showNextImage(){
	book1_1_imageNo++;
	if(book1_1_imageNo < 21){
		$('.book1_1_pages > img').attr('src','resources/type1_1/pages/page_'+book1_1_imageNo+'.png');
	}else if(book1_1_imageNo == 21){
		playingAnimation = true;

		$('.book1_1_pages').children().hide();
		$('.buyPage').show();

		$('.buyPage_imgs > img').css('opacity',0);
		$('.buyPage_imgs > img[class!=img_book]').hide();
		$('.img_book').css('padding-top','25vh');
		$('.img_book').animate({
			'opacity' : 1
		},500).animate({
			'padding-top' : '0'
		},500,
		function(){
			$('.buyPage_imgs > img[class!=img_book]').show();
			$('.buyPage_imgs > img[class!=img_book]').animate({
				'opacity' : 1
			},500,
			function(){
				playingAnimation = false;
			});
		});
	}
}

function book1_1_showLastImage(){
	if(book1_1_imageNo > book1_1_imageMaxNo){
		book1_1_imageNo = book1_1_imageMaxNo;
	}
	book1_1_imageNo--;
	if(book1_1_imageNo > 0){
		if($('.book1_1_pages > img').is(":visible")){
			$('.book1_1_pages > img').attr('src','resources/type1_1/pages/page_'+book1_1_imageNo+'.png');	
		}else{
			$('.book1_1_pages > img').show();
			$('.buyPage').hide();
		}
	}else{
		book1_1_imageNo = 1;
	}
}

// book2_2
function type2_2_click(){
	$('#type2_2_book').offset($('#type2_2').offset());
	$('#type2_2_book').width($('#type2_2').width());

	$('.main').hide();
	$('.book').show();
	$('.book > div').hide();
	$('.book2_2').show();
	$('#type2_2_book_intro').hide();
	$("#type2_2_video").hide();

	$('#type2_2_book').animate({
		'width' : '58%',
		'top' : '20px',
		'left' : '21%'
	},500,
	function(){
		$("#type2_2_book_intro").show();
		$("#type2_2_video").show();
		allowScroll = false;

		let start;
		$('.book2_2').on('touchstart',function(e){
			start = e.touches[0].clientY;
		});
		$('.book2_2').on('touchend',function(e){
			let end = e.changedTouches[0].clientY;
			if(start - end > 50){
				type2_2_video_ended();
			}
		});
	});
}

function type2_2_video_click(){
	$("#type2_2_book").hide();
	$('.book_type2_2').hide();
	$('.book2_2_video').show();

	$('.book2_2_video')[0].play();
	$('.book2_2_video').on('ended',type2_2_video_ended);
}

function type2_2_video_ended(){
	$('.book2_2').hide();
	$('.book2_2_pages').show();

	book2_2_imageNo = 1;
	$('.book2_2_pages > img').attr('src','resources/type2_2/pages/page_'+book2_2_imageNo+'.png');
	$('.book2_2_pages > img').show();
	$('.buyPage').hide();
}

var book2_2_imageNo = 1;
// 1~19 序列帧
// 20 购物
// 21 详情
const book2_2_imageMaxNo = 21;
function book2_2_showNextImage(){
	book2_2_imageNo++;
	if(book2_2_imageNo < 20){
		$('.book2_2_pages > img').attr('src','resources/type2_2/pages/page_'+book2_2_imageNo+'.png');
	}else if(book2_2_imageNo == 20){
		playingAnimation = true;

		$('.book2_2_pages').children().hide();
		$('.book2_2_pages .buyPage').show();

		$('.buyPage_imgs > img').css('opacity',0);
		$('.buyPage_imgs > img[class!=img_book]').hide();
		$('.img_book').css('padding-top','25vh');
		$('.img_book').animate({
			'opacity' : 1
		},500).animate({
			'padding-top' : '0'
		},500,
		function(){
			$('.buyPage_imgs > img[class!=img_book]').show();
			$('.buyPage_imgs > img[class!=img_book]').animate({
				'opacity' : 1
			},500,
			function(){
				playingAnimation = false;
			});
		});
	}else if(book2_2_imageNo == 21){
		$('.book2_2_pages').children().hide();
		$('.book2_2_pages .introPage').show();

		allowScroll = true;
	}
}

function book2_2_showLastImage(){
	if(book2_2_imageNo > book2_2_imageMaxNo){
		book2_2_imageNo = book2_2_imageMaxNo;
	}

	if(book2_2_imageNo == book2_2_imageMaxNo && window.pageYOffset > 0){
		return;
	}

	book2_2_imageNo--;
	if(book2_2_imageNo > 0){
		if(book2_2_imageNo < 20){
			$('.book2_2_pages').children().hide();
			$('.book2_2_pages > img').show();
			$('.book2_2_pages > img').attr('src','resources/type2_2/pages/page_'+book2_2_imageNo+'.png');	
		}else if(book2_2_imageNo == 20){
			$('.book2_2_pages').children().hide();
			$('.book2_2_pages .buyPage').show();
			allowScroll = false;
		}
	}else{
		book2_2_imageNo = 1;
	}
}

function type6_1_click(){
	$('.main').hide();
	$('.book').show();
	$('.book > div').hide();
	$('.book6_1').show();
}

function type6_2_click(){
	$('.main').hide();
	$('.book').show();
	$('.book > div').hide();
	$('.book6_2').show();
}

function type6_3_click(){
	$('.main').hide();
	$('.book').show();
	$('.book > div').hide();
	$('.book6_3').show();
}

function type7_1_click(){
	$('.main').hide();
	$('.book').show();
	$('.book > div').hide();
	$('.book7_1').show();
}

function type7_2_click(){
	$('.main').hide();
	$('.book').show();
	$('.book > div').hide();
	$('.book7_2').show();
}