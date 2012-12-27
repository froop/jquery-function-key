/**
 * jquery.functionkey.js - jQuery plugin.
 *
 * Prevent or replace keydown event of function key (F1-F12).
 * And bind click event to button of class "f1"-"f12".
 *
 * Created by froop http://github.com/froop/jquery-function-key
 * The MIT License (http://www.opensource.org/licenses/mit-license.php)
 */
/*global jQuery */
(function ($) {
	"use strict";

	$.functionKey = {};
	$.functionKey.CODE = {f1:112, f2:113, f3:114, f4:115, f5:116, f6:117,
		f7:118, f8:119, f9:120, f10:121, f11:122, f12:123};

	$.fn.functionKey = function (options) {
		var $self = this;
		var defaults = {
			/**
			 * Event handler of keydown or click F1-F12
			 *     callback function (keyCode)
			 *     keyCode: see $.functionKey.CODE
			 */
			handler : function () {}
		};
		var setting = $.extend(defaults, options);
		var CODE = $.functionKey.CODE;

		$self.on("keydown", function (event) {
			if (event.keyCode >= CODE.f1 && event.keyCode <= CODE.f12) {
				if ($.browser.msie) {
					event.originalEvent.keyCode = 0;
				} else {
					event.preventDefault();
				}
				setting.handler(event.keyCode);
				return false;
			}
		});
	
		if ($.browser.msie) {
			$self.on("help", function () {
				return false;
			});
		}
	
		function setupButtons() {
			function setupButtonEvent(key) {
				$self.on("click", "." + key, function () {
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
