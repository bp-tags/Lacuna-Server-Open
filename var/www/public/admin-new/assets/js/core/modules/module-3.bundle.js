/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-3"],{

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

/***/ "./src/modules/blue-box-monitor.js":
/*!*****************************************!*\
  !*** ./src/modules/blue-box-monitor.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BlueBoxMonitor; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");


class BlueBoxMonitor extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('bBoxMonitor');

		// Outgoing requests
		this.REQ_GET_DATA = 'getData';

		// Incoming responses
		this.RESP_DATA = 'data';
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

		// Initialize refresh button
		$('#bbm-refreshBt').on('click', $.proxy(this._onUpdateIntervalChange, this));

		// Initialize zone filter dropdown
		this._zonesFilterDD = $('#bbm-zonesDD').kendoDropDownList({
			change: $.proxy(this._onFilterChange, this)
		}).data('kendoDropDownList');

		// Initialize username filter input
		$('#bbm-usernameIn').on('input', $.proxy(this._onFilterChange, this));

		// Initialize clear button
		$('#bbm-clearBt').on('click', $.proxy(this._onClearFilterClick, this));

		// Initialize interval dropdown
		this._intervalDropDown = $('#bbm-intervalDD').kendoDropDownList({
			valueTemplate: '<span class="text-muted pr-1">Interval:</span><span>#:data.text#</span>',
			change: $.proxy(this._onUpdateIntervalChange, this)
		}).data('kendoDropDownList');

		// Initialize grid
		this._grid = $('#bbm-grid').kendoGrid({
			scrollable: true,
            sortable: true,
			//resizable: true,
			selectable: false,
            columns:
            [
				{
	                field: 'zone',
	                width: 150,
					title: 'Zone',
	            },
	            {
	                field: 'userId',
	                width: 100,
	                title: 'User ID',
	            },
	            {
	                field: 'userName',
	                width: 250,
	                title: 'Username',
	            },
				{
	                field: 'lastReq',
	                width: 100,
					title: 'Last Request',
	            },
				{
	                field: 'lastPoll',
	                width: 100,
					title: 'Last Polling',
	            },
				{
	                field: 'queueSize',
	                width: 100,
					title: 'Queued Messages',
	            },
			],
			noRecords: {
				template: 'No BlueBox sessions.'
			},
			dataSource: []
        }).data('kendoGrid');

		// Request data to server
		this._requestData();
	}

	destroy()
	{
		// Call super method
		super.destroy();

		$('#bbm-refreshBt').off('click');
		$('#bbm-usernameIn').off('input');
		$('#bbm-clearBt').off('click');

		// Clear request scheduling
		clearTimeout(this._requestTimer);
	}

	onExtensionCommand(command, data)
	{
		// BlueBox-ed connections data received
		if (command == this.RESP_DATA)
		{
			let clients = data.getSFSArray('clients');
			let clientsArr = [];

			let zones = [];

			for (let i = 0; i < clients.size(); i++)
			{
				let clientIn = clients.getSFSArray(i);

				let client = {
					zone: clientIn.getUtfString(0),
					userId: clientIn.getInt(1),
					userName: clientIn.getUtfString(2),
					sessionId: clientIn.getUtfString(3),
					lastReq: clientIn.getLong(4) + 's ago',
					lastPoll: clientIn.getLong(5) + 's ago',
					queueSize: clientIn.getInt(6)
				}

				clientsArr.push(client);

				if (zones.indexOf(client.zone) < 0)
					zones.push(client.zone);
			}

			// Sort zones list
			zones.sort(function (a, b) {
				return a.localeCompare(b);
			});

			// Add "any" zone
			zones.unshift('[any]');

			// Set selected zone
			let selectedZone = this._zonesFilterDD.value();
			let selectedIndex = zones.indexOf(selectedZone);
			if (selectedIndex < 0)
				selectedIndex = 0;

			this._zonesFilterDD.setDataSource(zones);
			this._zonesFilterDD.select(selectedIndex);

			// Substitute grid's data source, retaining current sorting
			let currSort = this._grid.dataSource.sort();

			let ds = new kendo.data.DataSource({
				sort: currSort,
				data: clientsArr
			});

			// Set filters
			this._setFilters(ds);

			// Assign data source to grid
			this._grid.setDataSource(ds);

			// Update counter
			$('#bbm-totalSessions').text(clientsArr.length);
		}
	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------

	_onUpdateIntervalChange()
	{
		// Request data to server
		this._requestData();
	}

	_onFilterChange()
	{
		// Set filters
		this._setFilters(this._grid.dataSource);
	}

	_onClearFilterClick()
	{
		this._zonesFilterDD.select(0);
		$('#bbm-usernameIn').val('');
	}

	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------

	/**
	 * Build the polling request to be sent to the server.
	 */
	_requestData()
	{
		// Clear previous request scheduling
		clearTimeout(this._requestTimer);

		// Check if connection is still available
		if (this.smartFox.isConnected)
		{
			// Send request to extension
			this.sendExtensionRequest(this.REQ_GET_DATA);

			// Schedule next request
			this._requestTimer = setTimeout($.proxy(this._requestData, this), Number(this._intervalDropDown.value()) * 1000);
		}
	}

	_setFilters(dataStore)
	{
		let filters = [];

		// Zone filtering
		if (this._zonesFilterDD.select() > 0)
			filters.push({
				field: 'zone', operator: 'eq', value: this._zonesFilterDD.value()
			});

		// Username filtering
		if ($('#bbm-usernameIn').val() != '')
			filters.push({
				field: 'userName', operator: 'contains', value: $('#bbm-usernameIn').val()
			});

		// Set filters
		dataStore.filter(filters);

		// Update counter
		$('#bbm-displayedSessions').text(dataStore.total());
	}

	//---------------------------------
	// PRIVATE GETTERS
	//---------------------------------


}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtMy5idW5kbGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9tb2R1bGVzL2Jhc2UtbW9kdWxlLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL21vZHVsZXMvYmx1ZS1ib3gtbW9uaXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgQmFzZU1vZHVsZSBleHRlbmRzIEhUTUxFbGVtZW50XG57XG5cdGNvbnN0cnVjdG9yKGNvbW1hbmRzUHJlZml4KVxuXHR7XG5cdCAgICBzdXBlcigpO1xuXG5cdFx0dGhpcy5fY29tbWFuZHNQcmVmaXggPSBjb21tYW5kc1ByZWZpeDtcblx0fVxuXG5cdGdldCBzaGVsbEN0cmwoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NoZWxsQ3RybDtcblx0fVxuXG5cdGdldCBzbWFydEZveCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2hlbGxDdHJsLnNtYXJ0Rm94O1xuXHR9XG5cblx0Z2V0IGlkRGF0YSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faWREYXRhO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gT1ZFUlJJREFCTEUgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIG1vZHVsZXMgbWFuYWdlciBhZnRlciBsb2FkaW5nIHRoZSBtb2R1bGUuXG5cdCAqIEluIGNhc2UgaXQgaXMgb3ZlcnJpZGRlbiwgc3VwZXIgbXVzdCBhbHdheXMgYmUgY2FsbGVkIVxuXHQgKi9cblx0aW5pdGlhbGl6ZShpZERhdGEsIHNoZWxsQ29udHJvbGxlcilcblx0e1xuXHRcdHRoaXMuX2lkRGF0YSA9IGlkRGF0YTtcblx0XHR0aGlzLl9zaGVsbEN0cmwgPSBzaGVsbENvbnRyb2xsZXI7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gQWRtaW4gZXh0ZW5zaW9uIG1lc3NhZ2VzXG5cdFx0dGhpcy5zbWFydEZveC5hZGRFdmVudExpc3RlbmVyKFNGUzJYLlNGU0V2ZW50LkVYVEVOU0lPTl9SRVNQT05TRSwgdGhpcy5fb25FeHRlbnNpb25SZXNwb25zZSwgdGhpcyk7XG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIGJ5IHRoZSBtb2R1bGVzIG1hbmFnZXIgYmVmb3JlIHVubG9hZGluZyB0aGUgbW9kdWxlLlxuXHQgKiBJbiBjYXNlIGl0IGlzIG92ZXJyaWRkZW4sIHN1cGVyIG11c3QgYWx3YXlzIGJlIGNhbGxlZCFcblx0ICovXG5cdGRlc3Ryb3koKVxuXHR7XG5cdFx0Ly8gUmVtb3ZlIGxpc3RlbmVyIHRvIEFkbWluIGV4dGVuc2lvbiBtZXNzYWdlc1xuXHRcdHRoaXMuc21hcnRGb3gucmVtb3ZlRXZlbnRMaXN0ZW5lcihTRlMyWC5TRlNFdmVudC5FWFRFTlNJT05fUkVTUE9OU0UsIHRoaXMuX29uRXh0ZW5zaW9uUmVzcG9uc2UpO1xuXG5cdFx0Ly8gRGVzdHJveSBhbGwgS2VuZG8gd2lkZ2V0c1xuXHRcdGtlbmRvLmRlc3Ryb3koJCgnLm1vZHVsZScpKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIG9uRXh0ZW5zaW9uUmVzcG9uc2UgbGlzdGVuZXIgYmVsb3cuXG5cdCAqIE11c3QgYmUgb3ZlcnJpZGRlbi5cblx0ICovXG5cdG9uRXh0ZW5zaW9uQ29tbWFuZChjbWQsIGRhdGEpXG5cdHtcblx0XHQvLyBOb3RoaW5nIHRvIGRvXG5cdH1cblxuXHQvKipcblx0ICogQ2FsbGVkIGJ5IHRoZSBtYWluIHNoZWxsIHdoZW5ldmVyIHRoZSBzZXJ2ZXIgdXB0aW1lIGNoYW5nZXMuXG5cdCAqIENhbiBiZSBvdmVycmlkZGVuIGRvIGRpc3BsYXkgdGhlIHVwdGltZSBpbnNpZGUgYSBtb2R1bGUgb3IgbWFrZSBjYWxjdWxhdGlvbnMgb24gdGhlIHNlcnZlciB1cHRpbWUuXG5cdCAqL1xuXHRvblVwdGltZVVwZGF0ZWQodmFsdWVzKVxuXHR7XG5cdFx0Ly8gTm90aGluZyB0byBkb1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFVCTElDIE1FVEhPRFNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHQvKipcblx0ICogU2VuZCBhIHJlcXVlc3QgdG8gQWRtaW4gZXh0ZW5zaW9uLlxuXHQgKi9cblx0c2VuZEV4dGVuc2lvblJlcXVlc3QoY29tbWFuZCwgZGF0YSA9IG51bGwpXG5cdHtcblx0XHRpZiAoZGF0YSA9PSBudWxsKVxuXHRcdFx0ZGF0YSA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblxuXHRcdHRoaXMuc21hcnRGb3guc2VuZChuZXcgU0ZTMlguRXh0ZW5zaW9uUmVxdWVzdChgJHt0aGlzLl9jb21tYW5kc1ByZWZpeH0uJHtjb21tYW5kfWAsIGRhdGEpKTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBSSVZBVEUgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdF9vbkV4dGVuc2lvblJlc3BvbnNlKGV2dFBhcmFtcylcblx0e1xuXHRcdC8vIEZpbHRlciBzZXJ2ZXIgcmVzcG9uc2VzXG5cdFx0bGV0IGNvbW1hbmRzID0gZXZ0UGFyYW1zLmNtZC5zcGxpdCgnLicpO1xuXHRcdGxldCBkYXRhID0gZXZ0UGFyYW1zLnBhcmFtcztcblx0XHRcblx0XHRpZiAoY29tbWFuZHNbMF0gPT0gdGhpcy5fY29tbWFuZHNQcmVmaXgpXG5cdFx0e1xuXHRcdFx0aWYgKGNvbW1hbmRzLmxlbmd0aCA+IDEpXG5cdFx0XHRcdHRoaXMub25FeHRlbnNpb25Db21tYW5kKGNvbW1hbmRzWzFdLCBkYXRhKVxuXHRcdH1cblx0fVxufVxuIiwiaW1wb3J0IHtCYXNlTW9kdWxlfSBmcm9tICcuL2Jhc2UtbW9kdWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmx1ZUJveE1vbml0b3IgZXh0ZW5kcyBCYXNlTW9kdWxlXG57XG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHQgICAgc3VwZXIoJ2JCb3hNb25pdG9yJyk7XG5cblx0XHQvLyBPdXRnb2luZyByZXF1ZXN0c1xuXHRcdHRoaXMuUkVRX0dFVF9EQVRBID0gJ2dldERhdGEnO1xuXG5cdFx0Ly8gSW5jb21pbmcgcmVzcG9uc2VzXG5cdFx0dGhpcy5SRVNQX0RBVEEgPSAnZGF0YSc7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBDT01NT04gTU9EVUxFIElOVEVSRkFDRSBNRVRIT0RTXG5cdC8vIFRoaXMgbWVtYmVycyBhcmUgdXNlZCBieSB0aGUgbWFpbiBjb250cm9sbGVyXG5cdC8vIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIG1vZHVsZSdzIGNvbnRyb2xsZXIuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0aW5pdGlhbGl6ZShpZERhdGEsIHNoZWxsQ29udHJvbGxlcilcblx0e1xuXHRcdC8vIENhbGwgc3VwZXIgbWV0aG9kXG5cdFx0c3VwZXIuaW5pdGlhbGl6ZShpZERhdGEsIHNoZWxsQ29udHJvbGxlcik7XG5cblx0XHQvLyBJbml0aWFsaXplIHJlZnJlc2ggYnV0dG9uXG5cdFx0JCgnI2JibS1yZWZyZXNoQnQnKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uVXBkYXRlSW50ZXJ2YWxDaGFuZ2UsIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgem9uZSBmaWx0ZXIgZHJvcGRvd25cblx0XHR0aGlzLl96b25lc0ZpbHRlckREID0gJCgnI2JibS16b25lc0REJykua2VuZG9Ecm9wRG93bkxpc3Qoe1xuXHRcdFx0Y2hhbmdlOiAkLnByb3h5KHRoaXMuX29uRmlsdGVyQ2hhbmdlLCB0aGlzKVxuXHRcdH0pLmRhdGEoJ2tlbmRvRHJvcERvd25MaXN0Jyk7XG5cblx0XHQvLyBJbml0aWFsaXplIHVzZXJuYW1lIGZpbHRlciBpbnB1dFxuXHRcdCQoJyNiYm0tdXNlcm5hbWVJbicpLm9uKCdpbnB1dCcsICQucHJveHkodGhpcy5fb25GaWx0ZXJDaGFuZ2UsIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgY2xlYXIgYnV0dG9uXG5cdFx0JCgnI2JibS1jbGVhckJ0Jykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkNsZWFyRmlsdGVyQ2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgaW50ZXJ2YWwgZHJvcGRvd25cblx0XHR0aGlzLl9pbnRlcnZhbERyb3BEb3duID0gJCgnI2JibS1pbnRlcnZhbEREJykua2VuZG9Ecm9wRG93bkxpc3Qoe1xuXHRcdFx0dmFsdWVUZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwidGV4dC1tdXRlZCBwci0xXCI+SW50ZXJ2YWw6PC9zcGFuPjxzcGFuPiM6ZGF0YS50ZXh0Izwvc3Bhbj4nLFxuXHRcdFx0Y2hhbmdlOiAkLnByb3h5KHRoaXMuX29uVXBkYXRlSW50ZXJ2YWxDaGFuZ2UsIHRoaXMpXG5cdFx0fSkuZGF0YSgna2VuZG9Ecm9wRG93bkxpc3QnKTtcblxuXHRcdC8vIEluaXRpYWxpemUgZ3JpZFxuXHRcdHRoaXMuX2dyaWQgPSAkKCcjYmJtLWdyaWQnKS5rZW5kb0dyaWQoe1xuXHRcdFx0c2Nyb2xsYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHNvcnRhYmxlOiB0cnVlLFxuXHRcdFx0Ly9yZXNpemFibGU6IHRydWUsXG5cdFx0XHRzZWxlY3RhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbHVtbnM6XG4gICAgICAgICAgICBbXG5cdFx0XHRcdHtcblx0ICAgICAgICAgICAgICAgIGZpZWxkOiAnem9uZScsXG5cdCAgICAgICAgICAgICAgICB3aWR0aDogMTUwLFxuXHRcdFx0XHRcdHRpdGxlOiAnWm9uZScsXG5cdCAgICAgICAgICAgIH0sXG5cdCAgICAgICAgICAgIHtcblx0ICAgICAgICAgICAgICAgIGZpZWxkOiAndXNlcklkJyxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXG5cdCAgICAgICAgICAgICAgICB0aXRsZTogJ1VzZXIgSUQnLFxuXHQgICAgICAgICAgICB9LFxuXHQgICAgICAgICAgICB7XG5cdCAgICAgICAgICAgICAgICBmaWVsZDogJ3VzZXJOYW1lJyxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiAyNTAsXG5cdCAgICAgICAgICAgICAgICB0aXRsZTogJ1VzZXJuYW1lJyxcblx0ICAgICAgICAgICAgfSxcblx0XHRcdFx0e1xuXHQgICAgICAgICAgICAgICAgZmllbGQ6ICdsYXN0UmVxJyxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXG5cdFx0XHRcdFx0dGl0bGU6ICdMYXN0IFJlcXVlc3QnLFxuXHQgICAgICAgICAgICB9LFxuXHRcdFx0XHR7XG5cdCAgICAgICAgICAgICAgICBmaWVsZDogJ2xhc3RQb2xsJyxcblx0ICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXG5cdFx0XHRcdFx0dGl0bGU6ICdMYXN0IFBvbGxpbmcnLFxuXHQgICAgICAgICAgICB9LFxuXHRcdFx0XHR7XG5cdCAgICAgICAgICAgICAgICBmaWVsZDogJ3F1ZXVlU2l6ZScsXG5cdCAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxuXHRcdFx0XHRcdHRpdGxlOiAnUXVldWVkIE1lc3NhZ2VzJyxcblx0ICAgICAgICAgICAgfSxcblx0XHRcdF0sXG5cdFx0XHRub1JlY29yZHM6IHtcblx0XHRcdFx0dGVtcGxhdGU6ICdObyBCbHVlQm94IHNlc3Npb25zLidcblx0XHRcdH0sXG5cdFx0XHRkYXRhU291cmNlOiBbXVxuICAgICAgICB9KS5kYXRhKCdrZW5kb0dyaWQnKTtcblxuXHRcdC8vIFJlcXVlc3QgZGF0YSB0byBzZXJ2ZXJcblx0XHR0aGlzLl9yZXF1ZXN0RGF0YSgpO1xuXHR9XG5cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBDYWxsIHN1cGVyIG1ldGhvZFxuXHRcdHN1cGVyLmRlc3Ryb3koKTtcblxuXHRcdCQoJyNiYm0tcmVmcmVzaEJ0Jykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNiYm0tdXNlcm5hbWVJbicpLm9mZignaW5wdXQnKTtcblx0XHQkKCcjYmJtLWNsZWFyQnQnKS5vZmYoJ2NsaWNrJyk7XG5cblx0XHQvLyBDbGVhciByZXF1ZXN0IHNjaGVkdWxpbmdcblx0XHRjbGVhclRpbWVvdXQodGhpcy5fcmVxdWVzdFRpbWVyKTtcblx0fVxuXG5cdG9uRXh0ZW5zaW9uQ29tbWFuZChjb21tYW5kLCBkYXRhKVxuXHR7XG5cdFx0Ly8gQmx1ZUJveC1lZCBjb25uZWN0aW9ucyBkYXRhIHJlY2VpdmVkXG5cdFx0aWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0RBVEEpXG5cdFx0e1xuXHRcdFx0bGV0IGNsaWVudHMgPSBkYXRhLmdldFNGU0FycmF5KCdjbGllbnRzJyk7XG5cdFx0XHRsZXQgY2xpZW50c0FyciA9IFtdO1xuXG5cdFx0XHRsZXQgem9uZXMgPSBbXTtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjbGllbnRzLnNpemUoKTsgaSsrKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgY2xpZW50SW4gPSBjbGllbnRzLmdldFNGU0FycmF5KGkpO1xuXG5cdFx0XHRcdGxldCBjbGllbnQgPSB7XG5cdFx0XHRcdFx0em9uZTogY2xpZW50SW4uZ2V0VXRmU3RyaW5nKDApLFxuXHRcdFx0XHRcdHVzZXJJZDogY2xpZW50SW4uZ2V0SW50KDEpLFxuXHRcdFx0XHRcdHVzZXJOYW1lOiBjbGllbnRJbi5nZXRVdGZTdHJpbmcoMiksXG5cdFx0XHRcdFx0c2Vzc2lvbklkOiBjbGllbnRJbi5nZXRVdGZTdHJpbmcoMyksXG5cdFx0XHRcdFx0bGFzdFJlcTogY2xpZW50SW4uZ2V0TG9uZyg0KSArICdzIGFnbycsXG5cdFx0XHRcdFx0bGFzdFBvbGw6IGNsaWVudEluLmdldExvbmcoNSkgKyAncyBhZ28nLFxuXHRcdFx0XHRcdHF1ZXVlU2l6ZTogY2xpZW50SW4uZ2V0SW50KDYpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjbGllbnRzQXJyLnB1c2goY2xpZW50KTtcblxuXHRcdFx0XHRpZiAoem9uZXMuaW5kZXhPZihjbGllbnQuem9uZSkgPCAwKVxuXHRcdFx0XHRcdHpvbmVzLnB1c2goY2xpZW50LnpvbmUpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTb3J0IHpvbmVzIGxpc3Rcblx0XHRcdHpvbmVzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcblx0XHRcdFx0cmV0dXJuIGEubG9jYWxlQ29tcGFyZShiKTtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBBZGQgXCJhbnlcIiB6b25lXG5cdFx0XHR6b25lcy51bnNoaWZ0KCdbYW55XScpO1xuXG5cdFx0XHQvLyBTZXQgc2VsZWN0ZWQgem9uZVxuXHRcdFx0bGV0IHNlbGVjdGVkWm9uZSA9IHRoaXMuX3pvbmVzRmlsdGVyREQudmFsdWUoKTtcblx0XHRcdGxldCBzZWxlY3RlZEluZGV4ID0gem9uZXMuaW5kZXhPZihzZWxlY3RlZFpvbmUpO1xuXHRcdFx0aWYgKHNlbGVjdGVkSW5kZXggPCAwKVxuXHRcdFx0XHRzZWxlY3RlZEluZGV4ID0gMDtcblxuXHRcdFx0dGhpcy5fem9uZXNGaWx0ZXJERC5zZXREYXRhU291cmNlKHpvbmVzKTtcblx0XHRcdHRoaXMuX3pvbmVzRmlsdGVyREQuc2VsZWN0KHNlbGVjdGVkSW5kZXgpO1xuXG5cdFx0XHQvLyBTdWJzdGl0dXRlIGdyaWQncyBkYXRhIHNvdXJjZSwgcmV0YWluaW5nIGN1cnJlbnQgc29ydGluZ1xuXHRcdFx0bGV0IGN1cnJTb3J0ID0gdGhpcy5fZ3JpZC5kYXRhU291cmNlLnNvcnQoKTtcblxuXHRcdFx0bGV0IGRzID0gbmV3IGtlbmRvLmRhdGEuRGF0YVNvdXJjZSh7XG5cdFx0XHRcdHNvcnQ6IGN1cnJTb3J0LFxuXHRcdFx0XHRkYXRhOiBjbGllbnRzQXJyXG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gU2V0IGZpbHRlcnNcblx0XHRcdHRoaXMuX3NldEZpbHRlcnMoZHMpO1xuXG5cdFx0XHQvLyBBc3NpZ24gZGF0YSBzb3VyY2UgdG8gZ3JpZFxuXHRcdFx0dGhpcy5fZ3JpZC5zZXREYXRhU291cmNlKGRzKTtcblxuXHRcdFx0Ly8gVXBkYXRlIGNvdW50ZXJcblx0XHRcdCQoJyNiYm0tdG90YWxTZXNzaW9ucycpLnRleHQoY2xpZW50c0Fyci5sZW5ndGgpO1xuXHRcdH1cblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFVJIEVWRU5UIExJU1RFTkVSU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdF9vblVwZGF0ZUludGVydmFsQ2hhbmdlKClcblx0e1xuXHRcdC8vIFJlcXVlc3QgZGF0YSB0byBzZXJ2ZXJcblx0XHR0aGlzLl9yZXF1ZXN0RGF0YSgpO1xuXHR9XG5cblx0X29uRmlsdGVyQ2hhbmdlKClcblx0e1xuXHRcdC8vIFNldCBmaWx0ZXJzXG5cdFx0dGhpcy5fc2V0RmlsdGVycyh0aGlzLl9ncmlkLmRhdGFTb3VyY2UpO1xuXHR9XG5cblx0X29uQ2xlYXJGaWx0ZXJDbGljaygpXG5cdHtcblx0XHR0aGlzLl96b25lc0ZpbHRlckRELnNlbGVjdCgwKTtcblx0XHQkKCcjYmJtLXVzZXJuYW1lSW4nKS52YWwoJycpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFJJVkFURSBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0LyoqXG5cdCAqIEJ1aWxkIHRoZSBwb2xsaW5nIHJlcXVlc3QgdG8gYmUgc2VudCB0byB0aGUgc2VydmVyLlxuXHQgKi9cblx0X3JlcXVlc3REYXRhKClcblx0e1xuXHRcdC8vIENsZWFyIHByZXZpb3VzIHJlcXVlc3Qgc2NoZWR1bGluZ1xuXHRcdGNsZWFyVGltZW91dCh0aGlzLl9yZXF1ZXN0VGltZXIpO1xuXG5cdFx0Ly8gQ2hlY2sgaWYgY29ubmVjdGlvbiBpcyBzdGlsbCBhdmFpbGFibGVcblx0XHRpZiAodGhpcy5zbWFydEZveC5pc0Nvbm5lY3RlZClcblx0XHR7XG5cdFx0XHQvLyBTZW5kIHJlcXVlc3QgdG8gZXh0ZW5zaW9uXG5cdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0dFVF9EQVRBKTtcblxuXHRcdFx0Ly8gU2NoZWR1bGUgbmV4dCByZXF1ZXN0XG5cdFx0XHR0aGlzLl9yZXF1ZXN0VGltZXIgPSBzZXRUaW1lb3V0KCQucHJveHkodGhpcy5fcmVxdWVzdERhdGEsIHRoaXMpLCBOdW1iZXIodGhpcy5faW50ZXJ2YWxEcm9wRG93bi52YWx1ZSgpKSAqIDEwMDApO1xuXHRcdH1cblx0fVxuXG5cdF9zZXRGaWx0ZXJzKGRhdGFTdG9yZSlcblx0e1xuXHRcdGxldCBmaWx0ZXJzID0gW107XG5cblx0XHQvLyBab25lIGZpbHRlcmluZ1xuXHRcdGlmICh0aGlzLl96b25lc0ZpbHRlckRELnNlbGVjdCgpID4gMClcblx0XHRcdGZpbHRlcnMucHVzaCh7XG5cdFx0XHRcdGZpZWxkOiAnem9uZScsIG9wZXJhdG9yOiAnZXEnLCB2YWx1ZTogdGhpcy5fem9uZXNGaWx0ZXJERC52YWx1ZSgpXG5cdFx0XHR9KTtcblxuXHRcdC8vIFVzZXJuYW1lIGZpbHRlcmluZ1xuXHRcdGlmICgkKCcjYmJtLXVzZXJuYW1lSW4nKS52YWwoKSAhPSAnJylcblx0XHRcdGZpbHRlcnMucHVzaCh7XG5cdFx0XHRcdGZpZWxkOiAndXNlck5hbWUnLCBvcGVyYXRvcjogJ2NvbnRhaW5zJywgdmFsdWU6ICQoJyNiYm0tdXNlcm5hbWVJbicpLnZhbCgpXG5cdFx0XHR9KTtcblxuXHRcdC8vIFNldCBmaWx0ZXJzXG5cdFx0ZGF0YVN0b3JlLmZpbHRlcihmaWx0ZXJzKTtcblxuXHRcdC8vIFVwZGF0ZSBjb3VudGVyXG5cdFx0JCgnI2JibS1kaXNwbGF5ZWRTZXNzaW9ucycpLnRleHQoZGF0YVN0b3JlLnRvdGFsKCkpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFJJVkFURSBHRVRURVJTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3ZHQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==