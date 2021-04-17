/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-11~module-12~module-8"],{

/***/ "./src/components/uibuilder/config-check-box.js":
/*!******************************************************!*\
  !*** ./src/components/uibuilder/config-check-box.js ***!
  \******************************************************/
/*! exports provided: ConfigCheckBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigCheckBox", function() { return ConfigCheckBox; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");



class ConfigCheckBox extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter value.
	 * If parameter is not editable, a simple label is used.
	 * @override
	 */
	_generateInnerWidget()
	{
		if (this._data.editable)
		{
			// Set widget configuration
			let config = {
				type: 'checkbox',
				class: '',
				id: this._data.name,
				name: this._data.name,
				'data-role': 'switch',
			};

			// Set widget attributes (see parent class)
			this._setWidgetAttributes(config);

			// Set additional widget attributes based on validation rules (see parent class)
			this._setWidgetValidationAttributes(config);

			// Create widget's html
			this._widgetHtml = $('<input>', config);
		}
		else
			this._widgetHtml = new _config_label__WEBPACK_IMPORTED_MODULE_1__["ConfigLabel"]();

		// Return component
		return this._widgetHtml;
	}

	/**
	 * Initialize widget.
	 * @override
	 */
   _initialize()
   {
	   if (this._data.editable)
	   {
		   // Initialize kendo widget
		   kendo.init(this._widgetHtml);

		   // Save ref. to widget
		   this._innerWidget = this._widgetHtml.data('kendoSwitch');

		   // Enable value commit binding
		   this._innerWidget.bind('change', $.proxy(this._onValueInput, this));
	   }

	   // Proceed with initialization
	   super._initialize();
   }

	/**
	 * Set widget's value.
	 * If parameter is not editable, the label text is set.
	 * @override
	 */
	_setWidgetValue()
	{
		if (this._data.editable)
			this._innerWidget.value(this._data.value);
		else
			this._widgetHtml.value = this._data.value;

		// Trigger event
		this._triggerEvent();
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
			this._innerWidget.enable(this._editEnabled);
	}

	/**
	 * Update Configuration Parameter value.
	 * @override
	 */
	_onValueInput(e)
	{
		// Update Configuration Parameter to new value
		this._data.value = this._innerWidget.value();

		// Trigger event
		this._triggerEvent();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-check-box'))
	window.customElements.define('config-check-box', ConfigCheckBox);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-drop-down-list.js":
/*!***********************************************************!*\
  !*** ./src/components/uibuilder/config-drop-down-list.js ***!
  \***********************************************************/
/*! exports provided: ConfigDropDownList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigDropDownList", function() { return ConfigDropDownList; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");



class ConfigDropDownList extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter value.
	 * If parameter is not editable, a simple label is used.
	 * @override
	 */
	_generateInnerWidget()
	{
		if (this._data.editable)
		{
			// Set widget configuration
			let config = {
				class: 'form-control',
				id: this._data.name,
				name: this._data.name,
				'data-role': 'dropdownlist',
			};

			// Set widget attributes (see parent class)
			this._setWidgetAttributes(config);

			// Set additional widget attributes based on validation rules (see parent class)
			this._setWidgetValidationAttributes(config);

			// Create widget's html
			this._widgetHtml = $('<input>', config);
		}
		else
			this._widgetHtml = new _config_label__WEBPACK_IMPORTED_MODULE_1__["ConfigLabel"]();

		// Return component
		return this._widgetHtml;
	}

	/**
	 * Initialize widget.
	 * @override
	 */
   _initialize()
   {
	   if (this._data.editable)
	   {
		   // Initialize kendo widget
		   kendo.init(this._widgetHtml);

		   // Save ref. to widget
		   this._innerWidget = this._widgetHtml.data('kendoDropDownList');

		   // Set list items
		   this._innerWidget.setDataSource(this._getDataSource(this._data.dataProvider))

		   // Enable value commit binding
		   this._widgetHtml.bind('change', $.proxy(this._onValueInput, this));
	   }

	   // Proceed with initialization
	   super._initialize();
   }

	/**
	 * Set widget's value.
	 * If parameter is not editable, the label text is set.
	 * @override
	 */
	_setWidgetValue()
	{
		if (this._data.editable)
			this._innerWidget.value(this._data.value);
		else
			this._widgetHtml.value = this._data.value;

		// Trigger event
		this._triggerEvent();
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
			this._innerWidget.wrapper.attr('disabled', !this._editEnabled);
	}

	/**
	 * Update Configuration Parameter value.
	 * @override
	 */
	_onValueInput(e)
	{
		// Update Configuration Parameter to new value
		this._data.value = this._innerWidget.value();

		// Trigger event
		this._triggerEvent();
	}

	_getDataSource(dpString)
	{
		if (dpString)
			return dpString.split(',');

		// In case the dataprovider is empty, add at least the current value
		else
			return [this._data.value];
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-drop-down-list'))
	window.customElements.define('config-drop-down-list', ConfigDropDownList);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-dual-list.js":
/*!******************************************************!*\
  !*** ./src/components/uibuilder/config-dual-list.js ***!
  \******************************************************/
/*! exports provided: ConfigDualList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigDualList", function() { return ConfigDualList; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");



class ConfigDualList extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter.
	 * @override
	 */
	_generateInnerWidget()
	{
		this._widgetHtml = $('<div>');

		const availableId = this._getId(this._data.name, 'available');
		const selectedId = this._getId(this._data.name, 'selected');

		// Create header for labels
		let header = $('<div>', {class: 'form-label-container dual-list-labels'});

		header.append($('<label>', {
			class: 'font-italic form-label dual-list-left-col' + (!this._data.editable ? ' no-interact' : ''),
			for: availableId,
		}).text('Available'));

		header.append($('<label>', {
			class: 'font-italic font-weight-bold form-label dual-list-right-col' + (!this._data.editable ? ' no-interact' : ''),
			for: selectedId,
		}).text('Selected'));

		this._widgetHtml.append(header);

		// Add available items list
		this._availableListHtml = $('<select>', {
			id: availableId,
			class: 'dual-list-left-col' + (!this._data.editable ? ' no-interact' : ''),
		});
		this._widgetHtml.append(this._availableListHtml);

		// Add selected items list
		this._selectedListHtml = $('<select>', {
			id: selectedId,
			class: 'dual-list-right-col' + (!this._data.editable ? ' no-interact' : ''),
		});
		this._widgetHtml.append(this._selectedListHtml);

		// Return component
		return this._widgetHtml;
	}

	// IDs containing a "." cause issues to connected lists
	_getId(name, suffix)
	{
		return name.replace('.', '_') + '-' + suffix;
	}

	/**
	 * Initialize widget.
	 * @override
	 */
	_initialize()
	{
		// Initialize "avalable" listbox
		this._availableList = this._availableListHtml.kendoListBox({
            connectWith: this._getId(this._data.name, 'selected'),
            toolbar: {
                tools: this._data.editable ? ['transferTo', 'transferFrom', 'transferAllTo', 'transferAllFrom'] : []
            },
			template: "<div>#:value#</div>",
			selectable: 'multiple',
        }).data('kendoListBox');

		// Initialize "selected" listbox
        this._selectedList = this._selectedListHtml.kendoListBox({
			template: "<div>#:value#</div>",
			selectable: 'multiple',
			// The following listeners can't be used because events are fired before the datasource is actually updated
			// We have to use a change event listener on the datasource (see below), even if not optimal
			//add: $.proxy(this._onValueInput, this),
			//remove: $.proxy(this._onValueInput, this),
		}).data('kendoListBox');

		// Proceed with initialization
		super._initialize();
	}

	/**
	 * Set widget's datasource.
	 * @override
	 */
	_setWidgetValue()
	{
		let availableArr = this._data.dataProvider != '' ? this._data.dataProvider.split(',') : [];
		let selectedArr = this._data.value != '' ? this._data.value.split(',') : [];

		// Remove selected values from available values
		if (selectedArr.length > 0)
		{
			let temp = [];

			for (let val of availableArr)
			{
				if (selectedArr.indexOf(val) == -1)
					temp.push(val);
			}

			availableArr = temp;
		}

		// Convert lists of strings to lists of objects
		let availableValues = [];
		for (let val of availableArr)
			availableValues.push({value: val});

		let selectedValues = [];
		for (let val of selectedArr)
			selectedValues.push({value: val});

		// Clear selection
		this._availableList.clearSelection();
		this._selectedList.clearSelection();

		// Set datasources
		this._availableList.setDataSource(new kendo.data.DataSource({
			data: availableValues
		}));

		this._selectedList.setDataSource(new kendo.data.DataSource({
			data: selectedValues,
			// We listen to the change event instead of the add/remove events on the listbox, because those are fired before the datasource is updated
			// This is not optimal because the event is fired for each item added to or removed from the datasource
			change: $.proxy(this._onValueInput, this)
		}));

		// Disable editing
		if (!this._data.editable)
		{
			this._availableList.enable('.k-item', false);
			this._selectedList.enable('.k-item', false);
		}

		// Trigger event
		this._triggerEvent();
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
		{
			// Clear selection
			this._availableList.clearSelection();
			this._selectedList.clearSelection();

			// Enable/disable lists
			this._availableList.wrapper.attr('disabled', !this._editEnabled);
			this._selectedList.wrapper.attr('disabled', !this._editEnabled);
		}
	}

	/**
	 * Update Configuration Parameter value.
	 * @override
	 */
	_onValueInput(e)
	{
		let listData = this._selectedList.dataSource.data();

		// Update Configuration Parameter to new value
		this._data.value = listData.map(e => e.value).join(',');

		// Trigger event
		this._triggerEvent();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-dual-list'))
	window.customElements.define('config-dual-list', ConfigDualList);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-form-item.js":
/*!******************************************************!*\
  !*** ./src/components/uibuilder/config-form-item.js ***!
  \******************************************************/
/*! exports provided: ConfigFormItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigFormItem", function() { return ConfigFormItem; });
class ConfigFormItem extends HTMLElement
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super();

		this.id = 'form-item-' + configParam.name;
		this._editEnabled = editEnabled;
		this._data = configParam;

		// Create form item view
		this._buildView(inDialog);

		// Initialize form item
		this._initialize();
	}

	connectedCallback()
	{
		// Trigger event
		// NOTE: when a ConfigFormItem is instantiated, the _triggerEvent method is called as soon as its value is set.
		// When this happenso, due to the fact that the object is not yet in the DOM, the event is not catched by the listener
		// (which is attached to the outer container). So forcing the event to trigger again as soon as the ConfigFormItem
		// is appended to the DOM is needed.
		this._triggerEvent();
	}

	set data(configParam)
	{
		this._data = configParam;
		this._setWidgetValue();
	}

	get data()
	{
		return this._data;
	}

	set editEnabled(enable)
	{
		if (enable != this._editEnabled)
		{
			this._editEnabled = enable;
			this._setWidgetEditEnabled();
		}
	}

	get editEnabled()
	{
		return this._editEnabled;
	}

	_buildView(isInsideDialog)
	{
		if (!isInsideDialog)
		{
			// Set additional classes for inner widget
			let classNames = '';

			switch (this._data.type)
			{
				case 'DualList':
					classNames = 'col-sm-7 col-lg-8';
					break;
				case 'DataGrid':
					classNames = 'col-sm'; // Use 'col-sm-7 col-lg-8' for DataGrid too?
					break;
				default:
					classNames = 'col-sm-auto';

			}

			// Generate boilerplate html, surrounding the actual widget (label, numeric stepper, etc)
			this.innerHTML = `
				<div class="form-group position-relative row">
					<div class="col-sm-5 col-lg-4 col-form-label form-label-container">
						<label for="${this._data.name}" class="form-label ${(this._data.clientOnly ? 'client-only' : '')}">${this._data.label} <i class="fas fa-question-circle text-muted help" title="${this._data.tooltip}"></i></label>
					</div>
					<div class="inner-widget align-self-center ${classNames}">
						<span class="k-invalid-msg" data-for="${this._data.name}"></span>
					</div>
				</div>
			`;
		}
		else
		{
			this.innerHTML = `
				<div class="form-group position-relative">
					<div class="col-form-label form-label-container">
						<label for="${this._data.name}" class="form-label ${(this._data.clientOnly ? 'client-only' : '')}">${this._data.label} <i class="fas fa-question-circle text-muted help" title="${this._data.tooltip}"></i></label>
					</div>
					<div class="inner-widget">
						<span class="k-invalid-msg" data-for="${this._data.name}"></span>
					</div>
				</div>
			`;
		}

		// Create inner widget (must be overridden)
		let widget = this._generateInnerWidget();

		// Append inner widget
		$(this).find('.inner-widget').prepend(widget);
	}

	/**
	 * TO BE OVERRIDDEN
	 */
	_generateInnerWidget()
	{
		// Show an error, should be overridden
		console.error(`Unable to create ${this._data.type} form item for configuration parameter ${this.id}`);
	}

	/**
	 * Set attributes on the widget configuration object.
	 */
	_setWidgetAttributes(config)
	{
		const attribs = this._data.attributes;

		if (attribs)
		{
			for (let attr in attribs)
			{
				config[attr] = attribs[attr];

				if (attr == 'pattern')
					config['data-pattern-msg'] = 'Contains invalid characters';
			}
		}
	}

	/**
	 * Set additional attributes on the widget configuration object to properly validate input.
	 */
	_setWidgetValidationAttributes(config)
	{
		const val = this._data.validator;

		if (val != null && val != '')
		{
			if (val == 'ip')
			{
				config['pattern'] = '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';
				config['data-pattern-msg'] = 'Invalid IP address';
				config['required'] = true;
				config['data-required-msg'] = 'Required';
			}

			else if (val == 'notNull')
			{
				config['required'] = true;
				config['data-required-msg'] = 'Required';
			}

			else if (val == 'pwd')
			{
				config['pattern'] = '^.{6,}$';
				config['data-pattern-msg'] = 'Minimum length: 6 characters';
			}

			else if (val == 'posNum')
			{
				config['pattern'] = '^[0-9]\d*$';
				config['data-pattern-msg'] = 'Non-negative number required';
			}

			else if (val == 'aoi')
			{
				// Nothing to do
				// See Kendo validation initialization in config-interface-builder.js
			}

			else if (val == 'url')
			{
				config['type'] = 'url';
				config['data-url-msg'] = 'Invalid URL';
			}
		}
	}

	/**
	 * Initialize form item.
	 *
	 * NOTE: must be overridden if inner widget requires special initialization (for example Kendo widgets)
	 */
	_initialize()
	{
		// Set value
 	   this._setWidgetValue();

 	   // Set edit enabled
 	   this._setWidgetEditEnabled();
	}

	/**
	 * TO BE OVERRIDDEN
	 */
	_setWidgetValue()
	{
		// Nothing to do, must be overridden
	}

	/**
	 * TO BE OVERRIDDEN
	 */
	_setWidgetEditEnabled()
	{
		// Nothing to do, must be overridden
	}

	/**
	 * TO BE OVERRIDDEN
	 */
	_onValueInput(e)
	{
		// Nothing to do, must be overridden
	}

	_triggerEvent()
	{
		if (this._data.trigger)
		{
			let event = new CustomEvent('value-set', {detail: null, bubbles: true, cancelable: true});
			this.dispatchEvent(event);
		}
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-form-item'))
	window.customElements.define('config-form-item', ConfigFormItem);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-grid.js":
/*!*************************************************!*\
  !*** ./src/components/uibuilder/config-grid.js ***!
  \*************************************************/
/*! exports provided: ConfigGrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigGrid", function() { return ConfigGrid; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");
/* harmony import */ var _widgets_list_item_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widgets/list-item-editor */ "./src/components/uibuilder/widgets/list-item-editor.js");




class ConfigGrid extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter.
	 * @override
	 */
	_generateInnerWidget()
	{
		// Create main widget's html
		this._widgetHtml = $('<div>', {class: ''});

		// Set grid widget configuration
		let gridConfig = {
			id: this._data.name,
			name: this._data.name,
			class: 'limited-height' + (!this._data.editable ? ' no-interact' : '')
		};

		// Append grid to main html; grid will be converted to Kendo widget during initialization
		this._widgetHtml.append($('<div>', gridConfig));

		if (this._data.editable)
		{
			// BUTTONS

			// Create buttons container
			let buttons = $('<div>', {class: 'mt-2 text-right'});

			// Append buttons to container
			this._addButton = $('<button>', {type: 'button', class: 'k-button k-secondary', title: 'Add'}).append($('<i class="fas fa-plus"></i>'));
			this._editButton = $('<button>', {type: 'button', class: 'k-button k-secondary ml-2', title: 'Edit', disabled: true}).append($('<i class="fas fa-pen"></i>'));
			this._removeButton = $('<button>', {type: 'button', class: 'k-button k-secondary ml-2', title: 'Remove', disabled: true}).append($('<i class="fas fa-times"></i>'));

			buttons.append(this._addButton);
			buttons.append(this._editButton);
			buttons.append(this._removeButton);

			// Append buttons container to main html
			this._widgetHtml.append(buttons);

			// Create edit dialog
			// NOTE: data-dismiss="modal" on the close/cancel buttons was removed to work around an issue with nested modals;
			// the custom "data-cancel" attribute is used to add a custom listener to the buttons
			this._editDialog = $(`
				<div class="modal" tabindex="-1" role="dialog" aria-labelledby="modalTitle" aria-hidden="true" data-keyboard="false" data-backdrop="static">
					<div class="modal-dialog modal-dialog-centered" role="document">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title text-primary" id="modalTitle">${this._data.label}</h5>
								<button type="button" class="close" aria-label="Close" data-cancel="modal">
									<span aria-hidden="true">&times;</span>
								</button>
							</div>
							<div class="modal-body in-flow-invalid-msg">

							</div>
							<div class="modal-footer flex-column">
								<div class="d-flex w-100">
									<div class="flex-grow-1 text-left">
										<button type="button" class="k-button k-primary">...</button>
									</div>
									<div class="flex-grow-1 text-right">
										<button type="button" class="k-button k-secondary" data-cancel="modal">Cancel</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			`);

			// Add listener to dialog hide event
			this._editDialog.on('hidden.bs.modal', $.proxy(this._onEditPanelHidden, this));

			// Add listener to main button click event
			$('button.k-primary', this._editDialog).on('click', $.proxy(this._onSubmitBtClick, this));

			// Add listener to close/cancel buttons click event
			$('button[data-cancel="modal"]', this._editDialog).on('click', $.proxy(this._onCancelBtClick, this));

			// Append edit dialog to main html
			this._widgetHtml.append(this._editDialog);
		}

		// Return component
		return this._widgetHtml;
	}

	/**
	 * Initialize widget.
	 * @override
	 */
	_initialize()
	{
		let columns = [];
		for (let subConfigParam of this._data.defaultListItem)
		{
			let col = {
				field: subConfigParam.name,
				title: subConfigParam.label,
				width: 120
			}

			// Display V or X for booleans
			if (typeof subConfigParam.value === 'boolean')
				col.template = `#= ${subConfigParam.name} ? '<i class="fas fa-check"></i>' : '<i class="fas fa-times"></i>' #`;

			// Hide passwords
			if (subConfigParam.type == 'TextInput' && subConfigParam.attributes != null && subConfigParam.attributes.type == 'password')
				col.template = `#= '•'.repeat(data.${subConfigParam.name}.length) #`;

			columns.push(col);
		}

		// Initialize grid
		let gridHtml = this._widgetHtml.find(`#${$.escapeSelector(this._data.name)}`);

		gridHtml.kendoGrid({
			resizable: true,
			selectable: this._data.editable ? 'row' : false,
			change: $.proxy(this._onGridSelectionChange, this),
			columns: columns,
			noRecords: {
				template: 'No items.'
			}
		});

		// Save ref. to widget
		this._gridWidget = gridHtml.data('kendoGrid');

		// Show tootip if grid's cell content exceeds cell width (ellipsis is displayed by Kendo Grid)
		gridHtml.kendoTooltip({
			filter: 'td',
			show: function(e) {
				// Never show tooltip...
				this.content.parent().css('visibility', 'hidden');

				// ...unless content is returned (see below) due to cell width being exceeded
				if (this.content.text() != '')
					this.content.parent().css('visibility', 'visible');
			},
			hide: function() {
				this.content.parent().css('visibility', 'hidden');
			},
			content: function(e) {
				let element = e.target[0];
				if (element.offsetWidth < element.scrollWidth)
					return e.target.text();
				else
					return '';
			}
		});

		/*
		// Initialize button tooltips
		this._widgetHtml.kendoTooltip({
			filter: 'button',
			content: function(e) {
				return `<div class="help-tooltip">${e.target.data('title')}</div>`;
			}
		});
		*/

		// Add button listeners
		if (this._data.editable)
		{
			this._addButton.click($.proxy(this._onAddClick, this));
			this._editButton.click($.proxy(this._onEditClick, this));
			this._removeButton.click($.proxy(this._onRemoveClick, this));
		}

		// Proceed with initialization
		super._initialize();
	}

	/**
	 * Set widget's datasource.
	 * @override
	 */
	_setWidgetValue()
	{
		let dataSource = new kendo.data.DataSource({
			data: this._data.listValues
		});

		// Read current horizontal scroll value
		const scrollLeft = $('.k-grid-content', this._gridWidget.wrapper).scrollLeft();

		// Clear grid selection if any
		this._gridWidget.clearSelection();

		// Set updated grid's datasource
		this._gridWidget.setDataSource(dataSource);

		// Set horizontal scroll
		$('.k-grid-content', this._gridWidget.wrapper).scrollLeft(scrollLeft);
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
		{
			// Deselect item
			this._gridWidget.clearSelection();

			// Enable/disable grid
			this._gridWidget.wrapper.attr('disabled', !this._editEnabled);

			// Enable "Add" button
			if (this._editEnabled)
				this._addButton.attr('disabled', false);

			// Disable all buttons
			else
			{
				this._addButton.attr('disabled', true);
				this._editButton.attr('disabled', true);
				this._removeButton.attr('disabled', true);
			}
		}
	}

	_onGridSelectionChange(e)
	{
		var selectedRows = this._gridWidget.select();
		var selectedDataItems = [];

		for (var i = 0; i < selectedRows.length; i++)
		{
			var dataItem = this._gridWidget.dataItem(selectedRows[i]);
			selectedDataItems.push(dataItem);
		}

		// Enable/disable edit button
		if (this._editButton)
			this._editButton.prop('disabled', selectedDataItems.length == 0);

		// Enable/disable remove button
		if (this._removeButton)
			this._removeButton.prop('disabled', selectedDataItems.length == 0);
    }

	_onRemoveClick()
	{
		let selectedIndex = this._gridWidget.select().index();

		// Remove item from list
		this._data.removeListItem(selectedIndex);

		// Regenerate datagrid's datasource
		this._setWidgetValue();
	}

	_onAddClick()
	{
		// Clone default item and add to list
		let newListItem = [];
		for (let subCP of this._data.defaultListItem)
			newListItem.push(subCP.clone(true));

		// Create edit popup
		this._openEditPanel(newListItem);
	}

	_onEditClick()
	{
		let selectedIndex = this._gridWidget.select().index();

		// Clone selected item and add to list
		let clonedListItem = [];
		for (let subCP of this._data.listItems[selectedIndex])
			clonedListItem.push(subCP.clone(true));

		// Create edit popup
		this._openEditPanel(clonedListItem, selectedIndex);
	}

	_openEditPanel(subConfigParamsArray, editIndex = -1)
	{
		// Check if this configuration item is inside a modal window;
		// if yes, the edit panel (which is a modal as well) must be configured to remove the dark background
		if ($(this).parents('.modal').length > 0)
			$('.modal', $(this)).attr('data-backdrop', false);

		// Create dialog content
		this._itemEditor = new _widgets_list_item_editor__WEBPACK_IMPORTED_MODULE_2__["ListItemEditor"]();
		this._itemEditor.data = subConfigParamsArray;
		this._itemEditor.index = editIndex;

		let itemEditor = $(this._itemEditor);

		// Append content to dialog
		$('.modal-body', this._editDialog).append(itemEditor);

		// Set dialog main button text
		$('button.k-primary', this._editDialog).html(editIndex > -1 ? '<i class="fas fa-pen mr-1"></i>Update' : '<i class="fas fa-plus mr-1"></i>Add');

		// Display dialog
		this._editDialog.modal('show');
	}

	_onSubmitBtClick()
	{
		if (this._itemEditor.validate())
		{
			let data = this._itemEditor.data;
			let index = this._itemEditor.index;

			// Hide modal
			this._editDialog.modal('hide');

			// Complete editing
			this._onEditComplete(data, index);
		}
	}

	_onCancelBtClick()
	{
		// Hide modal
		this._editDialog.modal('hide');
	}

	_onEditPanelHidden(e)
	{
		// Remove content from dialog
		this._itemEditor.remove();

		// Set dialog main button text
		$('button.k-primary', this._editDialog).html('...');

		this._itemEditor = null;
	}

	_onEditComplete(listItem, editIndex)
	{
		// An existing list item was updated
		if (editIndex > -1)
			this._data.updateListItem(listItem, editIndex);

		// A new list item was added; add it to the configuration parameter
		else
			this._data.addListItem(listItem);

		// Regenerate datagrid's datasource
		this._setWidgetValue();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-grid'))
	window.customElements.define('config-grid', ConfigGrid);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-label.js":
/*!**************************************************!*\
  !*** ./src/components/uibuilder/config-label.js ***!
  \**************************************************/
/*! exports provided: ConfigLabel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigLabel", function() { return ConfigLabel; });
class ConfigLabel extends HTMLElement
{
	constructor()
	{
	    super();

		this.setAttribute('class','config-label');
	}

	set value(val)
	{
		if (typeof val === 'boolean')
			this.innerHTML = (val ? 'true' : 'false');
		else if (typeof val === 'number')
			this.innerHTML = (val ? val : 0);
		else
			this.innerHTML = (val != '' ? val : '&mdash;');
	}

	get value()
	{
		return this.textContent;
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-label'))
	window.customElements.define('config-label', ConfigLabel);


/***/ }),

/***/ "./src/components/uibuilder/config-numeric-stepper.js":
/*!************************************************************!*\
  !*** ./src/components/uibuilder/config-numeric-stepper.js ***!
  \************************************************************/
/*! exports provided: ConfigNumericStepper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigNumericStepper", function() { return ConfigNumericStepper; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");



class ConfigNumericStepper extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter value.
	 * If parameter is not editable, a simple label is used.
	 * @override
	 */
	_generateInnerWidget()
	{
		if (this._data.editable)
		{
			// Set widget configuration
			let config = {
				type: 'number',
				class: 'form-control',
				id: this._data.name,
				name: this._data.name,
				'data-role': 'numerictextbox',
				'data-required-msg': 'Required',
				'data-format': '#',
				required: 'required',
			};

			// Set widget attributes (see parent class)
			this._setWidgetAttributes(config);

			// Set additional widget attributes based on validation rules (see parent class)
			this._setWidgetValidationAttributes(config);

			// Create widget's html
			this._widgetHtml = $('<input>', config);
		}
		else
			this._widgetHtml = new _config_label__WEBPACK_IMPORTED_MODULE_1__["ConfigLabel"]();

		// Return component
		return this._widgetHtml;
	}

	/**
	 * Initialize widget.
	 * @override
	 */
   _initialize()
   {
	   if (this._data.editable)
	   {
		   // Initialize kendo widget
		   kendo.init(this._widgetHtml);

		   // Save ref. to widget
		   this._innerWidget = this._widgetHtml.data('kendoNumericTextBox');

		   // Enable value commit binding
		   this._innerWidget.bind('change', $.proxy(this._onValueInput, this));
	   }

	   // Proceed with initialization
	   super._initialize();
   }

	/**
	 * Set widget's value.
	 * If parameter is not editable, the label text is set.
	 * @override
	 */
	_setWidgetValue()
	{
		if (this._data.editable)
			this._innerWidget.value(this._data.value);
		else
			this._widgetHtml.value = this._data.value;

		// Trigger event
		this._triggerEvent();
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
			this._innerWidget.enable(this._editEnabled);
	}

	/**
	 * Update Configuration Parameter value.
	 * @override
	 */
	_onValueInput(e)
	{
		// Update Configuration Parameter to new value
		this._data.value = Number(this._innerWidget.value());

		// Trigger event
		this._triggerEvent();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-numeric-stepper'))
	window.customElements.define('config-numeric-stepper', ConfigNumericStepper);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-text-input.js":
/*!*******************************************************!*\
  !*** ./src/components/uibuilder/config-text-input.js ***!
  \*******************************************************/
/*! exports provided: ConfigTextInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigTextInput", function() { return ConfigTextInput; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");



class ConfigTextInput extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter value.
	 * If parameter is not editable, a simple label is used.
	 * @override
	 */
	_generateInnerWidget()
	{
		if (this._data.editable)
		{
			// Set widget configuration
			let config = {
				type: 'text',
				class: 'form-control k-textbox',
				id: this._data.name,
				name: this._data.name,
				autocomplete: 'off',
			};

			// Set widget attributes
			this._setWidgetAttributes(config);

			// Set additional widget attributes based on validation rules
			this._setWidgetValidationAttributes(config);

			// Create widget's html
			this._widgetHtml = $('<input>', config);

			// Enable value commit binding
			this._widgetHtml.on('change', $.proxy(this._onValueInput, this));
		}
		else
			this._widgetHtml = new _config_label__WEBPACK_IMPORTED_MODULE_1__["ConfigLabel"]();

		// Return component
		return this._widgetHtml;
	}

	/**
	 * Set widget's value.
	 * If parameter is not editable, the label text is set.
	 * @override
	 */
	_setWidgetValue()
	{
		if (this._data.editable)
			this._widgetHtml.val(this._data.value);
		else
			this._widgetHtml.value = this._data.value;

		// Trigger event
		this._triggerEvent();
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
			this._widgetHtml.attr('disabled', !this._editEnabled);
	}

	/**
	 * Update Configuration Parameter value.
	 * @override
	 */
	_onValueInput(e)
	{
		// Update Configuration Parameter to new value
		this._data.value = this._widgetHtml.val();

		// Trigger event
		this._triggerEvent();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-text-input'))
	window.customElements.define('config-text-input', ConfigTextInput);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/config-vector-3d.js":
/*!******************************************************!*\
  !*** ./src/components/uibuilder/config-vector-3d.js ***!
  \******************************************************/
/*! exports provided: ConfigVector3D */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigVector3D", function() { return ConfigVector3D; });
/* harmony import */ var _config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _config_label__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-label */ "./src/components/uibuilder/config-label.js");
/* harmony import */ var _widgets_vector_3d_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widgets/vector-3d-input */ "./src/components/uibuilder/widgets/vector-3d-input.js");




class ConfigVector3D extends _config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"]
{
	constructor(configParam, editEnabled, inDialog)
	{
	    super(configParam, editEnabled, inDialog);
	}

	/**
	 * Create widget to render the ConfigParameter value.
	 * If parameter is not editable, a simple label is used.
	 * @override
	 */
	_generateInnerWidget()
	{
		if (this._data.editable)
		{
			// Create widget's html
			this._widgetHtml = new _widgets_vector_3d_input__WEBPACK_IMPORTED_MODULE_2__["Vector3DInput"](this._data.name, this._data.validator == 'aoi');

			// Set widget attributes
			this._setWidgetAttributes(this._widgetHtml);

			// Enable value commit binding
			$(this._widgetHtml).on('change', $.proxy(this._onValueInput, this));
		}
		else
			this._widgetHtml = new _config_label__WEBPACK_IMPORTED_MODULE_1__["ConfigLabel"]();

		// Return component
		return this._widgetHtml;
	}

	/**
	 * Set widget's value.
	 * If parameter is not editable, the label text is set.
	 * @override
	 */
	_setWidgetValue()
	{
		this._widgetHtml.value = this._data.value;

		// Trigger event
		this._triggerEvent();
	}

	/**
	 * Set widget's disabled state.
	 * @override
	 */
	_setWidgetEditEnabled()
	{
		if (this._data.editable)
		{
			$(this._widgetHtml).attr('disabled', !this._editEnabled);
		}
	}

	/**
	 * Update Configuration Parameter value.
	 * @override
	 */
	_onValueInput(e)
	{
		// Update Configuration Parameter to new value
		this._data.value = this._widgetHtml.value;

		// Trigger event
		this._triggerEvent();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('config-vector-3d'))
	window.customElements.define('config-vector-3d', ConfigVector3D);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/widgets/list-item-editor.js":
/*!**************************************************************!*\
  !*** ./src/components/uibuilder/widgets/list-item-editor.js ***!
  \**************************************************************/
/*! exports provided: ListItemEditor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListItemEditor", function() { return ListItemEditor; });
/* harmony import */ var _utils_uibuilder_config_form_item_factory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../utils/uibuilder/config-form-item-factory */ "./src/utils/uibuilder/config-form-item-factory.js");


class ListItemEditor extends HTMLElement
{
	constructor()
	{
	    super();
	}

	set data(subConfigParamsArray)
	{
		this._data = subConfigParamsArray;

		this._buildView();
	}

	get data()
	{
		return this._data;
	}

	set index(index)
	{
		this._index = index;
	}

	get index()
	{
		return this._index;
	}

	_buildView()
	{
		// Generate container form
		this._form = $('<form>', {});

		// Append form
		$(this).append(this._form);

		// Generate form fields
		for (let configParam of this._data)
		{
			// Create form item
			let formItem = _utils_uibuilder_config_form_item_factory__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItemFactory"].create(configParam, true, true);
			formItem.data = configParam;

			// Add form item to form
			this._form.append(formItem);
		}

		// Initialize kendo validation on form
		this._validator = this._form.kendoValidator({
			validateOnBlur: true,
			rules: {
				// Add rule to validate AOI form items?
				// (see: https://demos.telerik.com/kendo-ui/validator/custom-validation)
				aoi: function (input) {
					if (input.is('[data-aoi-msg]') && input.val() != '')
					{
						if (input.val() == '0,0,0')
							return false;
                    }

                    return true;
                }
			}
		}).data('kendoValidator');

		// Initialize help tooltips
		this._form.kendoTooltip({
			filter: 'i[title].help',
			position: 'right',
			content: function(e) {
				return `<div class="help-tooltip">${e.target.data('title')}</div>`;
			}
		});
	}

	validate()
	{
		return this._validator.validate();
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('list-item-editor'))
	window.customElements.define('list-item-editor', ListItemEditor);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/uibuilder/widgets/vector-3d-input.js":
/*!*************************************************************!*\
  !*** ./src/components/uibuilder/widgets/vector-3d-input.js ***!
  \*************************************************************/
/*! exports provided: Vector3DInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Vector3DInput", function() { return Vector3DInput; });
class Vector3DInput extends HTMLElement
{
	constructor(id, isValidable)
	{
	    super();

		this.id = id;
		this.name = id;

		this._isValidable = isValidable;

		this._initialize();
	}

	set enableClear(value)
	{
		if (value)
			this._clearButton.show();
		else
			this._clearButton.hide();
	}

	set allowNegative(value)
	{
		if (value)
		{
			this._widgetX.setOptions( {min: null} );
			this._widgetY.setOptions( {min: null} );
			this._widgetZ.setOptions( {min: null} );
		}
	}

	set value(val)
	{
		var coords = val.split(',');

		if (coords.length >= 1)
			this._widgetX.value(coords[0]);

		if (coords.length >= 2)
			this._widgetY.value(coords[1]);

		if (coords.length >= 3)
			this._widgetZ.value(coords[2]);

		if (this._isValidable)
			this._inputVal.val(this.value);
	}

	get value()
	{
		if (this._widgetX.value() == null && this._widgetY.value() == null && this._widgetZ.value() == null)
			return '';
		else
			return this._widgetX.value() + ',' + this._widgetY.value() + ',' + this._widgetZ.value();
	}

	_initialize()
	{
		// Generate container form
		this._container = $('<div>', {
			class: 'form-inline'
		});

		// Append container
		$(this).append(this._container);

		// Set inputs configuration
		let configHtml = {
			type: 'number',
			class: 'form-control short-4',
		};

		// Set widget configuration
		let configWidget = {
			min: 0,
			spinners: false,
			format: '#.######',
			decimals: 6,
			round: false,
			spinners: false,
			restrictDecimals: false,
			change: $.proxy(this._onChange, this)
		};

		// Create widgets
		this._inputX = $('<input>', configHtml);
		this._container.append(this._inputX);
		this._widgetX = this._inputX.kendoNumericTextBox(configWidget).data('kendoNumericTextBox');

		this._container.append('<span class="px-1">,</span>');

		this._inputY = $('<input>', configHtml);
		this._container.append(this._inputY);
		this._widgetY = this._inputY.kendoNumericTextBox(configWidget).data('kendoNumericTextBox');

		this._container.append('<span class="px-1">,</span>');

		this._inputZ = $('<input>', configHtml);
		this._container.append(this._inputZ);
		this._widgetZ = this._inputZ.kendoNumericTextBox(configWidget).data('kendoNumericTextBox');

		this._container.append('<span class="px-1"></span>'); // Additional spacer

		// Create invisible field to apply overall validation
		if (this._isValidable)
		{
			this._inputVal = $('<input>', {name: `${this.name}-custom-validate`, 'data-aoi-msg': 'Values can\'t all be 0'});
			this._container.append(this._inputVal);
			this._container.append(`<span class="k-invalid-msg" data-for="${this.name}-custom-validate"></span>`)
			this._inputVal.hide();
		}

		// Create and append Clear button
		this._clearButton = $('<button>', {type: 'button', class: 'k-button k-secondary my-1', title: 'Clear'}).append($('<i class="fas fa-times"></i>'));
		this._clearButton.on('click', $.proxy(this._onClearClick, this));
		this._container.append(this._clearButton);

		// Hide button by default
		this._clearButton.hide();
	}

	_onChange()
	{
		// Empty strings are not allowed
		if (this._widgetX.value() == null)
			this._widgetX.value(0);

		if (this._widgetY.value() == null)
			this._widgetY.value(0);

		if (this._widgetZ.value() == null)
			this._widgetZ.value(0);

		this._dispatchCommit();
	}

	_onClearClick()
	{
		this._widgetX.value('');
		this._widgetY.value('');
		this._widgetZ.value('');

		this._dispatchCommit();
	}

	_dispatchCommit()
	{
		if (this._isValidable)
			this._inputVal.val(this.value);

		this.dispatchEvent(new Event('change'));
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('vector-3d-input'))
	window.customElements.define('vector-3d-input', Vector3DInput);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

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

/***/ "./src/utils/uibuilder/config-form-item-factory.js":
/*!*********************************************************!*\
  !*** ./src/utils/uibuilder/config-form-item-factory.js ***!
  \*********************************************************/
/*! exports provided: ConfigFormItemFactory */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigFormItemFactory", function() { return ConfigFormItemFactory; });
/* harmony import */ var _components_uibuilder_config_form_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../components/uibuilder/config-form-item */ "./src/components/uibuilder/config-form-item.js");
/* harmony import */ var _components_uibuilder_config_numeric_stepper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/uibuilder/config-numeric-stepper */ "./src/components/uibuilder/config-numeric-stepper.js");
/* harmony import */ var _components_uibuilder_config_text_input__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/uibuilder/config-text-input */ "./src/components/uibuilder/config-text-input.js");
/* harmony import */ var _components_uibuilder_config_check_box__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../components/uibuilder/config-check-box */ "./src/components/uibuilder/config-check-box.js");
/* harmony import */ var _components_uibuilder_config_drop_down_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../components/uibuilder/config-drop-down-list */ "./src/components/uibuilder/config-drop-down-list.js");
/* harmony import */ var _components_uibuilder_config_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../components/uibuilder/config-grid */ "./src/components/uibuilder/config-grid.js");
/* harmony import */ var _components_uibuilder_config_dual_list__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../components/uibuilder/config-dual-list */ "./src/components/uibuilder/config-dual-list.js");
/* harmony import */ var _components_uibuilder_config_vector_3d__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../components/uibuilder/config-vector-3d */ "./src/components/uibuilder/config-vector-3d.js");










class ConfigFormItemFactory
{
	static create(configParam, editEnabled, inDialog = false)
	{
		switch (configParam.type)
		{
			case 'TextInput':
				return new _components_uibuilder_config_text_input__WEBPACK_IMPORTED_MODULE_2__["ConfigTextInput"](configParam, editEnabled, inDialog);
				break;

			case 'CheckBox':
				return new _components_uibuilder_config_check_box__WEBPACK_IMPORTED_MODULE_3__["ConfigCheckBox"](configParam, editEnabled, inDialog);
				break;

			case 'NumericStepper':
				return new _components_uibuilder_config_numeric_stepper__WEBPACK_IMPORTED_MODULE_1__["ConfigNumericStepper"](configParam, editEnabled, inDialog);
				break;

			case 'ComboBox':
				return new _components_uibuilder_config_drop_down_list__WEBPACK_IMPORTED_MODULE_4__["ConfigDropDownList"](configParam, editEnabled, inDialog);
				break;

			case 'DataGrid':
				return new _components_uibuilder_config_grid__WEBPACK_IMPORTED_MODULE_5__["ConfigGrid"](configParam, editEnabled, inDialog);
				break;

			case 'DualList':
				return new _components_uibuilder_config_dual_list__WEBPACK_IMPORTED_MODULE_6__["ConfigDualList"](configParam, editEnabled, inDialog);
				break;

			case 'Vector3D':
				return new _components_uibuilder_config_vector_3d__WEBPACK_IMPORTED_MODULE_7__["ConfigVector3D"](configParam, editEnabled, inDialog);
				break;

			default:
				return new _components_uibuilder_config_form_item__WEBPACK_IMPORTED_MODULE_0__["ConfigFormItem"](configParam, editEnabled, inDialog); // Will log an error for missing form item type
		}
	}
}


/***/ }),

/***/ "./src/utils/uibuilder/config-interface-builder.js":
/*!*********************************************************!*\
  !*** ./src/utils/uibuilder/config-interface-builder.js ***!
  \*********************************************************/
/*! exports provided: ConfigInterfaceBuilder */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigInterfaceBuilder", function() { return ConfigInterfaceBuilder; });
/* harmony import */ var _configuration_parameter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./configuration-parameter */ "./src/utils/uibuilder/configuration-parameter.js");
/* harmony import */ var _config_form_item_factory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config-form-item-factory */ "./src/utils/uibuilder/config-form-item-factory.js");



class ConfigInterfaceBuilder
{
	constructor()
	{
		// Set some constants
		this.TAB_PREFIX = 'tab-'
		this.TAB_PANE_PREFIX = 'tabpane-';
		this.SEPARATOR_BEFORE = 'before';
		this.SEPARATOR_AFTER = 'after';
	}

	dump(modifiedOnly = false)
	{
		let dumpStr = '';

		for (let cp of this._configParams)
		{
			if (modifiedOnly)
			{
				if (cp.isModified)
					dumpStr += cp.toString() + '\n';
			}
			else
				dumpStr += cp.toString() + '\n';
		}

		console.log(dumpStr);
	}

	buildInterface(data, mainContainerId, disableEdit = false, tabSuffix = '')
	{
		this._mainContainerId = mainContainerId;
		this._configParams = new Array();
		this._validator = null;

		let hasNewFormItem = false;

		//console.log(data.getDump())

		for (let i = 0; i < data.size(); i++)
		{
			// PARSE DATA

			let configParam = _configuration_parameter__WEBPACK_IMPORTED_MODULE_0__["ConfigurationParameter"].fromSfsObject(data.get(i));
			this._configParams.push(configParam);

			// Get tab and tab pane id from group id
			const tabId = this.TAB_PREFIX + configParam.categoryId + (tabSuffix ? '_' + tabSuffix : '');
			const tabPaneId = this.TAB_PANE_PREFIX + configParam.categoryId + (tabSuffix ? '_' + tabSuffix : '');

			// BUILD INTERFACE :: TABS

			// Check if a tab specific for this group already exists inside the mainContainer: if not, create it
			// (a tab already exists if it was created in a previous loop)
			let tab = $(`#${mainContainerId} > #tabs #${tabId}`);

			if (tab.length == 0)
			{
				// Create tab for tab pane
				tab = $('<li>', {class: 'nav-item'});
				tab.append($('<a>', {
					class: 'nav-link' + (i == 0 ? ' active' : ''),
					id: tabId,
					'data-toggle': 'tab',
					href: '#' + tabPaneId,
					role: 'tab',
					'aria-controls': tabPaneId,
					'aria-selected': (i == 0 ? 'true' : 'false'),
					html: configParam.category,
				}));

				// Add tab to container
				$(`#${mainContainerId} > #tabs`).append(tab);
			}

			// BUILD INTERFACE :: TAB PANES

			// Check if a tab pane specific for this group already exists inside the mainContainer: if not, create it
			// (a tab pane already exists if it was created in a previous loop or if it exists statically in the html - in case it is needed to add some static content)
			let tabPane = $(`#${mainContainerId} > #tabPanels > #${tabPaneId}`);

			if (tabPane.length == 0)
			{
				// Create tab pane
				tabPane = $('<div>', {
					class: 'tab-pane' + (i == 0 ? ' show active' : ''),
					id: tabPaneId,
					role: 'tabpanel',
					'aria-labelledby': tabId,
					'data-dynamic': 'true',
				});

				// Add tab pane to container
				$(`#${mainContainerId} > #tabPanels`).append(tabPane);
			}

			// BUILD INTERFACE :: TAB PANES' FORM

			// Check if a form already exists inside the tab pane: if not, create it
			let form = tabPane.find('form');

			if (form.length == 0)
			{
				// Create form
				form = $('<form>', {
					class: '',
					autocomplete: 'off'
				});

				// Create an inner fieldset; this might be useful to easily disable the whole form at once (actually we don't use it because Kendo widgets are not disabled automatically)
				form.append(
					$('<fieldset>', {
						class: ''
					})
				);

				// Add form to tab pane
				tabPane.prepend(form);
			}

			// Get fieldset, which is the actual form items container
			let fieldset = form.find('fieldset');

			// BUILD INTERFACE :: TAB PANES' FORM ITEMS

			// Check if form item already exists in fieldset; if yes, just update its data
			let formItem = fieldset.find(`#form-item-${$.escapeSelector(configParam.name)}`);

			if (formItem.length == 0)
			{
				hasNewFormItem = true;

				formItem = _config_form_item_factory__WEBPACK_IMPORTED_MODULE_1__["ConfigFormItemFactory"].create(configParam, !disableEdit);

				// Add separator before
				if (configParam.separator != null && configParam.separator.pos == 'before')
					fieldset.append(this._buildSeparator(configParam.separator));

				// Add form item to form
				fieldset.append(formItem);

				// Add separator after
				if (configParam.separator != null && configParam.separator.pos == 'after')
					fieldset.append(this._buildSeparator(configParam.separator));
			}
			else
				formItem[0].data = configParam;
		}

		// Add listener to show help tooltips
		let allForms = $(`#${mainContainerId} > #tabPanels > div.tab-pane > form`);
		allForms.kendoTooltip({
			filter: 'i[title].help',
			position: 'right',
			width: '250px',
			content: function(e) {
				return `<div class="help-tooltip">${e.target.data('title')}</div>`;
			}
		});

		// Initialize kendo validation on forms' main container
		this._validator = $(`#${mainContainerId}`).kendoValidator({
			validateOnBlur: true,
			rules: {
				// Add rule to validate AOI form items
				// (see: https://demos.telerik.com/kendo-ui/validator/custom-validation)
				aoi: function (input) {
					if (input.is('[data-aoi-msg]') && input.val() != '')
					{
						if (input.val() == '0,0,0')
							return false;
                    }

                    return true;
                }
			}
		}).data('kendoValidator');
	}

	destroyInterface()
	{
		// Destroy all Kendo widgets in forms
		kendo.destroy($(`#${this._mainContainerId} > #tabPanels > div.tab-pane > form`));

		// Remove all tabs
		$(`#${this._mainContainerId} > #tabs`).empty();

		// Remove dynamic tab panes (tab panes created by Interface Builder)
		$(`#${this._mainContainerId} > #tabPanels > div.tab-pane[data-dynamic="true"]`).remove();

		// Remove form inside static tab panes (predefined tab panes in html)
		$(`#${this._mainContainerId} > #tabPanels > div.tab-pane > form`).remove();
	}

	disableInterface(disable)
	{
		// Enable/disable all config form items
		$(`#${this._mainContainerId} *[id^='form-item-']`).prop('editEnabled', !disable);
	}

	_buildSeparator(separator)
	{
		if (separator.text == null)
			return $(`<hr class="config-form-separator">`);

		else
			return $(`<label class="config-form-separator-label mb-3">${separator.text}</label>`);
	}

	getChangedData()
	{
		let changes = new SFS2X.SFSArray();

		for (var cp of this._configParams)
		{
			if (cp.isModified)
				changes.addSFSObject(cp.toSfsObject());
		}

		return changes;
	}

	resetIsModified()
	{
		for (let cp of this._configParams)
		{
			if (cp.isModified)
				cp.resetIsModified();
		}
	}

	checkIsValid()
	{
		return this._validator.validate();
	}

	resetValidation()
	{
		this._validator.hideMessages();

		// The method above doesn't remove the k-invalid classes and aria-invalid="true" attributes from inputs
		// Let's do it manually
		$(`#${this._mainContainerId} .k-invalid`).removeClass('k-invalid');
		$(`#${this._mainContainerId} [aria-invalid="true"]`).removeAttr('aria-invalid');
	}

	getConfigFormItem(configParamName)
	{
		let formItem = $(`#${this._mainContainerId}`).find(`#form-item-${$.escapeSelector(configParamName)}`);

		if (formItem.length > 0)
			return formItem[0];
		else
			return null;
	}

	activateFirstTabPanel()
	{
		let configParam = this._configParams[0];
		const tabPaneId = this.TAB_PANE_PREFIX + configParam.categoryId;
		let tabPane = $(`#${this._mainContainerId} > #tabPanels > #${tabPaneId}`);
		tabPane.addClass('show active');
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/utils/uibuilder/configuration-parameter.js":
/*!********************************************************!*\
  !*** ./src/utils/uibuilder/configuration-parameter.js ***!
  \********************************************************/
/*! exports provided: ConfigurationParameter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigurationParameter", function() { return ConfigurationParameter; });
class ConfigurationParameter
{
	static fromSfsObject(element)
	{
		let cp = new ConfigurationParameter();

		// Parse common data
		cp.name = element.getUtfString('name');
		cp.label = element.getUtfString('label');
		cp.category = element.getUtfString('category');
		cp.tooltip = element.getUtfString('tooltip');
		cp.type = element.getUtfString('type');
		cp.value = element.get('value');
		cp.validator = element.getUtfString('validator');
		cp.editable = (element.containsKey('edit') ? element.getBool('edit') : true);
		cp.trigger = (element.containsKey('trigger') ? element.getBool('trigger') : false);
		cp.triggerData = element.getSFSArray('triggerData');
		cp.clientOnly = (element.containsKey('clientOnly') ? element.getBool('clientOnly') : false);
		cp.dataProvider = element.getUtfString('dataProvider');

		// Parse component specific attributes
		let tmpAttributes = element.getSFSObject('attributes');
		if (tmpAttributes != null)
		{
			let attributes = {};

			let keys = tmpAttributes.getKeysArray();
			for (let key of keys)
				attributes[key] = tmpAttributes.get(key);

			cp.attributes = attributes;
		}

		// Parse separator settings
		let tmpSeparator = element.getSFSObject('separator');
		if (tmpSeparator != null)
		{
			let separator = {};

			let keys1 = tmpSeparator.getKeysArray();
			for (let key1 of keys1)
				separator[key1] = tmpSeparator.get(key1);

			cp.separator = separator;
		}

		// Parse default list item
		let tmpDefaultListItem = element.getSFSArray('defaultListItem');
		if (tmpDefaultListItem != null && tmpDefaultListItem.size() > 0)
		{
			let defaultListItem = [];

			for (let i = 0; i < tmpDefaultListItem.size(); i++)
				defaultListItem.push(ConfigurationParameter.fromSfsObject(tmpDefaultListItem.getSFSObject(i)));

			cp.defaultListItem = defaultListItem;

			// Parse list values
			let listValues = [];

			let tmpListValues = element.getSFSArray('listValues');
			if (tmpListValues != null && tmpListValues.size() > 0)
			{
				for (let v = 0; v < tmpListValues.size(); v++)
				{
					let listValueObj = tmpListValues.getSFSObject(v);
					let obj = {};

					let keys2 = listValueObj.getKeysArray();
					for (let key2 of keys2)
						obj[key2] = listValueObj.get(key2);

					listValues.push(obj);
				}
			}

			cp.listValues = listValues;

			// If we have a list, on the server-side items could be represented by a class
			cp.clazz = element.getUtfString('clazz');
		}

		return cp;
	}

	constructor()
	{
		/* CONSTANTS */
		this.DEFAULT_CATEGORY_NAME = 'General';
		this.DEFAULT_CATEGORY_ID = 'general';

		/* PUBLIC VARS */

		this.name = '';
		this.label = '';
		this.tooltip = '';
		this.type = null;
		this.trigger = false;
		this.triggerData = null;
		this.clientOnly = false;
		this.editable = true;
		this.attributes = null;
		this.dataProvider = null;

		this.separator = null;			// Parameter used to create a separator before or after the config parameter
		this.defaultListItem = null;		// List of sub-ConfigurationParameters, each containing the default values
		this.clazz = null;				// Name of the class representing the list item (not used in case of primiteve data types)

		/* PRIVATE VARS */

		this._category = this.DEFAULT_CATEGORY_NAME;
		this._categoryId = this.DEFAULT_CATEGORY_ID;
		this._value = null;
		this._initialValue = null;		// Save the initial value of the configuration parameter, to check if the value was modified
		this._validator = null;

		this._listItems = [];			// Array of arrays of ConfigurationParameters
		this._listItemsChanged = false;	// Flag to be set in case a list item is added or removed
	}

	//---------------------------------------------
	// GETTERS / SETTERS
	//---------------------------------------------

	set category(val)
	{
		if (val)
		{
			this._category = val;
			this._setIdFromCategoryName(this._category);
		}
	}

	get category()
	{
		return this._category;
	}

	set value(val)
	{
		if (this._value != val)
		{
			// If value is null, then we are setting this for the first time and
			// we want to save the initial value, to check later if it has been modified
			if (this._value == null)
				this._initialValue = val;

			this._value = val;
		}
	}

	get value()
	{
		return this._value;
	}

	set validator(val)
	{
		if (val)
			this._validator = val;
	}

	get validator()
	{
		return this._validator;
	}

	/**
	 * An array of objects; each object contains the name-value pairs used to
	 * populate the list of sub-configuration parameters arrays, based on defaultListItem.
	 */
	set listValues(arr)
	{
		this._setSubConfigurationParams(arr);
	}

	get listValues()
	{
		return this._getSubConfigurationParamsValues();
	}

	//---------------------------------------------
	// GETTERS ONLY
	//---------------------------------------------

	get isModified()
	{
		let _isModified = false;

		// If the parameter is used on the client only (for example in a custom trigger)
		// then we never have to consider it as modified, to prevent it being sent to the server
		if (!this.clientOnly)
		{
			if (this._value != this._initialValue || this._listItemsChanged)
				_isModified = true;
			else
			{
				// Check sub parameters
				outerLoop: for (let listItem of this._listItems)
				{
					for (let subCP of listItem)
					{
						if (subCP.isModified)
						{
							_isModified = true;
							break outerLoop;
						}
					}
				}
			}
		}

		return _isModified;
	}

	get categoryId()
	{
		return this._categoryId;
	}

	get listItems()
	{
		return this._listItems;
	}

	//---------------------------------------------
	// PUBLIC METHODS
	//---------------------------------------------

	/**
	 * Return a clone of this ConfigurationParameter.
	 */
	clone(cloneValue = false)
	{
		let cp = new ConfigurationParameter();
		cp.name = this.name;
		cp.label = this.label;
		cp.category = this.category;
		cp.tooltip = this.tooltip;
		cp.type = this.type;
		cp.validator = this.validator;
		cp.trigger = this.trigger;
		cp.triggerData = (this.triggerData != null ? SFS2X.SFSArray.newFromBinaryData(this.triggerData.toBinary()) : null);
		cp.clientOnly = this.clientOnly;
		cp.dataProvider = this.dataProvider;

		if (cloneValue)
			cp.value = this.value;

		if (this.attributes != null)
		{
			cp.attributes = new Object();
			for (let s1 in this.attributes)
				cp.attributes[s1] = this.attributes[s1];
		}

		if (this.separator != null)
		{
			cp.separator = new Object()
			for (let s2 in this.separator)
				cp.separator[s2] = this.separator[s2];
		}

		if (this.defaultListItem != null)
		{
			let clonedDefaultListItems = [];

			for (let subCP of this.defaultListItem)
				clonedDefaultListItems.push(subCP.clone(cloneValue));

			cp.defaultListItem = clonedDefaultListItems;
		}

		cp.listValues = this.listValues; // No need to clone this, as the listValues setter already does it
		cp.clazz = this.clazz;

		return cp;
	}

	/**
	 * Reset initial value by copying the current value.
	 */
	resetIsModified()
	{
		this._initialValue = this._value;

		// Reset sub-parameters
		if (this._listItems != null)
		{
			for (let listItem of this._listItems)
			{
				for (let subCP of listItem)
					subCP.resetIsModified();
			}
		}

		this._listItemsChanged = false;
	}

	addListItem(newListItem)
	{
		this._listItems.push(newListItem);
		this._listItemsChanged = true;
	}

	updateListItem(listItem, itemIndex)
	{
		this._listItems[itemIndex] = listItem;
		this._listItemsChanged = true;
	}

	removeListItem(itemIndex)
	{
		this._listItems.splice(itemIndex, 1);
		this._listItemsChanged = true;
	}

	toSfsObject()
	{
		let obj = new SFS2X.SFSObject();

		// Set changed setting name
		obj.putUtfString('name', this.name);

		// Set changed setting class, if any
		if (this.clazz != null)
			obj.putUtfString('clazz', this.clazz);

		if (this.value != null)
		{
			// Set changed setting value
			if (typeof this.value === 'boolean')
				obj.putBool('value', this.value);
			else if (typeof this.value === 'number')
				obj.putInt('value', this.value);
			else
				obj.putText('value', this.value);
		}
		else
		{
			// Set changed setting list of values

			let listItems = new SFS2X.SFSArray();

			for (let a of this._listItems)
			{
				if (a.length == 1) // We have just one sub config param; no need to parse it complitely
				{
					// Simple list
					let tempObj = a[0].toSfsObject();
					let wa = tempObj.getWrappedItem('value');
					listItems.add(wa.value, wa.type);
				}
				else
				{
					// Complex list

					let values = new SFS2X.SFSArray();

					for (let subCp of a)
						values.addSFSObject(subCp.toSfsObject());

					listItems.addSFSArray(values);
				}
			}

			obj.putSFSArray('value', listItems);
		}

		return obj;
	}

	/**
	 * Return a description of the ConfigurationParameter instance.
	 */
	toString()
	{
		let s = ``;
		s += `Configuration parameter: ${this.name}\n`;
		s += `\ttype: ${this.type}\n`;
		s += `\tlabel: ${this.label}\n`;
		s += `\tcategory name: ${this.category}\n`;
		s += `\tcategory id: ${this.categoryId}\n`;
		s += `\ttooltip: ${this.tooltip}\n`;
		s += `\tvalue: ${this.value}\n`;
		s += `\ttrigger: ${this.trigger}\n`;
		s += `\ttrigger data: ${this.triggerData}\n`;
		s += `\tclient only: ${this.clientOnly}\n`;
		s += `\tvalidator: ${this.validator}\n`;
		s += `\tis modified: ${this.isModified}\n`;

		if (this.attributes != null)
		{
			s += `\tcomponent attributes:\n`;

			for (let s1 in this.attributes)
				s += `\t\t${s1} --> ${this.attributes[s1]}\n`;
		}

		if (this.dataProvider != null)
			s += `\tdata provider: ${this.dataProvider}\n`;

		if (this.separator != null)
		{
			s += `\tseparator:\n`;

			for (let s2 in this.separator)
				s += `\t\t${s2} --> ${this.separator[s2]}\n`;
		}

		if (this._listItems != null && this._listItems.length > 0)
		{
			s += `\t# list items: ${this._listItems.length}\n`;

			for (let i = 0; i < this._listItems.length; i++)
			{
				s += `\tlist item ${i} sub-parameters:\n`;
				for (let e = 0; e < this._listItems[i].length; e++)
					s += `\t\t${this._listItems[i][e].toCompactString()}\n`;
			}

			s += `\tclass name: ${this.clazz}\n`;
		}

		return s;
	}

	/**
	 * Return a compact description of the ConfigurationParameter instance.
	 */
	toCompactString()
	{
		return `Configuration parameter '${this.name}': ${this.value} ${this.isModified ? '[X]' : '[ ]'}`;
	}

	//---------------------------------------------
	// PRIVATE METHODS
	//---------------------------------------------

	/**
	 * Retrieve the category id form the category name.
	 * Spaces and invalid characters are removed; words are separated using capitals.
	 */
	_setIdFromCategoryName(categoryName)
	{
		this._categoryId = categoryName;

		// Strip invalid characters
		var pattern = /[^0-9a-zA-Z]/g;
		this._categoryId = this._categoryId.replace(pattern, ' ');

		// Capitalize words
		var words = this._categoryId.split(' ');
		this._categoryId = '';

		for (let i = 0; i < words.length; i++)
		{
			let word = words[i];
			if (word.length > 0)
				this._categoryId += (i > 0 ? word.substr(0,1).toUpperCase() : word.substr(0,1).toLowerCase()) + (word.length > 1 ? word.substr(1) : "");
		}

		if (this._categoryId.length == 0)
			this._categoryId = this.DEFAULT_CATEGORY_ID;
	}

	_setSubConfigurationParams(_listValues)
	{
		this._listItems = [];

		for (let obj of _listValues)
		{
			let listItem = [];

			for (let defaultCP of this.defaultListItem)
			{
				let subCP = defaultCP.clone(false);
				subCP.value = obj[subCP.name];

				listItem.push(subCP);
			}

			this._listItems.push(listItem);
		}
	}

	_getSubConfigurationParamsValues()
	{
		let _listValues = [];

		for (let listItem of this._listItems)
		{
			let obj = {};

			for (let subCP of listItem)
			{
				if (subCP.value != null)
					obj[subCP.name] = subCP.value;
			}

			_listValues.push(obj);
		}

		return _listValues;
	}
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtMTF+bW9kdWxlLTEyfm1vZHVsZS04LmJ1bmRsZS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1jaGVjay1ib3guanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLWRyb3AtZG93bi1saXN0LmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL2NvbXBvbmVudHMvdWlidWlsZGVyL2NvbmZpZy1kdWFsLWxpc3QuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLWZvcm0taXRlbS5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3VpYnVpbGRlci9jb25maWctZ3JpZC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3VpYnVpbGRlci9jb25maWctbGFiZWwuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLW51bWVyaWMtc3RlcHBlci5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3VpYnVpbGRlci9jb25maWctdGV4dC1pbnB1dC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3VpYnVpbGRlci9jb25maWctdmVjdG9yLTNkLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL2NvbXBvbmVudHMvdWlidWlsZGVyL3dpZGdldHMvbGlzdC1pdGVtLWVkaXRvci5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3VpYnVpbGRlci93aWRnZXRzL3ZlY3Rvci0zZC1pbnB1dC5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9tb2R1bGVzL2Jhc2UtbW9kdWxlLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL3V0aWxzL3VpYnVpbGRlci9jb25maWctZm9ybS1pdGVtLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvdXRpbHMvdWlidWlsZGVyL2NvbmZpZy1pbnRlcmZhY2UtYnVpbGRlci5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy91dGlscy91aWJ1aWxkZXIvY29uZmlndXJhdGlvbi1wYXJhbWV0ZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb25maWdGb3JtSXRlbX0gZnJvbSAnLi9jb25maWctZm9ybS1pdGVtJztcbmltcG9ydCB7Q29uZmlnTGFiZWx9IGZyb20gJy4vY29uZmlnLWxhYmVsJztcblxuZXhwb3J0IGNsYXNzIENvbmZpZ0NoZWNrQm94IGV4dGVuZHMgQ29uZmlnRm9ybUl0ZW1cbntcblx0Y29uc3RydWN0b3IoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZylcblx0e1xuXHQgICAgc3VwZXIoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIHdpZGdldCB0byByZW5kZXIgdGhlIENvbmZpZ1BhcmFtZXRlciB2YWx1ZS5cblx0ICogSWYgcGFyYW1ldGVyIGlzIG5vdCBlZGl0YWJsZSwgYSBzaW1wbGUgbGFiZWwgaXMgdXNlZC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfZ2VuZXJhdGVJbm5lcldpZGdldCgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHQvLyBTZXQgd2lkZ2V0IGNvbmZpZ3VyYXRpb25cblx0XHRcdGxldCBjb25maWcgPSB7XG5cdFx0XHRcdHR5cGU6ICdjaGVja2JveCcsXG5cdFx0XHRcdGNsYXNzOiAnJyxcblx0XHRcdFx0aWQ6IHRoaXMuX2RhdGEubmFtZSxcblx0XHRcdFx0bmFtZTogdGhpcy5fZGF0YS5uYW1lLFxuXHRcdFx0XHQnZGF0YS1yb2xlJzogJ3N3aXRjaCcsXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBTZXQgd2lkZ2V0IGF0dHJpYnV0ZXMgKHNlZSBwYXJlbnQgY2xhc3MpXG5cdFx0XHR0aGlzLl9zZXRXaWRnZXRBdHRyaWJ1dGVzKGNvbmZpZyk7XG5cblx0XHRcdC8vIFNldCBhZGRpdGlvbmFsIHdpZGdldCBhdHRyaWJ1dGVzIGJhc2VkIG9uIHZhbGlkYXRpb24gcnVsZXMgKHNlZSBwYXJlbnQgY2xhc3MpXG5cdFx0XHR0aGlzLl9zZXRXaWRnZXRWYWxpZGF0aW9uQXR0cmlidXRlcyhjb25maWcpO1xuXG5cdFx0XHQvLyBDcmVhdGUgd2lkZ2V0J3MgaHRtbFxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbCA9ICQoJzxpbnB1dD4nLCBjb25maWcpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sID0gbmV3IENvbmZpZ0xhYmVsKCk7XG5cblx0XHQvLyBSZXR1cm4gY29tcG9uZW50XG5cdFx0cmV0dXJuIHRoaXMuX3dpZGdldEh0bWw7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB3aWRnZXQuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cbiAgIF9pbml0aWFsaXplKClcbiAgIHtcblx0ICAgaWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdCAgIHtcblx0XHQgICAvLyBJbml0aWFsaXplIGtlbmRvIHdpZGdldFxuXHRcdCAgIGtlbmRvLmluaXQodGhpcy5fd2lkZ2V0SHRtbCk7XG5cblx0XHQgICAvLyBTYXZlIHJlZi4gdG8gd2lkZ2V0XG5cdFx0ICAgdGhpcy5faW5uZXJXaWRnZXQgPSB0aGlzLl93aWRnZXRIdG1sLmRhdGEoJ2tlbmRvU3dpdGNoJyk7XG5cblx0XHQgICAvLyBFbmFibGUgdmFsdWUgY29tbWl0IGJpbmRpbmdcblx0XHQgICB0aGlzLl9pbm5lcldpZGdldC5iaW5kKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuX29uVmFsdWVJbnB1dCwgdGhpcykpO1xuXHQgICB9XG5cblx0ICAgLy8gUHJvY2VlZCB3aXRoIGluaXRpYWxpemF0aW9uXG5cdCAgIHN1cGVyLl9pbml0aWFsaXplKCk7XG4gICB9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyB2YWx1ZS5cblx0ICogSWYgcGFyYW1ldGVyIGlzIG5vdCBlZGl0YWJsZSwgdGhlIGxhYmVsIHRleHQgaXMgc2V0LlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRWYWx1ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHRcdHRoaXMuX2lubmVyV2lkZ2V0LnZhbHVlKHRoaXMuX2RhdGEudmFsdWUpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwudmFsdWUgPSB0aGlzLl9kYXRhLnZhbHVlO1xuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyBkaXNhYmxlZCBzdGF0ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0RWRpdEVuYWJsZWQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0XHR0aGlzLl9pbm5lcldpZGdldC5lbmFibGUodGhpcy5fZWRpdEVuYWJsZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBDb25maWd1cmF0aW9uIFBhcmFtZXRlciB2YWx1ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfb25WYWx1ZUlucHV0KGUpXG5cdHtcblx0XHQvLyBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdG8gbmV3IHZhbHVlXG5cdFx0dGhpcy5fZGF0YS52YWx1ZSA9IHRoaXMuX2lubmVyV2lkZ2V0LnZhbHVlKCk7XG5cblx0XHQvLyBUcmlnZ2VyIGV2ZW50XG5cdFx0dGhpcy5fdHJpZ2dlckV2ZW50KCk7XG5cdH1cbn1cblxuLy8gREVGSU5FIENPTVBPTkVOVFxuaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCdjb25maWctY2hlY2stYm94JykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NvbmZpZy1jaGVjay1ib3gnLCBDb25maWdDaGVja0JveCk7XG4iLCJpbXBvcnQge0NvbmZpZ0Zvcm1JdGVtfSBmcm9tICcuL2NvbmZpZy1mb3JtLWl0ZW0nO1xuaW1wb3J0IHtDb25maWdMYWJlbH0gZnJvbSAnLi9jb25maWctbGFiZWwnO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnRHJvcERvd25MaXN0IGV4dGVuZHMgQ29uZmlnRm9ybUl0ZW1cbntcblx0Y29uc3RydWN0b3IoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZylcblx0e1xuXHQgICAgc3VwZXIoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIHdpZGdldCB0byByZW5kZXIgdGhlIENvbmZpZ1BhcmFtZXRlciB2YWx1ZS5cblx0ICogSWYgcGFyYW1ldGVyIGlzIG5vdCBlZGl0YWJsZSwgYSBzaW1wbGUgbGFiZWwgaXMgdXNlZC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfZ2VuZXJhdGVJbm5lcldpZGdldCgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHQvLyBTZXQgd2lkZ2V0IGNvbmZpZ3VyYXRpb25cblx0XHRcdGxldCBjb25maWcgPSB7XG5cdFx0XHRcdGNsYXNzOiAnZm9ybS1jb250cm9sJyxcblx0XHRcdFx0aWQ6IHRoaXMuX2RhdGEubmFtZSxcblx0XHRcdFx0bmFtZTogdGhpcy5fZGF0YS5uYW1lLFxuXHRcdFx0XHQnZGF0YS1yb2xlJzogJ2Ryb3Bkb3dubGlzdCcsXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBTZXQgd2lkZ2V0IGF0dHJpYnV0ZXMgKHNlZSBwYXJlbnQgY2xhc3MpXG5cdFx0XHR0aGlzLl9zZXRXaWRnZXRBdHRyaWJ1dGVzKGNvbmZpZyk7XG5cblx0XHRcdC8vIFNldCBhZGRpdGlvbmFsIHdpZGdldCBhdHRyaWJ1dGVzIGJhc2VkIG9uIHZhbGlkYXRpb24gcnVsZXMgKHNlZSBwYXJlbnQgY2xhc3MpXG5cdFx0XHR0aGlzLl9zZXRXaWRnZXRWYWxpZGF0aW9uQXR0cmlidXRlcyhjb25maWcpO1xuXG5cdFx0XHQvLyBDcmVhdGUgd2lkZ2V0J3MgaHRtbFxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbCA9ICQoJzxpbnB1dD4nLCBjb25maWcpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sID0gbmV3IENvbmZpZ0xhYmVsKCk7XG5cblx0XHQvLyBSZXR1cm4gY29tcG9uZW50XG5cdFx0cmV0dXJuIHRoaXMuX3dpZGdldEh0bWw7XG5cdH1cblxuXHQvKipcblx0ICogSW5pdGlhbGl6ZSB3aWRnZXQuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cbiAgIF9pbml0aWFsaXplKClcbiAgIHtcblx0ICAgaWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdCAgIHtcblx0XHQgICAvLyBJbml0aWFsaXplIGtlbmRvIHdpZGdldFxuXHRcdCAgIGtlbmRvLmluaXQodGhpcy5fd2lkZ2V0SHRtbCk7XG5cblx0XHQgICAvLyBTYXZlIHJlZi4gdG8gd2lkZ2V0XG5cdFx0ICAgdGhpcy5faW5uZXJXaWRnZXQgPSB0aGlzLl93aWRnZXRIdG1sLmRhdGEoJ2tlbmRvRHJvcERvd25MaXN0Jyk7XG5cblx0XHQgICAvLyBTZXQgbGlzdCBpdGVtc1xuXHRcdCAgIHRoaXMuX2lubmVyV2lkZ2V0LnNldERhdGFTb3VyY2UodGhpcy5fZ2V0RGF0YVNvdXJjZSh0aGlzLl9kYXRhLmRhdGFQcm92aWRlcikpXG5cblx0XHQgICAvLyBFbmFibGUgdmFsdWUgY29tbWl0IGJpbmRpbmdcblx0XHQgICB0aGlzLl93aWRnZXRIdG1sLmJpbmQoJ2NoYW5nZScsICQucHJveHkodGhpcy5fb25WYWx1ZUlucHV0LCB0aGlzKSk7XG5cdCAgIH1cblxuXHQgICAvLyBQcm9jZWVkIHdpdGggaW5pdGlhbGl6YXRpb25cblx0ICAgc3VwZXIuX2luaXRpYWxpemUoKTtcbiAgIH1cblxuXHQvKipcblx0ICogU2V0IHdpZGdldCdzIHZhbHVlLlxuXHQgKiBJZiBwYXJhbWV0ZXIgaXMgbm90IGVkaXRhYmxlLCB0aGUgbGFiZWwgdGV4dCBpcyBzZXQuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X3NldFdpZGdldFZhbHVlKClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdFx0dGhpcy5faW5uZXJXaWRnZXQudmFsdWUodGhpcy5fZGF0YS52YWx1ZSk7XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbC52YWx1ZSA9IHRoaXMuX2RhdGEudmFsdWU7XG5cblx0XHQvLyBUcmlnZ2VyIGV2ZW50XG5cdFx0dGhpcy5fdHJpZ2dlckV2ZW50KCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHdpZGdldCdzIGRpc2FibGVkIHN0YXRlLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRFZGl0RW5hYmxlZCgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHRcdHRoaXMuX2lubmVyV2lkZ2V0LndyYXBwZXIuYXR0cignZGlzYWJsZWQnLCAhdGhpcy5fZWRpdEVuYWJsZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBDb25maWd1cmF0aW9uIFBhcmFtZXRlciB2YWx1ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfb25WYWx1ZUlucHV0KGUpXG5cdHtcblx0XHQvLyBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdG8gbmV3IHZhbHVlXG5cdFx0dGhpcy5fZGF0YS52YWx1ZSA9IHRoaXMuX2lubmVyV2lkZ2V0LnZhbHVlKCk7XG5cblx0XHQvLyBUcmlnZ2VyIGV2ZW50XG5cdFx0dGhpcy5fdHJpZ2dlckV2ZW50KCk7XG5cdH1cblxuXHRfZ2V0RGF0YVNvdXJjZShkcFN0cmluZylcblx0e1xuXHRcdGlmIChkcFN0cmluZylcblx0XHRcdHJldHVybiBkcFN0cmluZy5zcGxpdCgnLCcpO1xuXG5cdFx0Ly8gSW4gY2FzZSB0aGUgZGF0YXByb3ZpZGVyIGlzIGVtcHR5LCBhZGQgYXQgbGVhc3QgdGhlIGN1cnJlbnQgdmFsdWVcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4gW3RoaXMuX2RhdGEudmFsdWVdO1xuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnY29uZmlnLWRyb3AtZG93bi1saXN0JykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NvbmZpZy1kcm9wLWRvd24tbGlzdCcsIENvbmZpZ0Ryb3BEb3duTGlzdCk7XG4iLCJpbXBvcnQge0NvbmZpZ0Zvcm1JdGVtfSBmcm9tICcuL2NvbmZpZy1mb3JtLWl0ZW0nO1xuaW1wb3J0IHtDb25maWdMYWJlbH0gZnJvbSAnLi9jb25maWctbGFiZWwnO1xuXG5leHBvcnQgY2xhc3MgQ29uZmlnRHVhbExpc3QgZXh0ZW5kcyBDb25maWdGb3JtSXRlbVxue1xuXHRjb25zdHJ1Y3Rvcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKVxuXHR7XG5cdCAgICBzdXBlcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgd2lkZ2V0IHRvIHJlbmRlciB0aGUgQ29uZmlnUGFyYW1ldGVyLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9nZW5lcmF0ZUlubmVyV2lkZ2V0KClcblx0e1xuXHRcdHRoaXMuX3dpZGdldEh0bWwgPSAkKCc8ZGl2PicpO1xuXG5cdFx0Y29uc3QgYXZhaWxhYmxlSWQgPSB0aGlzLl9nZXRJZCh0aGlzLl9kYXRhLm5hbWUsICdhdmFpbGFibGUnKTtcblx0XHRjb25zdCBzZWxlY3RlZElkID0gdGhpcy5fZ2V0SWQodGhpcy5fZGF0YS5uYW1lLCAnc2VsZWN0ZWQnKTtcblxuXHRcdC8vIENyZWF0ZSBoZWFkZXIgZm9yIGxhYmVsc1xuXHRcdGxldCBoZWFkZXIgPSAkKCc8ZGl2PicsIHtjbGFzczogJ2Zvcm0tbGFiZWwtY29udGFpbmVyIGR1YWwtbGlzdC1sYWJlbHMnfSk7XG5cblx0XHRoZWFkZXIuYXBwZW5kKCQoJzxsYWJlbD4nLCB7XG5cdFx0XHRjbGFzczogJ2ZvbnQtaXRhbGljIGZvcm0tbGFiZWwgZHVhbC1saXN0LWxlZnQtY29sJyArICghdGhpcy5fZGF0YS5lZGl0YWJsZSA/ICcgbm8taW50ZXJhY3QnIDogJycpLFxuXHRcdFx0Zm9yOiBhdmFpbGFibGVJZCxcblx0XHR9KS50ZXh0KCdBdmFpbGFibGUnKSk7XG5cblx0XHRoZWFkZXIuYXBwZW5kKCQoJzxsYWJlbD4nLCB7XG5cdFx0XHRjbGFzczogJ2ZvbnQtaXRhbGljIGZvbnQtd2VpZ2h0LWJvbGQgZm9ybS1sYWJlbCBkdWFsLWxpc3QtcmlnaHQtY29sJyArICghdGhpcy5fZGF0YS5lZGl0YWJsZSA/ICcgbm8taW50ZXJhY3QnIDogJycpLFxuXHRcdFx0Zm9yOiBzZWxlY3RlZElkLFxuXHRcdH0pLnRleHQoJ1NlbGVjdGVkJykpO1xuXG5cdFx0dGhpcy5fd2lkZ2V0SHRtbC5hcHBlbmQoaGVhZGVyKTtcblxuXHRcdC8vIEFkZCBhdmFpbGFibGUgaXRlbXMgbGlzdFxuXHRcdHRoaXMuX2F2YWlsYWJsZUxpc3RIdG1sID0gJCgnPHNlbGVjdD4nLCB7XG5cdFx0XHRpZDogYXZhaWxhYmxlSWQsXG5cdFx0XHRjbGFzczogJ2R1YWwtbGlzdC1sZWZ0LWNvbCcgKyAoIXRoaXMuX2RhdGEuZWRpdGFibGUgPyAnIG5vLWludGVyYWN0JyA6ICcnKSxcblx0XHR9KTtcblx0XHR0aGlzLl93aWRnZXRIdG1sLmFwcGVuZCh0aGlzLl9hdmFpbGFibGVMaXN0SHRtbCk7XG5cblx0XHQvLyBBZGQgc2VsZWN0ZWQgaXRlbXMgbGlzdFxuXHRcdHRoaXMuX3NlbGVjdGVkTGlzdEh0bWwgPSAkKCc8c2VsZWN0PicsIHtcblx0XHRcdGlkOiBzZWxlY3RlZElkLFxuXHRcdFx0Y2xhc3M6ICdkdWFsLWxpc3QtcmlnaHQtY29sJyArICghdGhpcy5fZGF0YS5lZGl0YWJsZSA/ICcgbm8taW50ZXJhY3QnIDogJycpLFxuXHRcdH0pO1xuXHRcdHRoaXMuX3dpZGdldEh0bWwuYXBwZW5kKHRoaXMuX3NlbGVjdGVkTGlzdEh0bWwpO1xuXG5cdFx0Ly8gUmV0dXJuIGNvbXBvbmVudFxuXHRcdHJldHVybiB0aGlzLl93aWRnZXRIdG1sO1xuXHR9XG5cblx0Ly8gSURzIGNvbnRhaW5pbmcgYSBcIi5cIiBjYXVzZSBpc3N1ZXMgdG8gY29ubmVjdGVkIGxpc3RzXG5cdF9nZXRJZChuYW1lLCBzdWZmaXgpXG5cdHtcblx0XHRyZXR1cm4gbmFtZS5yZXBsYWNlKCcuJywgJ18nKSArICctJyArIHN1ZmZpeDtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIHdpZGdldC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfaW5pdGlhbGl6ZSgpXG5cdHtcblx0XHQvLyBJbml0aWFsaXplIFwiYXZhbGFibGVcIiBsaXN0Ym94XG5cdFx0dGhpcy5fYXZhaWxhYmxlTGlzdCA9IHRoaXMuX2F2YWlsYWJsZUxpc3RIdG1sLmtlbmRvTGlzdEJveCh7XG4gICAgICAgICAgICBjb25uZWN0V2l0aDogdGhpcy5fZ2V0SWQodGhpcy5fZGF0YS5uYW1lLCAnc2VsZWN0ZWQnKSxcbiAgICAgICAgICAgIHRvb2xiYXI6IHtcbiAgICAgICAgICAgICAgICB0b29sczogdGhpcy5fZGF0YS5lZGl0YWJsZSA/IFsndHJhbnNmZXJUbycsICd0cmFuc2ZlckZyb20nLCAndHJhbnNmZXJBbGxUbycsICd0cmFuc2ZlckFsbEZyb20nXSA6IFtdXG4gICAgICAgICAgICB9LFxuXHRcdFx0dGVtcGxhdGU6IFwiPGRpdj4jOnZhbHVlIzwvZGl2PlwiLFxuXHRcdFx0c2VsZWN0YWJsZTogJ211bHRpcGxlJyxcbiAgICAgICAgfSkuZGF0YSgna2VuZG9MaXN0Qm94Jyk7XG5cblx0XHQvLyBJbml0aWFsaXplIFwic2VsZWN0ZWRcIiBsaXN0Ym94XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkTGlzdCA9IHRoaXMuX3NlbGVjdGVkTGlzdEh0bWwua2VuZG9MaXN0Qm94KHtcblx0XHRcdHRlbXBsYXRlOiBcIjxkaXY+Izp2YWx1ZSM8L2Rpdj5cIixcblx0XHRcdHNlbGVjdGFibGU6ICdtdWx0aXBsZScsXG5cdFx0XHQvLyBUaGUgZm9sbG93aW5nIGxpc3RlbmVycyBjYW4ndCBiZSB1c2VkIGJlY2F1c2UgZXZlbnRzIGFyZSBmaXJlZCBiZWZvcmUgdGhlIGRhdGFzb3VyY2UgaXMgYWN0dWFsbHkgdXBkYXRlZFxuXHRcdFx0Ly8gV2UgaGF2ZSB0byB1c2UgYSBjaGFuZ2UgZXZlbnQgbGlzdGVuZXIgb24gdGhlIGRhdGFzb3VyY2UgKHNlZSBiZWxvdyksIGV2ZW4gaWYgbm90IG9wdGltYWxcblx0XHRcdC8vYWRkOiAkLnByb3h5KHRoaXMuX29uVmFsdWVJbnB1dCwgdGhpcyksXG5cdFx0XHQvL3JlbW92ZTogJC5wcm94eSh0aGlzLl9vblZhbHVlSW5wdXQsIHRoaXMpLFxuXHRcdH0pLmRhdGEoJ2tlbmRvTGlzdEJveCcpO1xuXG5cdFx0Ly8gUHJvY2VlZCB3aXRoIGluaXRpYWxpemF0aW9uXG5cdFx0c3VwZXIuX2luaXRpYWxpemUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgd2lkZ2V0J3MgZGF0YXNvdXJjZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0VmFsdWUoKVxuXHR7XG5cdFx0bGV0IGF2YWlsYWJsZUFyciA9IHRoaXMuX2RhdGEuZGF0YVByb3ZpZGVyICE9ICcnID8gdGhpcy5fZGF0YS5kYXRhUHJvdmlkZXIuc3BsaXQoJywnKSA6IFtdO1xuXHRcdGxldCBzZWxlY3RlZEFyciA9IHRoaXMuX2RhdGEudmFsdWUgIT0gJycgPyB0aGlzLl9kYXRhLnZhbHVlLnNwbGl0KCcsJykgOiBbXTtcblxuXHRcdC8vIFJlbW92ZSBzZWxlY3RlZCB2YWx1ZXMgZnJvbSBhdmFpbGFibGUgdmFsdWVzXG5cdFx0aWYgKHNlbGVjdGVkQXJyLmxlbmd0aCA+IDApXG5cdFx0e1xuXHRcdFx0bGV0IHRlbXAgPSBbXTtcblxuXHRcdFx0Zm9yIChsZXQgdmFsIG9mIGF2YWlsYWJsZUFycilcblx0XHRcdHtcblx0XHRcdFx0aWYgKHNlbGVjdGVkQXJyLmluZGV4T2YodmFsKSA9PSAtMSlcblx0XHRcdFx0XHR0ZW1wLnB1c2godmFsKTtcblx0XHRcdH1cblxuXHRcdFx0YXZhaWxhYmxlQXJyID0gdGVtcDtcblx0XHR9XG5cblx0XHQvLyBDb252ZXJ0IGxpc3RzIG9mIHN0cmluZ3MgdG8gbGlzdHMgb2Ygb2JqZWN0c1xuXHRcdGxldCBhdmFpbGFibGVWYWx1ZXMgPSBbXTtcblx0XHRmb3IgKGxldCB2YWwgb2YgYXZhaWxhYmxlQXJyKVxuXHRcdFx0YXZhaWxhYmxlVmFsdWVzLnB1c2goe3ZhbHVlOiB2YWx9KTtcblxuXHRcdGxldCBzZWxlY3RlZFZhbHVlcyA9IFtdO1xuXHRcdGZvciAobGV0IHZhbCBvZiBzZWxlY3RlZEFycilcblx0XHRcdHNlbGVjdGVkVmFsdWVzLnB1c2goe3ZhbHVlOiB2YWx9KTtcblxuXHRcdC8vIENsZWFyIHNlbGVjdGlvblxuXHRcdHRoaXMuX2F2YWlsYWJsZUxpc3QuY2xlYXJTZWxlY3Rpb24oKTtcblx0XHR0aGlzLl9zZWxlY3RlZExpc3QuY2xlYXJTZWxlY3Rpb24oKTtcblxuXHRcdC8vIFNldCBkYXRhc291cmNlc1xuXHRcdHRoaXMuX2F2YWlsYWJsZUxpc3Quc2V0RGF0YVNvdXJjZShuZXcga2VuZG8uZGF0YS5EYXRhU291cmNlKHtcblx0XHRcdGRhdGE6IGF2YWlsYWJsZVZhbHVlc1xuXHRcdH0pKTtcblxuXHRcdHRoaXMuX3NlbGVjdGVkTGlzdC5zZXREYXRhU291cmNlKG5ldyBrZW5kby5kYXRhLkRhdGFTb3VyY2Uoe1xuXHRcdFx0ZGF0YTogc2VsZWN0ZWRWYWx1ZXMsXG5cdFx0XHQvLyBXZSBsaXN0ZW4gdG8gdGhlIGNoYW5nZSBldmVudCBpbnN0ZWFkIG9mIHRoZSBhZGQvcmVtb3ZlIGV2ZW50cyBvbiB0aGUgbGlzdGJveCwgYmVjYXVzZSB0aG9zZSBhcmUgZmlyZWQgYmVmb3JlIHRoZSBkYXRhc291cmNlIGlzIHVwZGF0ZWRcblx0XHRcdC8vIFRoaXMgaXMgbm90IG9wdGltYWwgYmVjYXVzZSB0aGUgZXZlbnQgaXMgZmlyZWQgZm9yIGVhY2ggaXRlbSBhZGRlZCB0byBvciByZW1vdmVkIGZyb20gdGhlIGRhdGFzb3VyY2Vcblx0XHRcdGNoYW5nZTogJC5wcm94eSh0aGlzLl9vblZhbHVlSW5wdXQsIHRoaXMpXG5cdFx0fSkpO1xuXG5cdFx0Ly8gRGlzYWJsZSBlZGl0aW5nXG5cdFx0aWYgKCF0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdHtcblx0XHRcdHRoaXMuX2F2YWlsYWJsZUxpc3QuZW5hYmxlKCcuay1pdGVtJywgZmFsc2UpO1xuXHRcdFx0dGhpcy5fc2VsZWN0ZWRMaXN0LmVuYWJsZSgnLmstaXRlbScsIGZhbHNlKTtcblx0XHR9XG5cblx0XHQvLyBUcmlnZ2VyIGV2ZW50XG5cdFx0dGhpcy5fdHJpZ2dlckV2ZW50KCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHdpZGdldCdzIGRpc2FibGVkIHN0YXRlLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRFZGl0RW5hYmxlZCgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHQvLyBDbGVhciBzZWxlY3Rpb25cblx0XHRcdHRoaXMuX2F2YWlsYWJsZUxpc3QuY2xlYXJTZWxlY3Rpb24oKTtcblx0XHRcdHRoaXMuX3NlbGVjdGVkTGlzdC5jbGVhclNlbGVjdGlvbigpO1xuXG5cdFx0XHQvLyBFbmFibGUvZGlzYWJsZSBsaXN0c1xuXHRcdFx0dGhpcy5fYXZhaWxhYmxlTGlzdC53cmFwcGVyLmF0dHIoJ2Rpc2FibGVkJywgIXRoaXMuX2VkaXRFbmFibGVkKTtcblx0XHRcdHRoaXMuX3NlbGVjdGVkTGlzdC53cmFwcGVyLmF0dHIoJ2Rpc2FibGVkJywgIXRoaXMuX2VkaXRFbmFibGVkKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIHZhbHVlLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9vblZhbHVlSW5wdXQoZSlcblx0e1xuXHRcdGxldCBsaXN0RGF0YSA9IHRoaXMuX3NlbGVjdGVkTGlzdC5kYXRhU291cmNlLmRhdGEoKTtcblxuXHRcdC8vIFVwZGF0ZSBDb25maWd1cmF0aW9uIFBhcmFtZXRlciB0byBuZXcgdmFsdWVcblx0XHR0aGlzLl9kYXRhLnZhbHVlID0gbGlzdERhdGEubWFwKGUgPT4gZS52YWx1ZSkuam9pbignLCcpO1xuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnY29uZmlnLWR1YWwtbGlzdCcpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb25maWctZHVhbC1saXN0JywgQ29uZmlnRHVhbExpc3QpO1xuIiwiZXhwb3J0IGNsYXNzIENvbmZpZ0Zvcm1JdGVtIGV4dGVuZHMgSFRNTEVsZW1lbnRcbntcblx0Y29uc3RydWN0b3IoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZylcblx0e1xuXHQgICAgc3VwZXIoKTtcblxuXHRcdHRoaXMuaWQgPSAnZm9ybS1pdGVtLScgKyBjb25maWdQYXJhbS5uYW1lO1xuXHRcdHRoaXMuX2VkaXRFbmFibGVkID0gZWRpdEVuYWJsZWQ7XG5cdFx0dGhpcy5fZGF0YSA9IGNvbmZpZ1BhcmFtO1xuXG5cdFx0Ly8gQ3JlYXRlIGZvcm0gaXRlbSB2aWV3XG5cdFx0dGhpcy5fYnVpbGRWaWV3KGluRGlhbG9nKTtcblxuXHRcdC8vIEluaXRpYWxpemUgZm9ybSBpdGVtXG5cdFx0dGhpcy5faW5pdGlhbGl6ZSgpO1xuXHR9XG5cblx0Y29ubmVjdGVkQ2FsbGJhY2soKVxuXHR7XG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdC8vIE5PVEU6IHdoZW4gYSBDb25maWdGb3JtSXRlbSBpcyBpbnN0YW50aWF0ZWQsIHRoZSBfdHJpZ2dlckV2ZW50IG1ldGhvZCBpcyBjYWxsZWQgYXMgc29vbiBhcyBpdHMgdmFsdWUgaXMgc2V0LlxuXHRcdC8vIFdoZW4gdGhpcyBoYXBwZW5zbywgZHVlIHRvIHRoZSBmYWN0IHRoYXQgdGhlIG9iamVjdCBpcyBub3QgeWV0IGluIHRoZSBET00sIHRoZSBldmVudCBpcyBub3QgY2F0Y2hlZCBieSB0aGUgbGlzdGVuZXJcblx0XHQvLyAod2hpY2ggaXMgYXR0YWNoZWQgdG8gdGhlIG91dGVyIGNvbnRhaW5lcikuIFNvIGZvcmNpbmcgdGhlIGV2ZW50IHRvIHRyaWdnZXIgYWdhaW4gYXMgc29vbiBhcyB0aGUgQ29uZmlnRm9ybUl0ZW1cblx0XHQvLyBpcyBhcHBlbmRlZCB0byB0aGUgRE9NIGlzIG5lZWRlZC5cblx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoKTtcblx0fVxuXG5cdHNldCBkYXRhKGNvbmZpZ1BhcmFtKVxuXHR7XG5cdFx0dGhpcy5fZGF0YSA9IGNvbmZpZ1BhcmFtO1xuXHRcdHRoaXMuX3NldFdpZGdldFZhbHVlKCk7XG5cdH1cblxuXHRnZXQgZGF0YSgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fZGF0YTtcblx0fVxuXG5cdHNldCBlZGl0RW5hYmxlZChlbmFibGUpXG5cdHtcblx0XHRpZiAoZW5hYmxlICE9IHRoaXMuX2VkaXRFbmFibGVkKVxuXHRcdHtcblx0XHRcdHRoaXMuX2VkaXRFbmFibGVkID0gZW5hYmxlO1xuXHRcdFx0dGhpcy5fc2V0V2lkZ2V0RWRpdEVuYWJsZWQoKTtcblx0XHR9XG5cdH1cblxuXHRnZXQgZWRpdEVuYWJsZWQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2VkaXRFbmFibGVkO1xuXHR9XG5cblx0X2J1aWxkVmlldyhpc0luc2lkZURpYWxvZylcblx0e1xuXHRcdGlmICghaXNJbnNpZGVEaWFsb2cpXG5cdFx0e1xuXHRcdFx0Ly8gU2V0IGFkZGl0aW9uYWwgY2xhc3NlcyBmb3IgaW5uZXIgd2lkZ2V0XG5cdFx0XHRsZXQgY2xhc3NOYW1lcyA9ICcnO1xuXG5cdFx0XHRzd2l0Y2ggKHRoaXMuX2RhdGEudHlwZSlcblx0XHRcdHtcblx0XHRcdFx0Y2FzZSAnRHVhbExpc3QnOlxuXHRcdFx0XHRcdGNsYXNzTmFtZXMgPSAnY29sLXNtLTcgY29sLWxnLTgnO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdEYXRhR3JpZCc6XG5cdFx0XHRcdFx0Y2xhc3NOYW1lcyA9ICdjb2wtc20nOyAvLyBVc2UgJ2NvbC1zbS03IGNvbC1sZy04JyBmb3IgRGF0YUdyaWQgdG9vP1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGNsYXNzTmFtZXMgPSAnY29sLXNtLWF1dG8nO1xuXG5cdFx0XHR9XG5cblx0XHRcdC8vIEdlbmVyYXRlIGJvaWxlcnBsYXRlIGh0bWwsIHN1cnJvdW5kaW5nIHRoZSBhY3R1YWwgd2lkZ2V0IChsYWJlbCwgbnVtZXJpYyBzdGVwcGVyLCBldGMpXG5cdFx0XHR0aGlzLmlubmVySFRNTCA9IGBcblx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgcG9zaXRpb24tcmVsYXRpdmUgcm93XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cImNvbC1zbS01IGNvbC1sZy00IGNvbC1mb3JtLWxhYmVsIGZvcm0tbGFiZWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdFx0XHQ8bGFiZWwgZm9yPVwiJHt0aGlzLl9kYXRhLm5hbWV9XCIgY2xhc3M9XCJmb3JtLWxhYmVsICR7KHRoaXMuX2RhdGEuY2xpZW50T25seSA/ICdjbGllbnQtb25seScgOiAnJyl9XCI+JHt0aGlzLl9kYXRhLmxhYmVsfSA8aSBjbGFzcz1cImZhcyBmYS1xdWVzdGlvbi1jaXJjbGUgdGV4dC1tdXRlZCBoZWxwXCIgdGl0bGU9XCIke3RoaXMuX2RhdGEudG9vbHRpcH1cIj48L2k+PC9sYWJlbD5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaW5uZXItd2lkZ2V0IGFsaWduLXNlbGYtY2VudGVyICR7Y2xhc3NOYW1lc31cIj5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiay1pbnZhbGlkLW1zZ1wiIGRhdGEtZm9yPVwiJHt0aGlzLl9kYXRhLm5hbWV9XCI+PC9zcGFuPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdGA7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHR0aGlzLmlubmVySFRNTCA9IGBcblx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgcG9zaXRpb24tcmVsYXRpdmVcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29sLWZvcm0tbGFiZWwgZm9ybS1sYWJlbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdDxsYWJlbCBmb3I9XCIke3RoaXMuX2RhdGEubmFtZX1cIiBjbGFzcz1cImZvcm0tbGFiZWwgJHsodGhpcy5fZGF0YS5jbGllbnRPbmx5ID8gJ2NsaWVudC1vbmx5JyA6ICcnKX1cIj4ke3RoaXMuX2RhdGEubGFiZWx9IDxpIGNsYXNzPVwiZmFzIGZhLXF1ZXN0aW9uLWNpcmNsZSB0ZXh0LW11dGVkIGhlbHBcIiB0aXRsZT1cIiR7dGhpcy5fZGF0YS50b29sdGlwfVwiPjwvaT48L2xhYmVsPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbm5lci13aWRnZXRcIj5cblx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiay1pbnZhbGlkLW1zZ1wiIGRhdGEtZm9yPVwiJHt0aGlzLl9kYXRhLm5hbWV9XCI+PC9zcGFuPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdGA7XG5cdFx0fVxuXG5cdFx0Ly8gQ3JlYXRlIGlubmVyIHdpZGdldCAobXVzdCBiZSBvdmVycmlkZGVuKVxuXHRcdGxldCB3aWRnZXQgPSB0aGlzLl9nZW5lcmF0ZUlubmVyV2lkZ2V0KCk7XG5cblx0XHQvLyBBcHBlbmQgaW5uZXIgd2lkZ2V0XG5cdFx0JCh0aGlzKS5maW5kKCcuaW5uZXItd2lkZ2V0JykucHJlcGVuZCh3aWRnZXQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRPIEJFIE9WRVJSSURERU5cblx0ICovXG5cdF9nZW5lcmF0ZUlubmVyV2lkZ2V0KClcblx0e1xuXHRcdC8vIFNob3cgYW4gZXJyb3IsIHNob3VsZCBiZSBvdmVycmlkZGVuXG5cdFx0Y29uc29sZS5lcnJvcihgVW5hYmxlIHRvIGNyZWF0ZSAke3RoaXMuX2RhdGEudHlwZX0gZm9ybSBpdGVtIGZvciBjb25maWd1cmF0aW9uIHBhcmFtZXRlciAke3RoaXMuaWR9YCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IGF0dHJpYnV0ZXMgb24gdGhlIHdpZGdldCBjb25maWd1cmF0aW9uIG9iamVjdC5cblx0ICovXG5cdF9zZXRXaWRnZXRBdHRyaWJ1dGVzKGNvbmZpZylcblx0e1xuXHRcdGNvbnN0IGF0dHJpYnMgPSB0aGlzLl9kYXRhLmF0dHJpYnV0ZXM7XG5cblx0XHRpZiAoYXR0cmlicylcblx0XHR7XG5cdFx0XHRmb3IgKGxldCBhdHRyIGluIGF0dHJpYnMpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbmZpZ1thdHRyXSA9IGF0dHJpYnNbYXR0cl07XG5cblx0XHRcdFx0aWYgKGF0dHIgPT0gJ3BhdHRlcm4nKVxuXHRcdFx0XHRcdGNvbmZpZ1snZGF0YS1wYXR0ZXJuLW1zZyddID0gJ0NvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyc7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFNldCBhZGRpdGlvbmFsIGF0dHJpYnV0ZXMgb24gdGhlIHdpZGdldCBjb25maWd1cmF0aW9uIG9iamVjdCB0byBwcm9wZXJseSB2YWxpZGF0ZSBpbnB1dC5cblx0ICovXG5cdF9zZXRXaWRnZXRWYWxpZGF0aW9uQXR0cmlidXRlcyhjb25maWcpXG5cdHtcblx0XHRjb25zdCB2YWwgPSB0aGlzLl9kYXRhLnZhbGlkYXRvcjtcblxuXHRcdGlmICh2YWwgIT0gbnVsbCAmJiB2YWwgIT0gJycpXG5cdFx0e1xuXHRcdFx0aWYgKHZhbCA9PSAnaXAnKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25maWdbJ3BhdHRlcm4nXSA9ICdeKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPylcXC4oMjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KVxcLigyNVswLTVdfDJbMC00XVswLTldfFswMV0/WzAtOV1bMC05XT8pXFwuKDI1WzAtNV18MlswLTRdWzAtOV18WzAxXT9bMC05XVswLTldPykkJztcblx0XHRcdFx0Y29uZmlnWydkYXRhLXBhdHRlcm4tbXNnJ10gPSAnSW52YWxpZCBJUCBhZGRyZXNzJztcblx0XHRcdFx0Y29uZmlnWydyZXF1aXJlZCddID0gdHJ1ZTtcblx0XHRcdFx0Y29uZmlnWydkYXRhLXJlcXVpcmVkLW1zZyddID0gJ1JlcXVpcmVkJztcblx0XHRcdH1cblxuXHRcdFx0ZWxzZSBpZiAodmFsID09ICdub3ROdWxsJylcblx0XHRcdHtcblx0XHRcdFx0Y29uZmlnWydyZXF1aXJlZCddID0gdHJ1ZTtcblx0XHRcdFx0Y29uZmlnWydkYXRhLXJlcXVpcmVkLW1zZyddID0gJ1JlcXVpcmVkJztcblx0XHRcdH1cblxuXHRcdFx0ZWxzZSBpZiAodmFsID09ICdwd2QnKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25maWdbJ3BhdHRlcm4nXSA9ICdeLns2LH0kJztcblx0XHRcdFx0Y29uZmlnWydkYXRhLXBhdHRlcm4tbXNnJ10gPSAnTWluaW11bSBsZW5ndGg6IDYgY2hhcmFjdGVycyc7XG5cdFx0XHR9XG5cblx0XHRcdGVsc2UgaWYgKHZhbCA9PSAncG9zTnVtJylcblx0XHRcdHtcblx0XHRcdFx0Y29uZmlnWydwYXR0ZXJuJ10gPSAnXlswLTldXFxkKiQnO1xuXHRcdFx0XHRjb25maWdbJ2RhdGEtcGF0dGVybi1tc2cnXSA9ICdOb24tbmVnYXRpdmUgbnVtYmVyIHJlcXVpcmVkJztcblx0XHRcdH1cblxuXHRcdFx0ZWxzZSBpZiAodmFsID09ICdhb2knKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBOb3RoaW5nIHRvIGRvXG5cdFx0XHRcdC8vIFNlZSBLZW5kbyB2YWxpZGF0aW9uIGluaXRpYWxpemF0aW9uIGluIGNvbmZpZy1pbnRlcmZhY2UtYnVpbGRlci5qc1xuXHRcdFx0fVxuXG5cdFx0XHRlbHNlIGlmICh2YWwgPT0gJ3VybCcpXG5cdFx0XHR7XG5cdFx0XHRcdGNvbmZpZ1sndHlwZSddID0gJ3VybCc7XG5cdFx0XHRcdGNvbmZpZ1snZGF0YS11cmwtbXNnJ10gPSAnSW52YWxpZCBVUkwnO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIGZvcm0gaXRlbS5cblx0ICpcblx0ICogTk9URTogbXVzdCBiZSBvdmVycmlkZGVuIGlmIGlubmVyIHdpZGdldCByZXF1aXJlcyBzcGVjaWFsIGluaXRpYWxpemF0aW9uIChmb3IgZXhhbXBsZSBLZW5kbyB3aWRnZXRzKVxuXHQgKi9cblx0X2luaXRpYWxpemUoKVxuXHR7XG5cdFx0Ly8gU2V0IHZhbHVlXG4gXHQgICB0aGlzLl9zZXRXaWRnZXRWYWx1ZSgpO1xuXG4gXHQgICAvLyBTZXQgZWRpdCBlbmFibGVkXG4gXHQgICB0aGlzLl9zZXRXaWRnZXRFZGl0RW5hYmxlZCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRPIEJFIE9WRVJSSURERU5cblx0ICovXG5cdF9zZXRXaWRnZXRWYWx1ZSgpXG5cdHtcblx0XHQvLyBOb3RoaW5nIHRvIGRvLCBtdXN0IGJlIG92ZXJyaWRkZW5cblx0fVxuXG5cdC8qKlxuXHQgKiBUTyBCRSBPVkVSUklEREVOXG5cdCAqL1xuXHRfc2V0V2lkZ2V0RWRpdEVuYWJsZWQoKVxuXHR7XG5cdFx0Ly8gTm90aGluZyB0byBkbywgbXVzdCBiZSBvdmVycmlkZGVuXG5cdH1cblxuXHQvKipcblx0ICogVE8gQkUgT1ZFUlJJRERFTlxuXHQgKi9cblx0X29uVmFsdWVJbnB1dChlKVxuXHR7XG5cdFx0Ly8gTm90aGluZyB0byBkbywgbXVzdCBiZSBvdmVycmlkZGVuXG5cdH1cblxuXHRfdHJpZ2dlckV2ZW50KClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLnRyaWdnZXIpXG5cdFx0e1xuXHRcdFx0bGV0IGV2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KCd2YWx1ZS1zZXQnLCB7ZGV0YWlsOiBudWxsLCBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlfSk7XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXHRcdH1cblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2NvbmZpZy1mb3JtLWl0ZW0nKSlcblx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29uZmlnLWZvcm0taXRlbScsIENvbmZpZ0Zvcm1JdGVtKTtcbiIsImltcG9ydCB7Q29uZmlnRm9ybUl0ZW19IGZyb20gJy4vY29uZmlnLWZvcm0taXRlbSc7XG5pbXBvcnQge0NvbmZpZ0xhYmVsfSBmcm9tICcuL2NvbmZpZy1sYWJlbCc7XG5pbXBvcnQge0xpc3RJdGVtRWRpdG9yfSBmcm9tICcuL3dpZGdldHMvbGlzdC1pdGVtLWVkaXRvcic7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdHcmlkIGV4dGVuZHMgQ29uZmlnRm9ybUl0ZW1cbntcblx0Y29uc3RydWN0b3IoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZylcblx0e1xuXHQgICAgc3VwZXIoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIHdpZGdldCB0byByZW5kZXIgdGhlIENvbmZpZ1BhcmFtZXRlci5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfZ2VuZXJhdGVJbm5lcldpZGdldCgpXG5cdHtcblx0XHQvLyBDcmVhdGUgbWFpbiB3aWRnZXQncyBodG1sXG5cdFx0dGhpcy5fd2lkZ2V0SHRtbCA9ICQoJzxkaXY+Jywge2NsYXNzOiAnJ30pO1xuXG5cdFx0Ly8gU2V0IGdyaWQgd2lkZ2V0IGNvbmZpZ3VyYXRpb25cblx0XHRsZXQgZ3JpZENvbmZpZyA9IHtcblx0XHRcdGlkOiB0aGlzLl9kYXRhLm5hbWUsXG5cdFx0XHRuYW1lOiB0aGlzLl9kYXRhLm5hbWUsXG5cdFx0XHRjbGFzczogJ2xpbWl0ZWQtaGVpZ2h0JyArICghdGhpcy5fZGF0YS5lZGl0YWJsZSA/ICcgbm8taW50ZXJhY3QnIDogJycpXG5cdFx0fTtcblxuXHRcdC8vIEFwcGVuZCBncmlkIHRvIG1haW4gaHRtbDsgZ3JpZCB3aWxsIGJlIGNvbnZlcnRlZCB0byBLZW5kbyB3aWRnZXQgZHVyaW5nIGluaXRpYWxpemF0aW9uXG5cdFx0dGhpcy5fd2lkZ2V0SHRtbC5hcHBlbmQoJCgnPGRpdj4nLCBncmlkQ29uZmlnKSk7XG5cblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHQvLyBCVVRUT05TXG5cblx0XHRcdC8vIENyZWF0ZSBidXR0b25zIGNvbnRhaW5lclxuXHRcdFx0bGV0IGJ1dHRvbnMgPSAkKCc8ZGl2PicsIHtjbGFzczogJ210LTIgdGV4dC1yaWdodCd9KTtcblxuXHRcdFx0Ly8gQXBwZW5kIGJ1dHRvbnMgdG8gY29udGFpbmVyXG5cdFx0XHR0aGlzLl9hZGRCdXR0b24gPSAkKCc8YnV0dG9uPicsIHt0eXBlOiAnYnV0dG9uJywgY2xhc3M6ICdrLWJ1dHRvbiBrLXNlY29uZGFyeScsIHRpdGxlOiAnQWRkJ30pLmFwcGVuZCgkKCc8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPicpKTtcblx0XHRcdHRoaXMuX2VkaXRCdXR0b24gPSAkKCc8YnV0dG9uPicsIHt0eXBlOiAnYnV0dG9uJywgY2xhc3M6ICdrLWJ1dHRvbiBrLXNlY29uZGFyeSBtbC0yJywgdGl0bGU6ICdFZGl0JywgZGlzYWJsZWQ6IHRydWV9KS5hcHBlbmQoJCgnPGkgY2xhc3M9XCJmYXMgZmEtcGVuXCI+PC9pPicpKTtcblx0XHRcdHRoaXMuX3JlbW92ZUJ1dHRvbiA9ICQoJzxidXR0b24+Jywge3R5cGU6ICdidXR0b24nLCBjbGFzczogJ2stYnV0dG9uIGstc2Vjb25kYXJ5IG1sLTInLCB0aXRsZTogJ1JlbW92ZScsIGRpc2FibGVkOiB0cnVlfSkuYXBwZW5kKCQoJzxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPicpKTtcblxuXHRcdFx0YnV0dG9ucy5hcHBlbmQodGhpcy5fYWRkQnV0dG9uKTtcblx0XHRcdGJ1dHRvbnMuYXBwZW5kKHRoaXMuX2VkaXRCdXR0b24pO1xuXHRcdFx0YnV0dG9ucy5hcHBlbmQodGhpcy5fcmVtb3ZlQnV0dG9uKTtcblxuXHRcdFx0Ly8gQXBwZW5kIGJ1dHRvbnMgY29udGFpbmVyIHRvIG1haW4gaHRtbFxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbC5hcHBlbmQoYnV0dG9ucyk7XG5cblx0XHRcdC8vIENyZWF0ZSBlZGl0IGRpYWxvZ1xuXHRcdFx0Ly8gTk9URTogZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBvbiB0aGUgY2xvc2UvY2FuY2VsIGJ1dHRvbnMgd2FzIHJlbW92ZWQgdG8gd29yayBhcm91bmQgYW4gaXNzdWUgd2l0aCBuZXN0ZWQgbW9kYWxzO1xuXHRcdFx0Ly8gdGhlIGN1c3RvbSBcImRhdGEtY2FuY2VsXCIgYXR0cmlidXRlIGlzIHVzZWQgdG8gYWRkIGEgY3VzdG9tIGxpc3RlbmVyIHRvIHRoZSBidXR0b25zXG5cdFx0XHR0aGlzLl9lZGl0RGlhbG9nID0gJChgXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbFwiIHRhYmluZGV4PVwiLTFcIiByb2xlPVwiZGlhbG9nXCIgYXJpYS1sYWJlbGxlZGJ5PVwibW9kYWxUaXRsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGRhdGEta2V5Ym9hcmQ9XCJmYWxzZVwiIGRhdGEtYmFja2Ryb3A9XCJzdGF0aWNcIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtZGlhbG9nIG1vZGFsLWRpYWxvZy1jZW50ZXJlZFwiIHJvbGU9XCJkb2N1bWVudFwiPlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxuXHRcdFx0XHRcdFx0XHRcdDxoNSBjbGFzcz1cIm1vZGFsLXRpdGxlIHRleHQtcHJpbWFyeVwiIGlkPVwibW9kYWxUaXRsZVwiPiR7dGhpcy5fZGF0YS5sYWJlbH08L2g1PlxuXHRcdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiBkYXRhLWNhbmNlbD1cIm1vZGFsXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgaW4tZmxvdy1pbnZhbGlkLW1zZ1wiPlxuXG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyIGZsZXgtY29sdW1uXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImQtZmxleCB3LTEwMFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZsZXgtZ3Jvdy0xIHRleHQtbGVmdFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImstYnV0dG9uIGstcHJpbWFyeVwiPi4uLjwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZmxleC1ncm93LTEgdGV4dC1yaWdodFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImstYnV0dG9uIGstc2Vjb25kYXJ5XCIgZGF0YS1jYW5jZWw9XCJtb2RhbFwiPkNhbmNlbDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0YCk7XG5cblx0XHRcdC8vIEFkZCBsaXN0ZW5lciB0byBkaWFsb2cgaGlkZSBldmVudFxuXHRcdFx0dGhpcy5fZWRpdERpYWxvZy5vbignaGlkZGVuLmJzLm1vZGFsJywgJC5wcm94eSh0aGlzLl9vbkVkaXRQYW5lbEhpZGRlbiwgdGhpcykpO1xuXG5cdFx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gbWFpbiBidXR0b24gY2xpY2sgZXZlbnRcblx0XHRcdCQoJ2J1dHRvbi5rLXByaW1hcnknLCB0aGlzLl9lZGl0RGlhbG9nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uU3VibWl0QnRDbGljaywgdGhpcykpO1xuXG5cdFx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gY2xvc2UvY2FuY2VsIGJ1dHRvbnMgY2xpY2sgZXZlbnRcblx0XHRcdCQoJ2J1dHRvbltkYXRhLWNhbmNlbD1cIm1vZGFsXCJdJywgdGhpcy5fZWRpdERpYWxvZykub24oJ2NsaWNrJywgJC5wcm94eSh0aGlzLl9vbkNhbmNlbEJ0Q2xpY2ssIHRoaXMpKTtcblxuXHRcdFx0Ly8gQXBwZW5kIGVkaXQgZGlhbG9nIHRvIG1haW4gaHRtbFxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbC5hcHBlbmQodGhpcy5fZWRpdERpYWxvZyk7XG5cdFx0fVxuXG5cdFx0Ly8gUmV0dXJuIGNvbXBvbmVudFxuXHRcdHJldHVybiB0aGlzLl93aWRnZXRIdG1sO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgd2lkZ2V0LlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9pbml0aWFsaXplKClcblx0e1xuXHRcdGxldCBjb2x1bW5zID0gW107XG5cdFx0Zm9yIChsZXQgc3ViQ29uZmlnUGFyYW0gb2YgdGhpcy5fZGF0YS5kZWZhdWx0TGlzdEl0ZW0pXG5cdFx0e1xuXHRcdFx0bGV0IGNvbCA9IHtcblx0XHRcdFx0ZmllbGQ6IHN1YkNvbmZpZ1BhcmFtLm5hbWUsXG5cdFx0XHRcdHRpdGxlOiBzdWJDb25maWdQYXJhbS5sYWJlbCxcblx0XHRcdFx0d2lkdGg6IDEyMFxuXHRcdFx0fVxuXG5cdFx0XHQvLyBEaXNwbGF5IFYgb3IgWCBmb3IgYm9vbGVhbnNcblx0XHRcdGlmICh0eXBlb2Ygc3ViQ29uZmlnUGFyYW0udmFsdWUgPT09ICdib29sZWFuJylcblx0XHRcdFx0Y29sLnRlbXBsYXRlID0gYCM9ICR7c3ViQ29uZmlnUGFyYW0ubmFtZX0gPyAnPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2tcIj48L2k+JyA6ICc8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT4nICNgO1xuXG5cdFx0XHQvLyBIaWRlIHBhc3N3b3Jkc1xuXHRcdFx0aWYgKHN1YkNvbmZpZ1BhcmFtLnR5cGUgPT0gJ1RleHRJbnB1dCcgJiYgc3ViQ29uZmlnUGFyYW0uYXR0cmlidXRlcyAhPSBudWxsICYmIHN1YkNvbmZpZ1BhcmFtLmF0dHJpYnV0ZXMudHlwZSA9PSAncGFzc3dvcmQnKVxuXHRcdFx0XHRjb2wudGVtcGxhdGUgPSBgIz0gJ+KAoicucmVwZWF0KGRhdGEuJHtzdWJDb25maWdQYXJhbS5uYW1lfS5sZW5ndGgpICNgO1xuXG5cdFx0XHRjb2x1bW5zLnB1c2goY29sKTtcblx0XHR9XG5cblx0XHQvLyBJbml0aWFsaXplIGdyaWRcblx0XHRsZXQgZ3JpZEh0bWwgPSB0aGlzLl93aWRnZXRIdG1sLmZpbmQoYCMkeyQuZXNjYXBlU2VsZWN0b3IodGhpcy5fZGF0YS5uYW1lKX1gKTtcblxuXHRcdGdyaWRIdG1sLmtlbmRvR3JpZCh7XG5cdFx0XHRyZXNpemFibGU6IHRydWUsXG5cdFx0XHRzZWxlY3RhYmxlOiB0aGlzLl9kYXRhLmVkaXRhYmxlID8gJ3JvdycgOiBmYWxzZSxcblx0XHRcdGNoYW5nZTogJC5wcm94eSh0aGlzLl9vbkdyaWRTZWxlY3Rpb25DaGFuZ2UsIHRoaXMpLFxuXHRcdFx0Y29sdW1uczogY29sdW1ucyxcblx0XHRcdG5vUmVjb3Jkczoge1xuXHRcdFx0XHR0ZW1wbGF0ZTogJ05vIGl0ZW1zLidcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIFNhdmUgcmVmLiB0byB3aWRnZXRcblx0XHR0aGlzLl9ncmlkV2lkZ2V0ID0gZ3JpZEh0bWwuZGF0YSgna2VuZG9HcmlkJyk7XG5cblx0XHQvLyBTaG93IHRvb3RpcCBpZiBncmlkJ3MgY2VsbCBjb250ZW50IGV4Y2VlZHMgY2VsbCB3aWR0aCAoZWxsaXBzaXMgaXMgZGlzcGxheWVkIGJ5IEtlbmRvIEdyaWQpXG5cdFx0Z3JpZEh0bWwua2VuZG9Ub29sdGlwKHtcblx0XHRcdGZpbHRlcjogJ3RkJyxcblx0XHRcdHNob3c6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdFx0Ly8gTmV2ZXIgc2hvdyB0b29sdGlwLi4uXG5cdFx0XHRcdHRoaXMuY29udGVudC5wYXJlbnQoKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cblx0XHRcdFx0Ly8gLi4udW5sZXNzIGNvbnRlbnQgaXMgcmV0dXJuZWQgKHNlZSBiZWxvdykgZHVlIHRvIGNlbGwgd2lkdGggYmVpbmcgZXhjZWVkZWRcblx0XHRcdFx0aWYgKHRoaXMuY29udGVudC50ZXh0KCkgIT0gJycpXG5cdFx0XHRcdFx0dGhpcy5jb250ZW50LnBhcmVudCgpLmNzcygndmlzaWJpbGl0eScsICd2aXNpYmxlJyk7XG5cdFx0XHR9LFxuXHRcdFx0aGlkZTogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRoaXMuY29udGVudC5wYXJlbnQoKS5jc3MoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJyk7XG5cdFx0XHR9LFxuXHRcdFx0Y29udGVudDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRsZXQgZWxlbWVudCA9IGUudGFyZ2V0WzBdO1xuXHRcdFx0XHRpZiAoZWxlbWVudC5vZmZzZXRXaWR0aCA8IGVsZW1lbnQuc2Nyb2xsV2lkdGgpXG5cdFx0XHRcdFx0cmV0dXJuIGUudGFyZ2V0LnRleHQoKTtcblx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdHJldHVybiAnJztcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8qXG5cdFx0Ly8gSW5pdGlhbGl6ZSBidXR0b24gdG9vbHRpcHNcblx0XHR0aGlzLl93aWRnZXRIdG1sLmtlbmRvVG9vbHRpcCh7XG5cdFx0XHRmaWx0ZXI6ICdidXR0b24nLFxuXHRcdFx0Y29udGVudDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRyZXR1cm4gYDxkaXYgY2xhc3M9XCJoZWxwLXRvb2x0aXBcIj4ke2UudGFyZ2V0LmRhdGEoJ3RpdGxlJyl9PC9kaXY+YDtcblx0XHRcdH1cblx0XHR9KTtcblx0XHQqL1xuXG5cdFx0Ly8gQWRkIGJ1dHRvbiBsaXN0ZW5lcnNcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHR0aGlzLl9hZGRCdXR0b24uY2xpY2soJC5wcm94eSh0aGlzLl9vbkFkZENsaWNrLCB0aGlzKSk7XG5cdFx0XHR0aGlzLl9lZGl0QnV0dG9uLmNsaWNrKCQucHJveHkodGhpcy5fb25FZGl0Q2xpY2ssIHRoaXMpKTtcblx0XHRcdHRoaXMuX3JlbW92ZUJ1dHRvbi5jbGljaygkLnByb3h5KHRoaXMuX29uUmVtb3ZlQ2xpY2ssIHRoaXMpKTtcblx0XHR9XG5cblx0XHQvLyBQcm9jZWVkIHdpdGggaW5pdGlhbGl6YXRpb25cblx0XHRzdXBlci5faW5pdGlhbGl6ZSgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyBkYXRhc291cmNlLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRWYWx1ZSgpXG5cdHtcblx0XHRsZXQgZGF0YVNvdXJjZSA9IG5ldyBrZW5kby5kYXRhLkRhdGFTb3VyY2Uoe1xuXHRcdFx0ZGF0YTogdGhpcy5fZGF0YS5saXN0VmFsdWVzXG5cdFx0fSk7XG5cblx0XHQvLyBSZWFkIGN1cnJlbnQgaG9yaXpvbnRhbCBzY3JvbGwgdmFsdWVcblx0XHRjb25zdCBzY3JvbGxMZWZ0ID0gJCgnLmstZ3JpZC1jb250ZW50JywgdGhpcy5fZ3JpZFdpZGdldC53cmFwcGVyKS5zY3JvbGxMZWZ0KCk7XG5cblx0XHQvLyBDbGVhciBncmlkIHNlbGVjdGlvbiBpZiBhbnlcblx0XHR0aGlzLl9ncmlkV2lkZ2V0LmNsZWFyU2VsZWN0aW9uKCk7XG5cblx0XHQvLyBTZXQgdXBkYXRlZCBncmlkJ3MgZGF0YXNvdXJjZVxuXHRcdHRoaXMuX2dyaWRXaWRnZXQuc2V0RGF0YVNvdXJjZShkYXRhU291cmNlKTtcblxuXHRcdC8vIFNldCBob3Jpem9udGFsIHNjcm9sbFxuXHRcdCQoJy5rLWdyaWQtY29udGVudCcsIHRoaXMuX2dyaWRXaWRnZXQud3JhcHBlcikuc2Nyb2xsTGVmdChzY3JvbGxMZWZ0KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgd2lkZ2V0J3MgZGlzYWJsZWQgc3RhdGUuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X3NldFdpZGdldEVkaXRFbmFibGVkKClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdHtcblx0XHRcdC8vIERlc2VsZWN0IGl0ZW1cblx0XHRcdHRoaXMuX2dyaWRXaWRnZXQuY2xlYXJTZWxlY3Rpb24oKTtcblxuXHRcdFx0Ly8gRW5hYmxlL2Rpc2FibGUgZ3JpZFxuXHRcdFx0dGhpcy5fZ3JpZFdpZGdldC53cmFwcGVyLmF0dHIoJ2Rpc2FibGVkJywgIXRoaXMuX2VkaXRFbmFibGVkKTtcblxuXHRcdFx0Ly8gRW5hYmxlIFwiQWRkXCIgYnV0dG9uXG5cdFx0XHRpZiAodGhpcy5fZWRpdEVuYWJsZWQpXG5cdFx0XHRcdHRoaXMuX2FkZEJ1dHRvbi5hdHRyKCdkaXNhYmxlZCcsIGZhbHNlKTtcblxuXHRcdFx0Ly8gRGlzYWJsZSBhbGwgYnV0dG9uc1xuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHR0aGlzLl9hZGRCdXR0b24uYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdFx0dGhpcy5fZWRpdEJ1dHRvbi5hdHRyKCdkaXNhYmxlZCcsIHRydWUpO1xuXHRcdFx0XHR0aGlzLl9yZW1vdmVCdXR0b24uYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRfb25HcmlkU2VsZWN0aW9uQ2hhbmdlKGUpXG5cdHtcblx0XHR2YXIgc2VsZWN0ZWRSb3dzID0gdGhpcy5fZ3JpZFdpZGdldC5zZWxlY3QoKTtcblx0XHR2YXIgc2VsZWN0ZWREYXRhSXRlbXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZWN0ZWRSb3dzLmxlbmd0aDsgaSsrKVxuXHRcdHtcblx0XHRcdHZhciBkYXRhSXRlbSA9IHRoaXMuX2dyaWRXaWRnZXQuZGF0YUl0ZW0oc2VsZWN0ZWRSb3dzW2ldKTtcblx0XHRcdHNlbGVjdGVkRGF0YUl0ZW1zLnB1c2goZGF0YUl0ZW0pO1xuXHRcdH1cblxuXHRcdC8vIEVuYWJsZS9kaXNhYmxlIGVkaXQgYnV0dG9uXG5cdFx0aWYgKHRoaXMuX2VkaXRCdXR0b24pXG5cdFx0XHR0aGlzLl9lZGl0QnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgc2VsZWN0ZWREYXRhSXRlbXMubGVuZ3RoID09IDApO1xuXG5cdFx0Ly8gRW5hYmxlL2Rpc2FibGUgcmVtb3ZlIGJ1dHRvblxuXHRcdGlmICh0aGlzLl9yZW1vdmVCdXR0b24pXG5cdFx0XHR0aGlzLl9yZW1vdmVCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCBzZWxlY3RlZERhdGFJdGVtcy5sZW5ndGggPT0gMCk7XG4gICAgfVxuXG5cdF9vblJlbW92ZUNsaWNrKClcblx0e1xuXHRcdGxldCBzZWxlY3RlZEluZGV4ID0gdGhpcy5fZ3JpZFdpZGdldC5zZWxlY3QoKS5pbmRleCgpO1xuXG5cdFx0Ly8gUmVtb3ZlIGl0ZW0gZnJvbSBsaXN0XG5cdFx0dGhpcy5fZGF0YS5yZW1vdmVMaXN0SXRlbShzZWxlY3RlZEluZGV4KTtcblxuXHRcdC8vIFJlZ2VuZXJhdGUgZGF0YWdyaWQncyBkYXRhc291cmNlXG5cdFx0dGhpcy5fc2V0V2lkZ2V0VmFsdWUoKTtcblx0fVxuXG5cdF9vbkFkZENsaWNrKClcblx0e1xuXHRcdC8vIENsb25lIGRlZmF1bHQgaXRlbSBhbmQgYWRkIHRvIGxpc3Rcblx0XHRsZXQgbmV3TGlzdEl0ZW0gPSBbXTtcblx0XHRmb3IgKGxldCBzdWJDUCBvZiB0aGlzLl9kYXRhLmRlZmF1bHRMaXN0SXRlbSlcblx0XHRcdG5ld0xpc3RJdGVtLnB1c2goc3ViQ1AuY2xvbmUodHJ1ZSkpO1xuXG5cdFx0Ly8gQ3JlYXRlIGVkaXQgcG9wdXBcblx0XHR0aGlzLl9vcGVuRWRpdFBhbmVsKG5ld0xpc3RJdGVtKTtcblx0fVxuXG5cdF9vbkVkaXRDbGljaygpXG5cdHtcblx0XHRsZXQgc2VsZWN0ZWRJbmRleCA9IHRoaXMuX2dyaWRXaWRnZXQuc2VsZWN0KCkuaW5kZXgoKTtcblxuXHRcdC8vIENsb25lIHNlbGVjdGVkIGl0ZW0gYW5kIGFkZCB0byBsaXN0XG5cdFx0bGV0IGNsb25lZExpc3RJdGVtID0gW107XG5cdFx0Zm9yIChsZXQgc3ViQ1Agb2YgdGhpcy5fZGF0YS5saXN0SXRlbXNbc2VsZWN0ZWRJbmRleF0pXG5cdFx0XHRjbG9uZWRMaXN0SXRlbS5wdXNoKHN1YkNQLmNsb25lKHRydWUpKTtcblxuXHRcdC8vIENyZWF0ZSBlZGl0IHBvcHVwXG5cdFx0dGhpcy5fb3BlbkVkaXRQYW5lbChjbG9uZWRMaXN0SXRlbSwgc2VsZWN0ZWRJbmRleCk7XG5cdH1cblxuXHRfb3BlbkVkaXRQYW5lbChzdWJDb25maWdQYXJhbXNBcnJheSwgZWRpdEluZGV4ID0gLTEpXG5cdHtcblx0XHQvLyBDaGVjayBpZiB0aGlzIGNvbmZpZ3VyYXRpb24gaXRlbSBpcyBpbnNpZGUgYSBtb2RhbCB3aW5kb3c7XG5cdFx0Ly8gaWYgeWVzLCB0aGUgZWRpdCBwYW5lbCAod2hpY2ggaXMgYSBtb2RhbCBhcyB3ZWxsKSBtdXN0IGJlIGNvbmZpZ3VyZWQgdG8gcmVtb3ZlIHRoZSBkYXJrIGJhY2tncm91bmRcblx0XHRpZiAoJCh0aGlzKS5wYXJlbnRzKCcubW9kYWwnKS5sZW5ndGggPiAwKVxuXHRcdFx0JCgnLm1vZGFsJywgJCh0aGlzKSkuYXR0cignZGF0YS1iYWNrZHJvcCcsIGZhbHNlKTtcblxuXHRcdC8vIENyZWF0ZSBkaWFsb2cgY29udGVudFxuXHRcdHRoaXMuX2l0ZW1FZGl0b3IgPSBuZXcgTGlzdEl0ZW1FZGl0b3IoKTtcblx0XHR0aGlzLl9pdGVtRWRpdG9yLmRhdGEgPSBzdWJDb25maWdQYXJhbXNBcnJheTtcblx0XHR0aGlzLl9pdGVtRWRpdG9yLmluZGV4ID0gZWRpdEluZGV4O1xuXG5cdFx0bGV0IGl0ZW1FZGl0b3IgPSAkKHRoaXMuX2l0ZW1FZGl0b3IpO1xuXG5cdFx0Ly8gQXBwZW5kIGNvbnRlbnQgdG8gZGlhbG9nXG5cdFx0JCgnLm1vZGFsLWJvZHknLCB0aGlzLl9lZGl0RGlhbG9nKS5hcHBlbmQoaXRlbUVkaXRvcik7XG5cblx0XHQvLyBTZXQgZGlhbG9nIG1haW4gYnV0dG9uIHRleHRcblx0XHQkKCdidXR0b24uay1wcmltYXJ5JywgdGhpcy5fZWRpdERpYWxvZykuaHRtbChlZGl0SW5kZXggPiAtMSA/ICc8aSBjbGFzcz1cImZhcyBmYS1wZW4gbXItMVwiPjwvaT5VcGRhdGUnIDogJzxpIGNsYXNzPVwiZmFzIGZhLXBsdXMgbXItMVwiPjwvaT5BZGQnKTtcblxuXHRcdC8vIERpc3BsYXkgZGlhbG9nXG5cdFx0dGhpcy5fZWRpdERpYWxvZy5tb2RhbCgnc2hvdycpO1xuXHR9XG5cblx0X29uU3VibWl0QnRDbGljaygpXG5cdHtcblx0XHRpZiAodGhpcy5faXRlbUVkaXRvci52YWxpZGF0ZSgpKVxuXHRcdHtcblx0XHRcdGxldCBkYXRhID0gdGhpcy5faXRlbUVkaXRvci5kYXRhO1xuXHRcdFx0bGV0IGluZGV4ID0gdGhpcy5faXRlbUVkaXRvci5pbmRleDtcblxuXHRcdFx0Ly8gSGlkZSBtb2RhbFxuXHRcdFx0dGhpcy5fZWRpdERpYWxvZy5tb2RhbCgnaGlkZScpO1xuXG5cdFx0XHQvLyBDb21wbGV0ZSBlZGl0aW5nXG5cdFx0XHR0aGlzLl9vbkVkaXRDb21wbGV0ZShkYXRhLCBpbmRleCk7XG5cdFx0fVxuXHR9XG5cblx0X29uQ2FuY2VsQnRDbGljaygpXG5cdHtcblx0XHQvLyBIaWRlIG1vZGFsXG5cdFx0dGhpcy5fZWRpdERpYWxvZy5tb2RhbCgnaGlkZScpO1xuXHR9XG5cblx0X29uRWRpdFBhbmVsSGlkZGVuKGUpXG5cdHtcblx0XHQvLyBSZW1vdmUgY29udGVudCBmcm9tIGRpYWxvZ1xuXHRcdHRoaXMuX2l0ZW1FZGl0b3IucmVtb3ZlKCk7XG5cblx0XHQvLyBTZXQgZGlhbG9nIG1haW4gYnV0dG9uIHRleHRcblx0XHQkKCdidXR0b24uay1wcmltYXJ5JywgdGhpcy5fZWRpdERpYWxvZykuaHRtbCgnLi4uJyk7XG5cblx0XHR0aGlzLl9pdGVtRWRpdG9yID0gbnVsbDtcblx0fVxuXG5cdF9vbkVkaXRDb21wbGV0ZShsaXN0SXRlbSwgZWRpdEluZGV4KVxuXHR7XG5cdFx0Ly8gQW4gZXhpc3RpbmcgbGlzdCBpdGVtIHdhcyB1cGRhdGVkXG5cdFx0aWYgKGVkaXRJbmRleCA+IC0xKVxuXHRcdFx0dGhpcy5fZGF0YS51cGRhdGVMaXN0SXRlbShsaXN0SXRlbSwgZWRpdEluZGV4KTtcblxuXHRcdC8vIEEgbmV3IGxpc3QgaXRlbSB3YXMgYWRkZWQ7IGFkZCBpdCB0byB0aGUgY29uZmlndXJhdGlvbiBwYXJhbWV0ZXJcblx0XHRlbHNlXG5cdFx0XHR0aGlzLl9kYXRhLmFkZExpc3RJdGVtKGxpc3RJdGVtKTtcblxuXHRcdC8vIFJlZ2VuZXJhdGUgZGF0YWdyaWQncyBkYXRhc291cmNlXG5cdFx0dGhpcy5fc2V0V2lkZ2V0VmFsdWUoKTtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2NvbmZpZy1ncmlkJykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NvbmZpZy1ncmlkJywgQ29uZmlnR3JpZCk7XG4iLCJleHBvcnQgY2xhc3MgQ29uZmlnTGFiZWwgZXh0ZW5kcyBIVE1MRWxlbWVudFxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0ICAgIHN1cGVyKCk7XG5cblx0XHR0aGlzLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCdjb25maWctbGFiZWwnKTtcblx0fVxuXG5cdHNldCB2YWx1ZSh2YWwpXG5cdHtcblx0XHRpZiAodHlwZW9mIHZhbCA9PT0gJ2Jvb2xlYW4nKVxuXHRcdFx0dGhpcy5pbm5lckhUTUwgPSAodmFsID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG5cdFx0ZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpXG5cdFx0XHR0aGlzLmlubmVySFRNTCA9ICh2YWwgPyB2YWwgOiAwKTtcblx0XHRlbHNlXG5cdFx0XHR0aGlzLmlubmVySFRNTCA9ICh2YWwgIT0gJycgPyB2YWwgOiAnJm1kYXNoOycpO1xuXHR9XG5cblx0Z2V0IHZhbHVlKClcblx0e1xuXHRcdHJldHVybiB0aGlzLnRleHRDb250ZW50O1xuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnY29uZmlnLWxhYmVsJykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ2NvbmZpZy1sYWJlbCcsIENvbmZpZ0xhYmVsKTtcbiIsImltcG9ydCB7Q29uZmlnRm9ybUl0ZW19IGZyb20gJy4vY29uZmlnLWZvcm0taXRlbSc7XG5pbXBvcnQge0NvbmZpZ0xhYmVsfSBmcm9tICcuL2NvbmZpZy1sYWJlbCc7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdOdW1lcmljU3RlcHBlciBleHRlbmRzIENvbmZpZ0Zvcm1JdGVtXG57XG5cdGNvbnN0cnVjdG9yKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpXG5cdHtcblx0ICAgIHN1cGVyKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENyZWF0ZSB3aWRnZXQgdG8gcmVuZGVyIHRoZSBDb25maWdQYXJhbWV0ZXIgdmFsdWUuXG5cdCAqIElmIHBhcmFtZXRlciBpcyBub3QgZWRpdGFibGUsIGEgc2ltcGxlIGxhYmVsIGlzIHVzZWQuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X2dlbmVyYXRlSW5uZXJXaWRnZXQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0e1xuXHRcdFx0Ly8gU2V0IHdpZGdldCBjb25maWd1cmF0aW9uXG5cdFx0XHRsZXQgY29uZmlnID0ge1xuXHRcdFx0XHR0eXBlOiAnbnVtYmVyJyxcblx0XHRcdFx0Y2xhc3M6ICdmb3JtLWNvbnRyb2wnLFxuXHRcdFx0XHRpZDogdGhpcy5fZGF0YS5uYW1lLFxuXHRcdFx0XHRuYW1lOiB0aGlzLl9kYXRhLm5hbWUsXG5cdFx0XHRcdCdkYXRhLXJvbGUnOiAnbnVtZXJpY3RleHRib3gnLFxuXHRcdFx0XHQnZGF0YS1yZXF1aXJlZC1tc2cnOiAnUmVxdWlyZWQnLFxuXHRcdFx0XHQnZGF0YS1mb3JtYXQnOiAnIycsXG5cdFx0XHRcdHJlcXVpcmVkOiAncmVxdWlyZWQnLFxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gU2V0IHdpZGdldCBhdHRyaWJ1dGVzIChzZWUgcGFyZW50IGNsYXNzKVxuXHRcdFx0dGhpcy5fc2V0V2lkZ2V0QXR0cmlidXRlcyhjb25maWcpO1xuXG5cdFx0XHQvLyBTZXQgYWRkaXRpb25hbCB3aWRnZXQgYXR0cmlidXRlcyBiYXNlZCBvbiB2YWxpZGF0aW9uIHJ1bGVzIChzZWUgcGFyZW50IGNsYXNzKVxuXHRcdFx0dGhpcy5fc2V0V2lkZ2V0VmFsaWRhdGlvbkF0dHJpYnV0ZXMoY29uZmlnKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIHdpZGdldCdzIGh0bWxcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwgPSAkKCc8aW5wdXQ+JywgY29uZmlnKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbCA9IG5ldyBDb25maWdMYWJlbCgpO1xuXG5cdFx0Ly8gUmV0dXJuIGNvbXBvbmVudFxuXHRcdHJldHVybiB0aGlzLl93aWRnZXRIdG1sO1xuXHR9XG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgd2lkZ2V0LlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG4gICBfaW5pdGlhbGl6ZSgpXG4gICB7XG5cdCAgIGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHQgICB7XG5cdFx0ICAgLy8gSW5pdGlhbGl6ZSBrZW5kbyB3aWRnZXRcblx0XHQgICBrZW5kby5pbml0KHRoaXMuX3dpZGdldEh0bWwpO1xuXG5cdFx0ICAgLy8gU2F2ZSByZWYuIHRvIHdpZGdldFxuXHRcdCAgIHRoaXMuX2lubmVyV2lkZ2V0ID0gdGhpcy5fd2lkZ2V0SHRtbC5kYXRhKCdrZW5kb051bWVyaWNUZXh0Qm94Jyk7XG5cblx0XHQgICAvLyBFbmFibGUgdmFsdWUgY29tbWl0IGJpbmRpbmdcblx0XHQgICB0aGlzLl9pbm5lcldpZGdldC5iaW5kKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuX29uVmFsdWVJbnB1dCwgdGhpcykpO1xuXHQgICB9XG5cblx0ICAgLy8gUHJvY2VlZCB3aXRoIGluaXRpYWxpemF0aW9uXG5cdCAgIHN1cGVyLl9pbml0aWFsaXplKCk7XG4gICB9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyB2YWx1ZS5cblx0ICogSWYgcGFyYW1ldGVyIGlzIG5vdCBlZGl0YWJsZSwgdGhlIGxhYmVsIHRleHQgaXMgc2V0LlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRWYWx1ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHRcdHRoaXMuX2lubmVyV2lkZ2V0LnZhbHVlKHRoaXMuX2RhdGEudmFsdWUpO1xuXHRcdGVsc2Vcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwudmFsdWUgPSB0aGlzLl9kYXRhLnZhbHVlO1xuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyBkaXNhYmxlZCBzdGF0ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfc2V0V2lkZ2V0RWRpdEVuYWJsZWQoKVxuXHR7XG5cdFx0aWYgKHRoaXMuX2RhdGEuZWRpdGFibGUpXG5cdFx0XHR0aGlzLl9pbm5lcldpZGdldC5lbmFibGUodGhpcy5fZWRpdEVuYWJsZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBDb25maWd1cmF0aW9uIFBhcmFtZXRlciB2YWx1ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfb25WYWx1ZUlucHV0KGUpXG5cdHtcblx0XHQvLyBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdG8gbmV3IHZhbHVlXG5cdFx0dGhpcy5fZGF0YS52YWx1ZSA9IE51bWJlcih0aGlzLl9pbm5lcldpZGdldC52YWx1ZSgpKTtcblxuXHRcdC8vIFRyaWdnZXIgZXZlbnRcblx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoKTtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2NvbmZpZy1udW1lcmljLXN0ZXBwZXInKSlcblx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnY29uZmlnLW51bWVyaWMtc3RlcHBlcicsIENvbmZpZ051bWVyaWNTdGVwcGVyKTtcbiIsImltcG9ydCB7Q29uZmlnRm9ybUl0ZW19IGZyb20gJy4vY29uZmlnLWZvcm0taXRlbSc7XG5pbXBvcnQge0NvbmZpZ0xhYmVsfSBmcm9tICcuL2NvbmZpZy1sYWJlbCc7XG5cbmV4cG9ydCBjbGFzcyBDb25maWdUZXh0SW5wdXQgZXh0ZW5kcyBDb25maWdGb3JtSXRlbVxue1xuXHRjb25zdHJ1Y3Rvcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKVxuXHR7XG5cdCAgICBzdXBlcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgd2lkZ2V0IHRvIHJlbmRlciB0aGUgQ29uZmlnUGFyYW1ldGVyIHZhbHVlLlxuXHQgKiBJZiBwYXJhbWV0ZXIgaXMgbm90IGVkaXRhYmxlLCBhIHNpbXBsZSBsYWJlbCBpcyB1c2VkLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9nZW5lcmF0ZUlubmVyV2lkZ2V0KClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdHtcblx0XHRcdC8vIFNldCB3aWRnZXQgY29uZmlndXJhdGlvblxuXHRcdFx0bGV0IGNvbmZpZyA9IHtcblx0XHRcdFx0dHlwZTogJ3RleHQnLFxuXHRcdFx0XHRjbGFzczogJ2Zvcm0tY29udHJvbCBrLXRleHRib3gnLFxuXHRcdFx0XHRpZDogdGhpcy5fZGF0YS5uYW1lLFxuXHRcdFx0XHRuYW1lOiB0aGlzLl9kYXRhLm5hbWUsXG5cdFx0XHRcdGF1dG9jb21wbGV0ZTogJ29mZicsXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBTZXQgd2lkZ2V0IGF0dHJpYnV0ZXNcblx0XHRcdHRoaXMuX3NldFdpZGdldEF0dHJpYnV0ZXMoY29uZmlnKTtcblxuXHRcdFx0Ly8gU2V0IGFkZGl0aW9uYWwgd2lkZ2V0IGF0dHJpYnV0ZXMgYmFzZWQgb24gdmFsaWRhdGlvbiBydWxlc1xuXHRcdFx0dGhpcy5fc2V0V2lkZ2V0VmFsaWRhdGlvbkF0dHJpYnV0ZXMoY29uZmlnKTtcblxuXHRcdFx0Ly8gQ3JlYXRlIHdpZGdldCdzIGh0bWxcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwgPSAkKCc8aW5wdXQ+JywgY29uZmlnKTtcblxuXHRcdFx0Ly8gRW5hYmxlIHZhbHVlIGNvbW1pdCBiaW5kaW5nXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sLm9uKCdjaGFuZ2UnLCAkLnByb3h5KHRoaXMuX29uVmFsdWVJbnB1dCwgdGhpcykpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0XHR0aGlzLl93aWRnZXRIdG1sID0gbmV3IENvbmZpZ0xhYmVsKCk7XG5cblx0XHQvLyBSZXR1cm4gY29tcG9uZW50XG5cdFx0cmV0dXJuIHRoaXMuX3dpZGdldEh0bWw7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHdpZGdldCdzIHZhbHVlLlxuXHQgKiBJZiBwYXJhbWV0ZXIgaXMgbm90IGVkaXRhYmxlLCB0aGUgbGFiZWwgdGV4dCBpcyBzZXQuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X3NldFdpZGdldFZhbHVlKClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbC52YWwodGhpcy5fZGF0YS52YWx1ZSk7XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbC52YWx1ZSA9IHRoaXMuX2RhdGEudmFsdWU7XG5cblx0XHQvLyBUcmlnZ2VyIGV2ZW50XG5cdFx0dGhpcy5fdHJpZ2dlckV2ZW50KCk7XG5cdH1cblxuXHQvKipcblx0ICogU2V0IHdpZGdldCdzIGRpc2FibGVkIHN0YXRlLlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRFZGl0RW5hYmxlZCgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHRcdHRoaXMuX3dpZGdldEh0bWwuYXR0cignZGlzYWJsZWQnLCAhdGhpcy5fZWRpdEVuYWJsZWQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFVwZGF0ZSBDb25maWd1cmF0aW9uIFBhcmFtZXRlciB2YWx1ZS5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfb25WYWx1ZUlucHV0KGUpXG5cdHtcblx0XHQvLyBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdG8gbmV3IHZhbHVlXG5cdFx0dGhpcy5fZGF0YS52YWx1ZSA9IHRoaXMuX3dpZGdldEh0bWwudmFsKCk7XG5cblx0XHQvLyBUcmlnZ2VyIGV2ZW50XG5cdFx0dGhpcy5fdHJpZ2dlckV2ZW50KCk7XG5cdH1cbn1cblxuLy8gREVGSU5FIENPTVBPTkVOVFxuaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCdjb25maWctdGV4dC1pbnB1dCcpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb25maWctdGV4dC1pbnB1dCcsIENvbmZpZ1RleHRJbnB1dCk7XG4iLCJpbXBvcnQge0NvbmZpZ0Zvcm1JdGVtfSBmcm9tICcuL2NvbmZpZy1mb3JtLWl0ZW0nO1xuaW1wb3J0IHtDb25maWdMYWJlbH0gZnJvbSAnLi9jb25maWctbGFiZWwnO1xuaW1wb3J0IHtWZWN0b3IzRElucHV0fSBmcm9tICcuL3dpZGdldHMvdmVjdG9yLTNkLWlucHV0JztcblxuZXhwb3J0IGNsYXNzIENvbmZpZ1ZlY3RvcjNEIGV4dGVuZHMgQ29uZmlnRm9ybUl0ZW1cbntcblx0Y29uc3RydWN0b3IoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZylcblx0e1xuXHQgICAgc3VwZXIoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIHdpZGdldCB0byByZW5kZXIgdGhlIENvbmZpZ1BhcmFtZXRlciB2YWx1ZS5cblx0ICogSWYgcGFyYW1ldGVyIGlzIG5vdCBlZGl0YWJsZSwgYSBzaW1wbGUgbGFiZWwgaXMgdXNlZC5cblx0ICogQG92ZXJyaWRlXG5cdCAqL1xuXHRfZ2VuZXJhdGVJbm5lcldpZGdldCgpXG5cdHtcblx0XHRpZiAodGhpcy5fZGF0YS5lZGl0YWJsZSlcblx0XHR7XG5cdFx0XHQvLyBDcmVhdGUgd2lkZ2V0J3MgaHRtbFxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbCA9IG5ldyBWZWN0b3IzRElucHV0KHRoaXMuX2RhdGEubmFtZSwgdGhpcy5fZGF0YS52YWxpZGF0b3IgPT0gJ2FvaScpO1xuXG5cdFx0XHQvLyBTZXQgd2lkZ2V0IGF0dHJpYnV0ZXNcblx0XHRcdHRoaXMuX3NldFdpZGdldEF0dHJpYnV0ZXModGhpcy5fd2lkZ2V0SHRtbCk7XG5cblx0XHRcdC8vIEVuYWJsZSB2YWx1ZSBjb21taXQgYmluZGluZ1xuXHRcdFx0JCh0aGlzLl93aWRnZXRIdG1sKS5vbignY2hhbmdlJywgJC5wcm94eSh0aGlzLl9vblZhbHVlSW5wdXQsIHRoaXMpKTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5fd2lkZ2V0SHRtbCA9IG5ldyBDb25maWdMYWJlbCgpO1xuXG5cdFx0Ly8gUmV0dXJuIGNvbXBvbmVudFxuXHRcdHJldHVybiB0aGlzLl93aWRnZXRIdG1sO1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldCB3aWRnZXQncyB2YWx1ZS5cblx0ICogSWYgcGFyYW1ldGVyIGlzIG5vdCBlZGl0YWJsZSwgdGhlIGxhYmVsIHRleHQgaXMgc2V0LlxuXHQgKiBAb3ZlcnJpZGVcblx0ICovXG5cdF9zZXRXaWRnZXRWYWx1ZSgpXG5cdHtcblx0XHR0aGlzLl93aWRnZXRIdG1sLnZhbHVlID0gdGhpcy5fZGF0YS52YWx1ZTtcblxuXHRcdC8vIFRyaWdnZXIgZXZlbnRcblx0XHR0aGlzLl90cmlnZ2VyRXZlbnQoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBTZXQgd2lkZ2V0J3MgZGlzYWJsZWQgc3RhdGUuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X3NldFdpZGdldEVkaXRFbmFibGVkKClcblx0e1xuXHRcdGlmICh0aGlzLl9kYXRhLmVkaXRhYmxlKVxuXHRcdHtcblx0XHRcdCQodGhpcy5fd2lkZ2V0SHRtbCkuYXR0cignZGlzYWJsZWQnLCAhdGhpcy5fZWRpdEVuYWJsZWQpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgQ29uZmlndXJhdGlvbiBQYXJhbWV0ZXIgdmFsdWUuXG5cdCAqIEBvdmVycmlkZVxuXHQgKi9cblx0X29uVmFsdWVJbnB1dChlKVxuXHR7XG5cdFx0Ly8gVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIHRvIG5ldyB2YWx1ZVxuXHRcdHRoaXMuX2RhdGEudmFsdWUgPSB0aGlzLl93aWRnZXRIdG1sLnZhbHVlO1xuXG5cdFx0Ly8gVHJpZ2dlciBldmVudFxuXHRcdHRoaXMuX3RyaWdnZXJFdmVudCgpO1xuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnY29uZmlnLXZlY3Rvci0zZCcpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCdjb25maWctdmVjdG9yLTNkJywgQ29uZmlnVmVjdG9yM0QpO1xuIiwiaW1wb3J0IHtDb25maWdGb3JtSXRlbUZhY3Rvcnl9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3VpYnVpbGRlci9jb25maWctZm9ybS1pdGVtLWZhY3RvcnknO1xuXG5leHBvcnQgY2xhc3MgTGlzdEl0ZW1FZGl0b3IgZXh0ZW5kcyBIVE1MRWxlbWVudFxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0ICAgIHN1cGVyKCk7XG5cdH1cblxuXHRzZXQgZGF0YShzdWJDb25maWdQYXJhbXNBcnJheSlcblx0e1xuXHRcdHRoaXMuX2RhdGEgPSBzdWJDb25maWdQYXJhbXNBcnJheTtcblxuXHRcdHRoaXMuX2J1aWxkVmlldygpO1xuXHR9XG5cblx0Z2V0IGRhdGEoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2RhdGE7XG5cdH1cblxuXHRzZXQgaW5kZXgoaW5kZXgpXG5cdHtcblx0XHR0aGlzLl9pbmRleCA9IGluZGV4O1xuXHR9XG5cblx0Z2V0IGluZGV4KClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9pbmRleDtcblx0fVxuXG5cdF9idWlsZFZpZXcoKVxuXHR7XG5cdFx0Ly8gR2VuZXJhdGUgY29udGFpbmVyIGZvcm1cblx0XHR0aGlzLl9mb3JtID0gJCgnPGZvcm0+Jywge30pO1xuXG5cdFx0Ly8gQXBwZW5kIGZvcm1cblx0XHQkKHRoaXMpLmFwcGVuZCh0aGlzLl9mb3JtKTtcblxuXHRcdC8vIEdlbmVyYXRlIGZvcm0gZmllbGRzXG5cdFx0Zm9yIChsZXQgY29uZmlnUGFyYW0gb2YgdGhpcy5fZGF0YSlcblx0XHR7XG5cdFx0XHQvLyBDcmVhdGUgZm9ybSBpdGVtXG5cdFx0XHRsZXQgZm9ybUl0ZW0gPSBDb25maWdGb3JtSXRlbUZhY3RvcnkuY3JlYXRlKGNvbmZpZ1BhcmFtLCB0cnVlLCB0cnVlKTtcblx0XHRcdGZvcm1JdGVtLmRhdGEgPSBjb25maWdQYXJhbTtcblxuXHRcdFx0Ly8gQWRkIGZvcm0gaXRlbSB0byBmb3JtXG5cdFx0XHR0aGlzLl9mb3JtLmFwcGVuZChmb3JtSXRlbSk7XG5cdFx0fVxuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBrZW5kbyB2YWxpZGF0aW9uIG9uIGZvcm1cblx0XHR0aGlzLl92YWxpZGF0b3IgPSB0aGlzLl9mb3JtLmtlbmRvVmFsaWRhdG9yKHtcblx0XHRcdHZhbGlkYXRlT25CbHVyOiB0cnVlLFxuXHRcdFx0cnVsZXM6IHtcblx0XHRcdFx0Ly8gQWRkIHJ1bGUgdG8gdmFsaWRhdGUgQU9JIGZvcm0gaXRlbXM/XG5cdFx0XHRcdC8vIChzZWU6IGh0dHBzOi8vZGVtb3MudGVsZXJpay5jb20va2VuZG8tdWkvdmFsaWRhdG9yL2N1c3RvbS12YWxpZGF0aW9uKVxuXHRcdFx0XHRhb2k6IGZ1bmN0aW9uIChpbnB1dCkge1xuXHRcdFx0XHRcdGlmIChpbnB1dC5pcygnW2RhdGEtYW9pLW1zZ10nKSAmJiBpbnB1dC52YWwoKSAhPSAnJylcblx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRpZiAoaW5wdXQudmFsKCkgPT0gJzAsMCwwJylcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXHRcdFx0fVxuXHRcdH0pLmRhdGEoJ2tlbmRvVmFsaWRhdG9yJyk7XG5cblx0XHQvLyBJbml0aWFsaXplIGhlbHAgdG9vbHRpcHNcblx0XHR0aGlzLl9mb3JtLmtlbmRvVG9vbHRpcCh7XG5cdFx0XHRmaWx0ZXI6ICdpW3RpdGxlXS5oZWxwJyxcblx0XHRcdHBvc2l0aW9uOiAncmlnaHQnLFxuXHRcdFx0Y29udGVudDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRyZXR1cm4gYDxkaXYgY2xhc3M9XCJoZWxwLXRvb2x0aXBcIj4ke2UudGFyZ2V0LmRhdGEoJ3RpdGxlJyl9PC9kaXY+YDtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHZhbGlkYXRlKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl92YWxpZGF0b3IudmFsaWRhdGUoKTtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ2xpc3QtaXRlbS1lZGl0b3InKSlcblx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbGlzdC1pdGVtLWVkaXRvcicsIExpc3RJdGVtRWRpdG9yKTtcbiIsImV4cG9ydCBjbGFzcyBWZWN0b3IzRElucHV0IGV4dGVuZHMgSFRNTEVsZW1lbnRcbntcblx0Y29uc3RydWN0b3IoaWQsIGlzVmFsaWRhYmxlKVxuXHR7XG5cdCAgICBzdXBlcigpO1xuXG5cdFx0dGhpcy5pZCA9IGlkO1xuXHRcdHRoaXMubmFtZSA9IGlkO1xuXG5cdFx0dGhpcy5faXNWYWxpZGFibGUgPSBpc1ZhbGlkYWJsZTtcblxuXHRcdHRoaXMuX2luaXRpYWxpemUoKTtcblx0fVxuXG5cdHNldCBlbmFibGVDbGVhcih2YWx1ZSlcblx0e1xuXHRcdGlmICh2YWx1ZSlcblx0XHRcdHRoaXMuX2NsZWFyQnV0dG9uLnNob3coKTtcblx0XHRlbHNlXG5cdFx0XHR0aGlzLl9jbGVhckJ1dHRvbi5oaWRlKCk7XG5cdH1cblxuXHRzZXQgYWxsb3dOZWdhdGl2ZSh2YWx1ZSlcblx0e1xuXHRcdGlmICh2YWx1ZSlcblx0XHR7XG5cdFx0XHR0aGlzLl93aWRnZXRYLnNldE9wdGlvbnMoIHttaW46IG51bGx9ICk7XG5cdFx0XHR0aGlzLl93aWRnZXRZLnNldE9wdGlvbnMoIHttaW46IG51bGx9ICk7XG5cdFx0XHR0aGlzLl93aWRnZXRaLnNldE9wdGlvbnMoIHttaW46IG51bGx9ICk7XG5cdFx0fVxuXHR9XG5cblx0c2V0IHZhbHVlKHZhbClcblx0e1xuXHRcdHZhciBjb29yZHMgPSB2YWwuc3BsaXQoJywnKTtcblxuXHRcdGlmIChjb29yZHMubGVuZ3RoID49IDEpXG5cdFx0XHR0aGlzLl93aWRnZXRYLnZhbHVlKGNvb3Jkc1swXSk7XG5cblx0XHRpZiAoY29vcmRzLmxlbmd0aCA+PSAyKVxuXHRcdFx0dGhpcy5fd2lkZ2V0WS52YWx1ZShjb29yZHNbMV0pO1xuXG5cdFx0aWYgKGNvb3Jkcy5sZW5ndGggPj0gMylcblx0XHRcdHRoaXMuX3dpZGdldFoudmFsdWUoY29vcmRzWzJdKTtcblxuXHRcdGlmICh0aGlzLl9pc1ZhbGlkYWJsZSlcblx0XHRcdHRoaXMuX2lucHV0VmFsLnZhbCh0aGlzLnZhbHVlKTtcblx0fVxuXG5cdGdldCB2YWx1ZSgpXG5cdHtcblx0XHRpZiAodGhpcy5fd2lkZ2V0WC52YWx1ZSgpID09IG51bGwgJiYgdGhpcy5fd2lkZ2V0WS52YWx1ZSgpID09IG51bGwgJiYgdGhpcy5fd2lkZ2V0Wi52YWx1ZSgpID09IG51bGwpXG5cdFx0XHRyZXR1cm4gJyc7XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHRoaXMuX3dpZGdldFgudmFsdWUoKSArICcsJyArIHRoaXMuX3dpZGdldFkudmFsdWUoKSArICcsJyArIHRoaXMuX3dpZGdldFoudmFsdWUoKTtcblx0fVxuXG5cdF9pbml0aWFsaXplKClcblx0e1xuXHRcdC8vIEdlbmVyYXRlIGNvbnRhaW5lciBmb3JtXG5cdFx0dGhpcy5fY29udGFpbmVyID0gJCgnPGRpdj4nLCB7XG5cdFx0XHRjbGFzczogJ2Zvcm0taW5saW5lJ1xuXHRcdH0pO1xuXG5cdFx0Ly8gQXBwZW5kIGNvbnRhaW5lclxuXHRcdCQodGhpcykuYXBwZW5kKHRoaXMuX2NvbnRhaW5lcik7XG5cblx0XHQvLyBTZXQgaW5wdXRzIGNvbmZpZ3VyYXRpb25cblx0XHRsZXQgY29uZmlnSHRtbCA9IHtcblx0XHRcdHR5cGU6ICdudW1iZXInLFxuXHRcdFx0Y2xhc3M6ICdmb3JtLWNvbnRyb2wgc2hvcnQtNCcsXG5cdFx0fTtcblxuXHRcdC8vIFNldCB3aWRnZXQgY29uZmlndXJhdGlvblxuXHRcdGxldCBjb25maWdXaWRnZXQgPSB7XG5cdFx0XHRtaW46IDAsXG5cdFx0XHRzcGlubmVyczogZmFsc2UsXG5cdFx0XHRmb3JtYXQ6ICcjLiMjIyMjIycsXG5cdFx0XHRkZWNpbWFsczogNixcblx0XHRcdHJvdW5kOiBmYWxzZSxcblx0XHRcdHNwaW5uZXJzOiBmYWxzZSxcblx0XHRcdHJlc3RyaWN0RGVjaW1hbHM6IGZhbHNlLFxuXHRcdFx0Y2hhbmdlOiAkLnByb3h5KHRoaXMuX29uQ2hhbmdlLCB0aGlzKVxuXHRcdH07XG5cblx0XHQvLyBDcmVhdGUgd2lkZ2V0c1xuXHRcdHRoaXMuX2lucHV0WCA9ICQoJzxpbnB1dD4nLCBjb25maWdIdG1sKTtcblx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kKHRoaXMuX2lucHV0WCk7XG5cdFx0dGhpcy5fd2lkZ2V0WCA9IHRoaXMuX2lucHV0WC5rZW5kb051bWVyaWNUZXh0Qm94KGNvbmZpZ1dpZGdldCkuZGF0YSgna2VuZG9OdW1lcmljVGV4dEJveCcpO1xuXG5cdFx0dGhpcy5fY29udGFpbmVyLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJweC0xXCI+LDwvc3Bhbj4nKTtcblxuXHRcdHRoaXMuX2lucHV0WSA9ICQoJzxpbnB1dD4nLCBjb25maWdIdG1sKTtcblx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kKHRoaXMuX2lucHV0WSk7XG5cdFx0dGhpcy5fd2lkZ2V0WSA9IHRoaXMuX2lucHV0WS5rZW5kb051bWVyaWNUZXh0Qm94KGNvbmZpZ1dpZGdldCkuZGF0YSgna2VuZG9OdW1lcmljVGV4dEJveCcpO1xuXG5cdFx0dGhpcy5fY29udGFpbmVyLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJweC0xXCI+LDwvc3Bhbj4nKTtcblxuXHRcdHRoaXMuX2lucHV0WiA9ICQoJzxpbnB1dD4nLCBjb25maWdIdG1sKTtcblx0XHR0aGlzLl9jb250YWluZXIuYXBwZW5kKHRoaXMuX2lucHV0Wik7XG5cdFx0dGhpcy5fd2lkZ2V0WiA9IHRoaXMuX2lucHV0Wi5rZW5kb051bWVyaWNUZXh0Qm94KGNvbmZpZ1dpZGdldCkuZGF0YSgna2VuZG9OdW1lcmljVGV4dEJveCcpO1xuXG5cdFx0dGhpcy5fY29udGFpbmVyLmFwcGVuZCgnPHNwYW4gY2xhc3M9XCJweC0xXCI+PC9zcGFuPicpOyAvLyBBZGRpdGlvbmFsIHNwYWNlclxuXG5cdFx0Ly8gQ3JlYXRlIGludmlzaWJsZSBmaWVsZCB0byBhcHBseSBvdmVyYWxsIHZhbGlkYXRpb25cblx0XHRpZiAodGhpcy5faXNWYWxpZGFibGUpXG5cdFx0e1xuXHRcdFx0dGhpcy5faW5wdXRWYWwgPSAkKCc8aW5wdXQ+Jywge25hbWU6IGAke3RoaXMubmFtZX0tY3VzdG9tLXZhbGlkYXRlYCwgJ2RhdGEtYW9pLW1zZyc6ICdWYWx1ZXMgY2FuXFwndCBhbGwgYmUgMCd9KTtcblx0XHRcdHRoaXMuX2NvbnRhaW5lci5hcHBlbmQodGhpcy5faW5wdXRWYWwpO1xuXHRcdFx0dGhpcy5fY29udGFpbmVyLmFwcGVuZChgPHNwYW4gY2xhc3M9XCJrLWludmFsaWQtbXNnXCIgZGF0YS1mb3I9XCIke3RoaXMubmFtZX0tY3VzdG9tLXZhbGlkYXRlXCI+PC9zcGFuPmApXG5cdFx0XHR0aGlzLl9pbnB1dFZhbC5oaWRlKCk7XG5cdFx0fVxuXG5cdFx0Ly8gQ3JlYXRlIGFuZCBhcHBlbmQgQ2xlYXIgYnV0dG9uXG5cdFx0dGhpcy5fY2xlYXJCdXR0b24gPSAkKCc8YnV0dG9uPicsIHt0eXBlOiAnYnV0dG9uJywgY2xhc3M6ICdrLWJ1dHRvbiBrLXNlY29uZGFyeSBteS0xJywgdGl0bGU6ICdDbGVhcid9KS5hcHBlbmQoJCgnPGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+JykpO1xuXHRcdHRoaXMuX2NsZWFyQnV0dG9uLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25DbGVhckNsaWNrLCB0aGlzKSk7XG5cdFx0dGhpcy5fY29udGFpbmVyLmFwcGVuZCh0aGlzLl9jbGVhckJ1dHRvbik7XG5cblx0XHQvLyBIaWRlIGJ1dHRvbiBieSBkZWZhdWx0XG5cdFx0dGhpcy5fY2xlYXJCdXR0b24uaGlkZSgpO1xuXHR9XG5cblx0X29uQ2hhbmdlKClcblx0e1xuXHRcdC8vIEVtcHR5IHN0cmluZ3MgYXJlIG5vdCBhbGxvd2VkXG5cdFx0aWYgKHRoaXMuX3dpZGdldFgudmFsdWUoKSA9PSBudWxsKVxuXHRcdFx0dGhpcy5fd2lkZ2V0WC52YWx1ZSgwKTtcblxuXHRcdGlmICh0aGlzLl93aWRnZXRZLnZhbHVlKCkgPT0gbnVsbClcblx0XHRcdHRoaXMuX3dpZGdldFkudmFsdWUoMCk7XG5cblx0XHRpZiAodGhpcy5fd2lkZ2V0Wi52YWx1ZSgpID09IG51bGwpXG5cdFx0XHR0aGlzLl93aWRnZXRaLnZhbHVlKDApO1xuXG5cdFx0dGhpcy5fZGlzcGF0Y2hDb21taXQoKTtcblx0fVxuXG5cdF9vbkNsZWFyQ2xpY2soKVxuXHR7XG5cdFx0dGhpcy5fd2lkZ2V0WC52YWx1ZSgnJyk7XG5cdFx0dGhpcy5fd2lkZ2V0WS52YWx1ZSgnJyk7XG5cdFx0dGhpcy5fd2lkZ2V0Wi52YWx1ZSgnJyk7XG5cblx0XHR0aGlzLl9kaXNwYXRjaENvbW1pdCgpO1xuXHR9XG5cblx0X2Rpc3BhdGNoQ29tbWl0KClcblx0e1xuXHRcdGlmICh0aGlzLl9pc1ZhbGlkYWJsZSlcblx0XHRcdHRoaXMuX2lucHV0VmFsLnZhbCh0aGlzLnZhbHVlKTtcblxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2NoYW5nZScpKTtcblx0fVxufVxuXG4vLyBERUZJTkUgQ09NUE9ORU5UXG5pZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQoJ3ZlY3Rvci0zZC1pbnB1dCcpKVxuXHR3aW5kb3cuY3VzdG9tRWxlbWVudHMuZGVmaW5lKCd2ZWN0b3ItM2QtaW5wdXQnLCBWZWN0b3IzRElucHV0KTtcbiIsImV4cG9ydCBjbGFzcyBCYXNlTW9kdWxlIGV4dGVuZHMgSFRNTEVsZW1lbnRcbntcblx0Y29uc3RydWN0b3IoY29tbWFuZHNQcmVmaXgpXG5cdHtcblx0ICAgIHN1cGVyKCk7XG5cblx0XHR0aGlzLl9jb21tYW5kc1ByZWZpeCA9IGNvbW1hbmRzUHJlZml4O1xuXHR9XG5cblx0Z2V0IHNoZWxsQ3RybCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fc2hlbGxDdHJsO1xuXHR9XG5cblx0Z2V0IHNtYXJ0Rm94KClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9zaGVsbEN0cmwuc21hcnRGb3g7XG5cdH1cblxuXHRnZXQgaWREYXRhKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9pZERhdGE7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBPVkVSUklEQUJMRSBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0LyoqXG5cdCAqIENhbGxlZCBieSB0aGUgbW9kdWxlcyBtYW5hZ2VyIGFmdGVyIGxvYWRpbmcgdGhlIG1vZHVsZS5cblx0ICogSW4gY2FzZSBpdCBpcyBvdmVycmlkZGVuLCBzdXBlciBtdXN0IGFsd2F5cyBiZSBjYWxsZWQhXG5cdCAqL1xuXHRpbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKVxuXHR7XG5cdFx0dGhpcy5faWREYXRhID0gaWREYXRhO1xuXHRcdHRoaXMuX3NoZWxsQ3RybCA9IHNoZWxsQ29udHJvbGxlcjtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBBZG1pbiBleHRlbnNpb24gbWVzc2FnZXNcblx0XHR0aGlzLnNtYXJ0Rm94LmFkZEV2ZW50TGlzdGVuZXIoU0ZTMlguU0ZTRXZlbnQuRVhURU5TSU9OX1JFU1BPTlNFLCB0aGlzLl9vbkV4dGVuc2lvblJlc3BvbnNlLCB0aGlzKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIG1vZHVsZXMgbWFuYWdlciBiZWZvcmUgdW5sb2FkaW5nIHRoZSBtb2R1bGUuXG5cdCAqIEluIGNhc2UgaXQgaXMgb3ZlcnJpZGRlbiwgc3VwZXIgbXVzdCBhbHdheXMgYmUgY2FsbGVkIVxuXHQgKi9cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBSZW1vdmUgbGlzdGVuZXIgdG8gQWRtaW4gZXh0ZW5zaW9uIG1lc3NhZ2VzXG5cdFx0dGhpcy5zbWFydEZveC5yZW1vdmVFdmVudExpc3RlbmVyKFNGUzJYLlNGU0V2ZW50LkVYVEVOU0lPTl9SRVNQT05TRSwgdGhpcy5fb25FeHRlbnNpb25SZXNwb25zZSk7XG5cblx0XHQvLyBEZXN0cm95IGFsbCBLZW5kbyB3aWRnZXRzXG5cdFx0a2VuZG8uZGVzdHJveSgkKCcubW9kdWxlJykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENhbGxlZCBieSB0aGUgb25FeHRlbnNpb25SZXNwb25zZSBsaXN0ZW5lciBiZWxvdy5cblx0ICogTXVzdCBiZSBvdmVycmlkZGVuLlxuXHQgKi9cblx0b25FeHRlbnNpb25Db21tYW5kKGNtZCwgZGF0YSlcblx0e1xuXHRcdC8vIE5vdGhpbmcgdG8gZG9cblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIG1haW4gc2hlbGwgd2hlbmV2ZXIgdGhlIHNlcnZlciB1cHRpbWUgY2hhbmdlcy5cblx0ICogQ2FuIGJlIG92ZXJyaWRkZW4gZG8gZGlzcGxheSB0aGUgdXB0aW1lIGluc2lkZSBhIG1vZHVsZSBvciBtYWtlIGNhbGN1bGF0aW9ucyBvbiB0aGUgc2VydmVyIHVwdGltZS5cblx0ICovXG5cdG9uVXB0aW1lVXBkYXRlZCh2YWx1ZXMpXG5cdHtcblx0XHQvLyBOb3RoaW5nIHRvIGRvXG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQVUJMSUMgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8qKlxuXHQgKiBTZW5kIGEgcmVxdWVzdCB0byBBZG1pbiBleHRlbnNpb24uXG5cdCAqL1xuXHRzZW5kRXh0ZW5zaW9uUmVxdWVzdChjb21tYW5kLCBkYXRhID0gbnVsbClcblx0e1xuXHRcdGlmIChkYXRhID09IG51bGwpXG5cdFx0XHRkYXRhID0gbmV3IFNGUzJYLlNGU09iamVjdCgpO1xuXG5cdFx0dGhpcy5zbWFydEZveC5zZW5kKG5ldyBTRlMyWC5FeHRlbnNpb25SZXF1ZXN0KGAke3RoaXMuX2NvbW1hbmRzUHJlZml4fS4ke2NvbW1hbmR9YCwgZGF0YSkpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFJJVkFURSBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0X29uRXh0ZW5zaW9uUmVzcG9uc2UoZXZ0UGFyYW1zKVxuXHR7XG5cdFx0Ly8gRmlsdGVyIHNlcnZlciByZXNwb25zZXNcblx0XHRsZXQgY29tbWFuZHMgPSBldnRQYXJhbXMuY21kLnNwbGl0KCcuJyk7XG5cdFx0bGV0IGRhdGEgPSBldnRQYXJhbXMucGFyYW1zO1xuXHRcdFxuXHRcdGlmIChjb21tYW5kc1swXSA9PSB0aGlzLl9jb21tYW5kc1ByZWZpeClcblx0XHR7XG5cdFx0XHRpZiAoY29tbWFuZHMubGVuZ3RoID4gMSlcblx0XHRcdFx0dGhpcy5vbkV4dGVuc2lvbkNvbW1hbmQoY29tbWFuZHNbMV0sIGRhdGEpXG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQge0NvbmZpZ0Zvcm1JdGVtfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3VpYnVpbGRlci9jb25maWctZm9ybS1pdGVtJztcblxuaW1wb3J0IHtDb25maWdOdW1lcmljU3RlcHBlcn0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLW51bWVyaWMtc3RlcHBlcic7XG5pbXBvcnQge0NvbmZpZ1RleHRJbnB1dH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLXRleHQtaW5wdXQnO1xuaW1wb3J0IHtDb25maWdDaGVja0JveH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLWNoZWNrLWJveCc7XG5pbXBvcnQge0NvbmZpZ0Ryb3BEb3duTGlzdH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLWRyb3AtZG93bi1saXN0JztcbmltcG9ydCB7Q29uZmlnR3JpZH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLWdyaWQnO1xuaW1wb3J0IHtDb25maWdEdWFsTGlzdH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy91aWJ1aWxkZXIvY29uZmlnLWR1YWwtbGlzdCc7XG5pbXBvcnQge0NvbmZpZ1ZlY3RvcjNEfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3VpYnVpbGRlci9jb25maWctdmVjdG9yLTNkJztcblxuZXhwb3J0IGNsYXNzIENvbmZpZ0Zvcm1JdGVtRmFjdG9yeVxue1xuXHRzdGF0aWMgY3JlYXRlKGNvbmZpZ1BhcmFtLCBlZGl0RW5hYmxlZCwgaW5EaWFsb2cgPSBmYWxzZSlcblx0e1xuXHRcdHN3aXRjaCAoY29uZmlnUGFyYW0udHlwZSlcblx0XHR7XG5cdFx0XHRjYXNlICdUZXh0SW5wdXQnOlxuXHRcdFx0XHRyZXR1cm4gbmV3IENvbmZpZ1RleHRJbnB1dChjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ0NoZWNrQm94Jzpcblx0XHRcdFx0cmV0dXJuIG5ldyBDb25maWdDaGVja0JveChjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ051bWVyaWNTdGVwcGVyJzpcblx0XHRcdFx0cmV0dXJuIG5ldyBDb25maWdOdW1lcmljU3RlcHBlcihjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ0NvbWJvQm94Jzpcblx0XHRcdFx0cmV0dXJuIG5ldyBDb25maWdEcm9wRG93bkxpc3QoY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlICdEYXRhR3JpZCc6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlnR3JpZChjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ0R1YWxMaXN0Jzpcblx0XHRcdFx0cmV0dXJuIG5ldyBDb25maWdEdWFsTGlzdChjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgJ1ZlY3RvcjNEJzpcblx0XHRcdFx0cmV0dXJuIG5ldyBDb25maWdWZWN0b3IzRChjb25maWdQYXJhbSwgZWRpdEVuYWJsZWQsIGluRGlhbG9nKTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHJldHVybiBuZXcgQ29uZmlnRm9ybUl0ZW0oY29uZmlnUGFyYW0sIGVkaXRFbmFibGVkLCBpbkRpYWxvZyk7IC8vIFdpbGwgbG9nIGFuIGVycm9yIGZvciBtaXNzaW5nIGZvcm0gaXRlbSB0eXBlXG5cdFx0fVxuXHR9XG59XG4iLCJpbXBvcnQge0NvbmZpZ3VyYXRpb25QYXJhbWV0ZXJ9IGZyb20gJy4vY29uZmlndXJhdGlvbi1wYXJhbWV0ZXInO1xuaW1wb3J0IHtDb25maWdGb3JtSXRlbUZhY3Rvcnl9IGZyb20gJy4vY29uZmlnLWZvcm0taXRlbS1mYWN0b3J5JztcblxuZXhwb3J0IGNsYXNzIENvbmZpZ0ludGVyZmFjZUJ1aWxkZXJcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdFx0Ly8gU2V0IHNvbWUgY29uc3RhbnRzXG5cdFx0dGhpcy5UQUJfUFJFRklYID0gJ3RhYi0nXG5cdFx0dGhpcy5UQUJfUEFORV9QUkVGSVggPSAndGFicGFuZS0nO1xuXHRcdHRoaXMuU0VQQVJBVE9SX0JFRk9SRSA9ICdiZWZvcmUnO1xuXHRcdHRoaXMuU0VQQVJBVE9SX0FGVEVSID0gJ2FmdGVyJztcblx0fVxuXG5cdGR1bXAobW9kaWZpZWRPbmx5ID0gZmFsc2UpXG5cdHtcblx0XHRsZXQgZHVtcFN0ciA9ICcnO1xuXG5cdFx0Zm9yIChsZXQgY3Agb2YgdGhpcy5fY29uZmlnUGFyYW1zKVxuXHRcdHtcblx0XHRcdGlmIChtb2RpZmllZE9ubHkpXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChjcC5pc01vZGlmaWVkKVxuXHRcdFx0XHRcdGR1bXBTdHIgKz0gY3AudG9TdHJpbmcoKSArICdcXG4nO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZVxuXHRcdFx0XHRkdW1wU3RyICs9IGNwLnRvU3RyaW5nKCkgKyAnXFxuJztcblx0XHR9XG5cblx0XHRjb25zb2xlLmxvZyhkdW1wU3RyKTtcblx0fVxuXG5cdGJ1aWxkSW50ZXJmYWNlKGRhdGEsIG1haW5Db250YWluZXJJZCwgZGlzYWJsZUVkaXQgPSBmYWxzZSwgdGFiU3VmZml4ID0gJycpXG5cdHtcblx0XHR0aGlzLl9tYWluQ29udGFpbmVySWQgPSBtYWluQ29udGFpbmVySWQ7XG5cdFx0dGhpcy5fY29uZmlnUGFyYW1zID0gbmV3IEFycmF5KCk7XG5cdFx0dGhpcy5fdmFsaWRhdG9yID0gbnVsbDtcblxuXHRcdGxldCBoYXNOZXdGb3JtSXRlbSA9IGZhbHNlO1xuXG5cdFx0Ly9jb25zb2xlLmxvZyhkYXRhLmdldER1bXAoKSlcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5zaXplKCk7IGkrKylcblx0XHR7XG5cdFx0XHQvLyBQQVJTRSBEQVRBXG5cblx0XHRcdGxldCBjb25maWdQYXJhbSA9IENvbmZpZ3VyYXRpb25QYXJhbWV0ZXIuZnJvbVNmc09iamVjdChkYXRhLmdldChpKSk7XG5cdFx0XHR0aGlzLl9jb25maWdQYXJhbXMucHVzaChjb25maWdQYXJhbSk7XG5cblx0XHRcdC8vIEdldCB0YWIgYW5kIHRhYiBwYW5lIGlkIGZyb20gZ3JvdXAgaWRcblx0XHRcdGNvbnN0IHRhYklkID0gdGhpcy5UQUJfUFJFRklYICsgY29uZmlnUGFyYW0uY2F0ZWdvcnlJZCArICh0YWJTdWZmaXggPyAnXycgKyB0YWJTdWZmaXggOiAnJyk7XG5cdFx0XHRjb25zdCB0YWJQYW5lSWQgPSB0aGlzLlRBQl9QQU5FX1BSRUZJWCArIGNvbmZpZ1BhcmFtLmNhdGVnb3J5SWQgKyAodGFiU3VmZml4ID8gJ18nICsgdGFiU3VmZml4IDogJycpO1xuXG5cdFx0XHQvLyBCVUlMRCBJTlRFUkZBQ0UgOjogVEFCU1xuXG5cdFx0XHQvLyBDaGVjayBpZiBhIHRhYiBzcGVjaWZpYyBmb3IgdGhpcyBncm91cCBhbHJlYWR5IGV4aXN0cyBpbnNpZGUgdGhlIG1haW5Db250YWluZXI6IGlmIG5vdCwgY3JlYXRlIGl0XG5cdFx0XHQvLyAoYSB0YWIgYWxyZWFkeSBleGlzdHMgaWYgaXQgd2FzIGNyZWF0ZWQgaW4gYSBwcmV2aW91cyBsb29wKVxuXHRcdFx0bGV0IHRhYiA9ICQoYCMke21haW5Db250YWluZXJJZH0gPiAjdGFicyAjJHt0YWJJZH1gKTtcblxuXHRcdFx0aWYgKHRhYi5sZW5ndGggPT0gMClcblx0XHRcdHtcblx0XHRcdFx0Ly8gQ3JlYXRlIHRhYiBmb3IgdGFiIHBhbmVcblx0XHRcdFx0dGFiID0gJCgnPGxpPicsIHtjbGFzczogJ25hdi1pdGVtJ30pO1xuXHRcdFx0XHR0YWIuYXBwZW5kKCQoJzxhPicsIHtcblx0XHRcdFx0XHRjbGFzczogJ25hdi1saW5rJyArIChpID09IDAgPyAnIGFjdGl2ZScgOiAnJyksXG5cdFx0XHRcdFx0aWQ6IHRhYklkLFxuXHRcdFx0XHRcdCdkYXRhLXRvZ2dsZSc6ICd0YWInLFxuXHRcdFx0XHRcdGhyZWY6ICcjJyArIHRhYlBhbmVJZCxcblx0XHRcdFx0XHRyb2xlOiAndGFiJyxcblx0XHRcdFx0XHQnYXJpYS1jb250cm9scyc6IHRhYlBhbmVJZCxcblx0XHRcdFx0XHQnYXJpYS1zZWxlY3RlZCc6IChpID09IDAgPyAndHJ1ZScgOiAnZmFsc2UnKSxcblx0XHRcdFx0XHRodG1sOiBjb25maWdQYXJhbS5jYXRlZ29yeSxcblx0XHRcdFx0fSkpO1xuXG5cdFx0XHRcdC8vIEFkZCB0YWIgdG8gY29udGFpbmVyXG5cdFx0XHRcdCQoYCMke21haW5Db250YWluZXJJZH0gPiAjdGFic2ApLmFwcGVuZCh0YWIpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBCVUlMRCBJTlRFUkZBQ0UgOjogVEFCIFBBTkVTXG5cblx0XHRcdC8vIENoZWNrIGlmIGEgdGFiIHBhbmUgc3BlY2lmaWMgZm9yIHRoaXMgZ3JvdXAgYWxyZWFkeSBleGlzdHMgaW5zaWRlIHRoZSBtYWluQ29udGFpbmVyOiBpZiBub3QsIGNyZWF0ZSBpdFxuXHRcdFx0Ly8gKGEgdGFiIHBhbmUgYWxyZWFkeSBleGlzdHMgaWYgaXQgd2FzIGNyZWF0ZWQgaW4gYSBwcmV2aW91cyBsb29wIG9yIGlmIGl0IGV4aXN0cyBzdGF0aWNhbGx5IGluIHRoZSBodG1sIC0gaW4gY2FzZSBpdCBpcyBuZWVkZWQgdG8gYWRkIHNvbWUgc3RhdGljIGNvbnRlbnQpXG5cdFx0XHRsZXQgdGFiUGFuZSA9ICQoYCMke21haW5Db250YWluZXJJZH0gPiAjdGFiUGFuZWxzID4gIyR7dGFiUGFuZUlkfWApO1xuXG5cdFx0XHRpZiAodGFiUGFuZS5sZW5ndGggPT0gMClcblx0XHRcdHtcblx0XHRcdFx0Ly8gQ3JlYXRlIHRhYiBwYW5lXG5cdFx0XHRcdHRhYlBhbmUgPSAkKCc8ZGl2PicsIHtcblx0XHRcdFx0XHRjbGFzczogJ3RhYi1wYW5lJyArIChpID09IDAgPyAnIHNob3cgYWN0aXZlJyA6ICcnKSxcblx0XHRcdFx0XHRpZDogdGFiUGFuZUlkLFxuXHRcdFx0XHRcdHJvbGU6ICd0YWJwYW5lbCcsXG5cdFx0XHRcdFx0J2FyaWEtbGFiZWxsZWRieSc6IHRhYklkLFxuXHRcdFx0XHRcdCdkYXRhLWR5bmFtaWMnOiAndHJ1ZScsXG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIEFkZCB0YWIgcGFuZSB0byBjb250YWluZXJcblx0XHRcdFx0JChgIyR7bWFpbkNvbnRhaW5lcklkfSA+ICN0YWJQYW5lbHNgKS5hcHBlbmQodGFiUGFuZSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEJVSUxEIElOVEVSRkFDRSA6OiBUQUIgUEFORVMnIEZPUk1cblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYSBmb3JtIGFscmVhZHkgZXhpc3RzIGluc2lkZSB0aGUgdGFiIHBhbmU6IGlmIG5vdCwgY3JlYXRlIGl0XG5cdFx0XHRsZXQgZm9ybSA9IHRhYlBhbmUuZmluZCgnZm9ybScpO1xuXG5cdFx0XHRpZiAoZm9ybS5sZW5ndGggPT0gMClcblx0XHRcdHtcblx0XHRcdFx0Ly8gQ3JlYXRlIGZvcm1cblx0XHRcdFx0Zm9ybSA9ICQoJzxmb3JtPicsIHtcblx0XHRcdFx0XHRjbGFzczogJycsXG5cdFx0XHRcdFx0YXV0b2NvbXBsZXRlOiAnb2ZmJ1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHQvLyBDcmVhdGUgYW4gaW5uZXIgZmllbGRzZXQ7IHRoaXMgbWlnaHQgYmUgdXNlZnVsIHRvIGVhc2lseSBkaXNhYmxlIHRoZSB3aG9sZSBmb3JtIGF0IG9uY2UgKGFjdHVhbGx5IHdlIGRvbid0IHVzZSBpdCBiZWNhdXNlIEtlbmRvIHdpZGdldHMgYXJlIG5vdCBkaXNhYmxlZCBhdXRvbWF0aWNhbGx5KVxuXHRcdFx0XHRmb3JtLmFwcGVuZChcblx0XHRcdFx0XHQkKCc8ZmllbGRzZXQ+Jywge1xuXHRcdFx0XHRcdFx0Y2xhc3M6ICcnXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0KTtcblxuXHRcdFx0XHQvLyBBZGQgZm9ybSB0byB0YWIgcGFuZVxuXHRcdFx0XHR0YWJQYW5lLnByZXBlbmQoZm9ybSk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEdldCBmaWVsZHNldCwgd2hpY2ggaXMgdGhlIGFjdHVhbCBmb3JtIGl0ZW1zIGNvbnRhaW5lclxuXHRcdFx0bGV0IGZpZWxkc2V0ID0gZm9ybS5maW5kKCdmaWVsZHNldCcpO1xuXG5cdFx0XHQvLyBCVUlMRCBJTlRFUkZBQ0UgOjogVEFCIFBBTkVTJyBGT1JNIElURU1TXG5cblx0XHRcdC8vIENoZWNrIGlmIGZvcm0gaXRlbSBhbHJlYWR5IGV4aXN0cyBpbiBmaWVsZHNldDsgaWYgeWVzLCBqdXN0IHVwZGF0ZSBpdHMgZGF0YVxuXHRcdFx0bGV0IGZvcm1JdGVtID0gZmllbGRzZXQuZmluZChgI2Zvcm0taXRlbS0keyQuZXNjYXBlU2VsZWN0b3IoY29uZmlnUGFyYW0ubmFtZSl9YCk7XG5cblx0XHRcdGlmIChmb3JtSXRlbS5sZW5ndGggPT0gMClcblx0XHRcdHtcblx0XHRcdFx0aGFzTmV3Rm9ybUl0ZW0gPSB0cnVlO1xuXG5cdFx0XHRcdGZvcm1JdGVtID0gQ29uZmlnRm9ybUl0ZW1GYWN0b3J5LmNyZWF0ZShjb25maWdQYXJhbSwgIWRpc2FibGVFZGl0KTtcblxuXHRcdFx0XHQvLyBBZGQgc2VwYXJhdG9yIGJlZm9yZVxuXHRcdFx0XHRpZiAoY29uZmlnUGFyYW0uc2VwYXJhdG9yICE9IG51bGwgJiYgY29uZmlnUGFyYW0uc2VwYXJhdG9yLnBvcyA9PSAnYmVmb3JlJylcblx0XHRcdFx0XHRmaWVsZHNldC5hcHBlbmQodGhpcy5fYnVpbGRTZXBhcmF0b3IoY29uZmlnUGFyYW0uc2VwYXJhdG9yKSk7XG5cblx0XHRcdFx0Ly8gQWRkIGZvcm0gaXRlbSB0byBmb3JtXG5cdFx0XHRcdGZpZWxkc2V0LmFwcGVuZChmb3JtSXRlbSk7XG5cblx0XHRcdFx0Ly8gQWRkIHNlcGFyYXRvciBhZnRlclxuXHRcdFx0XHRpZiAoY29uZmlnUGFyYW0uc2VwYXJhdG9yICE9IG51bGwgJiYgY29uZmlnUGFyYW0uc2VwYXJhdG9yLnBvcyA9PSAnYWZ0ZXInKVxuXHRcdFx0XHRcdGZpZWxkc2V0LmFwcGVuZCh0aGlzLl9idWlsZFNlcGFyYXRvcihjb25maWdQYXJhbS5zZXBhcmF0b3IpKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdFx0Zm9ybUl0ZW1bMF0uZGF0YSA9IGNvbmZpZ1BhcmFtO1xuXHRcdH1cblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBzaG93IGhlbHAgdG9vbHRpcHNcblx0XHRsZXQgYWxsRm9ybXMgPSAkKGAjJHttYWluQ29udGFpbmVySWR9ID4gI3RhYlBhbmVscyA+IGRpdi50YWItcGFuZSA+IGZvcm1gKTtcblx0XHRhbGxGb3Jtcy5rZW5kb1Rvb2x0aXAoe1xuXHRcdFx0ZmlsdGVyOiAnaVt0aXRsZV0uaGVscCcsXG5cdFx0XHRwb3NpdGlvbjogJ3JpZ2h0Jyxcblx0XHRcdHdpZHRoOiAnMjUwcHgnLFxuXHRcdFx0Y29udGVudDogZnVuY3Rpb24oZSkge1xuXHRcdFx0XHRyZXR1cm4gYDxkaXYgY2xhc3M9XCJoZWxwLXRvb2x0aXBcIj4ke2UudGFyZ2V0LmRhdGEoJ3RpdGxlJyl9PC9kaXY+YDtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEluaXRpYWxpemUga2VuZG8gdmFsaWRhdGlvbiBvbiBmb3JtcycgbWFpbiBjb250YWluZXJcblx0XHR0aGlzLl92YWxpZGF0b3IgPSAkKGAjJHttYWluQ29udGFpbmVySWR9YCkua2VuZG9WYWxpZGF0b3Ioe1xuXHRcdFx0dmFsaWRhdGVPbkJsdXI6IHRydWUsXG5cdFx0XHRydWxlczoge1xuXHRcdFx0XHQvLyBBZGQgcnVsZSB0byB2YWxpZGF0ZSBBT0kgZm9ybSBpdGVtc1xuXHRcdFx0XHQvLyAoc2VlOiBodHRwczovL2RlbW9zLnRlbGVyaWsuY29tL2tlbmRvLXVpL3ZhbGlkYXRvci9jdXN0b20tdmFsaWRhdGlvbilcblx0XHRcdFx0YW9pOiBmdW5jdGlvbiAoaW5wdXQpIHtcblx0XHRcdFx0XHRpZiAoaW5wdXQuaXMoJ1tkYXRhLWFvaS1tc2ddJykgJiYgaW5wdXQudmFsKCkgIT0gJycpXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0aWYgKGlucHV0LnZhbCgpID09ICcwLDAsMCcpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblx0XHRcdH1cblx0XHR9KS5kYXRhKCdrZW5kb1ZhbGlkYXRvcicpO1xuXHR9XG5cblx0ZGVzdHJveUludGVyZmFjZSgpXG5cdHtcblx0XHQvLyBEZXN0cm95IGFsbCBLZW5kbyB3aWRnZXRzIGluIGZvcm1zXG5cdFx0a2VuZG8uZGVzdHJveSgkKGAjJHt0aGlzLl9tYWluQ29udGFpbmVySWR9ID4gI3RhYlBhbmVscyA+IGRpdi50YWItcGFuZSA+IGZvcm1gKSk7XG5cblx0XHQvLyBSZW1vdmUgYWxsIHRhYnNcblx0XHQkKGAjJHt0aGlzLl9tYWluQ29udGFpbmVySWR9ID4gI3RhYnNgKS5lbXB0eSgpO1xuXG5cdFx0Ly8gUmVtb3ZlIGR5bmFtaWMgdGFiIHBhbmVzICh0YWIgcGFuZXMgY3JlYXRlZCBieSBJbnRlcmZhY2UgQnVpbGRlcilcblx0XHQkKGAjJHt0aGlzLl9tYWluQ29udGFpbmVySWR9ID4gI3RhYlBhbmVscyA+IGRpdi50YWItcGFuZVtkYXRhLWR5bmFtaWM9XCJ0cnVlXCJdYCkucmVtb3ZlKCk7XG5cblx0XHQvLyBSZW1vdmUgZm9ybSBpbnNpZGUgc3RhdGljIHRhYiBwYW5lcyAocHJlZGVmaW5lZCB0YWIgcGFuZXMgaW4gaHRtbClcblx0XHQkKGAjJHt0aGlzLl9tYWluQ29udGFpbmVySWR9ID4gI3RhYlBhbmVscyA+IGRpdi50YWItcGFuZSA+IGZvcm1gKS5yZW1vdmUoKTtcblx0fVxuXG5cdGRpc2FibGVJbnRlcmZhY2UoZGlzYWJsZSlcblx0e1xuXHRcdC8vIEVuYWJsZS9kaXNhYmxlIGFsbCBjb25maWcgZm9ybSBpdGVtc1xuXHRcdCQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH0gKltpZF49J2Zvcm0taXRlbS0nXWApLnByb3AoJ2VkaXRFbmFibGVkJywgIWRpc2FibGUpO1xuXHR9XG5cblx0X2J1aWxkU2VwYXJhdG9yKHNlcGFyYXRvcilcblx0e1xuXHRcdGlmIChzZXBhcmF0b3IudGV4dCA9PSBudWxsKVxuXHRcdFx0cmV0dXJuICQoYDxociBjbGFzcz1cImNvbmZpZy1mb3JtLXNlcGFyYXRvclwiPmApO1xuXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuICQoYDxsYWJlbCBjbGFzcz1cImNvbmZpZy1mb3JtLXNlcGFyYXRvci1sYWJlbCBtYi0zXCI+JHtzZXBhcmF0b3IudGV4dH08L2xhYmVsPmApO1xuXHR9XG5cblx0Z2V0Q2hhbmdlZERhdGEoKVxuXHR7XG5cdFx0bGV0IGNoYW5nZXMgPSBuZXcgU0ZTMlguU0ZTQXJyYXkoKTtcblxuXHRcdGZvciAodmFyIGNwIG9mIHRoaXMuX2NvbmZpZ1BhcmFtcylcblx0XHR7XG5cdFx0XHRpZiAoY3AuaXNNb2RpZmllZClcblx0XHRcdFx0Y2hhbmdlcy5hZGRTRlNPYmplY3QoY3AudG9TZnNPYmplY3QoKSk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNoYW5nZXM7XG5cdH1cblxuXHRyZXNldElzTW9kaWZpZWQoKVxuXHR7XG5cdFx0Zm9yIChsZXQgY3Agb2YgdGhpcy5fY29uZmlnUGFyYW1zKVxuXHRcdHtcblx0XHRcdGlmIChjcC5pc01vZGlmaWVkKVxuXHRcdFx0XHRjcC5yZXNldElzTW9kaWZpZWQoKTtcblx0XHR9XG5cdH1cblxuXHRjaGVja0lzVmFsaWQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbGlkYXRvci52YWxpZGF0ZSgpO1xuXHR9XG5cblx0cmVzZXRWYWxpZGF0aW9uKClcblx0e1xuXHRcdHRoaXMuX3ZhbGlkYXRvci5oaWRlTWVzc2FnZXMoKTtcblxuXHRcdC8vIFRoZSBtZXRob2QgYWJvdmUgZG9lc24ndCByZW1vdmUgdGhlIGstaW52YWxpZCBjbGFzc2VzIGFuZCBhcmlhLWludmFsaWQ9XCJ0cnVlXCIgYXR0cmlidXRlcyBmcm9tIGlucHV0c1xuXHRcdC8vIExldCdzIGRvIGl0IG1hbnVhbGx5XG5cdFx0JChgIyR7dGhpcy5fbWFpbkNvbnRhaW5lcklkfSAuay1pbnZhbGlkYCkucmVtb3ZlQ2xhc3MoJ2staW52YWxpZCcpO1xuXHRcdCQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH0gW2FyaWEtaW52YWxpZD1cInRydWVcIl1gKS5yZW1vdmVBdHRyKCdhcmlhLWludmFsaWQnKTtcblx0fVxuXG5cdGdldENvbmZpZ0Zvcm1JdGVtKGNvbmZpZ1BhcmFtTmFtZSlcblx0e1xuXHRcdGxldCBmb3JtSXRlbSA9ICQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH1gKS5maW5kKGAjZm9ybS1pdGVtLSR7JC5lc2NhcGVTZWxlY3Rvcihjb25maWdQYXJhbU5hbWUpfWApO1xuXG5cdFx0aWYgKGZvcm1JdGVtLmxlbmd0aCA+IDApXG5cdFx0XHRyZXR1cm4gZm9ybUl0ZW1bMF07XG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRhY3RpdmF0ZUZpcnN0VGFiUGFuZWwoKVxuXHR7XG5cdFx0bGV0IGNvbmZpZ1BhcmFtID0gdGhpcy5fY29uZmlnUGFyYW1zWzBdO1xuXHRcdGNvbnN0IHRhYlBhbmVJZCA9IHRoaXMuVEFCX1BBTkVfUFJFRklYICsgY29uZmlnUGFyYW0uY2F0ZWdvcnlJZDtcblx0XHRsZXQgdGFiUGFuZSA9ICQoYCMke3RoaXMuX21haW5Db250YWluZXJJZH0gPiAjdGFiUGFuZWxzID4gIyR7dGFiUGFuZUlkfWApO1xuXHRcdHRhYlBhbmUuYWRkQ2xhc3MoJ3Nob3cgYWN0aXZlJyk7XG5cdH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDb25maWd1cmF0aW9uUGFyYW1ldGVyXG57XG5cdHN0YXRpYyBmcm9tU2ZzT2JqZWN0KGVsZW1lbnQpXG5cdHtcblx0XHRsZXQgY3AgPSBuZXcgQ29uZmlndXJhdGlvblBhcmFtZXRlcigpO1xuXG5cdFx0Ly8gUGFyc2UgY29tbW9uIGRhdGFcblx0XHRjcC5uYW1lID0gZWxlbWVudC5nZXRVdGZTdHJpbmcoJ25hbWUnKTtcblx0XHRjcC5sYWJlbCA9IGVsZW1lbnQuZ2V0VXRmU3RyaW5nKCdsYWJlbCcpO1xuXHRcdGNwLmNhdGVnb3J5ID0gZWxlbWVudC5nZXRVdGZTdHJpbmcoJ2NhdGVnb3J5Jyk7XG5cdFx0Y3AudG9vbHRpcCA9IGVsZW1lbnQuZ2V0VXRmU3RyaW5nKCd0b29sdGlwJyk7XG5cdFx0Y3AudHlwZSA9IGVsZW1lbnQuZ2V0VXRmU3RyaW5nKCd0eXBlJyk7XG5cdFx0Y3AudmFsdWUgPSBlbGVtZW50LmdldCgndmFsdWUnKTtcblx0XHRjcC52YWxpZGF0b3IgPSBlbGVtZW50LmdldFV0ZlN0cmluZygndmFsaWRhdG9yJyk7XG5cdFx0Y3AuZWRpdGFibGUgPSAoZWxlbWVudC5jb250YWluc0tleSgnZWRpdCcpID8gZWxlbWVudC5nZXRCb29sKCdlZGl0JykgOiB0cnVlKTtcblx0XHRjcC50cmlnZ2VyID0gKGVsZW1lbnQuY29udGFpbnNLZXkoJ3RyaWdnZXInKSA/IGVsZW1lbnQuZ2V0Qm9vbCgndHJpZ2dlcicpIDogZmFsc2UpO1xuXHRcdGNwLnRyaWdnZXJEYXRhID0gZWxlbWVudC5nZXRTRlNBcnJheSgndHJpZ2dlckRhdGEnKTtcblx0XHRjcC5jbGllbnRPbmx5ID0gKGVsZW1lbnQuY29udGFpbnNLZXkoJ2NsaWVudE9ubHknKSA/IGVsZW1lbnQuZ2V0Qm9vbCgnY2xpZW50T25seScpIDogZmFsc2UpO1xuXHRcdGNwLmRhdGFQcm92aWRlciA9IGVsZW1lbnQuZ2V0VXRmU3RyaW5nKCdkYXRhUHJvdmlkZXInKTtcblxuXHRcdC8vIFBhcnNlIGNvbXBvbmVudCBzcGVjaWZpYyBhdHRyaWJ1dGVzXG5cdFx0bGV0IHRtcEF0dHJpYnV0ZXMgPSBlbGVtZW50LmdldFNGU09iamVjdCgnYXR0cmlidXRlcycpO1xuXHRcdGlmICh0bXBBdHRyaWJ1dGVzICE9IG51bGwpXG5cdFx0e1xuXHRcdFx0bGV0IGF0dHJpYnV0ZXMgPSB7fTtcblxuXHRcdFx0bGV0IGtleXMgPSB0bXBBdHRyaWJ1dGVzLmdldEtleXNBcnJheSgpO1xuXHRcdFx0Zm9yIChsZXQga2V5IG9mIGtleXMpXG5cdFx0XHRcdGF0dHJpYnV0ZXNba2V5XSA9IHRtcEF0dHJpYnV0ZXMuZ2V0KGtleSk7XG5cblx0XHRcdGNwLmF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzO1xuXHRcdH1cblxuXHRcdC8vIFBhcnNlIHNlcGFyYXRvciBzZXR0aW5nc1xuXHRcdGxldCB0bXBTZXBhcmF0b3IgPSBlbGVtZW50LmdldFNGU09iamVjdCgnc2VwYXJhdG9yJyk7XG5cdFx0aWYgKHRtcFNlcGFyYXRvciAhPSBudWxsKVxuXHRcdHtcblx0XHRcdGxldCBzZXBhcmF0b3IgPSB7fTtcblxuXHRcdFx0bGV0IGtleXMxID0gdG1wU2VwYXJhdG9yLmdldEtleXNBcnJheSgpO1xuXHRcdFx0Zm9yIChsZXQga2V5MSBvZiBrZXlzMSlcblx0XHRcdFx0c2VwYXJhdG9yW2tleTFdID0gdG1wU2VwYXJhdG9yLmdldChrZXkxKTtcblxuXHRcdFx0Y3Auc2VwYXJhdG9yID0gc2VwYXJhdG9yO1xuXHRcdH1cblxuXHRcdC8vIFBhcnNlIGRlZmF1bHQgbGlzdCBpdGVtXG5cdFx0bGV0IHRtcERlZmF1bHRMaXN0SXRlbSA9IGVsZW1lbnQuZ2V0U0ZTQXJyYXkoJ2RlZmF1bHRMaXN0SXRlbScpO1xuXHRcdGlmICh0bXBEZWZhdWx0TGlzdEl0ZW0gIT0gbnVsbCAmJiB0bXBEZWZhdWx0TGlzdEl0ZW0uc2l6ZSgpID4gMClcblx0XHR7XG5cdFx0XHRsZXQgZGVmYXVsdExpc3RJdGVtID0gW107XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdG1wRGVmYXVsdExpc3RJdGVtLnNpemUoKTsgaSsrKVxuXHRcdFx0XHRkZWZhdWx0TGlzdEl0ZW0ucHVzaChDb25maWd1cmF0aW9uUGFyYW1ldGVyLmZyb21TZnNPYmplY3QodG1wRGVmYXVsdExpc3RJdGVtLmdldFNGU09iamVjdChpKSkpO1xuXG5cdFx0XHRjcC5kZWZhdWx0TGlzdEl0ZW0gPSBkZWZhdWx0TGlzdEl0ZW07XG5cblx0XHRcdC8vIFBhcnNlIGxpc3QgdmFsdWVzXG5cdFx0XHRsZXQgbGlzdFZhbHVlcyA9IFtdO1xuXG5cdFx0XHRsZXQgdG1wTGlzdFZhbHVlcyA9IGVsZW1lbnQuZ2V0U0ZTQXJyYXkoJ2xpc3RWYWx1ZXMnKTtcblx0XHRcdGlmICh0bXBMaXN0VmFsdWVzICE9IG51bGwgJiYgdG1wTGlzdFZhbHVlcy5zaXplKCkgPiAwKVxuXHRcdFx0e1xuXHRcdFx0XHRmb3IgKGxldCB2ID0gMDsgdiA8IHRtcExpc3RWYWx1ZXMuc2l6ZSgpOyB2KyspXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRsZXQgbGlzdFZhbHVlT2JqID0gdG1wTGlzdFZhbHVlcy5nZXRTRlNPYmplY3Qodik7XG5cdFx0XHRcdFx0bGV0IG9iaiA9IHt9O1xuXG5cdFx0XHRcdFx0bGV0IGtleXMyID0gbGlzdFZhbHVlT2JqLmdldEtleXNBcnJheSgpO1xuXHRcdFx0XHRcdGZvciAobGV0IGtleTIgb2Yga2V5czIpXG5cdFx0XHRcdFx0XHRvYmpba2V5Ml0gPSBsaXN0VmFsdWVPYmouZ2V0KGtleTIpO1xuXG5cdFx0XHRcdFx0bGlzdFZhbHVlcy5wdXNoKG9iaik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Y3AubGlzdFZhbHVlcyA9IGxpc3RWYWx1ZXM7XG5cblx0XHRcdC8vIElmIHdlIGhhdmUgYSBsaXN0LCBvbiB0aGUgc2VydmVyLXNpZGUgaXRlbXMgY291bGQgYmUgcmVwcmVzZW50ZWQgYnkgYSBjbGFzc1xuXHRcdFx0Y3AuY2xhenogPSBlbGVtZW50LmdldFV0ZlN0cmluZygnY2xhenonKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gY3A7XG5cdH1cblxuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHQvKiBDT05TVEFOVFMgKi9cblx0XHR0aGlzLkRFRkFVTFRfQ0FURUdPUllfTkFNRSA9ICdHZW5lcmFsJztcblx0XHR0aGlzLkRFRkFVTFRfQ0FURUdPUllfSUQgPSAnZ2VuZXJhbCc7XG5cblx0XHQvKiBQVUJMSUMgVkFSUyAqL1xuXG5cdFx0dGhpcy5uYW1lID0gJyc7XG5cdFx0dGhpcy5sYWJlbCA9ICcnO1xuXHRcdHRoaXMudG9vbHRpcCA9ICcnO1xuXHRcdHRoaXMudHlwZSA9IG51bGw7XG5cdFx0dGhpcy50cmlnZ2VyID0gZmFsc2U7XG5cdFx0dGhpcy50cmlnZ2VyRGF0YSA9IG51bGw7XG5cdFx0dGhpcy5jbGllbnRPbmx5ID0gZmFsc2U7XG5cdFx0dGhpcy5lZGl0YWJsZSA9IHRydWU7XG5cdFx0dGhpcy5hdHRyaWJ1dGVzID0gbnVsbDtcblx0XHR0aGlzLmRhdGFQcm92aWRlciA9IG51bGw7XG5cblx0XHR0aGlzLnNlcGFyYXRvciA9IG51bGw7XHRcdFx0Ly8gUGFyYW1ldGVyIHVzZWQgdG8gY3JlYXRlIGEgc2VwYXJhdG9yIGJlZm9yZSBvciBhZnRlciB0aGUgY29uZmlnIHBhcmFtZXRlclxuXHRcdHRoaXMuZGVmYXVsdExpc3RJdGVtID0gbnVsbDtcdFx0Ly8gTGlzdCBvZiBzdWItQ29uZmlndXJhdGlvblBhcmFtZXRlcnMsIGVhY2ggY29udGFpbmluZyB0aGUgZGVmYXVsdCB2YWx1ZXNcblx0XHR0aGlzLmNsYXp6ID0gbnVsbDtcdFx0XHRcdC8vIE5hbWUgb2YgdGhlIGNsYXNzIHJlcHJlc2VudGluZyB0aGUgbGlzdCBpdGVtIChub3QgdXNlZCBpbiBjYXNlIG9mIHByaW1pdGV2ZSBkYXRhIHR5cGVzKVxuXG5cdFx0LyogUFJJVkFURSBWQVJTICovXG5cblx0XHR0aGlzLl9jYXRlZ29yeSA9IHRoaXMuREVGQVVMVF9DQVRFR09SWV9OQU1FO1xuXHRcdHRoaXMuX2NhdGVnb3J5SWQgPSB0aGlzLkRFRkFVTFRfQ0FURUdPUllfSUQ7XG5cdFx0dGhpcy5fdmFsdWUgPSBudWxsO1xuXHRcdHRoaXMuX2luaXRpYWxWYWx1ZSA9IG51bGw7XHRcdC8vIFNhdmUgdGhlIGluaXRpYWwgdmFsdWUgb2YgdGhlIGNvbmZpZ3VyYXRpb24gcGFyYW1ldGVyLCB0byBjaGVjayBpZiB0aGUgdmFsdWUgd2FzIG1vZGlmaWVkXG5cdFx0dGhpcy5fdmFsaWRhdG9yID0gbnVsbDtcblxuXHRcdHRoaXMuX2xpc3RJdGVtcyA9IFtdO1x0XHRcdC8vIEFycmF5IG9mIGFycmF5cyBvZiBDb25maWd1cmF0aW9uUGFyYW1ldGVyc1xuXHRcdHRoaXMuX2xpc3RJdGVtc0NoYW5nZWQgPSBmYWxzZTtcdC8vIEZsYWcgdG8gYmUgc2V0IGluIGNhc2UgYSBsaXN0IGl0ZW0gaXMgYWRkZWQgb3IgcmVtb3ZlZFxuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gR0VUVEVSUyAvIFNFVFRFUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRzZXQgY2F0ZWdvcnkodmFsKVxuXHR7XG5cdFx0aWYgKHZhbClcblx0XHR7XG5cdFx0XHR0aGlzLl9jYXRlZ29yeSA9IHZhbDtcblx0XHRcdHRoaXMuX3NldElkRnJvbUNhdGVnb3J5TmFtZSh0aGlzLl9jYXRlZ29yeSk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IGNhdGVnb3J5KClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9jYXRlZ29yeTtcblx0fVxuXG5cdHNldCB2YWx1ZSh2YWwpXG5cdHtcblx0XHRpZiAodGhpcy5fdmFsdWUgIT0gdmFsKVxuXHRcdHtcblx0XHRcdC8vIElmIHZhbHVlIGlzIG51bGwsIHRoZW4gd2UgYXJlIHNldHRpbmcgdGhpcyBmb3IgdGhlIGZpcnN0IHRpbWUgYW5kXG5cdFx0XHQvLyB3ZSB3YW50IHRvIHNhdmUgdGhlIGluaXRpYWwgdmFsdWUsIHRvIGNoZWNrIGxhdGVyIGlmIGl0IGhhcyBiZWVuIG1vZGlmaWVkXG5cdFx0XHRpZiAodGhpcy5fdmFsdWUgPT0gbnVsbClcblx0XHRcdFx0dGhpcy5faW5pdGlhbFZhbHVlID0gdmFsO1xuXG5cdFx0XHR0aGlzLl92YWx1ZSA9IHZhbDtcblx0XHR9XG5cdH1cblxuXHRnZXQgdmFsdWUoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3ZhbHVlO1xuXHR9XG5cblx0c2V0IHZhbGlkYXRvcih2YWwpXG5cdHtcblx0XHRpZiAodmFsKVxuXHRcdFx0dGhpcy5fdmFsaWRhdG9yID0gdmFsO1xuXHR9XG5cblx0Z2V0IHZhbGlkYXRvcigpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fdmFsaWRhdG9yO1xuXHR9XG5cblx0LyoqXG5cdCAqIEFuIGFycmF5IG9mIG9iamVjdHM7IGVhY2ggb2JqZWN0IGNvbnRhaW5zIHRoZSBuYW1lLXZhbHVlIHBhaXJzIHVzZWQgdG9cblx0ICogcG9wdWxhdGUgdGhlIGxpc3Qgb2Ygc3ViLWNvbmZpZ3VyYXRpb24gcGFyYW1ldGVycyBhcnJheXMsIGJhc2VkIG9uIGRlZmF1bHRMaXN0SXRlbS5cblx0ICovXG5cdHNldCBsaXN0VmFsdWVzKGFycilcblx0e1xuXHRcdHRoaXMuX3NldFN1YkNvbmZpZ3VyYXRpb25QYXJhbXMoYXJyKTtcblx0fVxuXG5cdGdldCBsaXN0VmFsdWVzKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl9nZXRTdWJDb25maWd1cmF0aW9uUGFyYW1zVmFsdWVzKCk7XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBHRVRURVJTIE9OTFlcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRnZXQgaXNNb2RpZmllZCgpXG5cdHtcblx0XHRsZXQgX2lzTW9kaWZpZWQgPSBmYWxzZTtcblxuXHRcdC8vIElmIHRoZSBwYXJhbWV0ZXIgaXMgdXNlZCBvbiB0aGUgY2xpZW50IG9ubHkgKGZvciBleGFtcGxlIGluIGEgY3VzdG9tIHRyaWdnZXIpXG5cdFx0Ly8gdGhlbiB3ZSBuZXZlciBoYXZlIHRvIGNvbnNpZGVyIGl0IGFzIG1vZGlmaWVkLCB0byBwcmV2ZW50IGl0IGJlaW5nIHNlbnQgdG8gdGhlIHNlcnZlclxuXHRcdGlmICghdGhpcy5jbGllbnRPbmx5KVxuXHRcdHtcblx0XHRcdGlmICh0aGlzLl92YWx1ZSAhPSB0aGlzLl9pbml0aWFsVmFsdWUgfHwgdGhpcy5fbGlzdEl0ZW1zQ2hhbmdlZClcblx0XHRcdFx0X2lzTW9kaWZpZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBDaGVjayBzdWIgcGFyYW1ldGVyc1xuXHRcdFx0XHRvdXRlckxvb3A6IGZvciAobGV0IGxpc3RJdGVtIG9mIHRoaXMuX2xpc3RJdGVtcylcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZvciAobGV0IHN1YkNQIG9mIGxpc3RJdGVtKVxuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdGlmIChzdWJDUC5pc01vZGlmaWVkKVxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRfaXNNb2RpZmllZCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGJyZWFrIG91dGVyTG9vcDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gX2lzTW9kaWZpZWQ7XG5cdH1cblxuXHRnZXQgY2F0ZWdvcnlJZCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY2F0ZWdvcnlJZDtcblx0fVxuXG5cdGdldCBsaXN0SXRlbXMoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2xpc3RJdGVtcztcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBVQkxJQyBNRVRIT0RTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0LyoqXG5cdCAqIFJldHVybiBhIGNsb25lIG9mIHRoaXMgQ29uZmlndXJhdGlvblBhcmFtZXRlci5cblx0ICovXG5cdGNsb25lKGNsb25lVmFsdWUgPSBmYWxzZSlcblx0e1xuXHRcdGxldCBjcCA9IG5ldyBDb25maWd1cmF0aW9uUGFyYW1ldGVyKCk7XG5cdFx0Y3AubmFtZSA9IHRoaXMubmFtZTtcblx0XHRjcC5sYWJlbCA9IHRoaXMubGFiZWw7XG5cdFx0Y3AuY2F0ZWdvcnkgPSB0aGlzLmNhdGVnb3J5O1xuXHRcdGNwLnRvb2x0aXAgPSB0aGlzLnRvb2x0aXA7XG5cdFx0Y3AudHlwZSA9IHRoaXMudHlwZTtcblx0XHRjcC52YWxpZGF0b3IgPSB0aGlzLnZhbGlkYXRvcjtcblx0XHRjcC50cmlnZ2VyID0gdGhpcy50cmlnZ2VyO1xuXHRcdGNwLnRyaWdnZXJEYXRhID0gKHRoaXMudHJpZ2dlckRhdGEgIT0gbnVsbCA/IFNGUzJYLlNGU0FycmF5Lm5ld0Zyb21CaW5hcnlEYXRhKHRoaXMudHJpZ2dlckRhdGEudG9CaW5hcnkoKSkgOiBudWxsKTtcblx0XHRjcC5jbGllbnRPbmx5ID0gdGhpcy5jbGllbnRPbmx5O1xuXHRcdGNwLmRhdGFQcm92aWRlciA9IHRoaXMuZGF0YVByb3ZpZGVyO1xuXG5cdFx0aWYgKGNsb25lVmFsdWUpXG5cdFx0XHRjcC52YWx1ZSA9IHRoaXMudmFsdWU7XG5cblx0XHRpZiAodGhpcy5hdHRyaWJ1dGVzICE9IG51bGwpXG5cdFx0e1xuXHRcdFx0Y3AuYXR0cmlidXRlcyA9IG5ldyBPYmplY3QoKTtcblx0XHRcdGZvciAobGV0IHMxIGluIHRoaXMuYXR0cmlidXRlcylcblx0XHRcdFx0Y3AuYXR0cmlidXRlc1tzMV0gPSB0aGlzLmF0dHJpYnV0ZXNbczFdO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnNlcGFyYXRvciAhPSBudWxsKVxuXHRcdHtcblx0XHRcdGNwLnNlcGFyYXRvciA9IG5ldyBPYmplY3QoKVxuXHRcdFx0Zm9yIChsZXQgczIgaW4gdGhpcy5zZXBhcmF0b3IpXG5cdFx0XHRcdGNwLnNlcGFyYXRvcltzMl0gPSB0aGlzLnNlcGFyYXRvcltzMl07XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuZGVmYXVsdExpc3RJdGVtICE9IG51bGwpXG5cdFx0e1xuXHRcdFx0bGV0IGNsb25lZERlZmF1bHRMaXN0SXRlbXMgPSBbXTtcblxuXHRcdFx0Zm9yIChsZXQgc3ViQ1Agb2YgdGhpcy5kZWZhdWx0TGlzdEl0ZW0pXG5cdFx0XHRcdGNsb25lZERlZmF1bHRMaXN0SXRlbXMucHVzaChzdWJDUC5jbG9uZShjbG9uZVZhbHVlKSk7XG5cblx0XHRcdGNwLmRlZmF1bHRMaXN0SXRlbSA9IGNsb25lZERlZmF1bHRMaXN0SXRlbXM7XG5cdFx0fVxuXG5cdFx0Y3AubGlzdFZhbHVlcyA9IHRoaXMubGlzdFZhbHVlczsgLy8gTm8gbmVlZCB0byBjbG9uZSB0aGlzLCBhcyB0aGUgbGlzdFZhbHVlcyBzZXR0ZXIgYWxyZWFkeSBkb2VzIGl0XG5cdFx0Y3AuY2xhenogPSB0aGlzLmNsYXp6O1xuXG5cdFx0cmV0dXJuIGNwO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlc2V0IGluaXRpYWwgdmFsdWUgYnkgY29weWluZyB0aGUgY3VycmVudCB2YWx1ZS5cblx0ICovXG5cdHJlc2V0SXNNb2RpZmllZCgpXG5cdHtcblx0XHR0aGlzLl9pbml0aWFsVmFsdWUgPSB0aGlzLl92YWx1ZTtcblxuXHRcdC8vIFJlc2V0IHN1Yi1wYXJhbWV0ZXJzXG5cdFx0aWYgKHRoaXMuX2xpc3RJdGVtcyAhPSBudWxsKVxuXHRcdHtcblx0XHRcdGZvciAobGV0IGxpc3RJdGVtIG9mIHRoaXMuX2xpc3RJdGVtcylcblx0XHRcdHtcblx0XHRcdFx0Zm9yIChsZXQgc3ViQ1Agb2YgbGlzdEl0ZW0pXG5cdFx0XHRcdFx0c3ViQ1AucmVzZXRJc01vZGlmaWVkKCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy5fbGlzdEl0ZW1zQ2hhbmdlZCA9IGZhbHNlO1xuXHR9XG5cblx0YWRkTGlzdEl0ZW0obmV3TGlzdEl0ZW0pXG5cdHtcblx0XHR0aGlzLl9saXN0SXRlbXMucHVzaChuZXdMaXN0SXRlbSk7XG5cdFx0dGhpcy5fbGlzdEl0ZW1zQ2hhbmdlZCA9IHRydWU7XG5cdH1cblxuXHR1cGRhdGVMaXN0SXRlbShsaXN0SXRlbSwgaXRlbUluZGV4KVxuXHR7XG5cdFx0dGhpcy5fbGlzdEl0ZW1zW2l0ZW1JbmRleF0gPSBsaXN0SXRlbTtcblx0XHR0aGlzLl9saXN0SXRlbXNDaGFuZ2VkID0gdHJ1ZTtcblx0fVxuXG5cdHJlbW92ZUxpc3RJdGVtKGl0ZW1JbmRleClcblx0e1xuXHRcdHRoaXMuX2xpc3RJdGVtcy5zcGxpY2UoaXRlbUluZGV4LCAxKTtcblx0XHR0aGlzLl9saXN0SXRlbXNDaGFuZ2VkID0gdHJ1ZTtcblx0fVxuXG5cdHRvU2ZzT2JqZWN0KClcblx0e1xuXHRcdGxldCBvYmogPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cblx0XHQvLyBTZXQgY2hhbmdlZCBzZXR0aW5nIG5hbWVcblx0XHRvYmoucHV0VXRmU3RyaW5nKCduYW1lJywgdGhpcy5uYW1lKTtcblxuXHRcdC8vIFNldCBjaGFuZ2VkIHNldHRpbmcgY2xhc3MsIGlmIGFueVxuXHRcdGlmICh0aGlzLmNsYXp6ICE9IG51bGwpXG5cdFx0XHRvYmoucHV0VXRmU3RyaW5nKCdjbGF6eicsIHRoaXMuY2xhenopO1xuXG5cdFx0aWYgKHRoaXMudmFsdWUgIT0gbnVsbClcblx0XHR7XG5cdFx0XHQvLyBTZXQgY2hhbmdlZCBzZXR0aW5nIHZhbHVlXG5cdFx0XHRpZiAodHlwZW9mIHRoaXMudmFsdWUgPT09ICdib29sZWFuJylcblx0XHRcdFx0b2JqLnB1dEJvb2woJ3ZhbHVlJywgdGhpcy52YWx1ZSk7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgdGhpcy52YWx1ZSA9PT0gJ251bWJlcicpXG5cdFx0XHRcdG9iai5wdXRJbnQoJ3ZhbHVlJywgdGhpcy52YWx1ZSk7XG5cdFx0XHRlbHNlXG5cdFx0XHRcdG9iai5wdXRUZXh0KCd2YWx1ZScsIHRoaXMudmFsdWUpO1xuXHRcdH1cblx0XHRlbHNlXG5cdFx0e1xuXHRcdFx0Ly8gU2V0IGNoYW5nZWQgc2V0dGluZyBsaXN0IG9mIHZhbHVlc1xuXG5cdFx0XHRsZXQgbGlzdEl0ZW1zID0gbmV3IFNGUzJYLlNGU0FycmF5KCk7XG5cblx0XHRcdGZvciAobGV0IGEgb2YgdGhpcy5fbGlzdEl0ZW1zKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoYS5sZW5ndGggPT0gMSkgLy8gV2UgaGF2ZSBqdXN0IG9uZSBzdWIgY29uZmlnIHBhcmFtOyBubyBuZWVkIHRvIHBhcnNlIGl0IGNvbXBsaXRlbHlcblx0XHRcdFx0e1xuXHRcdFx0XHRcdC8vIFNpbXBsZSBsaXN0XG5cdFx0XHRcdFx0bGV0IHRlbXBPYmogPSBhWzBdLnRvU2ZzT2JqZWN0KCk7XG5cdFx0XHRcdFx0bGV0IHdhID0gdGVtcE9iai5nZXRXcmFwcGVkSXRlbSgndmFsdWUnKTtcblx0XHRcdFx0XHRsaXN0SXRlbXMuYWRkKHdhLnZhbHVlLCB3YS50eXBlKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdHtcblx0XHRcdFx0XHQvLyBDb21wbGV4IGxpc3RcblxuXHRcdFx0XHRcdGxldCB2YWx1ZXMgPSBuZXcgU0ZTMlguU0ZTQXJyYXkoKTtcblxuXHRcdFx0XHRcdGZvciAobGV0IHN1YkNwIG9mIGEpXG5cdFx0XHRcdFx0XHR2YWx1ZXMuYWRkU0ZTT2JqZWN0KHN1YkNwLnRvU2ZzT2JqZWN0KCkpO1xuXG5cdFx0XHRcdFx0bGlzdEl0ZW1zLmFkZFNGU0FycmF5KHZhbHVlcyk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0b2JqLnB1dFNGU0FycmF5KCd2YWx1ZScsIGxpc3RJdGVtcyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG9iajtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm4gYSBkZXNjcmlwdGlvbiBvZiB0aGUgQ29uZmlndXJhdGlvblBhcmFtZXRlciBpbnN0YW5jZS5cblx0ICovXG5cdHRvU3RyaW5nKClcblx0e1xuXHRcdGxldCBzID0gYGA7XG5cdFx0cyArPSBgQ29uZmlndXJhdGlvbiBwYXJhbWV0ZXI6ICR7dGhpcy5uYW1lfVxcbmA7XG5cdFx0cyArPSBgXFx0dHlwZTogJHt0aGlzLnR5cGV9XFxuYDtcblx0XHRzICs9IGBcXHRsYWJlbDogJHt0aGlzLmxhYmVsfVxcbmA7XG5cdFx0cyArPSBgXFx0Y2F0ZWdvcnkgbmFtZTogJHt0aGlzLmNhdGVnb3J5fVxcbmA7XG5cdFx0cyArPSBgXFx0Y2F0ZWdvcnkgaWQ6ICR7dGhpcy5jYXRlZ29yeUlkfVxcbmA7XG5cdFx0cyArPSBgXFx0dG9vbHRpcDogJHt0aGlzLnRvb2x0aXB9XFxuYDtcblx0XHRzICs9IGBcXHR2YWx1ZTogJHt0aGlzLnZhbHVlfVxcbmA7XG5cdFx0cyArPSBgXFx0dHJpZ2dlcjogJHt0aGlzLnRyaWdnZXJ9XFxuYDtcblx0XHRzICs9IGBcXHR0cmlnZ2VyIGRhdGE6ICR7dGhpcy50cmlnZ2VyRGF0YX1cXG5gO1xuXHRcdHMgKz0gYFxcdGNsaWVudCBvbmx5OiAke3RoaXMuY2xpZW50T25seX1cXG5gO1xuXHRcdHMgKz0gYFxcdHZhbGlkYXRvcjogJHt0aGlzLnZhbGlkYXRvcn1cXG5gO1xuXHRcdHMgKz0gYFxcdGlzIG1vZGlmaWVkOiAke3RoaXMuaXNNb2RpZmllZH1cXG5gO1xuXG5cdFx0aWYgKHRoaXMuYXR0cmlidXRlcyAhPSBudWxsKVxuXHRcdHtcblx0XHRcdHMgKz0gYFxcdGNvbXBvbmVudCBhdHRyaWJ1dGVzOlxcbmA7XG5cblx0XHRcdGZvciAobGV0IHMxIGluIHRoaXMuYXR0cmlidXRlcylcblx0XHRcdFx0cyArPSBgXFx0XFx0JHtzMX0gLS0+ICR7dGhpcy5hdHRyaWJ1dGVzW3MxXX1cXG5gO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLmRhdGFQcm92aWRlciAhPSBudWxsKVxuXHRcdFx0cyArPSBgXFx0ZGF0YSBwcm92aWRlcjogJHt0aGlzLmRhdGFQcm92aWRlcn1cXG5gO1xuXG5cdFx0aWYgKHRoaXMuc2VwYXJhdG9yICE9IG51bGwpXG5cdFx0e1xuXHRcdFx0cyArPSBgXFx0c2VwYXJhdG9yOlxcbmA7XG5cblx0XHRcdGZvciAobGV0IHMyIGluIHRoaXMuc2VwYXJhdG9yKVxuXHRcdFx0XHRzICs9IGBcXHRcXHQke3MyfSAtLT4gJHt0aGlzLnNlcGFyYXRvcltzMl19XFxuYDtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fbGlzdEl0ZW1zICE9IG51bGwgJiYgdGhpcy5fbGlzdEl0ZW1zLmxlbmd0aCA+IDApXG5cdFx0e1xuXHRcdFx0cyArPSBgXFx0IyBsaXN0IGl0ZW1zOiAke3RoaXMuX2xpc3RJdGVtcy5sZW5ndGh9XFxuYDtcblxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9saXN0SXRlbXMubGVuZ3RoOyBpKyspXG5cdFx0XHR7XG5cdFx0XHRcdHMgKz0gYFxcdGxpc3QgaXRlbSAke2l9IHN1Yi1wYXJhbWV0ZXJzOlxcbmA7XG5cdFx0XHRcdGZvciAobGV0IGUgPSAwOyBlIDwgdGhpcy5fbGlzdEl0ZW1zW2ldLmxlbmd0aDsgZSsrKVxuXHRcdFx0XHRcdHMgKz0gYFxcdFxcdCR7dGhpcy5fbGlzdEl0ZW1zW2ldW2VdLnRvQ29tcGFjdFN0cmluZygpfVxcbmA7XG5cdFx0XHR9XG5cblx0XHRcdHMgKz0gYFxcdGNsYXNzIG5hbWU6ICR7dGhpcy5jbGF6en1cXG5gO1xuXHRcdH1cblxuXHRcdHJldHVybiBzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybiBhIGNvbXBhY3QgZGVzY3JpcHRpb24gb2YgdGhlIENvbmZpZ3VyYXRpb25QYXJhbWV0ZXIgaW5zdGFuY2UuXG5cdCAqL1xuXHR0b0NvbXBhY3RTdHJpbmcoKVxuXHR7XG5cdFx0cmV0dXJuIGBDb25maWd1cmF0aW9uIHBhcmFtZXRlciAnJHt0aGlzLm5hbWV9JzogJHt0aGlzLnZhbHVlfSAke3RoaXMuaXNNb2RpZmllZCA/ICdbWF0nIDogJ1sgXSd9YDtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBSSVZBVEUgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZSB0aGUgY2F0ZWdvcnkgaWQgZm9ybSB0aGUgY2F0ZWdvcnkgbmFtZS5cblx0ICogU3BhY2VzIGFuZCBpbnZhbGlkIGNoYXJhY3RlcnMgYXJlIHJlbW92ZWQ7IHdvcmRzIGFyZSBzZXBhcmF0ZWQgdXNpbmcgY2FwaXRhbHMuXG5cdCAqL1xuXHRfc2V0SWRGcm9tQ2F0ZWdvcnlOYW1lKGNhdGVnb3J5TmFtZSlcblx0e1xuXHRcdHRoaXMuX2NhdGVnb3J5SWQgPSBjYXRlZ29yeU5hbWU7XG5cblx0XHQvLyBTdHJpcCBpbnZhbGlkIGNoYXJhY3RlcnNcblx0XHR2YXIgcGF0dGVybiA9IC9bXjAtOWEtekEtWl0vZztcblx0XHR0aGlzLl9jYXRlZ29yeUlkID0gdGhpcy5fY2F0ZWdvcnlJZC5yZXBsYWNlKHBhdHRlcm4sICcgJyk7XG5cblx0XHQvLyBDYXBpdGFsaXplIHdvcmRzXG5cdFx0dmFyIHdvcmRzID0gdGhpcy5fY2F0ZWdvcnlJZC5zcGxpdCgnICcpO1xuXHRcdHRoaXMuX2NhdGVnb3J5SWQgPSAnJztcblxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspXG5cdFx0e1xuXHRcdFx0bGV0IHdvcmQgPSB3b3Jkc1tpXTtcblx0XHRcdGlmICh3b3JkLmxlbmd0aCA+IDApXG5cdFx0XHRcdHRoaXMuX2NhdGVnb3J5SWQgKz0gKGkgPiAwID8gd29yZC5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpIDogd29yZC5zdWJzdHIoMCwxKS50b0xvd2VyQ2FzZSgpKSArICh3b3JkLmxlbmd0aCA+IDEgPyB3b3JkLnN1YnN0cigxKSA6IFwiXCIpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9jYXRlZ29yeUlkLmxlbmd0aCA9PSAwKVxuXHRcdFx0dGhpcy5fY2F0ZWdvcnlJZCA9IHRoaXMuREVGQVVMVF9DQVRFR09SWV9JRDtcblx0fVxuXG5cdF9zZXRTdWJDb25maWd1cmF0aW9uUGFyYW1zKF9saXN0VmFsdWVzKVxuXHR7XG5cdFx0dGhpcy5fbGlzdEl0ZW1zID0gW107XG5cblx0XHRmb3IgKGxldCBvYmogb2YgX2xpc3RWYWx1ZXMpXG5cdFx0e1xuXHRcdFx0bGV0IGxpc3RJdGVtID0gW107XG5cblx0XHRcdGZvciAobGV0IGRlZmF1bHRDUCBvZiB0aGlzLmRlZmF1bHRMaXN0SXRlbSlcblx0XHRcdHtcblx0XHRcdFx0bGV0IHN1YkNQID0gZGVmYXVsdENQLmNsb25lKGZhbHNlKTtcblx0XHRcdFx0c3ViQ1AudmFsdWUgPSBvYmpbc3ViQ1AubmFtZV07XG5cblx0XHRcdFx0bGlzdEl0ZW0ucHVzaChzdWJDUCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX2xpc3RJdGVtcy5wdXNoKGxpc3RJdGVtKTtcblx0XHR9XG5cdH1cblxuXHRfZ2V0U3ViQ29uZmlndXJhdGlvblBhcmFtc1ZhbHVlcygpXG5cdHtcblx0XHRsZXQgX2xpc3RWYWx1ZXMgPSBbXTtcblxuXHRcdGZvciAobGV0IGxpc3RJdGVtIG9mIHRoaXMuX2xpc3RJdGVtcylcblx0XHR7XG5cdFx0XHRsZXQgb2JqID0ge307XG5cblx0XHRcdGZvciAobGV0IHN1YkNQIG9mIGxpc3RJdGVtKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoc3ViQ1AudmFsdWUgIT0gbnVsbClcblx0XHRcdFx0XHRvYmpbc3ViQ1AubmFtZV0gPSBzdWJDUC52YWx1ZTtcblx0XHRcdH1cblxuXHRcdFx0X2xpc3RWYWx1ZXMucHVzaChvYmopO1xuXHRcdH1cblxuXHRcdHJldHVybiBfbGlzdFZhbHVlcztcblx0fVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDNUdBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDeEhBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3pMQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN4T0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzNXQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMzQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUMvR0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDekZBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0VBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUN0RkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDN0pBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3ZHQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDaERBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzFRQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==