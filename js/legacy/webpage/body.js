/** Page Body

	+ body
		+ header (wntoolbar)
		+ banner_area
		+ body
			+ left_sidebar
			+ center
			+ right_sidebar
		+ footer
	+ dead session

**/

function Body() { 
	this.left_sidebar = null;
	this.right_sidebar = null;
	this.status_area = null;
	var me = this;
	page_body = this;	

	this.no_of_columns = function() {
		var n = 2;
		if(cint(me && me.cp && me.cp.right_sidebar_width)) 
			n = n + 1;
		return n;
	}
	
	this.setup_page_areas = function() {
		this.left_sidebar = $('#left-sidebar').get(0);
		this.center = $('#main').get(0);
		this.right_sidebar = $('#sidebar').get(0);

		this.center.header = $a(this.center, 'div');
		this.center.body = $a(this.center, 'div');
		this.center.loading = $a(this.center, 'div', '', {margin:'200px 0px', fontSize:'14px', color:'#999', textAlign:'center'});
		this.center.loading.innerHTML = 'Loading...';
	}
	
	this.full_page = function() {
		if($('#main').hasClass('span10')) {
			$('#sidebar').css('display', 'none');
			$('#main').removeClass('span10').addClass('span13');
			if(this.cur_page) this.cur_page.with_sidebar = false; // remember
		}
	}
	
	this.with_sidebar = function() {
		if($('#main').hasClass('span13')) {
			$('#main').removeClass('span13').addClass('span10');
			$('#sidebar').css('display', 'block');
			if(this.cur_page) this.cur_page.with_sidebar = true; // remember
		}
	}
	
	this.setup_header_footer = function() {		
		// header
		if(cint(this.cp.header_height)) {
			var hh = this.cp.header_height ? (cint(this.cp.header_height) + 'px') : '0px';
			$y(this.header, {height:hh, borderBottom:'1px solid #CCC'}); 
			if(this.cp.client_name)this.banner_area.innerHTML = this.cp.client_name;
		}
		
		// footer
		var fh = this.cp.footer_height ? (cint(this.cp.footer_height) + 'px') : '0px';
		$y(this.footer, {height:fh}); 
		if(this.cp.footer_html)this.footer.innerHTML = this.cp.footer_html;

	}
	
	this.run_startup_code = function() {
		// startup style
		if(this.cp.startup_css)
			set_style(this.cp.startup_css);
		
		// startup code
		try{
			if(this.cp.startup_code)
				eval(this.cp.startup_code);
			if(this.cp.custom_startup_code)
				eval(this.cp.custom_startup_code);
		} catch(e) {
			errprint(e);
		}
	}
	
	this.setup = function() {
		this.cp = locals['Control Panel']['Control Panel'];
		
		this.wrapper = $a($i('body_div'),'div');
		this.banner_area = $a(this.wrapper, 'div');
		this.body = $a(this.wrapper, 'div');
		this.footer = $a(this.wrapper, 'div');
		this.setup_page_areas();

		// headers & footer
		this.setup_header_footer();

		// core areas;
		if(user=='Guest') user_defaults.hide_webnotes_toolbar = 1;
		
		if(!cint(user_defaults.hide_webnotes_toolbar) || user=='Administrator') {
			wn.require('lib/js/wn/ui/toolbar/toolbar.js');
			this.wntoolbar = new wn.ui.toolbar.Toolbar();
		}
	}
	
	// Standard containers
	// - Forms
	// - Report Builder
	// - Item List
	// - [Pages by their names]

	this.pages = {};
	this.cur_page = null;
	this.add_page = function(label, onshow, onhide) {
		var newpage = $a(this.center.body, 'div','content-wrap');
		newpage.sidebar = $a(this.right_sidebar, 'div');
		newpage.with_sidebar = true;
		
		$(newpage).attr('data-pageid', label)

		if(onshow)
			newpage.onshow = onshow;
		if(onhide)
			newpage.onhide = onhide;
		this.pages[label] = newpage;
		
		$dh(newpage);
		$dh(newpage.sidebar);
		
		return newpage;
	}
	
	this.change_to = function(label) {
		// hide existing
		$dh(this.center.loading);
		if(me.cur_page && me.pages[label]!=me.cur_page) {
			if(me.cur_page.onhide)
				me.cur_page.onhide();
			$dh(me.cur_page);
			$dh(me.cur_page.sidebar);
		}
		me.cur_page = me.pages[label];
		if(!me.cur_page) console.log(label + ' not found')
		
		me.cur_page_label = label;
		
		// show page and sidebar
		$(me.cur_page).fadeIn();
		$ds(me.cur_page.sidebar);

		// with our without sidebar?
		if(me.cur_page.with_sidebar) {
			me.with_sidebar();			
		} else {
			me.full_page();
		}
	
		// on show
		if(me.cur_page.onshow)
			me.cur_page.onshow(me.cur_page);			
	}
	
	this.set_session_changed = function() {
		msgprint('Session Expired');
		location.reload();
	}
	
	this.setup();
}