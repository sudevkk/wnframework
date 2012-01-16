var fcount = 0;
var frozen = 0;

function freeze(msg, do_freeze) {
	// blur
	if(!$('.dialog_back').length) {
		$('.container').append('<div class="dialog_back"></div>');
	}

	$('.dialog_back').css('display', 'block').css(height, $(document).height() + 'px');
	fcount++;
	frozen = true;
}

function unfreeze() {
	if(!fcount)return; // anything open?
	fcount--;
	if(!fcount) {
		$('.dialog_back').css('display', 'none')
		frozen = false;
	}
}
