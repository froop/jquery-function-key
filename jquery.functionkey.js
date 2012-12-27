/**
 * Intercept or replace keydown event of keyboard function key (F1-F12).
 * And bind click event to HTML class "f1"-"f12".
 */
/*global $, document */
var FunctionKeys = function ($containerElem) {
	"use strict";

	var CODE = FunctionKeys.CODE,
		keyHandler = function () {};

	$containerElem = $containerElem ? $containerElem : $(document);

	/**
	 * @param handler Event handler of keydown F1-F12
	 *            callback function (keyCode)
	 *            keyCode: see FunctionKeys.CODE
	 */
	this.setKeyHandler = function (handler) {
		keyHandler = handler;
		return this;
	};

	$containerElem.on("keydown", function (event) {
		if (event.keyCode >= CODE.f1 && event.keyCode <= CODE.f12) {
			if ($.browser.msie) {
				event.originalEvent.keyCode = 0;
			} else {
				event.preventDefault();
			}
			keyHandler(event.keyCode);
			return false;
		}
	});

	if ($.browser.msie) {
		$containerElem.on("help", function () {
			return false;
		});
	}

	function setupButtons() {
		function setupButtonEvent(key) {
			$containerElem.on("click", "." + key, function () {
				keyHandler(FunctionKeys.CODE[key]);
			});
		}

		$.each(FunctionKeys.CODE, function (key) {
			setupButtonEvent(key);
		});
	}
	setupButtons();
};

FunctionKeys.CODE = {f1:112, f2:113, f3:114, f4:115, f5:116, f6:117,
	f7:118, f8:119, f9:120, f10:121, f11:122, f12:123};
