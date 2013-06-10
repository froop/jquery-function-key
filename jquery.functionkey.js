/**
 * jquery.functionkey.js - jQuery plugin.
 *
 * Prevent and handle "keydown" events of function keys (F1-F12).
 * And bind a "click" event handler to elements of "f1"-"f12" classes.
 *
 * Copyright (c) 2012, 2013 froop http://github.com/froop/jquery-function-key
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery */
(function ($) {
	"use strict";

	$.functionKey = {};
	$.functionKey.CODE = {f1:112, f2:113, f3:114, f4:115, f5:116, f6:117,
			f7:118, f8:119, f9:120, f10:121, f11:122, f12:123};

	// http://ajaxian.com/archives/attack-of-the-ie-conditional-comment
	var ie = (function(){
		var v = 3, div = document.createElement('div');
		while (
			div.innerHTML = '<!--[if gt IE '+(++v)+']><i></i><![endif]-->',
			div.getElementsByTagName('i')[0]
		);
		return v> 4 ? v : undefined;
	}());

	/**
	 * Plugin method.
	 *
	 * [option]
	 * handler: function (keyCode)
	 *     An event handler of "keydown" and "click".
	 *     keyCode: A key code of function key. see $.functionKey.CODE
	 *
	 * @param options An object of custom options
	 */
	$.fn.functionKey = function (options) {
		var $elements = this;
		var defaults = {
			handler : function () {}
		};
		var setting = $.extend(defaults, options);
		var CODE = $.functionKey.CODE;
		var $document = $($elements.get(0).ownerDocument || $elements);

		$document.on("keydown", function (event) {
			if (event.keyCode >= CODE.f1 && event.keyCode <= CODE.f12) {
				if (event.preventDefault) {
					event.preventDefault();
				}
				if (ie <= 8) {
					event.originalEvent.keyCode = 0;
				}
				setting.handler(event.keyCode);
				return false;
			}
		});

		if (ie) {
			$document.on("help", function () {
				return false;
			});
		}

		function setupButtons() {
			function setupButtonEvent(key) {
				$elements.on("click", "." + key, function () {
					setting.handler(CODE[key]);
				});
			}

			$.each(CODE, function (key) {
				setupButtonEvent(key);
			});
		}
		setupButtons();

		return this;
	};
})(jQuery);
