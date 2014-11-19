JS Env Report
=============

Background
----------
Many JS libraries and/or shims either add seemingly native function, or replace native functions with their own implementation to fix specific issues.

The risk however is that these addition and replacement sometimes introduce their own bugs.

Developer coding their application might need to know how much modification the JS environment has to make informed decision of what they can rely on.


Usage
-----
Open the [bookmarklet file](https://github.com/zopim/js_env_report/blob/master/js_env_bookmarklet.js) and create a bookmarklet with it in your browser.

Navigate to your webiste (or any website), and activate the bookmarklet. 

That will load the [reporter file](https://github.com/zopim/js_env_report/blob/master/js_env_tester.js) which will run its battery of test and present its report on the page itself.

Errors will be marked in red, any native function that has been replaced will appear in orange as a warning.
