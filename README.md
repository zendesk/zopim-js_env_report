JS Env Report
=============

Background
----------
Many JS libraries and/or shims either add seemingly native functions, or replace native functions with their own implementation to fix specific issues.

The risk however is that these additions and replacements sometimes introduce their own bugs.

Developers coding their application might need to know how much modification the JS environment has, to make informed decisions of what they can rely on.


Usage
-----
Open the [bookmarklet file](https://github.com/zopim/js_env_report/blob/master/js_env_bookmarklet.js) and create a bookmarklet with it in your browser.

Navigate to your webiste (or any website), and activate the bookmarklet. 

That will load the [reporter file](https://github.com/zopim/js_env_report/blob/master/js_env_tester.js) which will run its battery of tests and present its report on the page itself.

Errors will be marked in red. Any native function that has been replaced, but seems to work correctly will appear in orange as a warning.


Sample Report
-------------

![Sample Report](https://github.com/zopim/js_env_report/blob/master/sample_report.png)


Copyright and license
=====================

Copyright 2014 Zopim

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.

You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
