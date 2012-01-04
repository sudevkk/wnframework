// requires
// menu.js
// search.js
// datatype.js
// dom.js

var about_dialog;

function WNToolbar(parent) {
	var me = this;
	
	this.setup = function() {
		this.wrapper = $a(parent, 'div', '', {color:'#FFF', padding:'2px 0px' });
		set_gradient(this.wrapper, '#444', '#000');

		this.table_wrapper = $a(this.wrapper, 'div', '', {marginLeft:'4px', padding:'2px'});
		this.body_tab = make_table(this.table_wrapper, 1, 3, '100%', ['0%','64%','36%'],{verticalAlign:'middle'});
		
		this.menu = new MenuToolbar($td(this.body_tab,0,1));
		this.setup_logout();
	}
	// Setup User / Logout area
	// ----------------------------------------------------------------------------------------

	this.setup_logout = function() {
		
		var w = $a($td(this.body_tab, 0, 2),'div','',{paddingTop:'2px', textAlign:'right'});
		this.right_table_style = {fontSize:'11px',verticalAlign:'middle',height:'20px',paddingLeft:'4px',paddingRight:'4px'};
		var t = make_table(w, 1, 6, null, [], this.right_table_style);
		this.spinner = $a($td(t,0,5),'img','',{display:'none'}); this.spinner.src = 'lib/images/ui/spinner.gif';
	}
	
	this.setup();
}
