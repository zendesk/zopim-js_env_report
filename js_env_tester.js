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
			returns_number = returns_number && (typeof(f) === "number");

			f = parseFloat('abc');
			var returns_NaN = isNaN(f);
			return returns_number && returns_NaN;
		}
	},
	{
		name: 'parseInt',
		ref: parseInt
	},
	{
		name: 'escape',
		ref: escape
	},
	{
		name: 'unescape',
		ref: unescape
	},
	{
		name: 'decodeURI',
		ref: decodeURI
	},
	{
		name: 'decodeURIComponent',
		ref: decodeURIComponent
	},
	{
		name: 'encodeURI',
		ref: encodeURI
	},
	{
		name: 'encodeURIComponent',
		ref: encodeURIComponent
	},
	{
		name: 'isFinite',
		ref: isFinite
	},
	{
		name: 'isNaN',
		ref: isNaN
	},
	{
		name: 'eval',
		ref: eval
	},

/*=====================================================================
 * Object Class
=====================================================================*/
	{
		section: 'Object'
	},
	{
		name: '[Clean Prototype]',
		ref: Object,
		isNative: isNativeClass,
		getQuirks: getPrototypeAugmentation
	},
	{
		name: 'valueOf',
		ref: Object.prototype.valueOf
	},
	{
		name: 'toString',
		ref: Object.prototype.toString
	},
	{
		name: 'isPrototypeOf',
		ref: Object.prototype.isPrototypeOf
	},
	{
		name: 'hasOwnProperty',
		ref: Object.prototype.hasOwnProperty
	},
	{
		name: 'propertyIsEnumerable',
		ref: Object.prototype.propertyIsEnumerable
	},

/*=====================================================================
 * Object Namespace
=====================================================================*/
	{
		name: 'create',
		ref: Object.create
	},
	{
		name: 'keys',
		ref: Object.keys
	},
	{
		name: 'getOwnPropertyNames',
		ref: Object.getOwnPropertyNames
	},
	{
		name: 'freeze',
		ref: Object.freeze
	},
	{
		name: 'isFrozen',
		ref: Object.isFrozen
	},
	{
		name: 'seal',
		ref: Object.seal
	},
	{
		name: 'isSealed',
		ref: Object.isSealed
	},
	{
		name: 'preventExtensions',
		ref: Object.preventExtensions
	},
	{
		name: 'isExtensible',
		ref: Object.isExtensible
	},
	{
		name: 'getPrototypeOf',
		ref: Object.getPrototypeOf
	},
	{
		name: 'defineProperty',
		ref: Object.defineProperty
	},
	{
		name: 'defineProperties',
		ref: Object.defineProperties
	},
	{
		name: 'getOwnPropertyDescriptor',
		ref: Object.getOwnPropertyDescriptor
	},

/*=====================================================================
 * Array
=====================================================================*/
	{
		section: 'Array'
	},
	{
		name: '[Clean Prototype]',
		ref: Array,
		isNative: isNativeClass,
		getQuirks: getPrototypeAugmentation
	},
	{
		name: 'valueOf',
		ref: Array.prototype.valueOf
	},
	{
		name: 'toString',
		ref: Array.prototype.toString
	},
	{
		name: 'push',
		ref: Array.prototype.push
	},
	{
		name: 'pop',
		ref: Array.prototype.pop
	},
	{
		name: 'shift',
		ref: Array.prototype.shift
	},
	{
		name: 'unshift',
		ref: Array.prototype.unshift
	},
	{
		name: 'join',
		ref: Array.prototype.join
	},
	{
		name: 'slice',
		ref: Array.prototype.slice
	},
	{
		name: 'splice',
		ref: Array.prototype.splice
	},
	{
		name: 'sort',
		ref: Array.prototype.sort
	},
	{
		name: 'reverse',
		ref: Array.prototype.reverse
	},
	{
		name: 'concat',
		ref: Array.prototype.concat
	},
	{
		name: 'reduce',
		ref: Array.prototype.reduce
	},
	{
		name: 'map',
		ref: Array.prototype.map
	},
	{
		name: 'forEach',
		ref: Array.prototype.forEach
	},

/*=====================================================================
 * Strings
=====================================================================*/
	{
		section: 'String'
	},
	{
		name: '[Clean Prototype]',
		ref: String,
		isNative: isNativeClass,
		getQuirks: getPrototypeAugmentation
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

/*=====================================================================
 * Number Class
=====================================================================*/
	{
		section: 'Number'
	},
	{
		name: '[Clean Prototype]',
		ref: Number,
		isNative: isNativeClass,
		getQuirks: getPrototypeAugmentation
	},
	{
		name: 'valueOf',
		ref: Number.prototype.valueOf
	},
	{
		name: 'toExponential',
		ref: Number.prototype.toExponential
	},
	{
		name: 'toFixed',
		ref: Number.prototype.toFixed
	},
	{
		name: 'toPrecision',
		ref: Number.prototype.toPrecision
	},
	{
		name: 'toString',
		ref: Number.prototype.toString
	},
	{
		name: 'toLocaleString',
		ref: Number.prototype.toLocaleString
	},

/*=====================================================================
 * Function Class
=====================================================================*/
	{
		section: 'Function'
	},
	{
		name: '[Clean Prototype]',
		ref: Function,
		isNative: isNativeClass,
		getQuirks: getPrototypeAugmentation
	},
	{
		name: 'apply',
		ref: Function.prototype.apply
	},
	{
		name: 'call',
		ref: Function.prototype.call
	},
	{
		name: 'bind',
		ref: Function.prototype.bind
	},
	{
		name: 'toString',
		ref: Function.prototype.toString
	},

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
	null // placed there so we can have a comma after every block above -_-'
];

// the 4 vars below are required for report processing and formatting
// they are used by the functions addRow() and addHeaderRow()
var
	good    = '✓',
	bad     = '𐄂',
	neutral = '-',
	row_idx = 0;


var head = document.getElementsByTagName('head')[0];
var styles = document.createElement('style');
styles.textContent = ''
	+ '.js_env_report { position: fixed; top: 0; left: 0; color: black; background: white; border-bottom: solid 2px black; width: 100%; height: 50%; overflow: auto; z-index: 999999999 }\n'
	+ '.js_env_report table { width: 100%; color: inherit; background: inherit }\n'
	+ '.js_env_report th, .js_env_report td { text-align: center }\n'
	+ '.js_env_report tr.section th { background: #000; color: white; }\n'
	+ '.js_env_report tr.even     { background: #EEE }\n'
	+ '.js_env_report tr.error    { background: #FF9494 }\n'
	+ '.js_env_report tr.warning  { background: #FFC994 }\n'
	+ '.js_env_report td.function { font-family: monospace }\n'
	+ '.js_env_report td.good { color: #8AC007 }\n'
	+ '.js_env_report td.bad { color: brown }\n';
head.appendChild(styles);

var report_container = document.createElement('div');
report_container.className = 'js_env_report';

var report_table = document.createElement('table');
report_container.appendChild(report_table);

var report_tbody = document.createElement('tbody');
report_tbody.innerHTML = '<tr>'
	+ '<th>Feature</th>'
	+ '<th>exists</th>'
	+ '<th>is&nbsp;native</th>'
	+ '<th>is&nbsp;valid</th>'
	+ '<th>quirks</th>'
	+ '</tr>';
report_table.appendChild(report_tbody);

report = run_tests(natives); // this is the 

// all done, now place report visually into document
var body = document.getElementsByTagName('body')[0];
body.appendChild(report_container);

console.log(report); // todo, is there anyway to stringify the report so a customer or CSR can email it to us?



function addHeaderRow(section_name) {
	var row = document.createElement('tr');
	row.className = 'section';
	row.innerHTML = '<th colspan="5">' + section_name + '</th>';
	report_tbody.appendChild(row);
}

function addRow(item) {
	var row = document.createElement('tr');
	row_idx++;
	var classes = [];
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

	report_tbody.appendChild(row);
}

function run_tests(definition) {
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

function default_exists(ref) {
	return !!ref;
}

function default_isNative(func) {
	return !('prototype' in func);
}

function isNativeClass(func) {
	// methods of native classes are not enumerable. If we detect something in the prototype, there is a risk
	var contains_native_code = /\[native code\]/i.test(func.toString());
	var enumerable_methods = getPrototypeAugmentation(func);
	var is_augmented = enumerable_methods.length > 0;
	return contains_native_code && !is_augmented;
}

function getPrototypeAugmentation(func) {
	var enumerable_methods = [];
	for (var k in func.prototype) enumerable_methods[enumerable_methods.length] = k;
	return enumerable_methods;
}

})(this);