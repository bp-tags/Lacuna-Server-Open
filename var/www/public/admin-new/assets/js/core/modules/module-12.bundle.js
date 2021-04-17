/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-12"],{

/***/ "./src/components/sidebar-layout.js":
/*!******************************************!*\
  !*** ./src/components/sidebar-layout.js ***!
  \******************************************/
/*! exports provided: SidebarLayout */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarLayout", function() { return SidebarLayout; });
class SidebarLayout extends HTMLElement
{
	constructor()
	{
	    super();

		// Attach a shadow root
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `
			<style>
				:host {
					display: flex;
					flex-direction: row;
				}

				@media (max-width: 575.98px) {
					:host(.split-xs) ::slotted(:not([aria-selected="true"])) {
						display: none !important;
				    }

					:host(.split-xs) ::slotted([aria-selected="true"]) {
						flex-grow: 1;
				    }
				}

				@media (max-width: 767.98px) {
					:host(.split-sm) ::slotted(:not([aria-selected="true"])) {
						display: none !important;
				    }

					:host(.split-sm) ::slotted([aria-selected="true"]) {
						flex-grow: 1;
				    }
				}

				@media (max-width: 991.98px) {
					:host(.split-md) ::slotted(:not([aria-selected="true"])) {
						display: none !important;
				    }

					:host(.split-md) ::slotted([aria-selected="true"]) {
						flex-grow: 1;
				    }
				}

				@media (max-width: 1199.98px) {
					:host(.split-lg) ::slotted(:not([aria-selected="true"])) {
						display: none !important;
				    }

					:host(.split-lg) ::slotted([aria-selected="true"]) {
						flex-grow: 1;
				    }
				}

				.side-col::slotted(*) {
				}

				.main-col::slotted(*) {
					flex-grow: 1;
				}
			</style>

			<slot class="side-col" name="side-column"></slot>
			<slot class="main-col" name="main-column"></slot>
		`;

		// Set initial selection
		this.selectedIndex = 0;
	}

	get selectedPanel()
	{
		return this._selectedPanel;
	}

	set selectedPanel(element) // 'side' or 'main'
	{
		if (element != null && element.parentNode == this)
		{
			this._selectedPanel = element;

			for (let element of this.children)
			{
				if (element == this._selectedPanel)
					element.setAttribute('aria-selected', 'true');
				else
					element.removeAttribute('aria-selected');
			}
		}
		else
		{
			console.error('Element is not a child of SidebarLayout');
		}
	}

	get selectedIndex()
	{
		return Array.from(this.children).indexOf(this._selectedPanel);
	}

	set selectedIndex(index)
	{
		if (this.children.length > 0)
		{
			if (this.children[index] == null)
			{
				console.error('Invalid SidebarLayout index');
				return;
			}

			let element = this.children[index];
			this.selectedPanel = element;
		}
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('sidebar-layout'))
	window.customElements.define('sidebar-layout', SidebarLayout);


/***/ }),

/***/ "./src/modules/zone-configurator.js":
/*!******************************************!*\
  !*** ./src/modules/zone-configurator.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ZoneConfigurator; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _components_view_stack__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/view-stack */ "./src/components/view-stack.js");
/* harmony import */ var _components_sidebar_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/sidebar-layout */ "./src/components/sidebar-layout.js");
/* harmony import */ var _utils_uibuilder_config_interface_builder__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/uibuilder/config-interface-builder */ "./src/utils/uibuilder/config-interface-builder.js");
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/utilities */ "./src/utils/utilities.js");






class ZoneConfigurator extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('zoneConfig');

		this.ITEM_TYPE_ZONE = 'zone';
		this.ITEM_TYPE_ROOM = 'room';

		// Outgoing requests
		this.REQ_GET_ZONES = 'getZones';

		this.REQ_GET_ZONE_CONFIG = 'getZoneConfig';
		this.REQ_SAVE_ZONE_CONFIG = 'saveZoneConfig';
		this.REQ_NEW_ZONE_CONFIG = 'newZoneConfig';
		this.REQ_DELETE_ZONE_CONFIG = 'delZoneConfig';
		this.REQ_ACTIVATE_ZONE = 'actZone';

		this.REQ_GET_ROOM_CONFIG = 'getRoomConfig';
		this.REQ_SAVE_ROOM_CONFIG = 'saveRoomConfig';
		this.REQ_NEW_ROOM_CONFIG = 'newRoomConfig';
		this.REQ_DELETE_ROOM_CONFIG = 'delRoomConfig';

		// Incoming responses
		this.RESP_ZONES = 'zones';

		this.RESP_ZONE_CONFIG = 'zoneConfig';
		this.RESP_ZONE_CONFIG_UPDATE_CONFIRM = 'zoneCfgUpd';
		this.RESP_ZONE_ADDED = 'zoneAdded';
		this.RESP_ZONE_REFUSED = 'zoneRefused';
		this.RESP_ZONE_DELETED = 'zoneDel';
		this.RESP_ZONE_ACTIVATED = 'zoneAct';
		this.RESP_ZONE_ACTIVATION_ERROR = 'zoneActErr';

		this.RESP_ROOM_CONFIG = 'roomConfig';
		this.RESP_ROOM_CONFIG_UPDATE_CONFIRM = 'roomCfgUpd';
		this.RESP_ROOM_ADDED = 'roomAdded';
		this.RESP_ROOM_REFUSED = 'roomRefused';
		this.RESP_ROOM_DELETED = 'roomDel';
	}

	//------------------------------------
	// COMMON MODULE INTERFACE METHODS
	// This members are used by the main controller
	// to communicate with the module's controller.
	// This methods override those in BaseModule class.
	//------------------------------------

	initialize(idData, shellController)
	{
		// Call super method
		super.initialize(idData, shellController);

		// Create interface builder instance
		this._interfaceBuilder = new _utils_uibuilder_config_interface_builder__WEBPACK_IMPORTED_MODULE_3__["ConfigInterfaceBuilder"]();

		// Set listener for custom actions triggered by configuration interface
		$('#znc-tabNavigator').on('value-set', $.proxy(this._onConfigValueSet, this));

		// Initialize Zones/Rooms treeview
		this._treeview = $('#znc-treeView').kendoTreeView({
			loadOnDemand: false,
			dataTextField: 'name',
			template: kendo.template('<span class="# if (!item.active) { # inactive-list-item # } #">#: item.name #</span>'),
			change: $.proxy(this._onZoneRoomChange, this),
		}).data('kendoTreeView');

		// Lestend to treeview double-click event
		$('#znc-treeView').on('dblclick', $.proxy(this._onTreeItemDoubleClick, this));

		// Request zones & rooms list to server instance
		this.sendExtensionRequest(this.REQ_GET_ZONES);

		// Initialize progress bar
		$('#znc-progressBar').kendoProgressBar({
			min: 0,
            max: 100,
			value: false,
            type: 'value',
            animation: {
                duration: 400
            }
        });

		// Add listeners to utility buttons
		$('#znc-addZoneButton').on('click', $.proxy(this._onAddZoneClick, this));
		$('#znc-addRoomButton').on('click', $.proxy(this._onAddRoomClick, this));
		$('#znc-editButton').on('click', $.proxy(this._onEditClick, this));
		$('#znc-removeButton').on('click', $.proxy(this._onRemoveClick, this));
		$('#znc-activateButton').on('click', $.proxy(this._onActivateClick, this));

		// Add listener to interface buttons
		$('#znc-cancelButton').on('click', $.proxy(this._onCancelClick, this));
		$('#znc-reloadButton').on('click', $.proxy(this._onReloadClick, this));
		$('#znc-submitButton').on('click', $.proxy(this._onSubmitClick, this));

		// Initialize help tooltips
		$(this).find('.custom-tab-content').kendoTooltip({
			filter: 'i[title].help',
			position: 'right',
			content: function(e) {
				return `<div class="help-tooltip">${e.target.data('title')}</div>`;
			}
		});
	}

	destroy()
	{
		// Call super method
		super.destroy();

		// Remove tree view doubleclick listener
		$('#znc-treeView').off('dblclick');

		// Remove listener for custom actions triggered by configuration interface
		$('#znc-tabNavigator').off('value-set');

		// Remove listener for zone/room activation event
		$('#znc-addZoneButton').off('click');
		$('#znc-addRoomButton').off('click');
		$('#znc-editButton').off('click');
		$('#znc-removeButton').off('click');
		$('#znc-activateButton').off('click');

		// Remove interface buttons click listeners
		$('#znc-cancelButton').off('click');
		$('#znc-reloadButton').off('click');
		$('#znc-submitButton').off('click');

		// Clear tabs container
		this._clearTabs();
	}

	onExtensionCommand(command, data)
	{
		const username = data.getUtfString('user');

		/****** ZONES & ROOMS ******/

		// Zones & rooms list received
		if (command == this.RESP_ZONES)
			this._populateTree(data);

		// Zone or room configuration data received
		else if (command == this.RESP_ZONE_CONFIG || command == this.RESP_ROOM_CONFIG)
		{
			// Build user interface based on received data
			this._interfaceBuilder.buildInterface(data.getSFSArray('settings'), 'znc-tabNavigator', false);

			// Enable scrolling tabs (if needed)
			if (this._reinitTabs)
			{
				$('#znc-tabNavigator #tabs').scrollingTabs({
					bootstrapVersion: 4,
					scrollToTabEdge: true,
					enableSwiping: true,
					disableScrollArrowsOnFullyScrolled: true,
					cssClassLeftArrow: 'fa fa-chevron-left',
					cssClassRightArrow: 'fa fa-chevron-right'
				});
			}

			// Enable interface
			this._enableConfigInterface(true);
		}

		/****** ZONES ******/

		// Zone configuration update confirmation
		else if (command == this.RESP_ZONE_CONFIG_UPDATE_CONFIRM)
		{
			// If a 'name' parameter is received, it means the zone name changed, and we have to update the zones list
			if (data.getUtfString('zName') != null)
				this._updateZoneNameInList(data.getInt('zId'), data.getUtfString('zName'));

			// If the current user is the updater, show a notification; otherwise, show a dialog box suggesting to reload
			if (username == this.smartFox.mySelf.name)
			{
				// Enable interface
				this._enableConfigInterface(true);

				// Display notification
				this.shellCtrl.showNotification('Zone modified', `Zone settings updated successfully; changes will be applied on next <strong>server restart</strong>`);

				// Reset the 'modified' flag
				this._interfaceBuilder.resetIsModified();
			}
			else
			{
				// An alert box is displayed if the user is currently editing the same zone
				if (data.getInt('zId') == this._editedZoneId)
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Administrator ${username} has modified the Zone you are currently editing; please reload to update your view.`);

					// Disable submit button
					$('#znc-submitButton').attr('disabled', true);
				}
				else
				{
					// Display notification
					if (data.getUtfString('zName') != null)
						this.shellCtrl.showNotification('Zone renamed', `Administrator ${username} has changed the name on one of the Zones`);
				}
			}
		}

		// New zone added
		else if (command == this.RESP_ZONE_ADDED)
		{
			const zoneName = data.getSFSObject('zone').getUtfString('name');

			// If the current user is the updater, reset the interface; otherwise, just show a notification
			if (username == this.smartFox.mySelf.name)
			{
				// Reset interface
				this._onCancelClick();

				// Display notification
				this.shellCtrl.showNotification('Zone added', `Zone '${zoneName}' created successfully`);
			}
			else
			{
				// Display notification
				this.shellCtrl.showNotification('Zone added', `Administrator ${username} created Zone '${zoneName}'`);
			}

			// Add new zone to tree
			let zonesDS = this._treeview.dataSource;
			zonesDS.add(this._createZoneObject(data.getSFSObject('zone')));
			zonesDS.sync();
		}

		// New zone creation refused due to invalid zone name
		else if (command == this.RESP_ZONE_REFUSED)
		{
			// Re-enable interface
			this._enableConfigInterface(true);

			// Show warning
			this.shellCtrl.showSimpleAlert('Zone configuration can\'t be saved because another Zone with the same name already exists.', true);
		}

		// Existing zone deleted
		else if (command == this.RESP_ZONE_DELETED)
		{
			// If the current user is the deleter, reset the interface; otherwise, just show a notification
			if (username == this.smartFox.mySelf.name)
			{
				// Re-enable interface
				this._enableListInterface(true);

				// Display notification
				this.shellCtrl.showNotification('Zone removed', `Zone '${data.getUtfString('zName')}' deleted successfully`);
			}
			else
			{
				// An alert box is displayed if the user is currently editing the same zone
				if (data.getInt('zId') == this._editedZoneId)
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Administrator ${username} has deleted the Zone you are currently modifying; you have to cancel your editing.`);

					// Disable submit and reload buttons
					$('#znc-reloadButton').attr('disabled', true);
					$('#znc-submitButton').attr('disabled', true);
				}
				else
				{
					// Display notification
					this.shellCtrl.showNotification('Zone removed', `Administrator ${username} deleted Zone '${data.getUtfString('zName')}'`);
				}
			}

			// Reset selection if the currently selected item or its parent is being removed
			let selectedNode = this._treeview.select();
			let selectedDataItem = this._treeview.dataItem(selectedNode);
			if (selectedDataItem)
			{
				if (selectedDataItem.type == this.ITEM_TYPE_ZONE && selectedDataItem.id == data.getInt('zId'))
					this._deselectTreeItem();

				if (selectedDataItem.type == this.ITEM_TYPE_ROOM)
				{
					let parentDataItem = this._treeview.dataItem(this._treeview.parent(selectedNode));

					if (parentDataItem.id == data.getInt('zId'))
						this._deselectTreeItem();
				}
			}

			// Remove zone from tree
			let dataItem = this._getZoneDataItemById(data.getInt('zId'));
			let zonesDS = this._treeview.dataSource;
			zonesDS.remove(dataItem);
			zonesDS.sync();
		}

		// Zone activated
		else if (command == this.RESP_ZONE_ACTIVATED)
		{
			// Set zone activation status
			const zoneName = this._setZoneActivationStatus(data.getInt('zId'), data.getUtfString('actRooms'), true);

			// Display notification
			if (username == this.smartFox.mySelf.name)
				this.shellCtrl.showNotification('Zone activated', `Zone '${zoneName}' activated successfully`);
			else
				this.shellCtrl.showNotification('Zone activated', `Administrator ${username} activated Zone '${zoneName}'`);
		}

		// Zone activation error
		else if (command == this.RESP_ZONE_ACTIVATION_ERROR)
		{
			// Set zone activation status
			this._setZoneActivationStatus(data.getInt('zId'), '', false);

			// Show alert
			this.shellCtrl.showSimpleAlert(data.getUtfString('error'), true);
		}

		/****** ROOMS ******/

		// Room configuration update confirmation
		else if (command == this.RESP_ROOM_CONFIG_UPDATE_CONFIRM)
		{
			if (data.getUtfString('rName') != null)
				this._updateRoomNameInList(data.getInt('zId'), data.getInt('rId'), data.getUtfString('rName'));

			// If the current user is the updater, show a notification; otherwise, show a dialog box suggesting to reload
			if (username == this.smartFox.mySelf.name)
			{
				// Enable interface
				this._enableConfigInterface(true);

				// Display notification
				this.shellCtrl.showNotification('Room modified', `Room settings updated successfully; changes will be applied on next <strong>server restart</strong>`);

				// Reset the 'modified' flag
				this._interfaceBuilder.resetIsModified();
			}
			else
			{
				// An alert box is displayed if the user is currently editing the same room
				if (data.getInt('rId') == this._editedRoomId)
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Administrator ${username} has modified the Room you are currently editing; please reload to update your view.`);

					// Disable submit button
					$('#znc-submitButton').attr('disabled', true);
				}
				else
				{
					// Display notification
					if (data.getUtfString('rName') != null) // TODO Only show if parent node is expanded?
						this.shellCtrl.showNotification('Room renamed', `Administrator ${username} has changed the name on one of the Rooms`);
				}
			}
		}

		// New room added
		else if (command == this.RESP_ROOM_ADDED)
		{
			const roomData = data.getSFSObject('room');
			const zoneId = data.getInt('zId');

			let zonesDS = this._treeview.dataSource;
			let zoneItem = zonesDS.get(zoneId);

			// If the current user is the updater, reset the interface; otherwise, just show a notification
			if (username == this.smartFox.mySelf.name)
			{
				// Reset interface
				this._onCancelClick();

				// Display notification
				this.shellCtrl.showNotification('Room added', `Room '${roomData.getUtfString('name')}' created successfully`);
			}
			else
			{
				// Display notification
				this.shellCtrl.showNotification('Room added', `Administrator ${username} created Room '${roomData.getUtfString('name')}' in Zone '${zoneItem.name}'`);
			}

			// Add new room to tree
			zoneItem.children.add(this._createRoomObject(roomData, zoneId));
			zonesDS.sync();
		}

		// New room creation refused due to invalid room name
		else if (command == this.RESP_ROOM_REFUSED)
		{
			// Re-enable interface
			this._enableConfigInterface(true);

			// Show warning
			this.shellCtrl.showSimpleAlert('Room configuration can\'t be saved because another Room with the same name already exists.', true);
		}

		// Existing room deleted
		else if (command == this.RESP_ROOM_DELETED)
		{
			let zoneItem = this._getZoneDataItemById(data.getInt('zId'));
			let roomItem = this._getRoomDataItemById(data.getInt('zId'), data.getInt('rId'));

			// If the current user is the deleter, reset the interface; otherwise, just show a notification
			if (username == this.smartFox.mySelf.name)
			{
				// Re-enable interface
				this._enableListInterface(true);

				// Display notification
				this.shellCtrl.showNotification('Room removed', `Room '${roomItem.name}' deleted successfully`);
			}
			else
			{
				// An alert box is displayed if the user is currently editing the same room
				if (data.getInt('rId') == this._editedRoomId)
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Administrator ${username} has deleted the Room you are currently modifying; you have to cancel your editing.`);

					// Disable submit and reload buttons
					$('#znc-reloadButton').attr('disabled', true);
					$('#znc-submitButton').attr('disabled', true);
				}
				else
				{
					// Display notification
					this.shellCtrl.showNotification('Room removed', `Administrator ${username} deleted Room '${roomItem.name}' from Zone '${zoneItem.name}'`);
				}
			}

			// Reset selection if the currently selected item or its parent is being removed
			let selectedNode = this._treeview.select();
			let selectedDataItem = this._treeview.dataItem(selectedNode);
			if (selectedDataItem)
			{
				if (selectedDataItem.type == this.ITEM_TYPE_ROOM && selectedDataItem.id == data.getInt('rId'))
					this._deselectTreeItem();
			}

			// Remove room from tree
			zoneItem.children.remove(roomItem);
			this._treeview.dataSource.sync();
		}

		// else if ()
	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------

	_onTreeItemDoubleClick(e)
	{
		// Get event target's closest tree node
		let treeNode = $(e.target).closest('.k-item[role=treeitem]');

		// Get associated data item
		let dataItem = this._treeview.dataItem(treeNode);

		// Load configuration
		this._loadConfiguration(dataItem.type);
	}

	_onZoneRoomChange()
	{
		// Reset utility buttons
		this._setUtilityButtonsState(this._selectedItem);
	}

	// Utility buttons listeners

	_onAddZoneClick()
	{
		// Deselect list item
		this._deselectTreeItem();

		// Load configuration
		this._loadConfiguration(this.ITEM_TYPE_ZONE);
	}

	_onAddRoomClick()
	{
		// Select parent list item
		this._selectParentTreeItem();

		// Load configuration
		this._loadConfiguration(this.ITEM_TYPE_ROOM);
	}

	_onEditClick()
	{
		// Load configuration
		this._loadConfiguration(this._selectedItem.type);
	}

	_onRemoveClick()
	{
		this.shellCtrl.showConfirmWarning(`Are you sure you want to delete the selected ${this._selectedItem.type == this.ITEM_TYPE_ZONE ? 'Zone' : 'Room'} configuration?`, $.proxy(this._onRemoveConfirm, this));
	}

	_onRemoveConfirm()
	{
		// Disable zone/room selection list
		this._enableListInterface(false);

		let params = new SFS2X.SFSObject();

		// Request zone removal
		if (this._selectedItem.type == this.ITEM_TYPE_ZONE)
		{
			params.putInt('zId', this._selectedItem.id);
			this.sendExtensionRequest(this.REQ_DELETE_ZONE_CONFIG, params);
		}
		else
		{
			params.putInt('zId', this._selectedItemParent.id);
			params.putInt('rId', this._selectedItem.id);
			this.sendExtensionRequest(this.REQ_DELETE_ROOM_CONFIG, params);
		}
	}

	_onActivateClick()
	{
		// Get selected data item
		if (this._selectedItem.type == this.ITEM_TYPE_ZONE)
		{
			let params = new SFS2X.SFSObject();
			params.putInt('zId', this._selectedItem.id);

			this.sendExtensionRequest(this.REQ_ACTIVATE_ZONE, params);
		}
	}

	// Configuration buttons listeners

	_onCancelClick()
	{
		// Enable zone/room selection lists
		this._enableListInterface(true);

		// Disable configuration interface
		this._enableConfigInterface(false);

		// Clear main container
		this._resetTabsContainer(false, true);

		// Set isEditing flag
		this._isEditing = false;
		this._editedItemType = '';

		// Switch panel
		this._switchPanel('znc-sidebarPanel');
	}

	_onReloadClick()
	{
		// Hide validation messages
		this._interfaceBuilder.resetValidation();

		// Reload configuration
		this._loadConfiguration(this._editedItemType, false);
	}

	_onSubmitClick()
	{
		// Check validity
		if (this._interfaceBuilder.checkIsValid())
		{
			let changes = this._interfaceBuilder.getChangedData();

			if (changes.size() > 0)
			{
				//console.log(changes.getDump())

				// In case the zone/room name changed, check it against the list (duplicate names not allowed!)
				if (this._validateName(changes))
				{
					// Disable configuration interface
					this._enableConfigInterface(false);

					// Send settings to server instance
					let params = new SFS2X.SFSObject();
					params.putSFSArray('settings', changes);
					params.putBool('backup', $('#znc-backupCheck').prop('checked'));
					params.putInt('zId', this._editedZoneId);
					params.putInt('rId', this._editedRoomId);

					if (this._editedItemType == this.ITEM_TYPE_ZONE)
					{
						// Submit zone settings
						if (this._editedZoneId > -1)
							this.sendExtensionRequest(this.REQ_SAVE_ZONE_CONFIG, params);
						else
							this.sendExtensionRequest(this.REQ_NEW_ZONE_CONFIG, params);
					}
					else
					{
						// Submit room settings
						if (this._editedRoomId > -1)
							this.sendExtensionRequest(this.REQ_SAVE_ROOM_CONFIG, params);
						else
							this.sendExtensionRequest(this.REQ_NEW_ROOM_CONFIG, params);
					}
				}
				else
				{
					// Show alert
					this.shellCtrl.showSimpleAlert(`Unable to submit configuration because the ${Object(_utils_utilities__WEBPACK_IMPORTED_MODULE_4__["capitalizeFirst"])(this._editedItemType)} name already exists; duplicate names are not allowed.`, true);
				}
			}
		}
		else
		{
			// Show alert
			this.shellCtrl.showSimpleAlert('Unable to submit configuration changes due to an invalid value; please verify the highlighted form fields in all tabs.', true);
		}
	}

	_onConfigValueSet(e) // SAME METHOD DUPLICATED IN zone-monitor.js
	{
		const configParam = e.target.data;

		// Handle extension name/type dropdowns update and update the main class dropdown datasource accordingly
		if (configParam.name == 'extension.name' || configParam.name == 'extension.type' || configParam.name == 'extension.filterClass')
		{
			// All involved ConfigFormItems must be available and initialized to proceed
			const nameFormItem = this._interfaceBuilder.getConfigFormItem('extension.name');
			const typeFormItem = this._interfaceBuilder.getConfigFormItem('extension.type');
			const classFormItem = this._interfaceBuilder.getConfigFormItem('extension.file');
			const filterFormItem = this._interfaceBuilder.getConfigFormItem('extension.filterClass');

			if (nameFormItem != null && typeFormItem != null && classFormItem != null && filterFormItem != null)
			{
				const source = nameFormItem.data;
				let classesList = [];

				let data = source.triggerData;
				for (let i = 0; i < data.size(); i++)
				{
					let ext = data.getSFSObject(i);

					if (ext.getUtfString('name') == nameFormItem.data.value && ext.getUtfString('type') == typeFormItem.data.value)
					{
						let classes = ext.getUtfString('classesString').split(',');

						if (filterFormItem.data.value == true)
						{
							let filteredClasses = classes.filter(_utils_utilities__WEBPACK_IMPORTED_MODULE_4__["filterClassName"]);
							classes = filteredClasses;
						}

						classesList = classesList.concat(classes);
					}
				}

				let currentClass = classFormItem.data.value;

				// If the classes list doesn't contain the current value, create an empty entry and reset the value
				if (classesList.indexOf(currentClass) < 0)
				{
					if (classesList.length == 0)
					{
						classesList.push('');
						currentClass = '';
					}
					else
						currentClass = classesList[0];
				}

				let mainClassDropDown = classFormItem._innerWidget;
				mainClassDropDown.setDataSource(classesList);

				classFormItem.data.value = currentClass;
				classFormItem._setWidgetValue();
			}
		}
	}

	//---------------------------------
	// PRIVATE METHODS
	//---------------------------------

	_enableListInterface(enabled)
	{
		$('#znc-utilButtons').attr('disabled', !enabled);
		$('#znc-treeView').attr('disabled', !enabled);
	}

	_setUtilityButtonsState(dataItem = null)
	{
		let disable = true;

		if (dataItem)
		{
			// Enable 'activate zone' button if zone is inactive
			$('#znc-activateButton').attr('disabled', (dataItem.type != this.ITEM_TYPE_ZONE || dataItem.active));

			disable = false;
		}
		else
		{
			// Disable 'activate zone' button
			$('#znc-activateButton').attr('disabled', true);
		}

		// Enable/disable other utility buttons
		$('#znc-addZoneButton').attr('disabled', false); // Always enabled
		$('#znc-addRoomButton').attr('disabled', disable);
		$('#znc-editButton').attr('disabled', disable);
		$('#znc-removeButton').attr('disabled', disable);
	}

	_enableConfigInterface(enabled)
	{
		$('#znc-cancelButton').attr('disabled', !enabled);
		$('#znc-reloadButton').attr('disabled', !enabled);
		$('#znc-submitButton').attr('disabled', !enabled);
		$('#znc-backupCheck').attr('disabled', !enabled);

		this._interfaceBuilder.disableInterface(!enabled);

		// Also switch view when enabled
		if (enabled)
			this._switchView('znc-main');
	}

	_switchView(viewId)
	{
		document.getElementById('znc-viewstack').selectedElement = document.getElementById(viewId);
	}

	_clearTabs()
	{
		// Destroy scrolling tabs
		$('#znc-tabNavigator #tabs').scrollingTabs('destroy');

		// Remove all tab navigator content
		this._interfaceBuilder.destroyInterface();

		// Set flag to re-initialize tabs if needed
		this._reinitTabs = true;
	}

	_populateTree(data)
	{
		let zData = data.getSFSArray('zones');

		let zonesArr = [];
		for (let z = 0; z < zData.size(); z++)
			zonesArr.push( this._createZoneObject(zData.getSFSObject(z)) );

		// Create datasource
		let zones = new kendo.data.HierarchicalDataSource({
            data: zonesArr,
			sort: {
				field: 'name',
				dir: 'asc'
			},
            schema: {
                model: {
					id: 'id',
                    children: {
						schema: {
							data: 'rooms',
							sort: {
								field: 'name',
								dir: 'asc'
							}
						}
					}
                }
            }
        });

		// Set tree view dataprovider
		this._treeview.setDataSource(zones);

		// Set utility buttons state (add, remove, edit, etc)
		this._setUtilityButtonsState();
	}

	_createZoneObject(zoneData)
	{
		let zone = {
			type: this.ITEM_TYPE_ZONE,
			name: zoneData.getUtfString('name'),
			id: zoneData.getInt('id'),
			active: zoneData.getBool('act')
		}

		// Create rooms list dataprovider
		let rData = zoneData.getSFSArray('rooms');

		let roomsArr = [];
		for (let r = 0; r < rData.size(); r++)
			roomsArr.push( this._createRoomObject(rData.getSFSObject(r), zoneData.getInt('id')) );

		zone.rooms = roomsArr;

		return zone;
	}

	_createRoomObject(roomData, zoneId)
	{
		let room = {
			type: this.ITEM_TYPE_ROOM,
			name: roomData.getUtfString('name'),
			id: roomData.getInt('id'),
			active: roomData.getBool('act'),
			parentId: zoneId,
			spriteCssClass: this._getRoomListIconCssClass(roomData.getBool('act'))
		};

		return room;
	}

	_getRoomListIconCssClass(isActive)
	{
		return isActive ? 'fas fa-door-open' : 'fas fa-door-closed inactive-list-item';
	}

	_setZoneActivationStatus(zoneId, activeRooms, isActive)
	{
		let zoneDI = this._getZoneDataItemById(zoneId);

		zoneDI.active = isActive;

		let activeRoomsArr = activeRooms.split(',');

		if (zoneDI.hasChildren)
		{
			for (let i = 0; i < zoneDI.children.data().length; i++)
			{
				let room = zoneDI.children.data()[i];
				room.active = (isActive && activeRoomsArr.indexOf(room.name) > -1);
				room.spriteCssClass = this._getRoomListIconCssClass(room.active)
			}
		}

		// Refresh list
		this._treeview.dataSource.sync();

		// Return zone name
		return zoneDI.name;
	}

	_deselectTreeItem()
	{
		this._treeview.select($());
	}

	_selectParentTreeItem()
	{
		let selectedNode = this._treeview.select();
		let selectedDataItem = this._treeview.dataItem(selectedNode);

		if (selectedDataItem.type == this.ITEM_TYPE_ROOM)
		{
			let parentNode = this._treeview.parent(selectedNode);
			this._treeview.select(parentNode);
		}
	}

	_loadConfiguration(type, resetTabs = true)
	{
		// Disable zone/room selection list
		this._enableListInterface(false);

		// Disable configuration interface
		this._enableConfigInterface(false);

		// Clear main container
		this._resetTabsContainer(true, resetTabs);

		// Set isEditing flag
		this._isEditing = true;
		this._editedItemType = type;

		// Request zone or room configuration data to server instance
		let params = new SFS2X.SFSObject();
		params.putInt('zId', this._editedZoneId);
		params.putInt('rId', this._editedRoomId);

		// If no room is selected, then we are editing a zone
		if (this._editedItemType == this.ITEM_TYPE_ZONE)
			this.sendExtensionRequest(this.REQ_GET_ZONE_CONFIG, params);
		else
			this.sendExtensionRequest(this.REQ_GET_ROOM_CONFIG, params);

		// Switch panel
		this._switchPanel('znc-mainPanel');
	}

	_resetTabsContainer(isLoading, resetTabs)
	{
		if (resetTabs)
			this._clearTabs();
		else
			this._reinitTabs = false;

		if (!isLoading)
			this._switchView('znc-select');
		else
			this._switchView('znc-loading');
	}

	_switchPanel(panelId)
	{
		document.getElementById('znc-view').selectedPanel = document.getElementById(panelId);
	}

	_getZoneDataItemById(zoneId)
	{
		let zonesDS = this._treeview.dataSource;
		return zonesDS.get(zoneId);
	}

	_getRoomDataItemById(zoneId, roomId)
	{
		let zoneDI = this._getZoneDataItemById(zoneId);

		if (zoneDI.hasChildren)
			return zoneDI.children.get(roomId);

		return null;
	}

	_updateZoneNameInList(zoneId, zoneName)
	{
		this._getZoneDataItemById(zoneId).name = zoneName;
		this._treeview.dataSource.sync();
	}

	_updateRoomNameInList(zoneId, roomId, roomName)
	{
		this._getRoomDataItemById(zoneId, roomId).name = roomName;
		this._treeview.dataSource.sync();
	}

	_validateName(changes)
	{
		const zoneId = this._editedZoneId;

		for (let i = 0; i < changes.size(); i++)
		{
			const setting = changes.getSFSObject(i);

			if (setting.containsKey('name') && setting.getUtfString('name') == 'name')
			{
				// Get name value
				const name = setting.getText('value');

				// Get data source
				const ds = ( this._editedItemType == this.ITEM_TYPE_ZONE ? this._treeview.dataSource.data() : this._getZoneDataItemById(zoneId).children.data() );

				// Check if name exists in data source
				for (let j = 0; j < ds.length; j++)
				{
					if (ds[j].name == name)
					{
						return false;
					}
				}

				break;
			}
		}

		return true;
	}

	//---------------------------------
	// PRIVATE GETTERS
	//---------------------------------

	get _selectedItem()
	{
		return this._treeview.dataItem(this._treeview.select());
	}

	get _selectedItemParent()
	{
		let selectedNode = this._treeview.select();
		let parentNode = this._treeview.parent(selectedNode);

		return this._treeview.dataItem(parentNode);
	}

	get _editedZoneId()
	{
		if (this._isEditing && this._selectedItem)
		{
			if (this._selectedItem.type == this.ITEM_TYPE_ZONE)
				return this._selectedItem.id;
			else
				return this._selectedItemParent.id;
		}

		return -1;
	}

	get _editedRoomId()
	{
		if (this._isEditing && this._selectedItem)
		{
			if (this._selectedItem.type == this.ITEM_TYPE_ROOM)
				return this._selectedItem.id;
		}

		return -1;
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtMTIuYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy9zaWRlYmFyLWxheW91dC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9tb2R1bGVzL3pvbmUtY29uZmlndXJhdG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBTaWRlYmFyTGF5b3V0IGV4dGVuZHMgSFRNTEVsZW1lbnRcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdCAgICBzdXBlcigpO1xuXG5cdFx0Ly8gQXR0YWNoIGEgc2hhZG93IHJvb3Rcblx0XHRjb25zdCBzaGFkb3dSb290ID0gdGhpcy5hdHRhY2hTaGFkb3coe21vZGU6ICdvcGVuJ30pO1xuXHRcdHNoYWRvd1Jvb3QuaW5uZXJIVE1MID0gYFxuXHRcdFx0PHN0eWxlPlxuXHRcdFx0XHQ6aG9zdCB7XG5cdFx0XHRcdFx0ZGlzcGxheTogZmxleDtcblx0XHRcdFx0XHRmbGV4LWRpcmVjdGlvbjogcm93O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0QG1lZGlhIChtYXgtd2lkdGg6IDU3NS45OHB4KSB7XG5cdFx0XHRcdFx0Omhvc3QoLnNwbGl0LXhzKSA6OnNsb3R0ZWQoOm5vdChbYXJpYS1zZWxlY3RlZD1cInRydWVcIl0pKSB7XG5cdFx0XHRcdFx0XHRkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7XG5cdFx0XHRcdCAgICB9XG5cblx0XHRcdFx0XHQ6aG9zdCguc3BsaXQteHMpIDo6c2xvdHRlZChbYXJpYS1zZWxlY3RlZD1cInRydWVcIl0pIHtcblx0XHRcdFx0XHRcdGZsZXgtZ3JvdzogMTtcblx0XHRcdFx0ICAgIH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdEBtZWRpYSAobWF4LXdpZHRoOiA3NjcuOThweCkge1xuXHRcdFx0XHRcdDpob3N0KC5zcGxpdC1zbSkgOjpzbG90dGVkKDpub3QoW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdKSkge1xuXHRcdFx0XHRcdFx0ZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuXHRcdFx0XHQgICAgfVxuXG5cdFx0XHRcdFx0Omhvc3QoLnNwbGl0LXNtKSA6OnNsb3R0ZWQoW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdKSB7XG5cdFx0XHRcdFx0XHRmbGV4LWdyb3c6IDE7XG5cdFx0XHRcdCAgICB9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRAbWVkaWEgKG1heC13aWR0aDogOTkxLjk4cHgpIHtcblx0XHRcdFx0XHQ6aG9zdCguc3BsaXQtbWQpIDo6c2xvdHRlZCg6bm90KFthcmlhLXNlbGVjdGVkPVwidHJ1ZVwiXSkpIHtcblx0XHRcdFx0XHRcdGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcblx0XHRcdFx0ICAgIH1cblxuXHRcdFx0XHRcdDpob3N0KC5zcGxpdC1tZCkgOjpzbG90dGVkKFthcmlhLXNlbGVjdGVkPVwidHJ1ZVwiXSkge1xuXHRcdFx0XHRcdFx0ZmxleC1ncm93OiAxO1xuXHRcdFx0XHQgICAgfVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0QG1lZGlhIChtYXgtd2lkdGg6IDExOTkuOThweCkge1xuXHRcdFx0XHRcdDpob3N0KC5zcGxpdC1sZykgOjpzbG90dGVkKDpub3QoW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdKSkge1xuXHRcdFx0XHRcdFx0ZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuXHRcdFx0XHQgICAgfVxuXG5cdFx0XHRcdFx0Omhvc3QoLnNwbGl0LWxnKSA6OnNsb3R0ZWQoW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdKSB7XG5cdFx0XHRcdFx0XHRmbGV4LWdyb3c6IDE7XG5cdFx0XHRcdCAgICB9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQuc2lkZS1jb2w6OnNsb3R0ZWQoKikge1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Lm1haW4tY29sOjpzbG90dGVkKCopIHtcblx0XHRcdFx0XHRmbGV4LWdyb3c6IDE7XG5cdFx0XHRcdH1cblx0XHRcdDwvc3R5bGU+XG5cblx0XHRcdDxzbG90IGNsYXNzPVwic2lkZS1jb2xcIiBuYW1lPVwic2lkZS1jb2x1bW5cIj48L3Nsb3Q+XG5cdFx0XHQ8c2xvdCBjbGFzcz1cIm1haW4tY29sXCIgbmFtZT1cIm1haW4tY29sdW1uXCI+PC9zbG90PlxuXHRcdGA7XG5cblx0XHQvLyBTZXQgaW5pdGlhbCBzZWxlY3Rpb25cblx0XHR0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xuXHR9XG5cblx0Z2V0IHNlbGVjdGVkUGFuZWwoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkUGFuZWw7XG5cdH1cblxuXHRzZXQgc2VsZWN0ZWRQYW5lbChlbGVtZW50KSAvLyAnc2lkZScgb3IgJ21haW4nXG5cdHtcblx0XHRpZiAoZWxlbWVudCAhPSBudWxsICYmIGVsZW1lbnQucGFyZW50Tm9kZSA9PSB0aGlzKVxuXHRcdHtcblx0XHRcdHRoaXMuX3NlbGVjdGVkUGFuZWwgPSBlbGVtZW50O1xuXG5cdFx0XHRmb3IgKGxldCBlbGVtZW50IG9mIHRoaXMuY2hpbGRyZW4pXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChlbGVtZW50ID09IHRoaXMuX3NlbGVjdGVkUGFuZWwpXG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0VsZW1lbnQgaXMgbm90IGEgY2hpbGQgb2YgU2lkZWJhckxheW91dCcpO1xuXHRcdH1cblx0fVxuXG5cdGdldCBzZWxlY3RlZEluZGV4KClcblx0e1xuXHRcdHJldHVybiBBcnJheS5mcm9tKHRoaXMuY2hpbGRyZW4pLmluZGV4T2YodGhpcy5fc2VsZWN0ZWRQYW5lbCk7XG5cdH1cblxuXHRzZXQgc2VsZWN0ZWRJbmRleChpbmRleClcblx0e1xuXHRcdGlmICh0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDApXG5cdFx0e1xuXHRcdFx0aWYgKHRoaXMuY2hpbGRyZW5baW5kZXhdID09IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnNvbGUuZXJyb3IoJ0ludmFsaWQgU2lkZWJhckxheW91dCBpbmRleCcpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGxldCBlbGVtZW50ID0gdGhpcy5jaGlsZHJlbltpbmRleF07XG5cdFx0XHR0aGlzLnNlbGVjdGVkUGFuZWwgPSBlbGVtZW50O1xuXHRcdH1cblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ3NpZGViYXItbGF5b3V0JykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3NpZGViYXItbGF5b3V0JywgU2lkZWJhckxheW91dCk7XG4iLCJpbXBvcnQge0Jhc2VNb2R1bGV9IGZyb20gJy4vYmFzZS1tb2R1bGUnO1xuaW1wb3J0IHtWaWV3U3RhY2t9IGZyb20gJy4uL2NvbXBvbmVudHMvdmlldy1zdGFjayc7XG5pbXBvcnQge1NpZGViYXJMYXlvdXR9IGZyb20gJy4uL2NvbXBvbmVudHMvc2lkZWJhci1sYXlvdXQnO1xuaW1wb3J0IHtDb25maWdJbnRlcmZhY2VCdWlsZGVyfSBmcm9tICcuLi91dGlscy91aWJ1aWxkZXIvY29uZmlnLWludGVyZmFjZS1idWlsZGVyJztcbmltcG9ydCB7Y2FwaXRhbGl6ZUZpcnN0LCBmaWx0ZXJDbGFzc05hbWV9IGZyb20gJy4uL3V0aWxzL3V0aWxpdGllcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFpvbmVDb25maWd1cmF0b3IgZXh0ZW5kcyBCYXNlTW9kdWxlXG57XG5cdGNvbnN0cnVjdG9yKClcblx0e1xuXHQgICAgc3VwZXIoJ3pvbmVDb25maWcnKTtcblxuXHRcdHRoaXMuSVRFTV9UWVBFX1pPTkUgPSAnem9uZSc7XG5cdFx0dGhpcy5JVEVNX1RZUEVfUk9PTSA9ICdyb29tJztcblxuXHRcdC8vIE91dGdvaW5nIHJlcXVlc3RzXG5cdFx0dGhpcy5SRVFfR0VUX1pPTkVTID0gJ2dldFpvbmVzJztcblxuXHRcdHRoaXMuUkVRX0dFVF9aT05FX0NPTkZJRyA9ICdnZXRab25lQ29uZmlnJztcblx0XHR0aGlzLlJFUV9TQVZFX1pPTkVfQ09ORklHID0gJ3NhdmVab25lQ29uZmlnJztcblx0XHR0aGlzLlJFUV9ORVdfWk9ORV9DT05GSUcgPSAnbmV3Wm9uZUNvbmZpZyc7XG5cdFx0dGhpcy5SRVFfREVMRVRFX1pPTkVfQ09ORklHID0gJ2RlbFpvbmVDb25maWcnO1xuXHRcdHRoaXMuUkVRX0FDVElWQVRFX1pPTkUgPSAnYWN0Wm9uZSc7XG5cblx0XHR0aGlzLlJFUV9HRVRfUk9PTV9DT05GSUcgPSAnZ2V0Um9vbUNvbmZpZyc7XG5cdFx0dGhpcy5SRVFfU0FWRV9ST09NX0NPTkZJRyA9ICdzYXZlUm9vbUNvbmZpZyc7XG5cdFx0dGhpcy5SRVFfTkVXX1JPT01fQ09ORklHID0gJ25ld1Jvb21Db25maWcnO1xuXHRcdHRoaXMuUkVRX0RFTEVURV9ST09NX0NPTkZJRyA9ICdkZWxSb29tQ29uZmlnJztcblxuXHRcdC8vIEluY29taW5nIHJlc3BvbnNlc1xuXHRcdHRoaXMuUkVTUF9aT05FUyA9ICd6b25lcyc7XG5cblx0XHR0aGlzLlJFU1BfWk9ORV9DT05GSUcgPSAnem9uZUNvbmZpZyc7XG5cdFx0dGhpcy5SRVNQX1pPTkVfQ09ORklHX1VQREFURV9DT05GSVJNID0gJ3pvbmVDZmdVcGQnO1xuXHRcdHRoaXMuUkVTUF9aT05FX0FEREVEID0gJ3pvbmVBZGRlZCc7XG5cdFx0dGhpcy5SRVNQX1pPTkVfUkVGVVNFRCA9ICd6b25lUmVmdXNlZCc7XG5cdFx0dGhpcy5SRVNQX1pPTkVfREVMRVRFRCA9ICd6b25lRGVsJztcblx0XHR0aGlzLlJFU1BfWk9ORV9BQ1RJVkFURUQgPSAnem9uZUFjdCc7XG5cdFx0dGhpcy5SRVNQX1pPTkVfQUNUSVZBVElPTl9FUlJPUiA9ICd6b25lQWN0RXJyJztcblxuXHRcdHRoaXMuUkVTUF9ST09NX0NPTkZJRyA9ICdyb29tQ29uZmlnJztcblx0XHR0aGlzLlJFU1BfUk9PTV9DT05GSUdfVVBEQVRFX0NPTkZJUk0gPSAncm9vbUNmZ1VwZCc7XG5cdFx0dGhpcy5SRVNQX1JPT01fQURERUQgPSAncm9vbUFkZGVkJztcblx0XHR0aGlzLlJFU1BfUk9PTV9SRUZVU0VEID0gJ3Jvb21SZWZ1c2VkJztcblx0XHR0aGlzLlJFU1BfUk9PTV9ERUxFVEVEID0gJ3Jvb21EZWwnO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gQ09NTU9OIE1PRFVMRSBJTlRFUkZBQ0UgTUVUSE9EU1xuXHQvLyBUaGlzIG1lbWJlcnMgYXJlIHVzZWQgYnkgdGhlIG1haW4gY29udHJvbGxlclxuXHQvLyB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBtb2R1bGUncyBjb250cm9sbGVyLlxuXHQvLyBUaGlzIG1ldGhvZHMgb3ZlcnJpZGUgdGhvc2UgaW4gQmFzZU1vZHVsZSBjbGFzcy5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRpbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKVxuXHR7XG5cdFx0Ly8gQ2FsbCBzdXBlciBtZXRob2Rcblx0XHRzdXBlci5pbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKTtcblxuXHRcdC8vIENyZWF0ZSBpbnRlcmZhY2UgYnVpbGRlciBpbnN0YW5jZVxuXHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIgPSBuZXcgQ29uZmlnSW50ZXJmYWNlQnVpbGRlcigpO1xuXG5cdFx0Ly8gU2V0IGxpc3RlbmVyIGZvciBjdXN0b20gYWN0aW9ucyB0cmlnZ2VyZWQgYnkgY29uZmlndXJhdGlvbiBpbnRlcmZhY2Vcblx0XHQkKCcjem5jLXRhYk5hdmlnYXRvcicpLm9uKCd2YWx1ZS1zZXQnLCAkLnByb3h5KHRoaXMuX29uQ29uZmlnVmFsdWVTZXQsIHRoaXMpKTtcblxuXHRcdC8vIEluaXRpYWxpemUgWm9uZXMvUm9vbXMgdHJlZXZpZXdcblx0XHR0aGlzLl90cmVldmlldyA9ICQoJyN6bmMtdHJlZVZpZXcnKS5rZW5kb1RyZWVWaWV3KHtcblx0XHRcdGxvYWRPbkRlbWFuZDogZmFsc2UsXG5cdFx0XHRkYXRhVGV4dEZpZWxkOiAnbmFtZScsXG5cdFx0XHR0ZW1wbGF0ZToga2VuZG8udGVtcGxhdGUoJzxzcGFuIGNsYXNzPVwiIyBpZiAoIWl0ZW0uYWN0aXZlKSB7ICMgaW5hY3RpdmUtbGlzdC1pdGVtICMgfSAjXCI+IzogaXRlbS5uYW1lICM8L3NwYW4+JyksXG5cdFx0XHRjaGFuZ2U6ICQucHJveHkodGhpcy5fb25ab25lUm9vbUNoYW5nZSwgdGhpcyksXG5cdFx0fSkuZGF0YSgna2VuZG9UcmVlVmlldycpO1xuXG5cdFx0Ly8gTGVzdGVuZCB0byB0cmVldmlldyBkb3VibGUtY2xpY2sgZXZlbnRcblx0XHQkKCcjem5jLXRyZWVWaWV3Jykub24oJ2RibGNsaWNrJywgJC5wcm94eSh0aGlzLl9vblRyZWVJdGVtRG91YmxlQ2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIFJlcXVlc3Qgem9uZXMgJiByb29tcyBsaXN0IHRvIHNlcnZlciBpbnN0YW5jZVxuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfR0VUX1pPTkVTKTtcblxuXHRcdC8vIEluaXRpYWxpemUgcHJvZ3Jlc3MgYmFyXG5cdFx0JCgnI3puYy1wcm9ncmVzc0JhcicpLmtlbmRvUHJvZ3Jlc3NCYXIoe1xuXHRcdFx0bWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxMDAsXG5cdFx0XHR2YWx1ZTogZmFsc2UsXG4gICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDQwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lcnMgdG8gdXRpbGl0eSBidXR0b25zXG5cdFx0JCgnI3puYy1hZGRab25lQnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkFkZFpvbmVDbGljaywgdGhpcykpO1xuXHRcdCQoJyN6bmMtYWRkUm9vbUJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25BZGRSb29tQ2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjem5jLWVkaXRCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uRWRpdENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI3puYy1yZW1vdmVCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uUmVtb3ZlQ2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjem5jLWFjdGl2YXRlQnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkFjdGl2YXRlQ2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBpbnRlcmZhY2UgYnV0dG9uc1xuXHRcdCQoJyN6bmMtY2FuY2VsQnV0dG9uJykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkNhbmNlbENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI3puYy1yZWxvYWRCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uUmVsb2FkQ2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjem5jLXN1Ym1pdEJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25TdWJtaXRDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBoZWxwIHRvb2x0aXBzXG5cdFx0JCh0aGlzKS5maW5kKCcuY3VzdG9tLXRhYi1jb250ZW50Jykua2VuZG9Ub29sdGlwKHtcblx0XHRcdGZpbHRlcjogJ2lbdGl0bGVdLmhlbHAnLFxuXHRcdFx0cG9zaXRpb246ICdyaWdodCcsXG5cdFx0XHRjb250ZW50OiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdHJldHVybiBgPGRpdiBjbGFzcz1cImhlbHAtdG9vbHRpcFwiPiR7ZS50YXJnZXQuZGF0YSgndGl0bGUnKX08L2Rpdj5gO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBDYWxsIHN1cGVyIG1ldGhvZFxuXHRcdHN1cGVyLmRlc3Ryb3koKTtcblxuXHRcdC8vIFJlbW92ZSB0cmVlIHZpZXcgZG91YmxlY2xpY2sgbGlzdGVuZXJcblx0XHQkKCcjem5jLXRyZWVWaWV3Jykub2ZmKCdkYmxjbGljaycpO1xuXG5cdFx0Ly8gUmVtb3ZlIGxpc3RlbmVyIGZvciBjdXN0b20gYWN0aW9ucyB0cmlnZ2VyZWQgYnkgY29uZmlndXJhdGlvbiBpbnRlcmZhY2Vcblx0XHQkKCcjem5jLXRhYk5hdmlnYXRvcicpLm9mZigndmFsdWUtc2V0Jyk7XG5cblx0XHQvLyBSZW1vdmUgbGlzdGVuZXIgZm9yIHpvbmUvcm9vbSBhY3RpdmF0aW9uIGV2ZW50XG5cdFx0JCgnI3puYy1hZGRab25lQnV0dG9uJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyN6bmMtYWRkUm9vbUJ1dHRvbicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjem5jLWVkaXRCdXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI3puYy1yZW1vdmVCdXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cdFx0JCgnI3puYy1hY3RpdmF0ZUJ1dHRvbicpLm9mZignY2xpY2snKTtcblxuXHRcdC8vIFJlbW92ZSBpbnRlcmZhY2UgYnV0dG9ucyBjbGljayBsaXN0ZW5lcnNcblx0XHQkKCcjem5jLWNhbmNlbEJ1dHRvbicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjem5jLXJlbG9hZEJ1dHRvbicpLm9mZignY2xpY2snKTtcblx0XHQkKCcjem5jLXN1Ym1pdEJ1dHRvbicpLm9mZignY2xpY2snKTtcblxuXHRcdC8vIENsZWFyIHRhYnMgY29udGFpbmVyXG5cdFx0dGhpcy5fY2xlYXJUYWJzKCk7XG5cdH1cblxuXHRvbkV4dGVuc2lvbkNvbW1hbmQoY29tbWFuZCwgZGF0YSlcblx0e1xuXHRcdGNvbnN0IHVzZXJuYW1lID0gZGF0YS5nZXRVdGZTdHJpbmcoJ3VzZXInKTtcblxuXHRcdC8qKioqKiogWk9ORVMgJiBST09NUyAqKioqKiovXG5cblx0XHQvLyBab25lcyAmIHJvb21zIGxpc3QgcmVjZWl2ZWRcblx0XHRpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfWk9ORVMpXG5cdFx0XHR0aGlzLl9wb3B1bGF0ZVRyZWUoZGF0YSk7XG5cblx0XHQvLyBab25lIG9yIHJvb20gY29uZmlndXJhdGlvbiBkYXRhIHJlY2VpdmVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfWk9ORV9DT05GSUcgfHwgY29tbWFuZCA9PSB0aGlzLlJFU1BfUk9PTV9DT05GSUcpXG5cdFx0e1xuXHRcdFx0Ly8gQnVpbGQgdXNlciBpbnRlcmZhY2UgYmFzZWQgb24gcmVjZWl2ZWQgZGF0YVxuXHRcdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlci5idWlsZEludGVyZmFjZShkYXRhLmdldFNGU0FycmF5KCdzZXR0aW5ncycpLCAnem5jLXRhYk5hdmlnYXRvcicsIGZhbHNlKTtcblxuXHRcdFx0Ly8gRW5hYmxlIHNjcm9sbGluZyB0YWJzIChpZiBuZWVkZWQpXG5cdFx0XHRpZiAodGhpcy5fcmVpbml0VGFicylcblx0XHRcdHtcblx0XHRcdFx0JCgnI3puYy10YWJOYXZpZ2F0b3IgI3RhYnMnKS5zY3JvbGxpbmdUYWJzKHtcblx0XHRcdFx0XHRib290c3RyYXBWZXJzaW9uOiA0LFxuXHRcdFx0XHRcdHNjcm9sbFRvVGFiRWRnZTogdHJ1ZSxcblx0XHRcdFx0XHRlbmFibGVTd2lwaW5nOiB0cnVlLFxuXHRcdFx0XHRcdGRpc2FibGVTY3JvbGxBcnJvd3NPbkZ1bGx5U2Nyb2xsZWQ6IHRydWUsXG5cdFx0XHRcdFx0Y3NzQ2xhc3NMZWZ0QXJyb3c6ICdmYSBmYS1jaGV2cm9uLWxlZnQnLFxuXHRcdFx0XHRcdGNzc0NsYXNzUmlnaHRBcnJvdzogJ2ZhIGZhLWNoZXZyb24tcmlnaHQnXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBFbmFibGUgaW50ZXJmYWNlXG5cdFx0XHR0aGlzLl9lbmFibGVDb25maWdJbnRlcmZhY2UodHJ1ZSk7XG5cdFx0fVxuXG5cdFx0LyoqKioqKiBaT05FUyAqKioqKiovXG5cblx0XHQvLyBab25lIGNvbmZpZ3VyYXRpb24gdXBkYXRlIGNvbmZpcm1hdGlvblxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1pPTkVfQ09ORklHX1VQREFURV9DT05GSVJNKVxuXHRcdHtcblx0XHRcdC8vIElmIGEgJ25hbWUnIHBhcmFtZXRlciBpcyByZWNlaXZlZCwgaXQgbWVhbnMgdGhlIHpvbmUgbmFtZSBjaGFuZ2VkLCBhbmQgd2UgaGF2ZSB0byB1cGRhdGUgdGhlIHpvbmVzIGxpc3Rcblx0XHRcdGlmIChkYXRhLmdldFV0ZlN0cmluZygnek5hbWUnKSAhPSBudWxsKVxuXHRcdFx0XHR0aGlzLl91cGRhdGVab25lTmFtZUluTGlzdChkYXRhLmdldEludCgneklkJyksIGRhdGEuZ2V0VXRmU3RyaW5nKCd6TmFtZScpKTtcblxuXHRcdFx0Ly8gSWYgdGhlIGN1cnJlbnQgdXNlciBpcyB0aGUgdXBkYXRlciwgc2hvdyBhIG5vdGlmaWNhdGlvbjsgb3RoZXJ3aXNlLCBzaG93IGEgZGlhbG9nIGJveCBzdWdnZXN0aW5nIHRvIHJlbG9hZFxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdFx0dGhpcy5fZW5hYmxlQ29uZmlnSW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgbW9kaWZpZWQnLCBgWm9uZSBzZXR0aW5ncyB1cGRhdGVkIHN1Y2Nlc3NmdWxseTsgY2hhbmdlcyB3aWxsIGJlIGFwcGxpZWQgb24gbmV4dCA8c3Ryb25nPnNlcnZlciByZXN0YXJ0PC9zdHJvbmc+YCk7XG5cblx0XHRcdFx0Ly8gUmVzZXQgdGhlICdtb2RpZmllZCcgZmxhZ1xuXHRcdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLnJlc2V0SXNNb2RpZmllZCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBBbiBhbGVydCBib3ggaXMgZGlzcGxheWVkIGlmIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBlZGl0aW5nIHRoZSBzYW1lIHpvbmVcblx0XHRcdFx0aWYgKGRhdGEuZ2V0SW50KCd6SWQnKSA9PSB0aGlzLl9lZGl0ZWRab25lSWQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBtb2RpZmllZCB0aGUgWm9uZSB5b3UgYXJlIGN1cnJlbnRseSBlZGl0aW5nOyBwbGVhc2UgcmVsb2FkIHRvIHVwZGF0ZSB5b3VyIHZpZXcuYCk7XG5cblx0XHRcdFx0XHQvLyBEaXNhYmxlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0XHQkKCcjem5jLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0XHRpZiAoZGF0YS5nZXRVdGZTdHJpbmcoJ3pOYW1lJykgIT0gbnVsbClcblx0XHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgcmVuYW1lZCcsIGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBjaGFuZ2VkIHRoZSBuYW1lIG9uIG9uZSBvZiB0aGUgWm9uZXNgKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIE5ldyB6b25lIGFkZGVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfWk9ORV9BRERFRClcblx0XHR7XG5cdFx0XHRjb25zdCB6b25lTmFtZSA9IGRhdGEuZ2V0U0ZTT2JqZWN0KCd6b25lJykuZ2V0VXRmU3RyaW5nKCduYW1lJyk7XG5cblx0XHRcdC8vIElmIHRoZSBjdXJyZW50IHVzZXIgaXMgdGhlIHVwZGF0ZXIsIHJlc2V0IHRoZSBpbnRlcmZhY2U7IG90aGVyd2lzZSwganVzdCBzaG93IGEgbm90aWZpY2F0aW9uXG5cdFx0XHRpZiAodXNlcm5hbWUgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gUmVzZXQgaW50ZXJmYWNlXG5cdFx0XHRcdHRoaXMuX29uQ2FuY2VsQ2xpY2soKTtcblxuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdab25lIGFkZGVkJywgYFpvbmUgJyR7em9uZU5hbWV9JyBjcmVhdGVkIHN1Y2Nlc3NmdWxseWApO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdab25lIGFkZGVkJywgYEFkbWluaXN0cmF0b3IgJHt1c2VybmFtZX0gY3JlYXRlZCBab25lICcke3pvbmVOYW1lfSdgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQWRkIG5ldyB6b25lIHRvIHRyZWVcblx0XHRcdGxldCB6b25lc0RTID0gdGhpcy5fdHJlZXZpZXcuZGF0YVNvdXJjZTtcblx0XHRcdHpvbmVzRFMuYWRkKHRoaXMuX2NyZWF0ZVpvbmVPYmplY3QoZGF0YS5nZXRTRlNPYmplY3QoJ3pvbmUnKSkpO1xuXHRcdFx0em9uZXNEUy5zeW5jKCk7XG5cdFx0fVxuXG5cdFx0Ly8gTmV3IHpvbmUgY3JlYXRpb24gcmVmdXNlZCBkdWUgdG8gaW52YWxpZCB6b25lIG5hbWVcblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9aT05FX1JFRlVTRUQpXG5cdFx0e1xuXHRcdFx0Ly8gUmUtZW5hYmxlIGludGVyZmFjZVxuXHRcdFx0dGhpcy5fZW5hYmxlQ29uZmlnSW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHQvLyBTaG93IHdhcm5pbmdcblx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydCgnWm9uZSBjb25maWd1cmF0aW9uIGNhblxcJ3QgYmUgc2F2ZWQgYmVjYXVzZSBhbm90aGVyIFpvbmUgd2l0aCB0aGUgc2FtZSBuYW1lIGFscmVhZHkgZXhpc3RzLicsIHRydWUpO1xuXHRcdH1cblxuXHRcdC8vIEV4aXN0aW5nIHpvbmUgZGVsZXRlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1pPTkVfREVMRVRFRClcblx0XHR7XG5cdFx0XHQvLyBJZiB0aGUgY3VycmVudCB1c2VyIGlzIHRoZSBkZWxldGVyLCByZXNldCB0aGUgaW50ZXJmYWNlOyBvdGhlcndpc2UsIGp1c3Qgc2hvdyBhIG5vdGlmaWNhdGlvblxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFJlLWVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdFx0dGhpcy5fZW5hYmxlTGlzdEludGVyZmFjZSh0cnVlKTtcblxuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdab25lIHJlbW92ZWQnLCBgWm9uZSAnJHtkYXRhLmdldFV0ZlN0cmluZygnek5hbWUnKX0nIGRlbGV0ZWQgc3VjY2Vzc2Z1bGx5YCk7XG5cdFx0XHR9XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEFuIGFsZXJ0IGJveCBpcyBkaXNwbGF5ZWQgaWYgdGhlIHVzZXIgaXMgY3VycmVudGx5IGVkaXRpbmcgdGhlIHNhbWUgem9uZVxuXHRcdFx0XHRpZiAoZGF0YS5nZXRJbnQoJ3pJZCcpID09IHRoaXMuX2VkaXRlZFpvbmVJZClcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vIFNob3cgYWxlcnRcblx0XHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoYEFkbWluaXN0cmF0b3IgJHt1c2VybmFtZX0gaGFzIGRlbGV0ZWQgdGhlIFpvbmUgeW91IGFyZSBjdXJyZW50bHkgbW9kaWZ5aW5nOyB5b3UgaGF2ZSB0byBjYW5jZWwgeW91ciBlZGl0aW5nLmApO1xuXG5cdFx0XHRcdFx0Ly8gRGlzYWJsZSBzdWJtaXQgYW5kIHJlbG9hZCBidXR0b25zXG5cdFx0XHRcdFx0JCgnI3puYy1yZWxvYWRCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0XHRcdCQoJyN6bmMtc3VibWl0QnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgcmVtb3ZlZCcsIGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGRlbGV0ZWQgWm9uZSAnJHtkYXRhLmdldFV0ZlN0cmluZygnek5hbWUnKX0nYCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVzZXQgc2VsZWN0aW9uIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbSBvciBpdHMgcGFyZW50IGlzIGJlaW5nIHJlbW92ZWRcblx0XHRcdGxldCBzZWxlY3RlZE5vZGUgPSB0aGlzLl90cmVldmlldy5zZWxlY3QoKTtcblx0XHRcdGxldCBzZWxlY3RlZERhdGFJdGVtID0gdGhpcy5fdHJlZXZpZXcuZGF0YUl0ZW0oc2VsZWN0ZWROb2RlKTtcblx0XHRcdGlmIChzZWxlY3RlZERhdGFJdGVtKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoc2VsZWN0ZWREYXRhSXRlbS50eXBlID09IHRoaXMuSVRFTV9UWVBFX1pPTkUgJiYgc2VsZWN0ZWREYXRhSXRlbS5pZCA9PSBkYXRhLmdldEludCgneklkJykpXG5cdFx0XHRcdFx0dGhpcy5fZGVzZWxlY3RUcmVlSXRlbSgpO1xuXG5cdFx0XHRcdGlmIChzZWxlY3RlZERhdGFJdGVtLnR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfUk9PTSlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGxldCBwYXJlbnREYXRhSXRlbSA9IHRoaXMuX3RyZWV2aWV3LmRhdGFJdGVtKHRoaXMuX3RyZWV2aWV3LnBhcmVudChzZWxlY3RlZE5vZGUpKTtcblxuXHRcdFx0XHRcdGlmIChwYXJlbnREYXRhSXRlbS5pZCA9PSBkYXRhLmdldEludCgneklkJykpXG5cdFx0XHRcdFx0XHR0aGlzLl9kZXNlbGVjdFRyZWVJdGVtKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVtb3ZlIHpvbmUgZnJvbSB0cmVlXG5cdFx0XHRsZXQgZGF0YUl0ZW0gPSB0aGlzLl9nZXRab25lRGF0YUl0ZW1CeUlkKGRhdGEuZ2V0SW50KCd6SWQnKSk7XG5cdFx0XHRsZXQgem9uZXNEUyA9IHRoaXMuX3RyZWV2aWV3LmRhdGFTb3VyY2U7XG5cdFx0XHR6b25lc0RTLnJlbW92ZShkYXRhSXRlbSk7XG5cdFx0XHR6b25lc0RTLnN5bmMoKTtcblx0XHR9XG5cblx0XHQvLyBab25lIGFjdGl2YXRlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1pPTkVfQUNUSVZBVEVEKVxuXHRcdHtcblx0XHRcdC8vIFNldCB6b25lIGFjdGl2YXRpb24gc3RhdHVzXG5cdFx0XHRjb25zdCB6b25lTmFtZSA9IHRoaXMuX3NldFpvbmVBY3RpdmF0aW9uU3RhdHVzKGRhdGEuZ2V0SW50KCd6SWQnKSwgZGF0YS5nZXRVdGZTdHJpbmcoJ2FjdFJvb21zJyksIHRydWUpO1xuXG5cdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgYWN0aXZhdGVkJywgYFpvbmUgJyR7em9uZU5hbWV9JyBhY3RpdmF0ZWQgc3VjY2Vzc2Z1bGx5YCk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1pvbmUgYWN0aXZhdGVkJywgYEFkbWluaXN0cmF0b3IgJHt1c2VybmFtZX0gYWN0aXZhdGVkIFpvbmUgJyR7em9uZU5hbWV9J2ApO1xuXHRcdH1cblxuXHRcdC8vIFpvbmUgYWN0aXZhdGlvbiBlcnJvclxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1pPTkVfQUNUSVZBVElPTl9FUlJPUilcblx0XHR7XG5cdFx0XHQvLyBTZXQgem9uZSBhY3RpdmF0aW9uIHN0YXR1c1xuXHRcdFx0dGhpcy5fc2V0Wm9uZUFjdGl2YXRpb25TdGF0dXMoZGF0YS5nZXRJbnQoJ3pJZCcpLCAnJywgZmFsc2UpO1xuXG5cdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoZGF0YS5nZXRVdGZTdHJpbmcoJ2Vycm9yJyksIHRydWUpO1xuXHRcdH1cblxuXHRcdC8qKioqKiogUk9PTVMgKioqKioqL1xuXG5cdFx0Ly8gUm9vbSBjb25maWd1cmF0aW9uIHVwZGF0ZSBjb25maXJtYXRpb25cblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9ST09NX0NPTkZJR19VUERBVEVfQ09ORklSTSlcblx0XHR7XG5cdFx0XHRpZiAoZGF0YS5nZXRVdGZTdHJpbmcoJ3JOYW1lJykgIT0gbnVsbClcblx0XHRcdFx0dGhpcy5fdXBkYXRlUm9vbU5hbWVJbkxpc3QoZGF0YS5nZXRJbnQoJ3pJZCcpLCBkYXRhLmdldEludCgncklkJyksIGRhdGEuZ2V0VXRmU3RyaW5nKCdyTmFtZScpKTtcblxuXHRcdFx0Ly8gSWYgdGhlIGN1cnJlbnQgdXNlciBpcyB0aGUgdXBkYXRlciwgc2hvdyBhIG5vdGlmaWNhdGlvbjsgb3RoZXJ3aXNlLCBzaG93IGEgZGlhbG9nIGJveCBzdWdnZXN0aW5nIHRvIHJlbG9hZFxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdFx0dGhpcy5fZW5hYmxlQ29uZmlnSW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1Jvb20gbW9kaWZpZWQnLCBgUm9vbSBzZXR0aW5ncyB1cGRhdGVkIHN1Y2Nlc3NmdWxseTsgY2hhbmdlcyB3aWxsIGJlIGFwcGxpZWQgb24gbmV4dCA8c3Ryb25nPnNlcnZlciByZXN0YXJ0PC9zdHJvbmc+YCk7XG5cblx0XHRcdFx0Ly8gUmVzZXQgdGhlICdtb2RpZmllZCcgZmxhZ1xuXHRcdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLnJlc2V0SXNNb2RpZmllZCgpO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBBbiBhbGVydCBib3ggaXMgZGlzcGxheWVkIGlmIHRoZSB1c2VyIGlzIGN1cnJlbnRseSBlZGl0aW5nIHRoZSBzYW1lIHJvb21cblx0XHRcdFx0aWYgKGRhdGEuZ2V0SW50KCdySWQnKSA9PSB0aGlzLl9lZGl0ZWRSb29tSWQpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGhhcyBtb2RpZmllZCB0aGUgUm9vbSB5b3UgYXJlIGN1cnJlbnRseSBlZGl0aW5nOyBwbGVhc2UgcmVsb2FkIHRvIHVwZGF0ZSB5b3VyIHZpZXcuYCk7XG5cblx0XHRcdFx0XHQvLyBEaXNhYmxlIHN1Ym1pdCBidXR0b25cblx0XHRcdFx0XHQkKCcjem5jLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0XHRpZiAoZGF0YS5nZXRVdGZTdHJpbmcoJ3JOYW1lJykgIT0gbnVsbCkgLy8gVE9ETyBPbmx5IHNob3cgaWYgcGFyZW50IG5vZGUgaXMgZXhwYW5kZWQ/XG5cdFx0XHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdSb29tIHJlbmFtZWQnLCBgQWRtaW5pc3RyYXRvciAke3VzZXJuYW1lfSBoYXMgY2hhbmdlZCB0aGUgbmFtZSBvbiBvbmUgb2YgdGhlIFJvb21zYCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBOZXcgcm9vbSBhZGRlZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1JPT01fQURERUQpXG5cdFx0e1xuXHRcdFx0Y29uc3Qgcm9vbURhdGEgPSBkYXRhLmdldFNGU09iamVjdCgncm9vbScpO1xuXHRcdFx0Y29uc3Qgem9uZUlkID0gZGF0YS5nZXRJbnQoJ3pJZCcpO1xuXG5cdFx0XHRsZXQgem9uZXNEUyA9IHRoaXMuX3RyZWV2aWV3LmRhdGFTb3VyY2U7XG5cdFx0XHRsZXQgem9uZUl0ZW0gPSB6b25lc0RTLmdldCh6b25lSWQpO1xuXG5cdFx0XHQvLyBJZiB0aGUgY3VycmVudCB1c2VyIGlzIHRoZSB1cGRhdGVyLCByZXNldCB0aGUgaW50ZXJmYWNlOyBvdGhlcndpc2UsIGp1c3Qgc2hvdyBhIG5vdGlmaWNhdGlvblxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFJlc2V0IGludGVyZmFjZVxuXHRcdFx0XHR0aGlzLl9vbkNhbmNlbENsaWNrKCk7XG5cblx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd05vdGlmaWNhdGlvbignUm9vbSBhZGRlZCcsIGBSb29tICcke3Jvb21EYXRhLmdldFV0ZlN0cmluZygnbmFtZScpfScgY3JlYXRlZCBzdWNjZXNzZnVsbHlgKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Ly8gRGlzcGxheSBub3RpZmljYXRpb25cblx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd05vdGlmaWNhdGlvbignUm9vbSBhZGRlZCcsIGBBZG1pbmlzdHJhdG9yICR7dXNlcm5hbWV9IGNyZWF0ZWQgUm9vbSAnJHtyb29tRGF0YS5nZXRVdGZTdHJpbmcoJ25hbWUnKX0nIGluIFpvbmUgJyR7em9uZUl0ZW0ubmFtZX0nYCk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFkZCBuZXcgcm9vbSB0byB0cmVlXG5cdFx0XHR6b25lSXRlbS5jaGlsZHJlbi5hZGQodGhpcy5fY3JlYXRlUm9vbU9iamVjdChyb29tRGF0YSwgem9uZUlkKSk7XG5cdFx0XHR6b25lc0RTLnN5bmMoKTtcblx0XHR9XG5cblx0XHQvLyBOZXcgcm9vbSBjcmVhdGlvbiByZWZ1c2VkIGR1ZSB0byBpbnZhbGlkIHJvb20gbmFtZVxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1JPT01fUkVGVVNFRClcblx0XHR7XG5cdFx0XHQvLyBSZS1lbmFibGUgaW50ZXJmYWNlXG5cdFx0XHR0aGlzLl9lbmFibGVDb25maWdJbnRlcmZhY2UodHJ1ZSk7XG5cblx0XHRcdC8vIFNob3cgd2FybmluZ1xuXHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KCdSb29tIGNvbmZpZ3VyYXRpb24gY2FuXFwndCBiZSBzYXZlZCBiZWNhdXNlIGFub3RoZXIgUm9vbSB3aXRoIHRoZSBzYW1lIG5hbWUgYWxyZWFkeSBleGlzdHMuJywgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0Ly8gRXhpc3Rpbmcgcm9vbSBkZWxldGVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfUk9PTV9ERUxFVEVEKVxuXHRcdHtcblx0XHRcdGxldCB6b25lSXRlbSA9IHRoaXMuX2dldFpvbmVEYXRhSXRlbUJ5SWQoZGF0YS5nZXRJbnQoJ3pJZCcpKTtcblx0XHRcdGxldCByb29tSXRlbSA9IHRoaXMuX2dldFJvb21EYXRhSXRlbUJ5SWQoZGF0YS5nZXRJbnQoJ3pJZCcpLCBkYXRhLmdldEludCgncklkJykpO1xuXG5cdFx0XHQvLyBJZiB0aGUgY3VycmVudCB1c2VyIGlzIHRoZSBkZWxldGVyLCByZXNldCB0aGUgaW50ZXJmYWNlOyBvdGhlcndpc2UsIGp1c3Qgc2hvdyBhIG5vdGlmaWNhdGlvblxuXHRcdFx0aWYgKHVzZXJuYW1lID09IHRoaXMuc21hcnRGb3gubXlTZWxmLm5hbWUpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIFJlLWVuYWJsZSBpbnRlcmZhY2Vcblx0XHRcdFx0dGhpcy5fZW5hYmxlTGlzdEludGVyZmFjZSh0cnVlKTtcblxuXHRcdFx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdSb29tIHJlbW92ZWQnLCBgUm9vbSAnJHtyb29tSXRlbS5uYW1lfScgZGVsZXRlZCBzdWNjZXNzZnVsbHlgKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Ly8gQW4gYWxlcnQgYm94IGlzIGRpc3BsYXllZCBpZiB0aGUgdXNlciBpcyBjdXJyZW50bHkgZWRpdGluZyB0aGUgc2FtZSByb29tXG5cdFx0XHRcdGlmIChkYXRhLmdldEludCgncklkJykgPT0gdGhpcy5fZWRpdGVkUm9vbUlkKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0Ly8gU2hvdyBhbGVydFxuXHRcdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dTaW1wbGVBbGVydChgQWRtaW5pc3RyYXRvciAke3VzZXJuYW1lfSBoYXMgZGVsZXRlZCB0aGUgUm9vbSB5b3UgYXJlIGN1cnJlbnRseSBtb2RpZnlpbmc7IHlvdSBoYXZlIHRvIGNhbmNlbCB5b3VyIGVkaXRpbmcuYCk7XG5cblx0XHRcdFx0XHQvLyBEaXNhYmxlIHN1Ym1pdCBhbmQgcmVsb2FkIGJ1dHRvbnNcblx0XHRcdFx0XHQkKCcjem5jLXJlbG9hZEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0JCgnI3puYy1zdWJtaXRCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd05vdGlmaWNhdGlvbignUm9vbSByZW1vdmVkJywgYEFkbWluaXN0cmF0b3IgJHt1c2VybmFtZX0gZGVsZXRlZCBSb29tICcke3Jvb21JdGVtLm5hbWV9JyBmcm9tIFpvbmUgJyR7em9uZUl0ZW0ubmFtZX0nYCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gUmVzZXQgc2VsZWN0aW9uIGlmIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgaXRlbSBvciBpdHMgcGFyZW50IGlzIGJlaW5nIHJlbW92ZWRcblx0XHRcdGxldCBzZWxlY3RlZE5vZGUgPSB0aGlzLl90cmVldmlldy5zZWxlY3QoKTtcblx0XHRcdGxldCBzZWxlY3RlZERhdGFJdGVtID0gdGhpcy5fdHJlZXZpZXcuZGF0YUl0ZW0oc2VsZWN0ZWROb2RlKTtcblx0XHRcdGlmIChzZWxlY3RlZERhdGFJdGVtKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoc2VsZWN0ZWREYXRhSXRlbS50eXBlID09IHRoaXMuSVRFTV9UWVBFX1JPT00gJiYgc2VsZWN0ZWREYXRhSXRlbS5pZCA9PSBkYXRhLmdldEludCgncklkJykpXG5cdFx0XHRcdFx0dGhpcy5fZGVzZWxlY3RUcmVlSXRlbSgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBSZW1vdmUgcm9vbSBmcm9tIHRyZWVcblx0XHRcdHpvbmVJdGVtLmNoaWxkcmVuLnJlbW92ZShyb29tSXRlbSk7XG5cdFx0XHR0aGlzLl90cmVldmlldy5kYXRhU291cmNlLnN5bmMoKTtcblx0XHR9XG5cblx0XHQvLyBlbHNlIGlmICgpXG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBVSSBFVkVOVCBMSVNURU5FUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRfb25UcmVlSXRlbURvdWJsZUNsaWNrKGUpXG5cdHtcblx0XHQvLyBHZXQgZXZlbnQgdGFyZ2V0J3MgY2xvc2VzdCB0cmVlIG5vZGVcblx0XHRsZXQgdHJlZU5vZGUgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KCcuay1pdGVtW3JvbGU9dHJlZWl0ZW1dJyk7XG5cblx0XHQvLyBHZXQgYXNzb2NpYXRlZCBkYXRhIGl0ZW1cblx0XHRsZXQgZGF0YUl0ZW0gPSB0aGlzLl90cmVldmlldy5kYXRhSXRlbSh0cmVlTm9kZSk7XG5cblx0XHQvLyBMb2FkIGNvbmZpZ3VyYXRpb25cblx0XHR0aGlzLl9sb2FkQ29uZmlndXJhdGlvbihkYXRhSXRlbS50eXBlKTtcblx0fVxuXG5cdF9vblpvbmVSb29tQ2hhbmdlKClcblx0e1xuXHRcdC8vIFJlc2V0IHV0aWxpdHkgYnV0dG9uc1xuXHRcdHRoaXMuX3NldFV0aWxpdHlCdXR0b25zU3RhdGUodGhpcy5fc2VsZWN0ZWRJdGVtKTtcblx0fVxuXG5cdC8vIFV0aWxpdHkgYnV0dG9ucyBsaXN0ZW5lcnNcblxuXHRfb25BZGRab25lQ2xpY2soKVxuXHR7XG5cdFx0Ly8gRGVzZWxlY3QgbGlzdCBpdGVtXG5cdFx0dGhpcy5fZGVzZWxlY3RUcmVlSXRlbSgpO1xuXG5cdFx0Ly8gTG9hZCBjb25maWd1cmF0aW9uXG5cdFx0dGhpcy5fbG9hZENvbmZpZ3VyYXRpb24odGhpcy5JVEVNX1RZUEVfWk9ORSk7XG5cdH1cblxuXHRfb25BZGRSb29tQ2xpY2soKVxuXHR7XG5cdFx0Ly8gU2VsZWN0IHBhcmVudCBsaXN0IGl0ZW1cblx0XHR0aGlzLl9zZWxlY3RQYXJlbnRUcmVlSXRlbSgpO1xuXG5cdFx0Ly8gTG9hZCBjb25maWd1cmF0aW9uXG5cdFx0dGhpcy5fbG9hZENvbmZpZ3VyYXRpb24odGhpcy5JVEVNX1RZUEVfUk9PTSk7XG5cdH1cblxuXHRfb25FZGl0Q2xpY2soKVxuXHR7XG5cdFx0Ly8gTG9hZCBjb25maWd1cmF0aW9uXG5cdFx0dGhpcy5fbG9hZENvbmZpZ3VyYXRpb24odGhpcy5fc2VsZWN0ZWRJdGVtLnR5cGUpO1xuXHR9XG5cblx0X29uUmVtb3ZlQ2xpY2soKVxuXHR7XG5cdFx0dGhpcy5zaGVsbEN0cmwuc2hvd0NvbmZpcm1XYXJuaW5nKGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlIHRoZSBzZWxlY3RlZCAke3RoaXMuX3NlbGVjdGVkSXRlbS50eXBlID09IHRoaXMuSVRFTV9UWVBFX1pPTkUgPyAnWm9uZScgOiAnUm9vbSd9IGNvbmZpZ3VyYXRpb24/YCwgJC5wcm94eSh0aGlzLl9vblJlbW92ZUNvbmZpcm0sIHRoaXMpKTtcblx0fVxuXG5cdF9vblJlbW92ZUNvbmZpcm0oKVxuXHR7XG5cdFx0Ly8gRGlzYWJsZSB6b25lL3Jvb20gc2VsZWN0aW9uIGxpc3Rcblx0XHR0aGlzLl9lbmFibGVMaXN0SW50ZXJmYWNlKGZhbHNlKTtcblxuXHRcdGxldCBwYXJhbXMgPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cblx0XHQvLyBSZXF1ZXN0IHpvbmUgcmVtb3ZhbFxuXHRcdGlmICh0aGlzLl9zZWxlY3RlZEl0ZW0udHlwZSA9PSB0aGlzLklURU1fVFlQRV9aT05FKVxuXHRcdHtcblx0XHRcdHBhcmFtcy5wdXRJbnQoJ3pJZCcsIHRoaXMuX3NlbGVjdGVkSXRlbS5pZCk7XG5cdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0RFTEVURV9aT05FX0NPTkZJRywgcGFyYW1zKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdHBhcmFtcy5wdXRJbnQoJ3pJZCcsIHRoaXMuX3NlbGVjdGVkSXRlbVBhcmVudC5pZCk7XG5cdFx0XHRwYXJhbXMucHV0SW50KCdySWQnLCB0aGlzLl9zZWxlY3RlZEl0ZW0uaWQpO1xuXHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9ERUxFVEVfUk9PTV9DT05GSUcsIHBhcmFtcyk7XG5cdFx0fVxuXHR9XG5cblx0X29uQWN0aXZhdGVDbGljaygpXG5cdHtcblx0XHQvLyBHZXQgc2VsZWN0ZWQgZGF0YSBpdGVtXG5cdFx0aWYgKHRoaXMuX3NlbGVjdGVkSXRlbS50eXBlID09IHRoaXMuSVRFTV9UWVBFX1pPTkUpXG5cdFx0e1xuXHRcdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRcdHBhcmFtcy5wdXRJbnQoJ3pJZCcsIHRoaXMuX3NlbGVjdGVkSXRlbS5pZCk7XG5cblx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfQUNUSVZBVEVfWk9ORSwgcGFyYW1zKTtcblx0XHR9XG5cdH1cblxuXHQvLyBDb25maWd1cmF0aW9uIGJ1dHRvbnMgbGlzdGVuZXJzXG5cblx0X29uQ2FuY2VsQ2xpY2soKVxuXHR7XG5cdFx0Ly8gRW5hYmxlIHpvbmUvcm9vbSBzZWxlY3Rpb24gbGlzdHNcblx0XHR0aGlzLl9lbmFibGVMaXN0SW50ZXJmYWNlKHRydWUpO1xuXG5cdFx0Ly8gRGlzYWJsZSBjb25maWd1cmF0aW9uIGludGVyZmFjZVxuXHRcdHRoaXMuX2VuYWJsZUNvbmZpZ0ludGVyZmFjZShmYWxzZSk7XG5cblx0XHQvLyBDbGVhciBtYWluIGNvbnRhaW5lclxuXHRcdHRoaXMuX3Jlc2V0VGFic0NvbnRhaW5lcihmYWxzZSwgdHJ1ZSk7XG5cblx0XHQvLyBTZXQgaXNFZGl0aW5nIGZsYWdcblx0XHR0aGlzLl9pc0VkaXRpbmcgPSBmYWxzZTtcblx0XHR0aGlzLl9lZGl0ZWRJdGVtVHlwZSA9ICcnO1xuXG5cdFx0Ly8gU3dpdGNoIHBhbmVsXG5cdFx0dGhpcy5fc3dpdGNoUGFuZWwoJ3puYy1zaWRlYmFyUGFuZWwnKTtcblx0fVxuXG5cdF9vblJlbG9hZENsaWNrKClcblx0e1xuXHRcdC8vIEhpZGUgdmFsaWRhdGlvbiBtZXNzYWdlc1xuXHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIucmVzZXRWYWxpZGF0aW9uKCk7XG5cblx0XHQvLyBSZWxvYWQgY29uZmlndXJhdGlvblxuXHRcdHRoaXMuX2xvYWRDb25maWd1cmF0aW9uKHRoaXMuX2VkaXRlZEl0ZW1UeXBlLCBmYWxzZSk7XG5cdH1cblxuXHRfb25TdWJtaXRDbGljaygpXG5cdHtcblx0XHQvLyBDaGVjayB2YWxpZGl0eVxuXHRcdGlmICh0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmNoZWNrSXNWYWxpZCgpKVxuXHRcdHtcblx0XHRcdGxldCBjaGFuZ2VzID0gdGhpcy5faW50ZXJmYWNlQnVpbGRlci5nZXRDaGFuZ2VkRGF0YSgpO1xuXG5cdFx0XHRpZiAoY2hhbmdlcy5zaXplKCkgPiAwKVxuXHRcdFx0e1xuXHRcdFx0XHQvL2NvbnNvbGUubG9nKGNoYW5nZXMuZ2V0RHVtcCgpKVxuXG5cdFx0XHRcdC8vIEluIGNhc2UgdGhlIHpvbmUvcm9vbSBuYW1lIGNoYW5nZWQsIGNoZWNrIGl0IGFnYWluc3QgdGhlIGxpc3QgKGR1cGxpY2F0ZSBuYW1lcyBub3QgYWxsb3dlZCEpXG5cdFx0XHRcdGlmICh0aGlzLl92YWxpZGF0ZU5hbWUoY2hhbmdlcykpXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBEaXNhYmxlIGNvbmZpZ3VyYXRpb24gaW50ZXJmYWNlXG5cdFx0XHRcdFx0dGhpcy5fZW5hYmxlQ29uZmlnSW50ZXJmYWNlKGZhbHNlKTtcblxuXHRcdFx0XHRcdC8vIFNlbmQgc2V0dGluZ3MgdG8gc2VydmVyIGluc3RhbmNlXG5cdFx0XHRcdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRcdFx0XHRwYXJhbXMucHV0U0ZTQXJyYXkoJ3NldHRpbmdzJywgY2hhbmdlcyk7XG5cdFx0XHRcdFx0cGFyYW1zLnB1dEJvb2woJ2JhY2t1cCcsICQoJyN6bmMtYmFja3VwQ2hlY2snKS5wcm9wKCdjaGVja2VkJykpO1xuXHRcdFx0XHRcdHBhcmFtcy5wdXRJbnQoJ3pJZCcsIHRoaXMuX2VkaXRlZFpvbmVJZCk7XG5cdFx0XHRcdFx0cGFyYW1zLnB1dEludCgncklkJywgdGhpcy5fZWRpdGVkUm9vbUlkKTtcblxuXHRcdFx0XHRcdGlmICh0aGlzLl9lZGl0ZWRJdGVtVHlwZSA9PSB0aGlzLklURU1fVFlQRV9aT05FKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdC8vIFN1Ym1pdCB6b25lIHNldHRpbmdzXG5cdFx0XHRcdFx0XHRpZiAodGhpcy5fZWRpdGVkWm9uZUlkID4gLTEpXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfU0FWRV9aT05FX0NPTkZJRywgcGFyYW1zKTtcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9ORVdfWk9ORV9DT05GSUcsIHBhcmFtcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHQvLyBTdWJtaXQgcm9vbSBzZXR0aW5nc1xuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2VkaXRlZFJvb21JZCA+IC0xKVxuXHRcdFx0XHRcdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX1NBVkVfUk9PTV9DT05GSUcsIHBhcmFtcyk7XG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfTkVXX1JPT01fQ09ORklHLCBwYXJhbXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KGBVbmFibGUgdG8gc3VibWl0IGNvbmZpZ3VyYXRpb24gYmVjYXVzZSB0aGUgJHtjYXBpdGFsaXplRmlyc3QodGhpcy5fZWRpdGVkSXRlbVR5cGUpfSBuYW1lIGFscmVhZHkgZXhpc3RzOyBkdXBsaWNhdGUgbmFtZXMgYXJlIG5vdCBhbGxvd2VkLmAsIHRydWUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoJ1VuYWJsZSB0byBzdWJtaXQgY29uZmlndXJhdGlvbiBjaGFuZ2VzIGR1ZSB0byBhbiBpbnZhbGlkIHZhbHVlOyBwbGVhc2UgdmVyaWZ5IHRoZSBoaWdobGlnaHRlZCBmb3JtIGZpZWxkcyBpbiBhbGwgdGFicy4nLCB0cnVlKTtcblx0XHR9XG5cdH1cblxuXHRfb25Db25maWdWYWx1ZVNldChlKSAvLyBTQU1FIE1FVEhPRCBEVVBMSUNBVEVEIElOIHpvbmUtbW9uaXRvci5qc1xuXHR7XG5cdFx0Y29uc3QgY29uZmlnUGFyYW0gPSBlLnRhcmdldC5kYXRhO1xuXG5cdFx0Ly8gSGFuZGxlIGV4dGVuc2lvbiBuYW1lL3R5cGUgZHJvcGRvd25zIHVwZGF0ZSBhbmQgdXBkYXRlIHRoZSBtYWluIGNsYXNzIGRyb3Bkb3duIGRhdGFzb3VyY2UgYWNjb3JkaW5nbHlcblx0XHRpZiAoY29uZmlnUGFyYW0ubmFtZSA9PSAnZXh0ZW5zaW9uLm5hbWUnIHx8IGNvbmZpZ1BhcmFtLm5hbWUgPT0gJ2V4dGVuc2lvbi50eXBlJyB8fCBjb25maWdQYXJhbS5uYW1lID09ICdleHRlbnNpb24uZmlsdGVyQ2xhc3MnKVxuXHRcdHtcblx0XHRcdC8vIEFsbCBpbnZvbHZlZCBDb25maWdGb3JtSXRlbXMgbXVzdCBiZSBhdmFpbGFibGUgYW5kIGluaXRpYWxpemVkIHRvIHByb2NlZWRcblx0XHRcdGNvbnN0IG5hbWVGb3JtSXRlbSA9IHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZ2V0Q29uZmlnRm9ybUl0ZW0oJ2V4dGVuc2lvbi5uYW1lJyk7XG5cdFx0XHRjb25zdCB0eXBlRm9ybUl0ZW0gPSB0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmdldENvbmZpZ0Zvcm1JdGVtKCdleHRlbnNpb24udHlwZScpO1xuXHRcdFx0Y29uc3QgY2xhc3NGb3JtSXRlbSA9IHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZ2V0Q29uZmlnRm9ybUl0ZW0oJ2V4dGVuc2lvbi5maWxlJyk7XG5cdFx0XHRjb25zdCBmaWx0ZXJGb3JtSXRlbSA9IHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZ2V0Q29uZmlnRm9ybUl0ZW0oJ2V4dGVuc2lvbi5maWx0ZXJDbGFzcycpO1xuXG5cdFx0XHRpZiAobmFtZUZvcm1JdGVtICE9IG51bGwgJiYgdHlwZUZvcm1JdGVtICE9IG51bGwgJiYgY2xhc3NGb3JtSXRlbSAhPSBudWxsICYmIGZpbHRlckZvcm1JdGVtICE9IG51bGwpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbnN0IHNvdXJjZSA9IG5hbWVGb3JtSXRlbS5kYXRhO1xuXHRcdFx0XHRsZXQgY2xhc3Nlc0xpc3QgPSBbXTtcblxuXHRcdFx0XHRsZXQgZGF0YSA9IHNvdXJjZS50cmlnZ2VyRGF0YTtcblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLnNpemUoKTsgaSsrKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGV0IGV4dCA9IGRhdGEuZ2V0U0ZTT2JqZWN0KGkpO1xuXG5cdFx0XHRcdFx0aWYgKGV4dC5nZXRVdGZTdHJpbmcoJ25hbWUnKSA9PSBuYW1lRm9ybUl0ZW0uZGF0YS52YWx1ZSAmJiBleHQuZ2V0VXRmU3RyaW5nKCd0eXBlJykgPT0gdHlwZUZvcm1JdGVtLmRhdGEudmFsdWUpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0bGV0IGNsYXNzZXMgPSBleHQuZ2V0VXRmU3RyaW5nKCdjbGFzc2VzU3RyaW5nJykuc3BsaXQoJywnKTtcblxuXHRcdFx0XHRcdFx0aWYgKGZpbHRlckZvcm1JdGVtLmRhdGEudmFsdWUgPT0gdHJ1ZSlcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0bGV0IGZpbHRlcmVkQ2xhc3NlcyA9IGNsYXNzZXMuZmlsdGVyKGZpbHRlckNsYXNzTmFtZSk7XG5cdFx0XHRcdFx0XHRcdGNsYXNzZXMgPSBmaWx0ZXJlZENsYXNzZXM7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGNsYXNzZXNMaXN0ID0gY2xhc3Nlc0xpc3QuY29uY2F0KGNsYXNzZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCBjdXJyZW50Q2xhc3MgPSBjbGFzc0Zvcm1JdGVtLmRhdGEudmFsdWU7XG5cblx0XHRcdFx0Ly8gSWYgdGhlIGNsYXNzZXMgbGlzdCBkb2Vzbid0IGNvbnRhaW4gdGhlIGN1cnJlbnQgdmFsdWUsIGNyZWF0ZSBhbiBlbXB0eSBlbnRyeSBhbmQgcmVzZXQgdGhlIHZhbHVlXG5cdFx0XHRcdGlmIChjbGFzc2VzTGlzdC5pbmRleE9mKGN1cnJlbnRDbGFzcykgPCAwKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYgKGNsYXNzZXNMaXN0Lmxlbmd0aCA9PSAwKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGNsYXNzZXNMaXN0LnB1c2goJycpO1xuXHRcdFx0XHRcdFx0Y3VycmVudENsYXNzID0gJyc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGN1cnJlbnRDbGFzcyA9IGNsYXNzZXNMaXN0WzBdO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IG1haW5DbGFzc0Ryb3BEb3duID0gY2xhc3NGb3JtSXRlbS5faW5uZXJXaWRnZXQ7XG5cdFx0XHRcdG1haW5DbGFzc0Ryb3BEb3duLnNldERhdGFTb3VyY2UoY2xhc3Nlc0xpc3QpO1xuXG5cdFx0XHRcdGNsYXNzRm9ybUl0ZW0uZGF0YS52YWx1ZSA9IGN1cnJlbnRDbGFzcztcblx0XHRcdFx0Y2xhc3NGb3JtSXRlbS5fc2V0V2lkZ2V0VmFsdWUoKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIE1FVEhPRFNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRfZW5hYmxlTGlzdEludGVyZmFjZShlbmFibGVkKVxuXHR7XG5cdFx0JCgnI3puYy11dGlsQnV0dG9ucycpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZWQpO1xuXHRcdCQoJyN6bmMtdHJlZVZpZXcnKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGVkKTtcblx0fVxuXG5cdF9zZXRVdGlsaXR5QnV0dG9uc1N0YXRlKGRhdGFJdGVtID0gbnVsbClcblx0e1xuXHRcdGxldCBkaXNhYmxlID0gdHJ1ZTtcblxuXHRcdGlmIChkYXRhSXRlbSlcblx0XHR7XG5cdFx0XHQvLyBFbmFibGUgJ2FjdGl2YXRlIHpvbmUnIGJ1dHRvbiBpZiB6b25lIGlzIGluYWN0aXZlXG5cdFx0XHQkKCcjem5jLWFjdGl2YXRlQnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCAoZGF0YUl0ZW0udHlwZSAhPSB0aGlzLklURU1fVFlQRV9aT05FIHx8IGRhdGFJdGVtLmFjdGl2ZSkpO1xuXG5cdFx0XHRkaXNhYmxlID0gZmFsc2U7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvLyBEaXNhYmxlICdhY3RpdmF0ZSB6b25lJyBidXR0b25cblx0XHRcdCQoJyN6bmMtYWN0aXZhdGVCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdH1cblxuXHRcdC8vIEVuYWJsZS9kaXNhYmxlIG90aGVyIHV0aWxpdHkgYnV0dG9uc1xuXHRcdCQoJyN6bmMtYWRkWm9uZUJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpOyAvLyBBbHdheXMgZW5hYmxlZFxuXHRcdCQoJyN6bmMtYWRkUm9vbUJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgZGlzYWJsZSk7XG5cdFx0JCgnI3puYy1lZGl0QnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCBkaXNhYmxlKTtcblx0XHQkKCcjem5jLXJlbW92ZUJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgZGlzYWJsZSk7XG5cdH1cblxuXHRfZW5hYmxlQ29uZmlnSW50ZXJmYWNlKGVuYWJsZWQpXG5cdHtcblx0XHQkKCcjem5jLWNhbmNlbEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZWQpO1xuXHRcdCQoJyN6bmMtcmVsb2FkQnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlZCk7XG5cdFx0JCgnI3puYy1zdWJtaXRCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGVkKTtcblx0XHQkKCcjem5jLWJhY2t1cENoZWNrJykuYXR0cignZGlzYWJsZWQnLCAhZW5hYmxlZCk7XG5cblx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmRpc2FibGVJbnRlcmZhY2UoIWVuYWJsZWQpO1xuXG5cdFx0Ly8gQWxzbyBzd2l0Y2ggdmlldyB3aGVuIGVuYWJsZWRcblx0XHRpZiAoZW5hYmxlZClcblx0XHRcdHRoaXMuX3N3aXRjaFZpZXcoJ3puYy1tYWluJyk7XG5cdH1cblxuXHRfc3dpdGNoVmlldyh2aWV3SWQpXG5cdHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnem5jLXZpZXdzdGFjaycpLnNlbGVjdGVkRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZXdJZCk7XG5cdH1cblxuXHRfY2xlYXJUYWJzKClcblx0e1xuXHRcdC8vIERlc3Ryb3kgc2Nyb2xsaW5nIHRhYnNcblx0XHQkKCcjem5jLXRhYk5hdmlnYXRvciAjdGFicycpLnNjcm9sbGluZ1RhYnMoJ2Rlc3Ryb3knKTtcblxuXHRcdC8vIFJlbW92ZSBhbGwgdGFiIG5hdmlnYXRvciBjb250ZW50XG5cdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlci5kZXN0cm95SW50ZXJmYWNlKCk7XG5cblx0XHQvLyBTZXQgZmxhZyB0byByZS1pbml0aWFsaXplIHRhYnMgaWYgbmVlZGVkXG5cdFx0dGhpcy5fcmVpbml0VGFicyA9IHRydWU7XG5cdH1cblxuXHRfcG9wdWxhdGVUcmVlKGRhdGEpXG5cdHtcblx0XHRsZXQgekRhdGEgPSBkYXRhLmdldFNGU0FycmF5KCd6b25lcycpO1xuXG5cdFx0bGV0IHpvbmVzQXJyID0gW107XG5cdFx0Zm9yIChsZXQgeiA9IDA7IHogPCB6RGF0YS5zaXplKCk7IHorKylcblx0XHRcdHpvbmVzQXJyLnB1c2goIHRoaXMuX2NyZWF0ZVpvbmVPYmplY3QoekRhdGEuZ2V0U0ZTT2JqZWN0KHopKSApO1xuXG5cdFx0Ly8gQ3JlYXRlIGRhdGFzb3VyY2Vcblx0XHRsZXQgem9uZXMgPSBuZXcga2VuZG8uZGF0YS5IaWVyYXJjaGljYWxEYXRhU291cmNlKHtcbiAgICAgICAgICAgIGRhdGE6IHpvbmVzQXJyLFxuXHRcdFx0c29ydDoge1xuXHRcdFx0XHRmaWVsZDogJ25hbWUnLFxuXHRcdFx0XHRkaXI6ICdhc2MnXG5cdFx0XHR9LFxuICAgICAgICAgICAgc2NoZW1hOiB7XG4gICAgICAgICAgICAgICAgbW9kZWw6IHtcblx0XHRcdFx0XHRpZDogJ2lkJyxcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW46IHtcblx0XHRcdFx0XHRcdHNjaGVtYToge1xuXHRcdFx0XHRcdFx0XHRkYXRhOiAncm9vbXMnLFxuXHRcdFx0XHRcdFx0XHRzb3J0OiB7XG5cdFx0XHRcdFx0XHRcdFx0ZmllbGQ6ICduYW1lJyxcblx0XHRcdFx0XHRcdFx0XHRkaXI6ICdhc2MnXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXHRcdC8vIFNldCB0cmVlIHZpZXcgZGF0YXByb3ZpZGVyXG5cdFx0dGhpcy5fdHJlZXZpZXcuc2V0RGF0YVNvdXJjZSh6b25lcyk7XG5cblx0XHQvLyBTZXQgdXRpbGl0eSBidXR0b25zIHN0YXRlIChhZGQsIHJlbW92ZSwgZWRpdCwgZXRjKVxuXHRcdHRoaXMuX3NldFV0aWxpdHlCdXR0b25zU3RhdGUoKTtcblx0fVxuXG5cdF9jcmVhdGVab25lT2JqZWN0KHpvbmVEYXRhKVxuXHR7XG5cdFx0bGV0IHpvbmUgPSB7XG5cdFx0XHR0eXBlOiB0aGlzLklURU1fVFlQRV9aT05FLFxuXHRcdFx0bmFtZTogem9uZURhdGEuZ2V0VXRmU3RyaW5nKCduYW1lJyksXG5cdFx0XHRpZDogem9uZURhdGEuZ2V0SW50KCdpZCcpLFxuXHRcdFx0YWN0aXZlOiB6b25lRGF0YS5nZXRCb29sKCdhY3QnKVxuXHRcdH1cblxuXHRcdC8vIENyZWF0ZSByb29tcyBsaXN0IGRhdGFwcm92aWRlclxuXHRcdGxldCByRGF0YSA9IHpvbmVEYXRhLmdldFNGU0FycmF5KCdyb29tcycpO1xuXG5cdFx0bGV0IHJvb21zQXJyID0gW107XG5cdFx0Zm9yIChsZXQgciA9IDA7IHIgPCByRGF0YS5zaXplKCk7IHIrKylcblx0XHRcdHJvb21zQXJyLnB1c2goIHRoaXMuX2NyZWF0ZVJvb21PYmplY3QockRhdGEuZ2V0U0ZTT2JqZWN0KHIpLCB6b25lRGF0YS5nZXRJbnQoJ2lkJykpICk7XG5cblx0XHR6b25lLnJvb21zID0gcm9vbXNBcnI7XG5cblx0XHRyZXR1cm4gem9uZTtcblx0fVxuXG5cdF9jcmVhdGVSb29tT2JqZWN0KHJvb21EYXRhLCB6b25lSWQpXG5cdHtcblx0XHRsZXQgcm9vbSA9IHtcblx0XHRcdHR5cGU6IHRoaXMuSVRFTV9UWVBFX1JPT00sXG5cdFx0XHRuYW1lOiByb29tRGF0YS5nZXRVdGZTdHJpbmcoJ25hbWUnKSxcblx0XHRcdGlkOiByb29tRGF0YS5nZXRJbnQoJ2lkJyksXG5cdFx0XHRhY3RpdmU6IHJvb21EYXRhLmdldEJvb2woJ2FjdCcpLFxuXHRcdFx0cGFyZW50SWQ6IHpvbmVJZCxcblx0XHRcdHNwcml0ZUNzc0NsYXNzOiB0aGlzLl9nZXRSb29tTGlzdEljb25Dc3NDbGFzcyhyb29tRGF0YS5nZXRCb29sKCdhY3QnKSlcblx0XHR9O1xuXG5cdFx0cmV0dXJuIHJvb207XG5cdH1cblxuXHRfZ2V0Um9vbUxpc3RJY29uQ3NzQ2xhc3MoaXNBY3RpdmUpXG5cdHtcblx0XHRyZXR1cm4gaXNBY3RpdmUgPyAnZmFzIGZhLWRvb3Itb3BlbicgOiAnZmFzIGZhLWRvb3ItY2xvc2VkIGluYWN0aXZlLWxpc3QtaXRlbSc7XG5cdH1cblxuXHRfc2V0Wm9uZUFjdGl2YXRpb25TdGF0dXMoem9uZUlkLCBhY3RpdmVSb29tcywgaXNBY3RpdmUpXG5cdHtcblx0XHRsZXQgem9uZURJID0gdGhpcy5fZ2V0Wm9uZURhdGFJdGVtQnlJZCh6b25lSWQpO1xuXG5cdFx0em9uZURJLmFjdGl2ZSA9IGlzQWN0aXZlO1xuXG5cdFx0bGV0IGFjdGl2ZVJvb21zQXJyID0gYWN0aXZlUm9vbXMuc3BsaXQoJywnKTtcblxuXHRcdGlmICh6b25lREkuaGFzQ2hpbGRyZW4pXG5cdFx0e1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB6b25lREkuY2hpbGRyZW4uZGF0YSgpLmxlbmd0aDsgaSsrKVxuXHRcdFx0e1xuXHRcdFx0XHRsZXQgcm9vbSA9IHpvbmVESS5jaGlsZHJlbi5kYXRhKClbaV07XG5cdFx0XHRcdHJvb20uYWN0aXZlID0gKGlzQWN0aXZlICYmIGFjdGl2ZVJvb21zQXJyLmluZGV4T2Yocm9vbS5uYW1lKSA+IC0xKTtcblx0XHRcdFx0cm9vbS5zcHJpdGVDc3NDbGFzcyA9IHRoaXMuX2dldFJvb21MaXN0SWNvbkNzc0NsYXNzKHJvb20uYWN0aXZlKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFJlZnJlc2ggbGlzdFxuXHRcdHRoaXMuX3RyZWV2aWV3LmRhdGFTb3VyY2Uuc3luYygpO1xuXG5cdFx0Ly8gUmV0dXJuIHpvbmUgbmFtZVxuXHRcdHJldHVybiB6b25lREkubmFtZTtcblx0fVxuXG5cdF9kZXNlbGVjdFRyZWVJdGVtKClcblx0e1xuXHRcdHRoaXMuX3RyZWV2aWV3LnNlbGVjdCgkKCkpO1xuXHR9XG5cblx0X3NlbGVjdFBhcmVudFRyZWVJdGVtKClcblx0e1xuXHRcdGxldCBzZWxlY3RlZE5vZGUgPSB0aGlzLl90cmVldmlldy5zZWxlY3QoKTtcblx0XHRsZXQgc2VsZWN0ZWREYXRhSXRlbSA9IHRoaXMuX3RyZWV2aWV3LmRhdGFJdGVtKHNlbGVjdGVkTm9kZSk7XG5cblx0XHRpZiAoc2VsZWN0ZWREYXRhSXRlbS50eXBlID09IHRoaXMuSVRFTV9UWVBFX1JPT00pXG5cdFx0e1xuXHRcdFx0bGV0IHBhcmVudE5vZGUgPSB0aGlzLl90cmVldmlldy5wYXJlbnQoc2VsZWN0ZWROb2RlKTtcblx0XHRcdHRoaXMuX3RyZWV2aWV3LnNlbGVjdChwYXJlbnROb2RlKTtcblx0XHR9XG5cdH1cblxuXHRfbG9hZENvbmZpZ3VyYXRpb24odHlwZSwgcmVzZXRUYWJzID0gdHJ1ZSlcblx0e1xuXHRcdC8vIERpc2FibGUgem9uZS9yb29tIHNlbGVjdGlvbiBsaXN0XG5cdFx0dGhpcy5fZW5hYmxlTGlzdEludGVyZmFjZShmYWxzZSk7XG5cblx0XHQvLyBEaXNhYmxlIGNvbmZpZ3VyYXRpb24gaW50ZXJmYWNlXG5cdFx0dGhpcy5fZW5hYmxlQ29uZmlnSW50ZXJmYWNlKGZhbHNlKTtcblxuXHRcdC8vIENsZWFyIG1haW4gY29udGFpbmVyXG5cdFx0dGhpcy5fcmVzZXRUYWJzQ29udGFpbmVyKHRydWUsIHJlc2V0VGFicyk7XG5cblx0XHQvLyBTZXQgaXNFZGl0aW5nIGZsYWdcblx0XHR0aGlzLl9pc0VkaXRpbmcgPSB0cnVlO1xuXHRcdHRoaXMuX2VkaXRlZEl0ZW1UeXBlID0gdHlwZTtcblxuXHRcdC8vIFJlcXVlc3Qgem9uZSBvciByb29tIGNvbmZpZ3VyYXRpb24gZGF0YSB0byBzZXJ2ZXIgaW5zdGFuY2Vcblx0XHRsZXQgcGFyYW1zID0gbmV3IFNGUzJYLlNGU09iamVjdCgpO1xuXHRcdHBhcmFtcy5wdXRJbnQoJ3pJZCcsIHRoaXMuX2VkaXRlZFpvbmVJZCk7XG5cdFx0cGFyYW1zLnB1dEludCgncklkJywgdGhpcy5fZWRpdGVkUm9vbUlkKTtcblxuXHRcdC8vIElmIG5vIHJvb20gaXMgc2VsZWN0ZWQsIHRoZW4gd2UgYXJlIGVkaXRpbmcgYSB6b25lXG5cdFx0aWYgKHRoaXMuX2VkaXRlZEl0ZW1UeXBlID09IHRoaXMuSVRFTV9UWVBFX1pPTkUpXG5cdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0dFVF9aT05FX0NPTkZJRywgcGFyYW1zKTtcblx0XHRlbHNlXG5cdFx0XHR0aGlzLnNlbmRFeHRlbnNpb25SZXF1ZXN0KHRoaXMuUkVRX0dFVF9ST09NX0NPTkZJRywgcGFyYW1zKTtcblxuXHRcdC8vIFN3aXRjaCBwYW5lbFxuXHRcdHRoaXMuX3N3aXRjaFBhbmVsKCd6bmMtbWFpblBhbmVsJyk7XG5cdH1cblxuXHRfcmVzZXRUYWJzQ29udGFpbmVyKGlzTG9hZGluZywgcmVzZXRUYWJzKVxuXHR7XG5cdFx0aWYgKHJlc2V0VGFicylcblx0XHRcdHRoaXMuX2NsZWFyVGFicygpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3JlaW5pdFRhYnMgPSBmYWxzZTtcblxuXHRcdGlmICghaXNMb2FkaW5nKVxuXHRcdFx0dGhpcy5fc3dpdGNoVmlldygnem5jLXNlbGVjdCcpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3N3aXRjaFZpZXcoJ3puYy1sb2FkaW5nJyk7XG5cdH1cblxuXHRfc3dpdGNoUGFuZWwocGFuZWxJZClcblx0e1xuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd6bmMtdmlldycpLnNlbGVjdGVkUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwYW5lbElkKTtcblx0fVxuXG5cdF9nZXRab25lRGF0YUl0ZW1CeUlkKHpvbmVJZClcblx0e1xuXHRcdGxldCB6b25lc0RTID0gdGhpcy5fdHJlZXZpZXcuZGF0YVNvdXJjZTtcblx0XHRyZXR1cm4gem9uZXNEUy5nZXQoem9uZUlkKTtcblx0fVxuXG5cdF9nZXRSb29tRGF0YUl0ZW1CeUlkKHpvbmVJZCwgcm9vbUlkKVxuXHR7XG5cdFx0bGV0IHpvbmVESSA9IHRoaXMuX2dldFpvbmVEYXRhSXRlbUJ5SWQoem9uZUlkKTtcblxuXHRcdGlmICh6b25lREkuaGFzQ2hpbGRyZW4pXG5cdFx0XHRyZXR1cm4gem9uZURJLmNoaWxkcmVuLmdldChyb29tSWQpO1xuXG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRfdXBkYXRlWm9uZU5hbWVJbkxpc3Qoem9uZUlkLCB6b25lTmFtZSlcblx0e1xuXHRcdHRoaXMuX2dldFpvbmVEYXRhSXRlbUJ5SWQoem9uZUlkKS5uYW1lID0gem9uZU5hbWU7XG5cdFx0dGhpcy5fdHJlZXZpZXcuZGF0YVNvdXJjZS5zeW5jKCk7XG5cdH1cblxuXHRfdXBkYXRlUm9vbU5hbWVJbkxpc3Qoem9uZUlkLCByb29tSWQsIHJvb21OYW1lKVxuXHR7XG5cdFx0dGhpcy5fZ2V0Um9vbURhdGFJdGVtQnlJZCh6b25lSWQsIHJvb21JZCkubmFtZSA9IHJvb21OYW1lO1xuXHRcdHRoaXMuX3RyZWV2aWV3LmRhdGFTb3VyY2Uuc3luYygpO1xuXHR9XG5cblx0X3ZhbGlkYXRlTmFtZShjaGFuZ2VzKVxuXHR7XG5cdFx0Y29uc3Qgem9uZUlkID0gdGhpcy5fZWRpdGVkWm9uZUlkO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGFuZ2VzLnNpemUoKTsgaSsrKVxuXHRcdHtcblx0XHRcdGNvbnN0IHNldHRpbmcgPSBjaGFuZ2VzLmdldFNGU09iamVjdChpKTtcblxuXHRcdFx0aWYgKHNldHRpbmcuY29udGFpbnNLZXkoJ25hbWUnKSAmJiBzZXR0aW5nLmdldFV0ZlN0cmluZygnbmFtZScpID09ICduYW1lJylcblx0XHRcdHtcblx0XHRcdFx0Ly8gR2V0IG5hbWUgdmFsdWVcblx0XHRcdFx0Y29uc3QgbmFtZSA9IHNldHRpbmcuZ2V0VGV4dCgndmFsdWUnKTtcblxuXHRcdFx0XHQvLyBHZXQgZGF0YSBzb3VyY2Vcblx0XHRcdFx0Y29uc3QgZHMgPSAoIHRoaXMuX2VkaXRlZEl0ZW1UeXBlID09IHRoaXMuSVRFTV9UWVBFX1pPTkUgPyB0aGlzLl90cmVldmlldy5kYXRhU291cmNlLmRhdGEoKSA6IHRoaXMuX2dldFpvbmVEYXRhSXRlbUJ5SWQoem9uZUlkKS5jaGlsZHJlbi5kYXRhKCkgKTtcblxuXHRcdFx0XHQvLyBDaGVjayBpZiBuYW1lIGV4aXN0cyBpbiBkYXRhIHNvdXJjZVxuXHRcdFx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGRzLmxlbmd0aDsgaisrKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWYgKGRzW2pdLm5hbWUgPT0gbmFtZSlcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIEdFVFRFUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRnZXQgX3NlbGVjdGVkSXRlbSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdHJlZXZpZXcuZGF0YUl0ZW0odGhpcy5fdHJlZXZpZXcuc2VsZWN0KCkpO1xuXHR9XG5cblx0Z2V0IF9zZWxlY3RlZEl0ZW1QYXJlbnQoKVxuXHR7XG5cdFx0bGV0IHNlbGVjdGVkTm9kZSA9IHRoaXMuX3RyZWV2aWV3LnNlbGVjdCgpO1xuXHRcdGxldCBwYXJlbnROb2RlID0gdGhpcy5fdHJlZXZpZXcucGFyZW50KHNlbGVjdGVkTm9kZSk7XG5cblx0XHRyZXR1cm4gdGhpcy5fdHJlZXZpZXcuZGF0YUl0ZW0ocGFyZW50Tm9kZSk7XG5cdH1cblxuXHRnZXQgX2VkaXRlZFpvbmVJZCgpXG5cdHtcblx0XHRpZiAodGhpcy5faXNFZGl0aW5nICYmIHRoaXMuX3NlbGVjdGVkSXRlbSlcblx0XHR7XG5cdFx0XHRpZiAodGhpcy5fc2VsZWN0ZWRJdGVtLnR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfWk9ORSlcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkSXRlbS5pZDtcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkSXRlbVBhcmVudC5pZDtcblx0XHR9XG5cblx0XHRyZXR1cm4gLTE7XG5cdH1cblxuXHRnZXQgX2VkaXRlZFJvb21JZCgpXG5cdHtcblx0XHRpZiAodGhpcy5faXNFZGl0aW5nICYmIHRoaXMuX3NlbGVjdGVkSXRlbSlcblx0XHR7XG5cdFx0XHRpZiAodGhpcy5fc2VsZWN0ZWRJdGVtLnR5cGUgPT0gdGhpcy5JVEVNX1RZUEVfUk9PTSlcblx0XHRcdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkSXRlbS5pZDtcblx0XHR9XG5cblx0XHRyZXR1cm4gLTE7XG5cdH1cbn1cbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDdkhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=