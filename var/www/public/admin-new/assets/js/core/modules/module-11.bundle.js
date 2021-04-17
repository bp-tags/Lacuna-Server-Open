/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-11"],{

/***/ "./src/modules/base-module.js":
/*!************************************!*\
  !*** ./src/modules/base-module.js ***!
  \************************************/
/*! exports provided: BaseModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseModule", function() { return BaseModule; });
class BaseModule extends HTMLElement
{
	constructor(commandsPrefix)
	{
	    super();

		this._commandsPrefix = commandsPrefix;
	}

	get shellCtrl()
	{
		return this._shellCtrl;
	}

	get smartFox()
	{
		return this._shellCtrl.smartFox;
	}

	get idData()
	{
		return this._idData;
	}

	//---------------------------------
	// OVERRIDABLE METHODS
	//---------------------------------

	/**
	 * Called by the modules manager after loading the module.
	 * In case it is overridden, super must always be called!
	 */
	initialize(idData, shellController)
	{
		this._idData = idData;
		this._shellCtrl = shellController;

		// Add listener to Admin extension messages
		this.smartFox.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this._onExtensionResponse, this);
	}

	/**
	 * Called by the modules manager before unloading the module.
	 * In case it is overridden, super must always be called!
	 */
	destroy()
	{
		// Remove listener to Admin extension messages
		this.smartFox.removeEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this._onExtensionResponse);

		// Destroy all Kendo widgets
		kendo.destroy($('.module'));
	}

	/**
	 * Called by the onExtensionResponse listener below.
	 * Must be overridden.
	 */
	onExtensionCommand(cmd, data)
	{
		// Nothing to do
	}

	/**
	 * Called by the main shell whenever the server uptime changes.
	 * Can be overridden do display the uptime inside a module or make calculations on the server uptime.
	 */
	onUptimeUpdated(values)
	{
		// Nothing to do
	}

	//---------------------------------
	// PUBLIC METHODS
	//---------------------------------

	/**
	 * Send a request to Admin extension.
	 */
	sendExtensionRequest(command, data = null)
	{
		if (data == null)
			data = new SFS2X.SFSObject();

		this.smartFox.send(new SFS2X.ExtensionRequest(`${this._commandsPrefix}.${command}`, data));
	}

	//---------------------------------
	// PRIVATE METHODS
	//---------------------------------

	_onExtensionResponse(evtParams)
	{
		// Filter server responses
		let commands = evtParams.cmd.split('.');
		let data = evtParams.params;
		
		if (commands[0] == this._commandsPrefix)
		{
			if (commands.length > 1)
				this.onExtensionCommand(commands[1], data)
		}
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/modules/template.js":
/*!*********************************!*\
  !*** ./src/modules/template.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Template; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");


class Template extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('template');
	}

	//------------------------------------
	// COMMON MODULE INTERFACE METHODS
	// This members are used by the main controller
	// to communicate with the module's controller.
	//------------------------------------

	initialize(idData, shellController)
	{
		// Call super method
		super.initialize(idData, shellController);

	}

	destroy()
	{
		// Call super method
		super.destroy();
	}

	onExtensionCommand(command, data)
	{

	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------



	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------



	//---------------------------------
	// PRIVATE GETTERS
	//---------------------------------


}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtMTEuYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvbW9kdWxlcy9iYXNlLW1vZHVsZS5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9tb2R1bGVzL3RlbXBsYXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBCYXNlTW9kdWxlIGV4dGVuZHMgSFRNTEVsZW1lbnRcbntcblx0Y29uc3RydWN0b3IoY29tbWFuZHNQcmVmaXgpXG5cdHtcblx0ICAgIHN1cGVyKCk7XG5cblx0XHR0aGlzLl9jb21tYW5kc1ByZWZpeCA9IGNvbW1hbmRzUHJlZml4O1xuXHR9XG5cblx0Z2V0IHNoZWxsQ3RybCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2hlbGxDdHJsO1xuXHR9XG5cblx0Z2V0IHNtYXJ0Rm94KClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zaGVsbEN0cmwuc21hcnRGb3g7XG5cdH1cblxuXHRnZXQgaWREYXRhKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9pZERhdGE7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBPVkVSUklEQUJMRSBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0LyoqXG5cdCAqIENhbGxlZCBieSB0aGUgbW9kdWxlcyBtYW5hZ2VyIGFmdGVyIGxvYWRpbmcgdGhlIG1vZHVsZS5cblx0ICogSW4gY2FzZSBpdCBpcyBvdmVycmlkZGVuLCBzdXBlciBtdXN0IGFsd2F5cyBiZSBjYWxsZWQhXG5cdCAqL1xuXHRpbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKVxuXHR7XG5cdFx0dGhpcy5faWREYXRhID0gaWREYXRhO1xuXHRcdHRoaXMuX3NoZWxsQ3RybCA9IHNoZWxsQ29udHJvbGxlcjtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBBZG1pbiBleHRlbnNpb24gbWVzc2FnZXNcblx0XHR0aGlzLnNtYXJ0Rm94LmFkZEV2ZW50TGlzdGVuZXIoU0ZTMlguU0ZTRXZlbnQuRVhURU5TSU9OX1JFU1BPTlNFLCB0aGlzLl9vbkV4dGVuc2lvblJlc3BvbnNlLCB0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIG1vZHVsZXMgbWFuYWdlciBiZWZvcmUgdW5sb2FkaW5nIHRoZSBtb2R1bGUuXG5cdCAqIEluIGNhc2UgaXQgaXMgb3ZlcnJpZGRlbiwgc3VwZXIgbXVzdCBhbHdheXMgYmUgY2FsbGVkIVxuXHQgKi9cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBSZW1vdmUgbGlzdGVuZXIgdG8gQWRtaW4gZXh0ZW5zaW9uIG1lc3NhZ2VzXG5cdFx0dGhpcy5zbWFydEZveC5yZW1vdmVFdmVudExpc3RlbmVyKFNGUzJYLlNGU0V2ZW50LkVYVEVOU0lPTl9SRVNQT05TRSwgdGhpcy5fb25FeHRlbnNpb25SZXNwb25zZSk7XG5cblx0XHQvLyBEZXN0cm95IGFsbCBLZW5kbyB3aWRnZXRzXG5cdFx0a2VuZG8uZGVzdHJveSgkKCcubW9kdWxlJykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCBieSB0aGUgb25FeHRlbnNpb25SZXNwb25zZSBsaXN0ZW5lciBiZWxvdy5cblx0ICogTXVzdCBiZSBvdmVycmlkZGVuLlxuXHQgKi9cblx0b25FeHRlbnNpb25Db21tYW5kKGNtZCwgZGF0YSlcblx0e1xuXHRcdC8vIE5vdGhpbmcgdG8gZG9cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIG1haW4gc2hlbGwgd2hlbmV2ZXIgdGhlIHNlcnZlciB1cHRpbWUgY2hhbmdlcy5cblx0ICogQ2FuIGJlIG92ZXJyaWRkZW4gZG8gZGlzcGxheSB0aGUgdXB0aW1lIGluc2lkZSBhIG1vZHVsZSBvciBtYWtlIGNhbGN1bGF0aW9ucyBvbiB0aGUgc2VydmVyIHVwdGltZS5cblx0ICovXG5cdG9uVXB0aW1lVXBkYXRlZCh2YWx1ZXMpXG5cdHtcblx0XHQvLyBOb3RoaW5nIHRvIGRvXG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQVUJMSUMgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8qKlxuXHQgKiBTZW5kIGEgcmVxdWVzdCB0byBBZG1pbiBleHRlbnNpb24uXG5cdCAqL1xuXHRzZW5kRXh0ZW5zaW9uUmVxdWVzdChjb21tYW5kLCBkYXRhID0gbnVsbClcblx0e1xuXHRcdGlmIChkYXRhID09IG51bGwpXG5cdFx0XHRkYXRhID0gbmV3IFNGUzJYLlNGU09iamVjdCgpO1xuXG5cdFx0dGhpcy5zbWFydEZveC5zZW5kKG5ldyBTRlMyWC5FeHRlbnNpb25SZXF1ZXN0KGAke3RoaXMuX2NvbW1hbmRzUHJlZml4fS4ke2NvbW1hbmR9YCwgZGF0YSkpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFJJVkFURSBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0X29uRXh0ZW5zaW9uUmVzcG9uc2UoZXZ0UGFyYW1zKVxuXHR7XG5cdFx0Ly8gRmlsdGVyIHNlcnZlciByZXNwb25zZXNcblx0XHRsZXQgY29tbWFuZHMgPSBldnRQYXJhbXMuY21kLnNwbGl0KCcuJyk7XG5cdFx0bGV0IGRhdGEgPSBldnRQYXJhbXMucGFyYW1zO1xuXHRcdFxuXHRcdGlmIChjb21tYW5kc1swXSA9PSB0aGlzLl9jb21tYW5kc1ByZWZpeClcblx0XHR7XG5cdFx0XHRpZiAoY29tbWFuZHMubGVuZ3RoID4gMSlcblx0XHRcdFx0dGhpcy5vbkV4dGVuc2lvbkNvbW1hbmQoY29tbWFuZHNbMV0sIGRhdGEpXG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQge0Jhc2VNb2R1bGV9IGZyb20gJy4vYmFzZS1tb2R1bGUnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZW1wbGF0ZSBleHRlbmRzIEJhc2VNb2R1bGVcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdCAgICBzdXBlcigndGVtcGxhdGUnKTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIENPTU1PTiBNT0RVTEUgSU5URVJGQUNFIE1FVEhPRFNcblx0Ly8gVGhpcyBtZW1iZXJzIGFyZSB1c2VkIGJ5IHRoZSBtYWluIGNvbnRyb2xsZXJcblx0Ly8gdG8gY29tbXVuaWNhdGUgd2l0aCB0aGUgbW9kdWxlJ3MgY29udHJvbGxlci5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRpbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKVxuXHR7XG5cdFx0Ly8gQ2FsbCBzdXBlciBtZXRob2Rcblx0XHRzdXBlci5pbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKTtcblxuXHR9XG5cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBDYWxsIHN1cGVyIG1ldGhvZFxuXHRcdHN1cGVyLmRlc3Ryb3koKTtcblx0fVxuXG5cdG9uRXh0ZW5zaW9uQ29tbWFuZChjb21tYW5kLCBkYXRhKVxuXHR7XG5cblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFVJIEVWRU5UIExJU1RFTkVSU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIE1FVEhPRFNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFJJVkFURSBHRVRURVJTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3ZHQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=