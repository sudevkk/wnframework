function set_loading() {
	pending_req++;
	if(!page_body) return;
	$('#spinner').css('visibility', 'visible');
	$('body').css('cursor', 'progress');
}

function hide_loading() {
	pending_req--;
	if(!pending_req){
		$('body').css('cursor', 'default');
		$('#spinner').css('visibility', 'hidden');
	}
}