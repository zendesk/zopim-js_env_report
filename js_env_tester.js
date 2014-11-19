(function(window){

// Definition: 
// each tests contains an object, containing:
// * name: what we are testing
// * ref: the property we're trying to access
// * exists: custom function to check existence (not present = default exists)
// * isNative: custom function to check existence (not present = default isNative)
// * isValid: implementation is good enough for us
// * getQuirks: returns known quirks and their possible drawbacks

var natives = [
	{
		section: 'Native functions'
	},
	{
		name: 'parseFloat',
		ref: parseFloat,
		isValid: function(parseFloat) {
			var f;
			f = parseFloat('1');
			var returns_number = typeof(f) === "number";
			f = parseFloat('1.2');
			var returns_number = returns_number && (typeof(f) === "number");
			f = parseFloat('abc');
			var returns_NaN = isNaN(f);
			return returns_number && returns_NaN;
		}
	},
	{
		name: 'parseInt',
		ref: parseInt
	},

/*=====================================================================
 * Math Object
=====================================================================*/

	{
		section: 'Math'
	},
	{
		name: 'Math.cos',
		ref: Math.cos
	},
	{
		name: 'Math.sin',
		ref: Math.sin
	},
	{
		name: 'Math.tan',
		ref: Math.tan
	},
	{
		name: 'Math.acos',
		ref: Math.acos
	},
	{
		name: 'Math.asin',
		ref: Math.asin
	},
	{
		name: 'Math.atan',
		ref: Math.atan
	},
	{
		name: 'Math.atan2',
		ref: Math.atan2
	},
	{
		name: 'Math.min',
		ref: Math.min
	},
	{
		name: 'Math.max',
		ref: Math.max
	},
	{
		name: 'Math.floor',
		ref: Math.floor
	},
	{
		name: 'Math.ceil',
		ref: Math.ceil
	},
	{
		name: 'Math.round',
		ref: Math.round
	},
	{
		name: 'Math.exp',
		ref: Math.exp
	},
	{
		name: 'Math.log',
		ref: Math.log
	},
	{
		name: 'Math.pow',
		ref: Math.pow
	},
	{
		name: 'Math.sqrt',
		ref: Math.sqrt
	},
	{
		name: 'Math.random',
		ref: Math.random
	},

/*=====================================================================
 * Date Object
=====================================================================*/
/*=====================================================================
 * JSON Object
=====================================================================*/
	{
		section: 'JSON'
	},
	{
		name: 'JSON.stringify',
		ref: JSON.stringify
	},
	{
		name: 'JSON.parse',
		ref: JSON.parse
	},

/*=====================================================================
 * Strings
=====================================================================*/
	{
		section: 'String'
	},
	{
		name: 'String.indexOf',
		ref: String.prototype.indexOf,
		isValid: function(indexOf) {
			var s = "Hello";
			var index_ok = (
				s.indexOf('H') === 0 && 
				s.indexOf('l') === 2 && 
				s.indexOf('o') === 4
			);
			var not_found_ok = s.indexOf('z') === -1;
			var length_one_ok = 'a'.indexOf('a') === 0;
			var length_zero_ok = ''.indexOf('a') === -1;
			return index_ok && not_found_ok && length_one_ok && length_zero_ok;
		}
	},
	{
		name: 'String.lastIndexOf',
		ref: String.prototype.lastIndexOf,
		isValid: function(lastIndexOf) {
			var s = "Hello";
			var index_ok = (
				s.lastIndexOf('H') === 0 && 
				s.lastIndexOf('l') === 3 && 
				s.lastIndexOf('o') === 4
			);
			var not_found_ok = s.lastIndexOf('z') === -1;
			var length_one_ok = 'a'.lastIndexOf('a') === 0;
			var length_zero_ok = ''.lastIndexOf('a') === -1;
			return index_ok && not_found_ok && length_one_ok && length_zero_ok;
		}
	},
	{
		name: 'String.substring',
		ref: String.prototype.substring
	},
	{
		name: 'String.substr',
		ref: String.prototype.substr
	},
	{
		name: 'String.replace',
		ref: String.prototype.replace,
		isValid: function() {
			// replace() should not throw on no match
			// example of bad implementation: es5-shim 4.0.3
			// https://github.com/es-shims/es5-shim/issues/272
			try {
				'x'.replace(/(y)/g, 'oops');
			}
			catch (e) {
				return false;
			}
			return true;
		},
		getQuirks: function() {
			return {
				reportsGroupsCorrectly: (function() {
					var groups = [];
					'x'.replace(/x(.)?/g, function (match, group) {
						groups.push(group);
					});
					return groups.length === 1 && typeof groups[0] === 'undefined';
				})()
			};
		}
	},
	{
		name: 'String.match',
		ref: String.prototype.match
	},
	{
		name: 'String.slice',
		ref: String.prototype.slice
	},
	{
		name: 'String.split',
		ref: String.prototype.split
	},
	{
		name: 'String.toLowerCase',
		ref: String.prototype.toLowerCase
	},
	{
		name: 'String.toUpperCase',
		ref: String.prototype.toUpperCase
	},
	{
		name: 'String.toLocaleLowerCase',
		ref: String.prototype.toLocaleLowerCase
	},
	{
		name: 'String.toLocaleUpperCase',
		ref: String.prototype.toLocaleUpperCase
	},
	{
		name: 'String.charAt',
		ref: String.prototype.charAt
	},
	{
		name: 'String.charCodeAt',
		ref: String.prototype.charCodeAt
	},

	null
];

var head = document.getElementsByTagName('head')[0];
var body = document.getElementsByTagName('body')[0];

var styles = document.createElement('style');
styles.textContent = '' 
	+ '.js_env_report { color: black }\n'
	+ '.js_env_report th, .js_env_report td { text-align: center }\n'
	+ '.js_env_report tr.section th { background: #000; color: white; }\n'
	+ '.js_env_report tr.even   { background: #EEE }\n'
	+ '.js_env_report tr.error  { background: #FF9494 }\n'
	+ '.js_env_report tr.waning { background: #FFC994 }\n'
	+ '.js_env_report td.function { font-family: monospace }\n'
	+ '.js_env_report td.good { color: #8AC007 }\n'
	+ '.js_env_report td.bad { color: brown }\n';
head.appendChild(styles);

var report_container = document.createElement('div');
report_container.style.position = 'fixed';
report_container.style.top = 0;
report_container.style.left = 0;
report_container.style.background = 'white';
report_container.style.borderBottom = 'solid 2px black';
report_container.style.width = '100%';
report_container.style.height = '50%';
report_container.style.overflow = 'auto';
report_container.style.zIndex = 999999999;
body.appendChild(report_container);

var report_table = document.createElement('table');

report_table.style.width = '100%';
report_table.className = 'js_env_report';
report_table.innerHTML = '<tr>'
	+ '<th>Feature</th>'
	+ '<th>exists</th>'
	+ '<th>is&nbsp;native</th>'
	+ '<th>is&nbsp;valid</th>'
	+ '<th>quirks</th>'
	+ '</tr>';

var
	good    = '✓',
	bad     = '𐄂',
	neutral = '-',
	row_idx = 0;

function addHeaderRow(section_name) {
	var row = document.createElement('tr');
	row.className = 'section';
	row.innerHTML = '<th colspan="5">' + section_name + '</th>';
	report_table.appendChild(row);
}

function addRow(item) {
	var row = document.createElement('tr');
	row_idx++;
	var classes = []
	if (row_idx % 2 === 0) classes.push('even');
	if (item.isValid === false) classes.push('error');
	else if (item.isNative === false) classes.push('warning');
	row.className = classes.join(' ');

	row.innerHTML = ''
		+ '<td class="function">' + item.name + '</td>'
		+ '<td class="' + (item.exists   ? 'good' : 'bad') + '">' + (item.exists   ? good : bad) + '</td>'
		+ '<td class="' + (item.isNative ? 'good' : 'bad') + '">' + (item.isNative ? good : bad) + '</td>'
		+ '<td class="' + (item.isValid === null ? '' : item.isValid  ? 'good' : 'bad') + '">' + (item.isValid === null ? neutral : item.isValid ? good : bad) + '</td>'
		+ '<td>' + (item.quirks ? JSON.stringify(item.quirks) : '') + '</td>';

	report_table.appendChild(row);
}

function test(definition) {
	var report_results = [];

	for (var idx=0; idx<natives.length; idx++) {
		var item = natives[idx];
		if (!item) {
			continue;
		}

		if (item.section) {
			addHeaderRow(item.section);
			continue;
		}

		var res = {};

		res.name = item.name;
		res.exists   = (item.exists || default_exists)(item.ref);
		res.isNative = res.exists ? (item.isNative || default_isNative)(item.ref) : null;
		res.isValid  = res.exists && item.isValid   ? item.isValid(item.ref)   : null;
		res.quirks   = res.exists && item.getQuirks ? item.getQuirks(item.ref) : {};

		addRow(res);
		report_results.push(res);
	}

	return report_results;
}

report = test(natives);

report_container.appendChild(report_table);

console.log(report); // todo, is there anyway to stringify the report so a customer or CSR can email it to us?

function default_exists(ref) {
	return !!ref;
}

function default_isNative(func) {
	return !func.prototype;
}

})(this);