// manage app versioning
// if version is changed or version is -1, clear localStorage

wn.versions = {
	check: function() {
		if(localStorage) {
			if(window._version_number==-1 || parseInt(localStorage._version_number)
			 	!= parseInt(window._version_number)) {
				localStorage.clear();
			}
			localStorage.setItem('_version_number', window._version_number);
		}
	}
}