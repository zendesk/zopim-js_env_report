javascript:(function() {
	var script = document.createElement('script');
	script.setAttribute('charset','utf-8');
	script.async = true;
	script.src   = '//tim.zopim.com/bin/js_env_tester.js?' + Math.random();
	script.type  = 'text/javascript';
	var body = document.getElementsByTagName('body')[0];
	body.appendChild(script);
})();
