javascript:(function() {
	var script = document.createElement('script');
	script.setAttribute('charset','utf-8');
	script.async = true;
	script.src   = 'https://cdn.rawgit.com/zopim/js_env_report/aa5e14d8a6/js_env_tester.js';
	script.type  = 'text/javascript';
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(script);
})();
