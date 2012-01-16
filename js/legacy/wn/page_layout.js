/* standard 2-column layout with
	wrapper
		+ wtab
			+ main
				+ head
				+ toolbar_area
				+ body
				+ footer
			+ sidebar_area

*/
wn.PageLayout = function(page, heading) {
	this.wrapper 		= $a(page, 'div', 'page-layout');
	this.main 			= this.wrapper;
	this.sidebar_area 	= page.sidebar;
	this.head 			= $a(this.main, 'div');
	this.toolbar_area 	= $a(this.main, 'div');
	this.body 			= $a(this.main, 'div');
	this.footer 		= $a(this.main, 'div');
	if(heading) {
		this.page_head = new PageHeader(this.head, heading);
	}
}