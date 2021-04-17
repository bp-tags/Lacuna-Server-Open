/*! (c) gotoAndPlay | All rights reserved */
(window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || []).push([["module-9"],{

/***/ "./src/components/ssl-certificate-manager.js":
/*!***************************************************!*\
  !*** ./src/components/ssl-certificate-manager.js ***!
  \***************************************************/
/*! exports provided: SslCertificateManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SslCertificateManager", function() { return SslCertificateManager; });
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utilities */ "./src/utils/utilities.js");
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! aes-js */ "./node_modules/aes-js/index.js");
/* harmony import */ var aes_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(aes_js__WEBPACK_IMPORTED_MODULE_1__);



class SslCertificateManager extends HTMLElement
{
	constructor()
	{
	    super();

		this._modalHtml = `
			<div class="modal" id="uploadModal" tabindex="-1" role="dialog" aria-labelledby="uploadModalTitle" aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title text-primary" id="uploadModalTitle">SSL Certificate Manager</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body in-flow-invalid-msg">
							<fieldset id="uploadFieldset">
								<div id="uploaderSubform">
									<div class="form-group">
										<div class="col-form-label form-label-container">
											<label for="uploader" class="form-label">Certificate keystore (jks) <i class="fas fa-question-circle text-muted help" title="SSL certificate's protected keystore file to be uploaded to the server, in jks format"></i></label>
										</div>
										<div class="inner-widget">
											<input type="file" id="uploader" name="uploader" accept=".jks" data-upload-msg="Select a file">
											<span class="k-invalid-msg position-static" data-for="uploader"></span>
										</div>
									</div>
								</div>
								<div id="passwordsSubform">
									<div class="form-row">
										<div class="form-group col">
											<div class="col-form-label form-label-container">
												<label for="ksPassword" class="form-label">Keystore password <i class="fas fa-question-circle text-muted help" title="Password used to protect the certificate keystore"></i></label>
											</div>
											<div class="inner-widget">
												<input type="password" id="ksPassword" name="ksPassword" class="form-control k-textbox" autocomplete="off" required data-required-msg="Required" />
												<span class="k-invalid-msg position-static" data-for="ksPassword"></span>
											</div>
										</div>

										<div class="form-group col">
											<div class="col-form-label form-label-container">
												<label for="confirmKsPassword" class="form-label">Confirm password <i class="fas fa-question-circle text-muted help" title="Keystore password confirmation"></i></label>
											</div>
											<div class="inner-widget">
												<input type="password" id="confirmKsPassword" name="confirmKsPassword" class="form-control k-textbox" autocomplete="off" required data-required-msg="Required" />
												<span class="k-invalid-msg position-static" data-for="confirmKsPassword"></span>
											</div>
										</div>
									</div>

									<p><em>For additional security, enter again and confirm your SFS2X administration password.</em></p>

									<div class="form-row">
										<div class="form-group col">
											<div class="col-form-label form-label-container">
												<label for="adminPassword" class="form-label">Admin password <i class="fas fa-question-circle text-muted help" title="SmartFoxServer 2X remote administration password"></i></label>
											</div>
											<div class="inner-widget">
												<input type="password" id="adminPassword" name="adminPassword" class="form-control k-textbox" autocomplete="off" required data-required-msg="Required" />
												<span class="k-invalid-msg position-static" data-for="adminPassword"></span>
											</div>
										</div>

										<div class="form-group col">
											<div class="col-form-label form-label-container">
												<label for="confirmAdminPassword" class="form-label">Confirm password <i class="fas fa-question-circle text-muted help" title="SmartFoxServer 2X remote administration password confirmation"></i></label>
											</div>
											<div class="inner-widget">
												<input type="password" id="confirmAdminPassword" name="confirmAdminPassword" class="form-control k-textbox" autocomplete="off" required data-required-msg="Required" />
												<span class="k-invalid-msg position-static" data-for="confirmAdminPassword"></span>
											</div>
										</div>
									</div>
								</div>
							</fieldset>
						</div>
						<div class="modal-footer flex-column">
							<div class="d-flex w-100">
								<div class="flex-grow-1 text-left">
									<button id="uploadSslButton" type="button" class="k-button k-primary"><i class="fas fa-upload mr-1"></i>Upload certificate</button>
									<i id="uploadSpinner" class="fas fa-circle-notch fa-spin text-primary align-middle ml-1"></i>
								</div>
								<div class="flex-grow-1 text-right">
									<button type="button" class="k-button k-secondary" data-dismiss="modal">Cancel</button>
								</div>
							</div>
							<div id="uploadErrorMsg" class="text-danger mt-3"></div>
						</div>
					</div>
				</div>
			</div>
		`;

		//-------------------------------------------

		$(this).append(`
			<div class="col-sm-5 col-lg-4 col-form-label form-label-container">
				<label class="form-label">Upload certificate <i class="fas fa-question-circle text-muted help" title="Upload an SSL certificate's protected keystore to the server"></i></label>
			</div>
			<div class="inner-widget align-self-center align-self-sm-start col-auto">
				<button id="manageSslButton" type="button" class="k-button k-primary" disabled><i class="fas fa-cog mr-1"></i>Manage</button>
			</div>
		`);

		// Initialize help tooltips
		$(this).kendoTooltip({
			filter: 'i[title].help',
			position: 'right',
			content: function(e) {
				return `<div class="help-tooltip">${e.target.data('title')}</div>`;
			}
		});

		// Add listeners to Manage button click
		$('#manageSslButton', $(this)).on('click', $.proxy(this._onManageSslClick, this));
	}

	destroy()
	{
		// Remove event listener
		$('#manageSslButton', $(this)).off('click');

		// Hide modal (which in turn destroys it)
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
			modalElement.modal('hide');
	}

	get enabled()
	{
		return this._isEnabled;
	}

	set enabled(value)
	{
		this._isEnabled = value;

		// Enable/disable Manage button
		$('#manageSslButton', $(this)).attr('disabled', !value);

		// Enable/disable modal
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			// Disable modal close buttons
			$('button[data-dismiss="modal"]', modalElement).attr('disabled', !value);

			// Disable upload button
			$('#uploadSslButton', modalElement).attr('disabled', !value);

			// Disable fieldset
			$('#uploadFieldset', modalElement).attr('disabled', !value);
		}
	}

	get uploadTargetConfig()
	{
		return this._uploadTargetConfig;
	}

	set uploadTargetConfig(data)
	{
		this._uploadTargetConfig = data;
	}

	_onManageSslClick()
	{
		// Initialize and show modal
		this._showModal();
	}

	_onUploadSslClick()
	{
		if (this._validate())
			this._startSslCertUpload();
	}

	_showModal()
	{
		// Append modal html
		$(this).append(this._modalHtml);

		let modalElement = $('#uploadModal', $(this));

		// Hide SSL certificate upload spinner and error message container
		$('#uploadSpinner', modalElement).hide();
		$('#uploadErrorMsg', modalElement).hide();
		$('#uploadErrorMsg', modalElement).text('');

		// Add listener to Upload button click
		$('#uploadSslButton', modalElement).on('click', $.proxy(this._onUploadSslClick, this));

		// Add listener to modal hide event
		modalElement.on('hidden.bs.modal', $.proxy(this._destroyModal, this));

		// Initialize kendo uploader
		this._uploadWidget = modalElement.find('#uploader').kendoUpload({
			allowedExtensions: ['.jks'],
			multiple: false,
			template: function(dataItem) {
				dataItem.bytesToSize = _utils_utilities__WEBPACK_IMPORTED_MODULE_0__["bytesToSize"]; // Pass bytesToSize utility function to template
				return kendo.template(`
					<span class='k-progress w-100'></span>
					<span class="">
						<span class="k-file-name" title="#=name#">#=name#</span>
						<span class="k-file-size">Size: #=bytesToSize(size, 1, 'Bytes')#</span>
					</span>
				`)(dataItem);
			},
	        localization: {
	            select: 'Select file...'
	        }
        }).data('kendoUpload');

		// Initialize kendo validation on uploader subform
		// NOTE: we use separate validators to be able to disable 'validateOnBlur' on the uploader,
		// because it causes the error message to appear as soon as the "Select file" button is clicked
		this._validator1 = modalElement.find('#uploaderSubform').kendoValidator({
			validateOnBlur: false,
			rules: {
				upload: function(input) {
					let valid = false;
					if (input.is('[type=file]'))
						valid = input.closest('.k-upload').find('.k-file').length > 0;

					return valid;
	            }
			}
		}).data('kendoValidator');

		// Initialize kendo validation on passwords subform
		this._validator2 = modalElement.find('#passwordsSubform').kendoValidator({
			validateOnBlur: true,
			rules: {
				verifyKsPassword: $.proxy(function(input) {
					let valid = true;
					if (input.is('[name=confirmKsPassword]'))
						valid = input.val() === $(this).find('#ksPassword').val();
					return valid;
				}, this),
				verifyAdmPassword: $.proxy(function(input) {
					let valid = true;
					if (input.is('[name=confirmAdminPassword]'))
						valid = input.val() === $(this).find('#adminPassword').val();
					return valid;
				}, this)
			},
			messages: {
				verifyKsPassword: 'Password not matching',
				verifyAdmPassword: 'Password not matching',
			}
		}).data('kendoValidator');

		// Initialize bootstrap modal
		modalElement.modal({
			backdrop: 'static',
			keyboard: false,
		});
	}

	_destroyModal()
	{
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			// Remove listeners
			$('#uploadSslButton', modalElement).off('click');
			modalElement.off('hidden.bs.modal');

			// Destroy everything Kendo
			kendo.destroy(modalElement);

			// Dispose modal
			modalElement.modal('dispose');

			// Remove html
			modalElement.remove();
			modalElement = null;
		}
	}

	_validate()
	{
		let val1 = this._validator1.validate();
		let val2 = this._validator2.validate();

		return val1 && val2;
	}

	_startSslCertUpload()
	{
		if (!this._uploadTargetConfig)
			throw new Error('Upload target configuration not set');

		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			let certData = {};
			certData.file = this._uploadWidget.getFiles()[0];
			certData.ksPassword = $('#ksPassword', modalElement).val();
			certData.adminPassword = $('#adminPassword', modalElement).val();

			// Disable modal
			this.enabled = false;

			// Hide previous error and show spinner
			$('#uploadSpinner', modalElement).show();
			$('#uploadErrorMsg', modalElement).hide();
			$('#uploadErrorMsg', modalElement).text('');

			//=================================================================

			// Generate Init Vector
			let rngValues = [];
			for (let i = 0; i < 16; i++)
				rngValues.push(Math.floor(Math.random() * 256));

			let iv = new Uint8Array(rngValues);

			// Generate secret key by MD5-encoding admin password + session token
			let md5Pass = this._binaryMD5(certData.adminPassword + this._uploadTargetConfig.sessionToken);

			// Encrypt keystore password via AES (128bit)
			let encryptedPwd = this._aesEncrypt(certData.ksPassword, md5Pass, iv);

			// Encode IV using Base64
			let encodedIv = this._b64Encode(iv);

			// Encode encrypted password using Base64
			let encodedPwd = this._b64Encode(encryptedPwd);

			//=================================================================

			// Set parameters to be sent with the certificate keystore file
			const params = new FormData();
			params.append('files[]', certData.file.rawFile);
			params.append('__iv', encodedIv);
			params.append('__password', encodedPwd);
			params.append('__module', this._uploadTargetConfig.moduleId);

			// Set destination url
			const url = 'http://' + this._uploadTargetConfig.host + ':' + this._uploadTargetConfig.httpPort + '/BlueBox/SFS2XFileUpload?sessHashId=' + this._uploadTargetConfig.sessionToken;

			// Start upload
			fetch(url, {
				method: 'POST',
				body: params,
				mode: 'no-cors'
			}).then($.proxy(this._onSslCertUploadEnd, this));
		}
	}

	_onSslCertUploadEnd(response)
	{
		// Nothing to do: we have to wait the upload process completion to be signaled by the server through the dedicated Extension response

		//=================================================================

		// TODO Should we handle this response in some way? For some unknown reason we always get ok=false and status=0
		//console.log(response)
		//console.log(response.ok)
		//console.log(response.status)
	}

	/**
	 * Method called by parent when upload failed.
	 */
	onSslCertUploadError(error)
	{
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			// Enable modal
			this.enabled = true;

			// Show upload error
			$('#uploadErrorMsg', modalElement).show();
			$('#uploadErrorMsg', modalElement).text(error + '.');

			// Hide spinner
			$('#uploadSpinner', modalElement).hide();
		}
	}

	/**
	 * Method called by parent when upload is completed successfully.
	 */
	onSslCertUploadSuccess()
	{
		let modalElement = $('#uploadModal', $(this));

		if (modalElement)
		{
			// Enable modal
			this.enabled = true;

			// Hide spinner
			$('#uploadSpinner', modalElement).hide();

			// Hide modal
			modalElement.modal('hide');
		}
	}

	// *****************************************************************

	/*
	 * Takes a string and returns the MD5 as Uint8Array
	 */
	_binaryMD5(str)
	{
		let MD5 = new SFS2X.MD5();
		let hexStr = MD5.hex_md5(str);

		return this._hexByteStringToByteArray(hexStr);
	}

	/*
	 * Hex bytes ---> Actual byte[] as Uint8Array
	 */
	_hexByteStringToByteArray(hexByteString)
	{
	    let bytes = new Uint8Array(16); // MD5 fixed output size

	    for (let i = 0; i < hexByteString.length;)
	    {
	        let hexByte = hexByteString[i++] + hexByteString[i++];
	        let byte = parseInt(hexByte, 16);

	        bytes[i / 2 - 1] = byte;
	    }

	    return bytes;
	}

	/*
	 * Encrypt using AES, mode CBC, PKCS#7 padding
	 *
	 * text 		-> the text we want to encode
	 * key 		-> the AES key
	 * iv  		-> the AES/CBC init vector
	 *
	 * Returns 	-> Uint8Array
	 */
	_aesEncrypt(text, key, iv)
	{
		let textBytes = aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.utils.utf8.toBytes(text); 		// Get UTF-8 bytes
		let aesCBC = new aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.ModeOfOperation.cbc(key, iv);	// Init CBC mode
		textBytes = aes_js__WEBPACK_IMPORTED_MODULE_1___default.a.padding.pkcs7.pad(textBytes); 		// PKCS#7 padding

		// Encrypt
		return aesCBC.encrypt(textBytes);
	}

	/*
	 * Encode passed byte array --> Base64 representation
	 * Returns --> string
	 */
	_b64Encode(barray)
	{
		return btoa(String.fromCharCode.apply(null, barray));
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('ssl-certificate-manager'))
	window.customElements.define('ssl-certificate-manager', SslCertificateManager);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/modules/server-configurator.js":
/*!********************************************!*\
  !*** ./src/modules/server-configurator.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ServerConfigurator; });
/* harmony import */ var _base_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-module */ "./src/modules/base-module.js");
/* harmony import */ var _utils_uibuilder_config_interface_builder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/uibuilder/config-interface-builder */ "./src/utils/uibuilder/config-interface-builder.js");
/* harmony import */ var _components_ssl_certificate_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ssl-certificate-manager */ "./src/components/ssl-certificate-manager.js");




class ServerConfigurator extends _base_module__WEBPACK_IMPORTED_MODULE_0__["BaseModule"]
{
	constructor()
	{
	    super('serverConfig');

		// Outgoing requests
		this.REQ_INIT = 'init';
		this.REQ_GET_CONFIG = 'getConfig';
		this.REQ_UPDATE_CONFIG = 'updConfig';

		// Incoming responses
		this.RESP_INIT = 'init';
		this.RESP_CONFIG = 'config';
		this.RESP_CONFIG_UPDATE_CONFIRM = 'configUpdate';
		this.RESP_CONFIG_CHANGED_ALERT = 'configAlert';
		this.RESP_SSL_UPLOAD_ERROR = 'sslUploadError';
		this.RESP_SSL_UPLOAD_CONFIRM = 'sslUpload';
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

		// Initialize progress bar
		$('#src-progressBar').kendoProgressBar({
			min: 0,
            max: 100,
			value: false,
            type: 'value',
            animation: {
                duration: 400
            }
        });

		// Create interface builder instance
		this._interfaceBuilder = new _utils_uibuilder_config_interface_builder__WEBPACK_IMPORTED_MODULE_1__["ConfigInterfaceBuilder"]();

		// Add listener to interface buttons
		$('#src-reloadButton').on('click', $.proxy(this._onReloadClick, this));
		$('#src-submitButton').on('click', $.proxy(this._onSubmitClick, this));

		// Save ref to SSL Manager
		this._sslCertManager = document.getElementById('src-sslCertManager');

		//-----------------------------------*/

		// Send initialization request
		this.sendExtensionRequest(this.REQ_INIT);
	}

	destroy()
	{
		// Call super method
		super.destroy();

		// Destroy SSL Certificate Manager
		this._sslCertManager.destroy();

		// Remove interface buttons click listeners
		$('#src-reloadButton').off('click');
		$('#src-submitButton').off('click');

		// Clear tabs container
		this._clearTabs();
	}

	onExtensionCommand(command, data)
	{
		// Initialization data received
		if (command == this.RESP_INIT)
		{
			// Retrieve HTTP port to be used for SSL certificate file uploading
			const uploadHttpPort = data.getInt('httpPort');

			// Retrieve module id sent by the server (required because multiple modules use file uploading service)
			const uploadModuleId = data.getUtfString('modId');

			// Set SSL upload manager target configuration
			this._sslCertManager.uploadTargetConfig = {
				sessionToken: this.smartFox.sessionToken,
				host: this.smartFox.config.host,
				httpPort: uploadHttpPort,
				moduleId: uploadModuleId,
			};

			// Server sends a flag indicating if file uploads are locked
			// We use it to enable the "Manage SSL certificate" button
			this._sslLocked = data.getBool('lock');

			if (!this._sslLocked)
				$('#src-manageSslWarn').hide();

			// Request configuration data to server instance
			this.sendExtensionRequest(this.REQ_GET_CONFIG);
		}

		// Server configuration data received
		else if (command == this.RESP_CONFIG)
		{
			// Build user interface based on received data
			this._interfaceBuilder.buildInterface(data.getSFSArray('settings'), 'src-tabNavigator', false);

			// Enable buttons
			this._enableButtons(true);

			// Initialize TabNavigator-ralated widgets
			if (!this._tabNavInitialized)
			{
				// Enable scrolling tabs
				$('#src-tabNavigator > #tabs').scrollingTabs({
					bootstrapVersion: 4,
					scrollToTabEdge: true,
					enableSwiping: true,
					disableScrollArrowsOnFullyScrolled: true,
					cssClassLeftArrow: 'fa fa-chevron-left',
					cssClassRightArrow: 'fa fa-chevron-right'
				});

				this._tabNavInitialized = true;
			}

			// Run validation (to remove validation messages if data was reloaded)
			this._interfaceBuilder.checkIsValid();

			this._switchView('src-main');
		}

		// Server configuration update confirmation
		else if (command == this.RESP_CONFIG_UPDATE_CONFIRM)
		{
			// Enable buttons
			this._enableButtons(true);

			// Enable form items
			this._interfaceBuilder.disableInterface(false);

			// If the current user is the updater, show a notification
			// Otherwise, show a dialog box suggesting to reload
			let updater = data.getUtfString('user');

			if (updater == this.smartFox.mySelf.name)
			{
				// Reset the 'modified' flag
				this._interfaceBuilder.resetIsModified();

				// Display notification
				this.shellCtrl.showNotification('Server settings updated', 'Changes will be applied on next server restart');
			}
			else
			{
				// Show alert
				this.shellCtrl.showSimpleAlert(`Administrator ${updater} has modified the server settings; please reload to update your view.`);

				// Disable submit button
				$('#src-submitButton').attr('disabled', true);
			}
		}

		// Server configuration xml saved by an external process
		else if (command == this.RESP_CONFIG_CHANGED_ALERT)
		{
			// Show alert
			this.shellCtrl.showSimpleAlert(`The system has modified the server settings automatically; please reload to update your view.`);

			// Disable submit button
			$('#src-submitButton').attr('disabled', true);
		}

		// SSL certificate upload error
		else if (command == this.RESP_SSL_UPLOAD_ERROR)
		{
			const error = data.getUtfString('error');

			// Log warning
			this.shellCtrl.logMessage(error, 'error');

			// Show error in manager window
			this._sslCertManager.onSslCertUploadError(error);
		}

		// SSL certificate upload confirmed
		else if (command == this.RESP_SSL_UPLOAD_CONFIRM)
		{
			// Closw manager window
			this._sslCertManager.onSslCertUploadSuccess();

			let updater = data.getUtfString('user');

			// Display notification
			if (updater == this.smartFox.mySelf.name)
				this.shellCtrl.showNotification('SSL certificate', 'SSL certificate keystore was uploaded successfully');
			else
				this.shellCtrl.showNotification('SSL certificate', `Administrator ${updater} has uploaded a new SSL certificate keystore`);

			// When a certificate is uploaded, HTTPS is also enabled automatically:
			// we have to update the interface accordingly

			// Get the relevant Configuration Form Item
			const enableHttpsCI = this._interfaceBuilder.getConfigFormItem('webServer.enableHttps');

			// Update Configuration Parameter associated with the Configuration Form Item
			enableHttpsCI.data.value = true;
			enableHttpsCI.data.resetIsModified(); // This is needed to avoid the Configuration Parameter to flagged as 'changed'

			// Display the new value of the Configuration Form Item
			enableHttpsCI._setWidgetValue(); // Display the new value in the config form item
		}
	}

	//------------------------------------
	// PRIVATE METHODS
	//------------------------------------

	_enableButtons(enabled)
	{
		$('#src-reloadButton').attr('disabled', !enabled);
		$('#src-submitButton').attr('disabled', !enabled);
		$('#src-backupCheck').attr('disabled', !enabled);

		if (!this._sslLocked)
			this._sslCertManager.enabled = enabled;
	}

	_switchView(viewId)
	{
		document.getElementById('src-viewstack').selectedElement = document.getElementById(viewId);
	}

	_clearTabs()
	{
		// Destroy scrolling tabs
		$('#src-tabNavigator #tabs').scrollingTabs('destroy');

		// Remove all tab navigator content
		this._interfaceBuilder.destroyInterface();
	}

	_onReloadClick()
	{
		// Disable buttons
		this._enableButtons(false);

		// Switch to loading view
		this._switchView('src-loading');

		// Hide validation messages
		this._interfaceBuilder.resetValidation();

		// Request configuration data to server instance
		this.sendExtensionRequest(this.REQ_GET_CONFIG);
	}

	_onSubmitClick()
	{
		// Check validity
		if (this._interfaceBuilder.checkIsValid())
		{
			let changes = this._interfaceBuilder.getChangedData();

			if (changes.size() > 0)
			{
				// Disable buttons
				this._enableButtons(false);

				// Disable form items
				this._interfaceBuilder.disableInterface(true);

				// Send updated settings to server instance
				let params = new SFS2X.SFSObject();
				params.putSFSArray('settings', changes);
				params.putBool('backup', $('#src-backupCheck').prop('checked'));

				this.sendExtensionRequest(this.REQ_UPDATE_CONFIG, params);
			}
		}
		else
			this.shellCtrl.showSimpleAlert('Unable to submit configuration changes due to an invalid value; please verify the highlighted form fields in all tabs.', true);
	}


}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9tb2R1bGUtOS5idW5kbGUuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9jb21wb25lbnRzL3NzbC1jZXJ0aWZpY2F0ZS1tYW5hZ2VyLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL21vZHVsZXMvc2VydmVyLWNvbmZpZ3VyYXRvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2J5dGVzVG9TaXplfSBmcm9tICcuLi91dGlscy91dGlsaXRpZXMnO1xuaW1wb3J0IGFlc2pzIGZyb20gJ2Flcy1qcyc7XG5cbmV4cG9ydCBjbGFzcyBTc2xDZXJ0aWZpY2F0ZU1hbmFnZXIgZXh0ZW5kcyBIVE1MRWxlbWVudFxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0ICAgIHN1cGVyKCk7XG5cblx0XHR0aGlzLl9tb2RhbEh0bWwgPSBgXG5cdFx0XHQ8ZGl2IGNsYXNzPVwibW9kYWxcIiBpZD1cInVwbG9hZE1vZGFsXCIgdGFiaW5kZXg9XCItMVwiIHJvbGU9XCJkaWFsb2dcIiBhcmlhLWxhYmVsbGVkYnk9XCJ1cGxvYWRNb2RhbFRpdGxlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1kaWFsb2cgbW9kYWwtZGlhbG9nLWNlbnRlcmVkXCIgcm9sZT1cImRvY3VtZW50XCI+XG5cdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cblx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cblx0XHRcdFx0XHRcdFx0PGg1IGNsYXNzPVwibW9kYWwtdGl0bGUgdGV4dC1wcmltYXJ5XCIgaWQ9XCJ1cGxvYWRNb2RhbFRpdGxlXCI+U1NMIENlcnRpZmljYXRlIE1hbmFnZXI8L2g1PlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIj5cblx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWJvZHkgaW4tZmxvdy1pbnZhbGlkLW1zZ1wiPlxuXHRcdFx0XHRcdFx0XHQ8ZmllbGRzZXQgaWQ9XCJ1cGxvYWRGaWVsZHNldFwiPlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgaWQ9XCJ1cGxvYWRlclN1YmZvcm1cIj5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbCBmb3JtLWxhYmVsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJ1cGxvYWRlclwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPkNlcnRpZmljYXRlIGtleXN0b3JlIChqa3MpIDxpIGNsYXNzPVwiZmFzIGZhLXF1ZXN0aW9uLWNpcmNsZSB0ZXh0LW11dGVkIGhlbHBcIiB0aXRsZT1cIlNTTCBjZXJ0aWZpY2F0ZSdzIHByb3RlY3RlZCBrZXlzdG9yZSBmaWxlIHRvIGJlIHVwbG9hZGVkIHRvIHRoZSBzZXJ2ZXIsIGluIGprcyBmb3JtYXRcIj48L2k+PC9sYWJlbD5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbm5lci13aWRnZXRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8aW5wdXQgdHlwZT1cImZpbGVcIiBpZD1cInVwbG9hZGVyXCIgbmFtZT1cInVwbG9hZGVyXCIgYWNjZXB0PVwiLmprc1wiIGRhdGEtdXBsb2FkLW1zZz1cIlNlbGVjdCBhIGZpbGVcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstaW52YWxpZC1tc2cgcG9zaXRpb24tc3RhdGljXCIgZGF0YS1mb3I9XCJ1cGxvYWRlclwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGlkPVwicGFzc3dvcmRzU3ViZm9ybVwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZvcm0tcm93XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGNvbFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJjb2wtZm9ybS1sYWJlbCBmb3JtLWxhYmVsLWNvbnRhaW5lclwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGxhYmVsIGZvcj1cImtzUGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tbGFiZWxcIj5LZXlzdG9yZSBwYXNzd29yZCA8aSBjbGFzcz1cImZhcyBmYS1xdWVzdGlvbi1jaXJjbGUgdGV4dC1tdXRlZCBoZWxwXCIgdGl0bGU9XCJQYXNzd29yZCB1c2VkIHRvIHByb3RlY3QgdGhlIGNlcnRpZmljYXRlIGtleXN0b3JlXCI+PC9pPjwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlubmVyLXdpZGdldFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGlkPVwia3NQYXNzd29yZFwiIG5hbWU9XCJrc1Bhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgay10ZXh0Ym94XCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgcmVxdWlyZWQgZGF0YS1yZXF1aXJlZC1tc2c9XCJSZXF1aXJlZFwiIC8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstaW52YWxpZC1tc2cgcG9zaXRpb24tc3RhdGljXCIgZGF0YS1mb3I9XCJrc1Bhc3N3b3JkXCI+PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBjb2xcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29sLWZvcm0tbGFiZWwgZm9ybS1sYWJlbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJjb25maXJtS3NQYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPkNvbmZpcm0gcGFzc3dvcmQgPGkgY2xhc3M9XCJmYXMgZmEtcXVlc3Rpb24tY2lyY2xlIHRleHQtbXV0ZWQgaGVscFwiIHRpdGxlPVwiS2V5c3RvcmUgcGFzc3dvcmQgY29uZmlybWF0aW9uXCI+PC9pPjwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlubmVyLXdpZGdldFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGlkPVwiY29uZmlybUtzUGFzc3dvcmRcIiBuYW1lPVwiY29uZmlybUtzUGFzc3dvcmRcIiBjbGFzcz1cImZvcm0tY29udHJvbCBrLXRleHRib3hcIiBhdXRvY29tcGxldGU9XCJvZmZcIiByZXF1aXJlZCBkYXRhLXJlcXVpcmVkLW1zZz1cIlJlcXVpcmVkXCIgLz5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiay1pbnZhbGlkLW1zZyBwb3NpdGlvbi1zdGF0aWNcIiBkYXRhLWZvcj1cImNvbmZpcm1Lc1Bhc3N3b3JkXCI+PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXG5cdFx0XHRcdFx0XHRcdFx0XHQ8cD48ZW0+Rm9yIGFkZGl0aW9uYWwgc2VjdXJpdHksIGVudGVyIGFnYWluIGFuZCBjb25maXJtIHlvdXIgU0ZTMlggYWRtaW5pc3RyYXRpb24gcGFzc3dvcmQuPC9lbT48L3A+XG5cblx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmb3JtLXJvd1wiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBjb2xcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29sLWZvcm0tbGFiZWwgZm9ybS1sYWJlbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJhZG1pblBhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWxhYmVsXCI+QWRtaW4gcGFzc3dvcmQgPGkgY2xhc3M9XCJmYXMgZmEtcXVlc3Rpb24tY2lyY2xlIHRleHQtbXV0ZWQgaGVscFwiIHRpdGxlPVwiU21hcnRGb3hTZXJ2ZXIgMlggcmVtb3RlIGFkbWluaXN0cmF0aW9uIHBhc3N3b3JkXCI+PC9pPjwvbGFiZWw+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImlubmVyLXdpZGdldFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0PGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIGlkPVwiYWRtaW5QYXNzd29yZFwiIG5hbWU9XCJhZG1pblBhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgay10ZXh0Ym94XCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgcmVxdWlyZWQgZGF0YS1yZXF1aXJlZC1tc2c9XCJSZXF1aXJlZFwiIC8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstaW52YWxpZC1tc2cgcG9zaXRpb24tc3RhdGljXCIgZGF0YS1mb3I9XCJhZG1pblBhc3N3b3JkXCI+PC9zcGFuPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBjb2xcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY29sLWZvcm0tbGFiZWwgZm9ybS1sYWJlbC1jb250YWluZXJcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxsYWJlbCBmb3I9XCJjb25maXJtQWRtaW5QYXNzd29yZFwiIGNsYXNzPVwiZm9ybS1sYWJlbFwiPkNvbmZpcm0gcGFzc3dvcmQgPGkgY2xhc3M9XCJmYXMgZmEtcXVlc3Rpb24tY2lyY2xlIHRleHQtbXV0ZWQgaGVscFwiIHRpdGxlPVwiU21hcnRGb3hTZXJ2ZXIgMlggcmVtb3RlIGFkbWluaXN0cmF0aW9uIHBhc3N3b3JkIGNvbmZpcm1hdGlvblwiPjwvaT48L2xhYmVsPlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpbm5lci13aWRnZXRcIj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdDxpbnB1dCB0eXBlPVwicGFzc3dvcmRcIiBpZD1cImNvbmZpcm1BZG1pblBhc3N3b3JkXCIgbmFtZT1cImNvbmZpcm1BZG1pblBhc3N3b3JkXCIgY2xhc3M9XCJmb3JtLWNvbnRyb2wgay10ZXh0Ym94XCIgYXV0b2NvbXBsZXRlPVwib2ZmXCIgcmVxdWlyZWQgZGF0YS1yZXF1aXJlZC1tc2c9XCJSZXF1aXJlZFwiIC8+XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstaW52YWxpZC1tc2cgcG9zaXRpb24tc3RhdGljXCIgZGF0YS1mb3I9XCJjb25maXJtQWRtaW5QYXNzd29yZFwiPjwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PC9maWVsZHNldD5cblx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlciBmbGV4LWNvbHVtblwiPlxuXHRcdFx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZC1mbGV4IHctMTAwXCI+XG5cdFx0XHRcdFx0XHRcdFx0PGRpdiBjbGFzcz1cImZsZXgtZ3Jvdy0xIHRleHQtbGVmdFwiPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGJ1dHRvbiBpZD1cInVwbG9hZFNzbEJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImstYnV0dG9uIGstcHJpbWFyeVwiPjxpIGNsYXNzPVwiZmFzIGZhLXVwbG9hZCBtci0xXCI+PC9pPlVwbG9hZCBjZXJ0aWZpY2F0ZTwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0XHRcdFx0PGkgaWQ9XCJ1cGxvYWRTcGlubmVyXCIgY2xhc3M9XCJmYXMgZmEtY2lyY2xlLW5vdGNoIGZhLXNwaW4gdGV4dC1wcmltYXJ5IGFsaWduLW1pZGRsZSBtbC0xXCI+PC9pPlxuXHRcdFx0XHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJmbGV4LWdyb3ctMSB0ZXh0LXJpZ2h0XCI+XG5cdFx0XHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImstYnV0dG9uIGstc2Vjb25kYXJ5XCIgZGF0YS1kaXNtaXNzPVwibW9kYWxcIj5DYW5jZWw8L2J1dHRvbj5cblx0XHRcdFx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0XHRcdDxkaXYgaWQ9XCJ1cGxvYWRFcnJvck1zZ1wiIGNsYXNzPVwidGV4dC1kYW5nZXIgbXQtM1wiPjwvZGl2PlxuXHRcdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0YDtcblxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdFx0JCh0aGlzKS5hcHBlbmQoYFxuXHRcdFx0PGRpdiBjbGFzcz1cImNvbC1zbS01IGNvbC1sZy00IGNvbC1mb3JtLWxhYmVsIGZvcm0tbGFiZWwtY29udGFpbmVyXCI+XG5cdFx0XHRcdDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIj5VcGxvYWQgY2VydGlmaWNhdGUgPGkgY2xhc3M9XCJmYXMgZmEtcXVlc3Rpb24tY2lyY2xlIHRleHQtbXV0ZWQgaGVscFwiIHRpdGxlPVwiVXBsb2FkIGFuIFNTTCBjZXJ0aWZpY2F0ZSdzIHByb3RlY3RlZCBrZXlzdG9yZSB0byB0aGUgc2VydmVyXCI+PC9pPjwvbGFiZWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdDxkaXYgY2xhc3M9XCJpbm5lci13aWRnZXQgYWxpZ24tc2VsZi1jZW50ZXIgYWxpZ24tc2VsZi1zbS1zdGFydCBjb2wtYXV0b1wiPlxuXHRcdFx0XHQ8YnV0dG9uIGlkPVwibWFuYWdlU3NsQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiay1idXR0b24gay1wcmltYXJ5XCIgZGlzYWJsZWQ+PGkgY2xhc3M9XCJmYXMgZmEtY29nIG1yLTFcIj48L2k+TWFuYWdlPC9idXR0b24+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgKTtcblxuXHRcdC8vIEluaXRpYWxpemUgaGVscCB0b29sdGlwc1xuXHRcdCQodGhpcykua2VuZG9Ub29sdGlwKHtcblx0XHRcdGZpbHRlcjogJ2lbdGl0bGVdLmhlbHAnLFxuXHRcdFx0cG9zaXRpb246ICdyaWdodCcsXG5cdFx0XHRjb250ZW50OiBmdW5jdGlvbihlKSB7XG5cdFx0XHRcdHJldHVybiBgPGRpdiBjbGFzcz1cImhlbHAtdG9vbHRpcFwiPiR7ZS50YXJnZXQuZGF0YSgndGl0bGUnKX08L2Rpdj5gO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVycyB0byBNYW5hZ2UgYnV0dG9uIGNsaWNrXG5cdFx0JCgnI21hbmFnZVNzbEJ1dHRvbicsICQodGhpcykpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25NYW5hZ2VTc2xDbGljaywgdGhpcykpO1xuXHR9XG5cblx0ZGVzdHJveSgpXG5cdHtcblx0XHQvLyBSZW1vdmUgZXZlbnQgbGlzdGVuZXJcblx0XHQkKCcjbWFuYWdlU3NsQnV0dG9uJywgJCh0aGlzKSkub2ZmKCdjbGljaycpO1xuXG5cdFx0Ly8gSGlkZSBtb2RhbCAod2hpY2ggaW4gdHVybiBkZXN0cm95cyBpdClcblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI3VwbG9hZE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHRpZiAobW9kYWxFbGVtZW50KVxuXHRcdFx0bW9kYWxFbGVtZW50Lm1vZGFsKCdoaWRlJyk7XG5cdH1cblxuXHRnZXQgZW5hYmxlZCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5faXNFbmFibGVkO1xuXHR9XG5cblx0c2V0IGVuYWJsZWQodmFsdWUpXG5cdHtcblx0XHR0aGlzLl9pc0VuYWJsZWQgPSB2YWx1ZTtcblxuXHRcdC8vIEVuYWJsZS9kaXNhYmxlIE1hbmFnZSBidXR0b25cblx0XHQkKCcjbWFuYWdlU3NsQnV0dG9uJywgJCh0aGlzKSkuYXR0cignZGlzYWJsZWQnLCAhdmFsdWUpO1xuXG5cdFx0Ly8gRW5hYmxlL2Rpc2FibGUgbW9kYWxcblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI3VwbG9hZE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHRpZiAobW9kYWxFbGVtZW50KVxuXHRcdHtcblx0XHRcdC8vIERpc2FibGUgbW9kYWwgY2xvc2UgYnV0dG9uc1xuXHRcdFx0JCgnYnV0dG9uW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJywgbW9kYWxFbGVtZW50KS5hdHRyKCdkaXNhYmxlZCcsICF2YWx1ZSk7XG5cblx0XHRcdC8vIERpc2FibGUgdXBsb2FkIGJ1dHRvblxuXHRcdFx0JCgnI3VwbG9hZFNzbEJ1dHRvbicsIG1vZGFsRWxlbWVudCkuYXR0cignZGlzYWJsZWQnLCAhdmFsdWUpO1xuXG5cdFx0XHQvLyBEaXNhYmxlIGZpZWxkc2V0XG5cdFx0XHQkKCcjdXBsb2FkRmllbGRzZXQnLCBtb2RhbEVsZW1lbnQpLmF0dHIoJ2Rpc2FibGVkJywgIXZhbHVlKTtcblx0XHR9XG5cdH1cblxuXHRnZXQgdXBsb2FkVGFyZ2V0Q29uZmlnKClcblx0e1xuXHRcdHJldHVybiB0aGlzLl91cGxvYWRUYXJnZXRDb25maWc7XG5cdH1cblxuXHRzZXQgdXBsb2FkVGFyZ2V0Q29uZmlnKGRhdGEpXG5cdHtcblx0XHR0aGlzLl91cGxvYWRUYXJnZXRDb25maWcgPSBkYXRhO1xuXHR9XG5cblx0X29uTWFuYWdlU3NsQ2xpY2soKVxuXHR7XG5cdFx0Ly8gSW5pdGlhbGl6ZSBhbmQgc2hvdyBtb2RhbFxuXHRcdHRoaXMuX3Nob3dNb2RhbCgpO1xuXHR9XG5cblx0X29uVXBsb2FkU3NsQ2xpY2soKVxuXHR7XG5cdFx0aWYgKHRoaXMuX3ZhbGlkYXRlKCkpXG5cdFx0XHR0aGlzLl9zdGFydFNzbENlcnRVcGxvYWQoKTtcblx0fVxuXG5cdF9zaG93TW9kYWwoKVxuXHR7XG5cdFx0Ly8gQXBwZW5kIG1vZGFsIGh0bWxcblx0XHQkKHRoaXMpLmFwcGVuZCh0aGlzLl9tb2RhbEh0bWwpO1xuXG5cdFx0bGV0IG1vZGFsRWxlbWVudCA9ICQoJyN1cGxvYWRNb2RhbCcsICQodGhpcykpO1xuXG5cdFx0Ly8gSGlkZSBTU0wgY2VydGlmaWNhdGUgdXBsb2FkIHNwaW5uZXIgYW5kIGVycm9yIG1lc3NhZ2UgY29udGFpbmVyXG5cdFx0JCgnI3VwbG9hZFNwaW5uZXInLCBtb2RhbEVsZW1lbnQpLmhpZGUoKTtcblx0XHQkKCcjdXBsb2FkRXJyb3JNc2cnLCBtb2RhbEVsZW1lbnQpLmhpZGUoKTtcblx0XHQkKCcjdXBsb2FkRXJyb3JNc2cnLCBtb2RhbEVsZW1lbnQpLnRleHQoJycpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIFVwbG9hZCBidXR0b24gY2xpY2tcblx0XHQkKCcjdXBsb2FkU3NsQnV0dG9uJywgbW9kYWxFbGVtZW50KS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uVXBsb2FkU3NsQ2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBtb2RhbCBoaWRlIGV2ZW50XG5cdFx0bW9kYWxFbGVtZW50Lm9uKCdoaWRkZW4uYnMubW9kYWwnLCAkLnByb3h5KHRoaXMuX2Rlc3Ryb3lNb2RhbCwgdGhpcykpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBrZW5kbyB1cGxvYWRlclxuXHRcdHRoaXMuX3VwbG9hZFdpZGdldCA9IG1vZGFsRWxlbWVudC5maW5kKCcjdXBsb2FkZXInKS5rZW5kb1VwbG9hZCh7XG5cdFx0XHRhbGxvd2VkRXh0ZW5zaW9uczogWycuamtzJ10sXG5cdFx0XHRtdWx0aXBsZTogZmFsc2UsXG5cdFx0XHR0ZW1wbGF0ZTogZnVuY3Rpb24oZGF0YUl0ZW0pIHtcblx0XHRcdFx0ZGF0YUl0ZW0uYnl0ZXNUb1NpemUgPSBieXRlc1RvU2l6ZTsgLy8gUGFzcyBieXRlc1RvU2l6ZSB1dGlsaXR5IGZ1bmN0aW9uIHRvIHRlbXBsYXRlXG5cdFx0XHRcdHJldHVybiBrZW5kby50ZW1wbGF0ZShgXG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9J2stcHJvZ3Jlc3Mgdy0xMDAnPjwvc3Bhbj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIlwiPlxuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJrLWZpbGUtbmFtZVwiIHRpdGxlPVwiIz1uYW1lI1wiPiM9bmFtZSM8L3NwYW4+XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImstZmlsZS1zaXplXCI+U2l6ZTogIz1ieXRlc1RvU2l6ZShzaXplLCAxLCAnQnl0ZXMnKSM8L3NwYW4+XG5cdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHRgKShkYXRhSXRlbSk7XG5cdFx0XHR9LFxuXHQgICAgICAgIGxvY2FsaXphdGlvbjoge1xuXHQgICAgICAgICAgICBzZWxlY3Q6ICdTZWxlY3QgZmlsZS4uLidcblx0ICAgICAgICB9XG4gICAgICAgIH0pLmRhdGEoJ2tlbmRvVXBsb2FkJyk7XG5cblx0XHQvLyBJbml0aWFsaXplIGtlbmRvIHZhbGlkYXRpb24gb24gdXBsb2FkZXIgc3ViZm9ybVxuXHRcdC8vIE5PVEU6IHdlIHVzZSBzZXBhcmF0ZSB2YWxpZGF0b3JzIHRvIGJlIGFibGUgdG8gZGlzYWJsZSAndmFsaWRhdGVPbkJsdXInIG9uIHRoZSB1cGxvYWRlcixcblx0XHQvLyBiZWNhdXNlIGl0IGNhdXNlcyB0aGUgZXJyb3IgbWVzc2FnZSB0byBhcHBlYXIgYXMgc29vbiBhcyB0aGUgXCJTZWxlY3QgZmlsZVwiIGJ1dHRvbiBpcyBjbGlja2VkXG5cdFx0dGhpcy5fdmFsaWRhdG9yMSA9IG1vZGFsRWxlbWVudC5maW5kKCcjdXBsb2FkZXJTdWJmb3JtJykua2VuZG9WYWxpZGF0b3Ioe1xuXHRcdFx0dmFsaWRhdGVPbkJsdXI6IGZhbHNlLFxuXHRcdFx0cnVsZXM6IHtcblx0XHRcdFx0dXBsb2FkOiBmdW5jdGlvbihpbnB1dCkge1xuXHRcdFx0XHRcdGxldCB2YWxpZCA9IGZhbHNlO1xuXHRcdFx0XHRcdGlmIChpbnB1dC5pcygnW3R5cGU9ZmlsZV0nKSlcblx0XHRcdFx0XHRcdHZhbGlkID0gaW5wdXQuY2xvc2VzdCgnLmstdXBsb2FkJykuZmluZCgnLmstZmlsZScpLmxlbmd0aCA+IDA7XG5cblx0XHRcdFx0XHRyZXR1cm4gdmFsaWQ7XG5cdCAgICAgICAgICAgIH1cblx0XHRcdH1cblx0XHR9KS5kYXRhKCdrZW5kb1ZhbGlkYXRvcicpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBrZW5kbyB2YWxpZGF0aW9uIG9uIHBhc3N3b3JkcyBzdWJmb3JtXG5cdFx0dGhpcy5fdmFsaWRhdG9yMiA9IG1vZGFsRWxlbWVudC5maW5kKCcjcGFzc3dvcmRzU3ViZm9ybScpLmtlbmRvVmFsaWRhdG9yKHtcblx0XHRcdHZhbGlkYXRlT25CbHVyOiB0cnVlLFxuXHRcdFx0cnVsZXM6IHtcblx0XHRcdFx0dmVyaWZ5S3NQYXNzd29yZDogJC5wcm94eShmdW5jdGlvbihpbnB1dCkge1xuXHRcdFx0XHRcdGxldCB2YWxpZCA9IHRydWU7XG5cdFx0XHRcdFx0aWYgKGlucHV0LmlzKCdbbmFtZT1jb25maXJtS3NQYXNzd29yZF0nKSlcblx0XHRcdFx0XHRcdHZhbGlkID0gaW5wdXQudmFsKCkgPT09ICQodGhpcykuZmluZCgnI2tzUGFzc3dvcmQnKS52YWwoKTtcblx0XHRcdFx0XHRyZXR1cm4gdmFsaWQ7XG5cdFx0XHRcdH0sIHRoaXMpLFxuXHRcdFx0XHR2ZXJpZnlBZG1QYXNzd29yZDogJC5wcm94eShmdW5jdGlvbihpbnB1dCkge1xuXHRcdFx0XHRcdGxldCB2YWxpZCA9IHRydWU7XG5cdFx0XHRcdFx0aWYgKGlucHV0LmlzKCdbbmFtZT1jb25maXJtQWRtaW5QYXNzd29yZF0nKSlcblx0XHRcdFx0XHRcdHZhbGlkID0gaW5wdXQudmFsKCkgPT09ICQodGhpcykuZmluZCgnI2FkbWluUGFzc3dvcmQnKS52YWwoKTtcblx0XHRcdFx0XHRyZXR1cm4gdmFsaWQ7XG5cdFx0XHRcdH0sIHRoaXMpXG5cdFx0XHR9LFxuXHRcdFx0bWVzc2FnZXM6IHtcblx0XHRcdFx0dmVyaWZ5S3NQYXNzd29yZDogJ1Bhc3N3b3JkIG5vdCBtYXRjaGluZycsXG5cdFx0XHRcdHZlcmlmeUFkbVBhc3N3b3JkOiAnUGFzc3dvcmQgbm90IG1hdGNoaW5nJyxcblx0XHRcdH1cblx0XHR9KS5kYXRhKCdrZW5kb1ZhbGlkYXRvcicpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBib290c3RyYXAgbW9kYWxcblx0XHRtb2RhbEVsZW1lbnQubW9kYWwoe1xuXHRcdFx0YmFja2Ryb3A6ICdzdGF0aWMnLFxuXHRcdFx0a2V5Ym9hcmQ6IGZhbHNlLFxuXHRcdH0pO1xuXHR9XG5cblx0X2Rlc3Ryb3lNb2RhbCgpXG5cdHtcblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI3VwbG9hZE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHRpZiAobW9kYWxFbGVtZW50KVxuXHRcdHtcblx0XHRcdC8vIFJlbW92ZSBsaXN0ZW5lcnNcblx0XHRcdCQoJyN1cGxvYWRTc2xCdXR0b24nLCBtb2RhbEVsZW1lbnQpLm9mZignY2xpY2snKTtcblx0XHRcdG1vZGFsRWxlbWVudC5vZmYoJ2hpZGRlbi5icy5tb2RhbCcpO1xuXG5cdFx0XHQvLyBEZXN0cm95IGV2ZXJ5dGhpbmcgS2VuZG9cblx0XHRcdGtlbmRvLmRlc3Ryb3kobW9kYWxFbGVtZW50KTtcblxuXHRcdFx0Ly8gRGlzcG9zZSBtb2RhbFxuXHRcdFx0bW9kYWxFbGVtZW50Lm1vZGFsKCdkaXNwb3NlJyk7XG5cblx0XHRcdC8vIFJlbW92ZSBodG1sXG5cdFx0XHRtb2RhbEVsZW1lbnQucmVtb3ZlKCk7XG5cdFx0XHRtb2RhbEVsZW1lbnQgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdF92YWxpZGF0ZSgpXG5cdHtcblx0XHRsZXQgdmFsMSA9IHRoaXMuX3ZhbGlkYXRvcjEudmFsaWRhdGUoKTtcblx0XHRsZXQgdmFsMiA9IHRoaXMuX3ZhbGlkYXRvcjIudmFsaWRhdGUoKTtcblxuXHRcdHJldHVybiB2YWwxICYmIHZhbDI7XG5cdH1cblxuXHRfc3RhcnRTc2xDZXJ0VXBsb2FkKClcblx0e1xuXHRcdGlmICghdGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnKVxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdVcGxvYWQgdGFyZ2V0IGNvbmZpZ3VyYXRpb24gbm90IHNldCcpO1xuXG5cdFx0bGV0IG1vZGFsRWxlbWVudCA9ICQoJyN1cGxvYWRNb2RhbCcsICQodGhpcykpO1xuXG5cdFx0aWYgKG1vZGFsRWxlbWVudClcblx0XHR7XG5cdFx0XHRsZXQgY2VydERhdGEgPSB7fTtcblx0XHRcdGNlcnREYXRhLmZpbGUgPSB0aGlzLl91cGxvYWRXaWRnZXQuZ2V0RmlsZXMoKVswXTtcblx0XHRcdGNlcnREYXRhLmtzUGFzc3dvcmQgPSAkKCcja3NQYXNzd29yZCcsIG1vZGFsRWxlbWVudCkudmFsKCk7XG5cdFx0XHRjZXJ0RGF0YS5hZG1pblBhc3N3b3JkID0gJCgnI2FkbWluUGFzc3dvcmQnLCBtb2RhbEVsZW1lbnQpLnZhbCgpO1xuXG5cdFx0XHQvLyBEaXNhYmxlIG1vZGFsXG5cdFx0XHR0aGlzLmVuYWJsZWQgPSBmYWxzZTtcblxuXHRcdFx0Ly8gSGlkZSBwcmV2aW91cyBlcnJvciBhbmQgc2hvdyBzcGlubmVyXG5cdFx0XHQkKCcjdXBsb2FkU3Bpbm5lcicsIG1vZGFsRWxlbWVudCkuc2hvdygpO1xuXHRcdFx0JCgnI3VwbG9hZEVycm9yTXNnJywgbW9kYWxFbGVtZW50KS5oaWRlKCk7XG5cdFx0XHQkKCcjdXBsb2FkRXJyb3JNc2cnLCBtb2RhbEVsZW1lbnQpLnRleHQoJycpO1xuXG5cdFx0XHQvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0XHRcdC8vIEdlbmVyYXRlIEluaXQgVmVjdG9yXG5cdFx0XHRsZXQgcm5nVmFsdWVzID0gW107XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IDE2OyBpKyspXG5cdFx0XHRcdHJuZ1ZhbHVlcy5wdXNoKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDI1NikpO1xuXG5cdFx0XHRsZXQgaXYgPSBuZXcgVWludDhBcnJheShybmdWYWx1ZXMpO1xuXG5cdFx0XHQvLyBHZW5lcmF0ZSBzZWNyZXQga2V5IGJ5IE1ENS1lbmNvZGluZyBhZG1pbiBwYXNzd29yZCArIHNlc3Npb24gdG9rZW5cblx0XHRcdGxldCBtZDVQYXNzID0gdGhpcy5fYmluYXJ5TUQ1KGNlcnREYXRhLmFkbWluUGFzc3dvcmQgKyB0aGlzLl91cGxvYWRUYXJnZXRDb25maWcuc2Vzc2lvblRva2VuKTtcblxuXHRcdFx0Ly8gRW5jcnlwdCBrZXlzdG9yZSBwYXNzd29yZCB2aWEgQUVTICgxMjhiaXQpXG5cdFx0XHRsZXQgZW5jcnlwdGVkUHdkID0gdGhpcy5fYWVzRW5jcnlwdChjZXJ0RGF0YS5rc1Bhc3N3b3JkLCBtZDVQYXNzLCBpdik7XG5cblx0XHRcdC8vIEVuY29kZSBJViB1c2luZyBCYXNlNjRcblx0XHRcdGxldCBlbmNvZGVkSXYgPSB0aGlzLl9iNjRFbmNvZGUoaXYpO1xuXG5cdFx0XHQvLyBFbmNvZGUgZW5jcnlwdGVkIHBhc3N3b3JkIHVzaW5nIEJhc2U2NFxuXHRcdFx0bGV0IGVuY29kZWRQd2QgPSB0aGlzLl9iNjRFbmNvZGUoZW5jcnlwdGVkUHdkKTtcblxuXHRcdFx0Ly89PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5cdFx0XHQvLyBTZXQgcGFyYW1ldGVycyB0byBiZSBzZW50IHdpdGggdGhlIGNlcnRpZmljYXRlIGtleXN0b3JlIGZpbGVcblx0XHRcdGNvbnN0IHBhcmFtcyA9IG5ldyBGb3JtRGF0YSgpO1xuXHRcdFx0cGFyYW1zLmFwcGVuZCgnZmlsZXNbXScsIGNlcnREYXRhLmZpbGUucmF3RmlsZSk7XG5cdFx0XHRwYXJhbXMuYXBwZW5kKCdfX2l2JywgZW5jb2RlZEl2KTtcblx0XHRcdHBhcmFtcy5hcHBlbmQoJ19fcGFzc3dvcmQnLCBlbmNvZGVkUHdkKTtcblx0XHRcdHBhcmFtcy5hcHBlbmQoJ19fbW9kdWxlJywgdGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnLm1vZHVsZUlkKTtcblxuXHRcdFx0Ly8gU2V0IGRlc3RpbmF0aW9uIHVybFxuXHRcdFx0Y29uc3QgdXJsID0gJ2h0dHA6Ly8nICsgdGhpcy5fdXBsb2FkVGFyZ2V0Q29uZmlnLmhvc3QgKyAnOicgKyB0aGlzLl91cGxvYWRUYXJnZXRDb25maWcuaHR0cFBvcnQgKyAnL0JsdWVCb3gvU0ZTMlhGaWxlVXBsb2FkP3Nlc3NIYXNoSWQ9JyArIHRoaXMuX3VwbG9hZFRhcmdldENvbmZpZy5zZXNzaW9uVG9rZW47XG5cblx0XHRcdC8vIFN0YXJ0IHVwbG9hZFxuXHRcdFx0ZmV0Y2godXJsLCB7XG5cdFx0XHRcdG1ldGhvZDogJ1BPU1QnLFxuXHRcdFx0XHRib2R5OiBwYXJhbXMsXG5cdFx0XHRcdG1vZGU6ICduby1jb3JzJ1xuXHRcdFx0fSkudGhlbigkLnByb3h5KHRoaXMuX29uU3NsQ2VydFVwbG9hZEVuZCwgdGhpcykpO1xuXHRcdH1cblx0fVxuXG5cdF9vblNzbENlcnRVcGxvYWRFbmQocmVzcG9uc2UpXG5cdHtcblx0XHQvLyBOb3RoaW5nIHRvIGRvOiB3ZSBoYXZlIHRvIHdhaXQgdGhlIHVwbG9hZCBwcm9jZXNzIGNvbXBsZXRpb24gdG8gYmUgc2lnbmFsZWQgYnkgdGhlIHNlcnZlciB0aHJvdWdoIHRoZSBkZWRpY2F0ZWQgRXh0ZW5zaW9uIHJlc3BvbnNlXG5cblx0XHQvLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cblx0XHQvLyBUT0RPIFNob3VsZCB3ZSBoYW5kbGUgdGhpcyByZXNwb25zZSBpbiBzb21lIHdheT8gRm9yIHNvbWUgdW5rbm93biByZWFzb24gd2UgYWx3YXlzIGdldCBvaz1mYWxzZSBhbmQgc3RhdHVzPTBcblx0XHQvL2NvbnNvbGUubG9nKHJlc3BvbnNlKVxuXHRcdC8vY29uc29sZS5sb2cocmVzcG9uc2Uub2spXG5cdFx0Ly9jb25zb2xlLmxvZyhyZXNwb25zZS5zdGF0dXMpXG5cdH1cblxuXHQvKipcblx0ICogTWV0aG9kIGNhbGxlZCBieSBwYXJlbnQgd2hlbiB1cGxvYWQgZmFpbGVkLlxuXHQgKi9cblx0b25Tc2xDZXJ0VXBsb2FkRXJyb3IoZXJyb3IpXG5cdHtcblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI3VwbG9hZE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHRpZiAobW9kYWxFbGVtZW50KVxuXHRcdHtcblx0XHRcdC8vIEVuYWJsZSBtb2RhbFxuXHRcdFx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuXHRcdFx0Ly8gU2hvdyB1cGxvYWQgZXJyb3Jcblx0XHRcdCQoJyN1cGxvYWRFcnJvck1zZycsIG1vZGFsRWxlbWVudCkuc2hvdygpO1xuXHRcdFx0JCgnI3VwbG9hZEVycm9yTXNnJywgbW9kYWxFbGVtZW50KS50ZXh0KGVycm9yICsgJy4nKTtcblxuXHRcdFx0Ly8gSGlkZSBzcGlubmVyXG5cdFx0XHQkKCcjdXBsb2FkU3Bpbm5lcicsIG1vZGFsRWxlbWVudCkuaGlkZSgpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBNZXRob2QgY2FsbGVkIGJ5IHBhcmVudCB3aGVuIHVwbG9hZCBpcyBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5LlxuXHQgKi9cblx0b25Tc2xDZXJ0VXBsb2FkU3VjY2VzcygpXG5cdHtcblx0XHRsZXQgbW9kYWxFbGVtZW50ID0gJCgnI3VwbG9hZE1vZGFsJywgJCh0aGlzKSk7XG5cblx0XHRpZiAobW9kYWxFbGVtZW50KVxuXHRcdHtcblx0XHRcdC8vIEVuYWJsZSBtb2RhbFxuXHRcdFx0dGhpcy5lbmFibGVkID0gdHJ1ZTtcblxuXHRcdFx0Ly8gSGlkZSBzcGlubmVyXG5cdFx0XHQkKCcjdXBsb2FkU3Bpbm5lcicsIG1vZGFsRWxlbWVudCkuaGlkZSgpO1xuXG5cdFx0XHQvLyBIaWRlIG1vZGFsXG5cdFx0XHRtb2RhbEVsZW1lbnQubW9kYWwoJ2hpZGUnKTtcblx0XHR9XG5cdH1cblxuXHQvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuXG5cdC8qXG5cdCAqIFRha2VzIGEgc3RyaW5nIGFuZCByZXR1cm5zIHRoZSBNRDUgYXMgVWludDhBcnJheVxuXHQgKi9cblx0X2JpbmFyeU1ENShzdHIpXG5cdHtcblx0XHRsZXQgTUQ1ID0gbmV3IFNGUzJYLk1ENSgpO1xuXHRcdGxldCBoZXhTdHIgPSBNRDUuaGV4X21kNShzdHIpO1xuXG5cdFx0cmV0dXJuIHRoaXMuX2hleEJ5dGVTdHJpbmdUb0J5dGVBcnJheShoZXhTdHIpO1xuXHR9XG5cblx0Lypcblx0ICogSGV4IGJ5dGVzIC0tLT4gQWN0dWFsIGJ5dGVbXSBhcyBVaW50OEFycmF5XG5cdCAqL1xuXHRfaGV4Qnl0ZVN0cmluZ1RvQnl0ZUFycmF5KGhleEJ5dGVTdHJpbmcpXG5cdHtcblx0ICAgIGxldCBieXRlcyA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gTUQ1IGZpeGVkIG91dHB1dCBzaXplXG5cblx0ICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGV4Qnl0ZVN0cmluZy5sZW5ndGg7KVxuXHQgICAge1xuXHQgICAgICAgIGxldCBoZXhCeXRlID0gaGV4Qnl0ZVN0cmluZ1tpKytdICsgaGV4Qnl0ZVN0cmluZ1tpKytdO1xuXHQgICAgICAgIGxldCBieXRlID0gcGFyc2VJbnQoaGV4Qnl0ZSwgMTYpO1xuXG5cdCAgICAgICAgYnl0ZXNbaSAvIDIgLSAxXSA9IGJ5dGU7XG5cdCAgICB9XG5cblx0ICAgIHJldHVybiBieXRlcztcblx0fVxuXG5cdC8qXG5cdCAqIEVuY3J5cHQgdXNpbmcgQUVTLCBtb2RlIENCQywgUEtDUyM3IHBhZGRpbmdcblx0ICpcblx0ICogdGV4dCBcdFx0LT4gdGhlIHRleHQgd2Ugd2FudCB0byBlbmNvZGVcblx0ICoga2V5IFx0XHQtPiB0aGUgQUVTIGtleVxuXHQgKiBpdiAgXHRcdC0+IHRoZSBBRVMvQ0JDIGluaXQgdmVjdG9yXG5cdCAqXG5cdCAqIFJldHVybnMgXHQtPiBVaW50OEFycmF5XG5cdCAqL1xuXHRfYWVzRW5jcnlwdCh0ZXh0LCBrZXksIGl2KVxuXHR7XG5cdFx0bGV0IHRleHRCeXRlcyA9IGFlc2pzLnV0aWxzLnV0ZjgudG9CeXRlcyh0ZXh0KTsgXHRcdC8vIEdldCBVVEYtOCBieXRlc1xuXHRcdGxldCBhZXNDQkMgPSBuZXcgYWVzanMuTW9kZU9mT3BlcmF0aW9uLmNiYyhrZXksIGl2KTtcdC8vIEluaXQgQ0JDIG1vZGVcblx0XHR0ZXh0Qnl0ZXMgPSBhZXNqcy5wYWRkaW5nLnBrY3M3LnBhZCh0ZXh0Qnl0ZXMpOyBcdFx0Ly8gUEtDUyM3IHBhZGRpbmdcblxuXHRcdC8vIEVuY3J5cHRcblx0XHRyZXR1cm4gYWVzQ0JDLmVuY3J5cHQodGV4dEJ5dGVzKTtcblx0fVxuXG5cdC8qXG5cdCAqIEVuY29kZSBwYXNzZWQgYnl0ZSBhcnJheSAtLT4gQmFzZTY0IHJlcHJlc2VudGF0aW9uXG5cdCAqIFJldHVybnMgLS0+IHN0cmluZ1xuXHQgKi9cblx0X2I2NEVuY29kZShiYXJyYXkpXG5cdHtcblx0XHRyZXR1cm4gYnRvYShTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIGJhcnJheSkpO1xuXHR9XG59XG5cbi8vIERFRklORSBDT01QT05FTlRcbmlmICghd2luZG93LmN1c3RvbUVsZW1lbnRzLmdldCgnc3NsLWNlcnRpZmljYXRlLW1hbmFnZXInKSlcblx0d2luZG93LmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnc3NsLWNlcnRpZmljYXRlLW1hbmFnZXInLCBTc2xDZXJ0aWZpY2F0ZU1hbmFnZXIpO1xuIiwiaW1wb3J0IHtCYXNlTW9kdWxlfSBmcm9tICcuL2Jhc2UtbW9kdWxlJztcbmltcG9ydCB7Q29uZmlnSW50ZXJmYWNlQnVpbGRlcn0gZnJvbSAnLi4vdXRpbHMvdWlidWlsZGVyL2NvbmZpZy1pbnRlcmZhY2UtYnVpbGRlcic7XG5pbXBvcnQge1NzbENlcnRpZmljYXRlTWFuYWdlcn0gZnJvbSAnLi4vY29tcG9uZW50cy9zc2wtY2VydGlmaWNhdGUtbWFuYWdlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlcnZlckNvbmZpZ3VyYXRvciBleHRlbmRzIEJhc2VNb2R1bGVcbntcblx0Y29uc3RydWN0b3IoKVxuXHR7XG5cdCAgICBzdXBlcignc2VydmVyQ29uZmlnJyk7XG5cblx0XHQvLyBPdXRnb2luZyByZXF1ZXN0c1xuXHRcdHRoaXMuUkVRX0lOSVQgPSAnaW5pdCc7XG5cdFx0dGhpcy5SRVFfR0VUX0NPTkZJRyA9ICdnZXRDb25maWcnO1xuXHRcdHRoaXMuUkVRX1VQREFURV9DT05GSUcgPSAndXBkQ29uZmlnJztcblxuXHRcdC8vIEluY29taW5nIHJlc3BvbnNlc1xuXHRcdHRoaXMuUkVTUF9JTklUID0gJ2luaXQnO1xuXHRcdHRoaXMuUkVTUF9DT05GSUcgPSAnY29uZmlnJztcblx0XHR0aGlzLlJFU1BfQ09ORklHX1VQREFURV9DT05GSVJNID0gJ2NvbmZpZ1VwZGF0ZSc7XG5cdFx0dGhpcy5SRVNQX0NPTkZJR19DSEFOR0VEX0FMRVJUID0gJ2NvbmZpZ0FsZXJ0Jztcblx0XHR0aGlzLlJFU1BfU1NMX1VQTE9BRF9FUlJPUiA9ICdzc2xVcGxvYWRFcnJvcic7XG5cdFx0dGhpcy5SRVNQX1NTTF9VUExPQURfQ09ORklSTSA9ICdzc2xVcGxvYWQnO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gQ09NTU9OIE1PRFVMRSBJTlRFUkZBQ0UgTUVUSE9EU1xuXHQvLyBUaGlzIG1lbWJlcnMgYXJlIHVzZWQgYnkgdGhlIG1haW4gY29udHJvbGxlclxuXHQvLyB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBtb2R1bGUncyBjb250cm9sbGVyLlxuXHQvLyBUaGlzIG1ldGhvZHMgb3ZlcnJpZGUgdGhvc2UgaW4gQmFzZU1vZHVsZSBjbGFzcy5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRpbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKVxuXHR7XG5cdFx0Ly8gQ2FsbCBzdXBlciBtZXRob2Rcblx0XHRzdXBlci5pbml0aWFsaXplKGlkRGF0YSwgc2hlbGxDb250cm9sbGVyKTtcblxuXHRcdC8vIEluaXRpYWxpemUgcHJvZ3Jlc3MgYmFyXG5cdFx0JCgnI3NyYy1wcm9ncmVzc0JhcicpLmtlbmRvUHJvZ3Jlc3NCYXIoe1xuXHRcdFx0bWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxMDAsXG5cdFx0XHR2YWx1ZTogZmFsc2UsXG4gICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDQwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuXHRcdC8vIENyZWF0ZSBpbnRlcmZhY2UgYnVpbGRlciBpbnN0YW5jZVxuXHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIgPSBuZXcgQ29uZmlnSW50ZXJmYWNlQnVpbGRlcigpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIGludGVyZmFjZSBidXR0b25zXG5cdFx0JCgnI3NyYy1yZWxvYWRCdXR0b24nKS5vbignY2xpY2snLCAkLnByb3h5KHRoaXMuX29uUmVsb2FkQ2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjc3JjLXN1Ym1pdEJ1dHRvbicpLm9uKCdjbGljaycsICQucHJveHkodGhpcy5fb25TdWJtaXRDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gU2F2ZSByZWYgdG8gU1NMIE1hbmFnZXJcblx0XHR0aGlzLl9zc2xDZXJ0TWFuYWdlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzcmMtc3NsQ2VydE1hbmFnZXInKTtcblxuXHRcdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0qL1xuXG5cdFx0Ly8gU2VuZCBpbml0aWFsaXphdGlvbiByZXF1ZXN0XG5cdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9JTklUKTtcblx0fVxuXG5cdGRlc3Ryb3koKVxuXHR7XG5cdFx0Ly8gQ2FsbCBzdXBlciBtZXRob2Rcblx0XHRzdXBlci5kZXN0cm95KCk7XG5cblx0XHQvLyBEZXN0cm95IFNTTCBDZXJ0aWZpY2F0ZSBNYW5hZ2VyXG5cdFx0dGhpcy5fc3NsQ2VydE1hbmFnZXIuZGVzdHJveSgpO1xuXG5cdFx0Ly8gUmVtb3ZlIGludGVyZmFjZSBidXR0b25zIGNsaWNrIGxpc3RlbmVyc1xuXHRcdCQoJyNzcmMtcmVsb2FkQnV0dG9uJykub2ZmKCdjbGljaycpO1xuXHRcdCQoJyNzcmMtc3VibWl0QnV0dG9uJykub2ZmKCdjbGljaycpO1xuXG5cdFx0Ly8gQ2xlYXIgdGFicyBjb250YWluZXJcblx0XHR0aGlzLl9jbGVhclRhYnMoKTtcblx0fVxuXG5cdG9uRXh0ZW5zaW9uQ29tbWFuZChjb21tYW5kLCBkYXRhKVxuXHR7XG5cdFx0Ly8gSW5pdGlhbGl6YXRpb24gZGF0YSByZWNlaXZlZFxuXHRcdGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9JTklUKVxuXHRcdHtcblx0XHRcdC8vIFJldHJpZXZlIEhUVFAgcG9ydCB0byBiZSB1c2VkIGZvciBTU0wgY2VydGlmaWNhdGUgZmlsZSB1cGxvYWRpbmdcblx0XHRcdGNvbnN0IHVwbG9hZEh0dHBQb3J0ID0gZGF0YS5nZXRJbnQoJ2h0dHBQb3J0Jyk7XG5cblx0XHRcdC8vIFJldHJpZXZlIG1vZHVsZSBpZCBzZW50IGJ5IHRoZSBzZXJ2ZXIgKHJlcXVpcmVkIGJlY2F1c2UgbXVsdGlwbGUgbW9kdWxlcyB1c2UgZmlsZSB1cGxvYWRpbmcgc2VydmljZSlcblx0XHRcdGNvbnN0IHVwbG9hZE1vZHVsZUlkID0gZGF0YS5nZXRVdGZTdHJpbmcoJ21vZElkJyk7XG5cblx0XHRcdC8vIFNldCBTU0wgdXBsb2FkIG1hbmFnZXIgdGFyZ2V0IGNvbmZpZ3VyYXRpb25cblx0XHRcdHRoaXMuX3NzbENlcnRNYW5hZ2VyLnVwbG9hZFRhcmdldENvbmZpZyA9IHtcblx0XHRcdFx0c2Vzc2lvblRva2VuOiB0aGlzLnNtYXJ0Rm94LnNlc3Npb25Ub2tlbixcblx0XHRcdFx0aG9zdDogdGhpcy5zbWFydEZveC5jb25maWcuaG9zdCxcblx0XHRcdFx0aHR0cFBvcnQ6IHVwbG9hZEh0dHBQb3J0LFxuXHRcdFx0XHRtb2R1bGVJZDogdXBsb2FkTW9kdWxlSWQsXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBTZXJ2ZXIgc2VuZHMgYSBmbGFnIGluZGljYXRpbmcgaWYgZmlsZSB1cGxvYWRzIGFyZSBsb2NrZWRcblx0XHRcdC8vIFdlIHVzZSBpdCB0byBlbmFibGUgdGhlIFwiTWFuYWdlIFNTTCBjZXJ0aWZpY2F0ZVwiIGJ1dHRvblxuXHRcdFx0dGhpcy5fc3NsTG9ja2VkID0gZGF0YS5nZXRCb29sKCdsb2NrJyk7XG5cblx0XHRcdGlmICghdGhpcy5fc3NsTG9ja2VkKVxuXHRcdFx0XHQkKCcjc3JjLW1hbmFnZVNzbFdhcm4nKS5oaWRlKCk7XG5cblx0XHRcdC8vIFJlcXVlc3QgY29uZmlndXJhdGlvbiBkYXRhIHRvIHNlcnZlciBpbnN0YW5jZVxuXHRcdFx0dGhpcy5zZW5kRXh0ZW5zaW9uUmVxdWVzdCh0aGlzLlJFUV9HRVRfQ09ORklHKTtcblx0XHR9XG5cblx0XHQvLyBTZXJ2ZXIgY29uZmlndXJhdGlvbiBkYXRhIHJlY2VpdmVkXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfQ09ORklHKVxuXHRcdHtcblx0XHRcdC8vIEJ1aWxkIHVzZXIgaW50ZXJmYWNlIGJhc2VkIG9uIHJlY2VpdmVkIGRhdGFcblx0XHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuYnVpbGRJbnRlcmZhY2UoZGF0YS5nZXRTRlNBcnJheSgnc2V0dGluZ3MnKSwgJ3NyYy10YWJOYXZpZ2F0b3InLCBmYWxzZSk7XG5cblx0XHRcdC8vIEVuYWJsZSBidXR0b25zXG5cdFx0XHR0aGlzLl9lbmFibGVCdXR0b25zKHRydWUpO1xuXG5cdFx0XHQvLyBJbml0aWFsaXplIFRhYk5hdmlnYXRvci1yYWxhdGVkIHdpZGdldHNcblx0XHRcdGlmICghdGhpcy5fdGFiTmF2SW5pdGlhbGl6ZWQpXG5cdFx0XHR7XG5cdFx0XHRcdC8vIEVuYWJsZSBzY3JvbGxpbmcgdGFic1xuXHRcdFx0XHQkKCcjc3JjLXRhYk5hdmlnYXRvciA+ICN0YWJzJykuc2Nyb2xsaW5nVGFicyh7XG5cdFx0XHRcdFx0Ym9vdHN0cmFwVmVyc2lvbjogNCxcblx0XHRcdFx0XHRzY3JvbGxUb1RhYkVkZ2U6IHRydWUsXG5cdFx0XHRcdFx0ZW5hYmxlU3dpcGluZzogdHJ1ZSxcblx0XHRcdFx0XHRkaXNhYmxlU2Nyb2xsQXJyb3dzT25GdWxseVNjcm9sbGVkOiB0cnVlLFxuXHRcdFx0XHRcdGNzc0NsYXNzTGVmdEFycm93OiAnZmEgZmEtY2hldnJvbi1sZWZ0Jyxcblx0XHRcdFx0XHRjc3NDbGFzc1JpZ2h0QXJyb3c6ICdmYSBmYS1jaGV2cm9uLXJpZ2h0J1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aGlzLl90YWJOYXZJbml0aWFsaXplZCA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFJ1biB2YWxpZGF0aW9uICh0byByZW1vdmUgdmFsaWRhdGlvbiBtZXNzYWdlcyBpZiBkYXRhIHdhcyByZWxvYWRlZClcblx0XHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuY2hlY2tJc1ZhbGlkKCk7XG5cblx0XHRcdHRoaXMuX3N3aXRjaFZpZXcoJ3NyYy1tYWluJyk7XG5cdFx0fVxuXG5cdFx0Ly8gU2VydmVyIGNvbmZpZ3VyYXRpb24gdXBkYXRlIGNvbmZpcm1hdGlvblxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX0NPTkZJR19VUERBVEVfQ09ORklSTSlcblx0XHR7XG5cdFx0XHQvLyBFbmFibGUgYnV0dG9uc1xuXHRcdFx0dGhpcy5fZW5hYmxlQnV0dG9ucyh0cnVlKTtcblxuXHRcdFx0Ly8gRW5hYmxlIGZvcm0gaXRlbXNcblx0XHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZGlzYWJsZUludGVyZmFjZShmYWxzZSk7XG5cblx0XHRcdC8vIElmIHRoZSBjdXJyZW50IHVzZXIgaXMgdGhlIHVwZGF0ZXIsIHNob3cgYSBub3RpZmljYXRpb25cblx0XHRcdC8vIE90aGVyd2lzZSwgc2hvdyBhIGRpYWxvZyBib3ggc3VnZ2VzdGluZyB0byByZWxvYWRcblx0XHRcdGxldCB1cGRhdGVyID0gZGF0YS5nZXRVdGZTdHJpbmcoJ3VzZXInKTtcblxuXHRcdFx0aWYgKHVwZGF0ZXIgPT0gdGhpcy5zbWFydEZveC5teVNlbGYubmFtZSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gUmVzZXQgdGhlICdtb2RpZmllZCcgZmxhZ1xuXHRcdFx0XHR0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLnJlc2V0SXNNb2RpZmllZCgpO1xuXG5cdFx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRcdHRoaXMuc2hlbGxDdHJsLnNob3dOb3RpZmljYXRpb24oJ1NlcnZlciBzZXR0aW5ncyB1cGRhdGVkJywgJ0NoYW5nZXMgd2lsbCBiZSBhcHBsaWVkIG9uIG5leHQgc2VydmVyIHJlc3RhcnQnKTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Ly8gU2hvdyBhbGVydFxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoYEFkbWluaXN0cmF0b3IgJHt1cGRhdGVyfSBoYXMgbW9kaWZpZWQgdGhlIHNlcnZlciBzZXR0aW5nczsgcGxlYXNlIHJlbG9hZCB0byB1cGRhdGUgeW91ciB2aWV3LmApO1xuXG5cdFx0XHRcdC8vIERpc2FibGUgc3VibWl0IGJ1dHRvblxuXHRcdFx0XHQkKCcjc3JjLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gU2VydmVyIGNvbmZpZ3VyYXRpb24geG1sIHNhdmVkIGJ5IGFuIGV4dGVybmFsIHByb2Nlc3Ncblx0XHRlbHNlIGlmIChjb21tYW5kID09IHRoaXMuUkVTUF9DT05GSUdfQ0hBTkdFRF9BTEVSVClcblx0XHR7XG5cdFx0XHQvLyBTaG93IGFsZXJ0XG5cdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93U2ltcGxlQWxlcnQoYFRoZSBzeXN0ZW0gaGFzIG1vZGlmaWVkIHRoZSBzZXJ2ZXIgc2V0dGluZ3MgYXV0b21hdGljYWxseTsgcGxlYXNlIHJlbG9hZCB0byB1cGRhdGUgeW91ciB2aWV3LmApO1xuXG5cdFx0XHQvLyBEaXNhYmxlIHN1Ym1pdCBidXR0b25cblx0XHRcdCQoJyNzcmMtc3VibWl0QnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcblx0XHR9XG5cblx0XHQvLyBTU0wgY2VydGlmaWNhdGUgdXBsb2FkIGVycm9yXG5cdFx0ZWxzZSBpZiAoY29tbWFuZCA9PSB0aGlzLlJFU1BfU1NMX1VQTE9BRF9FUlJPUilcblx0XHR7XG5cdFx0XHRjb25zdCBlcnJvciA9IGRhdGEuZ2V0VXRmU3RyaW5nKCdlcnJvcicpO1xuXG5cdFx0XHQvLyBMb2cgd2FybmluZ1xuXHRcdFx0dGhpcy5zaGVsbEN0cmwubG9nTWVzc2FnZShlcnJvciwgJ2Vycm9yJyk7XG5cblx0XHRcdC8vIFNob3cgZXJyb3IgaW4gbWFuYWdlciB3aW5kb3dcblx0XHRcdHRoaXMuX3NzbENlcnRNYW5hZ2VyLm9uU3NsQ2VydFVwbG9hZEVycm9yKGVycm9yKTtcblx0XHR9XG5cblx0XHQvLyBTU0wgY2VydGlmaWNhdGUgdXBsb2FkIGNvbmZpcm1lZFxuXHRcdGVsc2UgaWYgKGNvbW1hbmQgPT0gdGhpcy5SRVNQX1NTTF9VUExPQURfQ09ORklSTSlcblx0XHR7XG5cdFx0XHQvLyBDbG9zdyBtYW5hZ2VyIHdpbmRvd1xuXHRcdFx0dGhpcy5fc3NsQ2VydE1hbmFnZXIub25Tc2xDZXJ0VXBsb2FkU3VjY2VzcygpO1xuXG5cdFx0XHRsZXQgdXBkYXRlciA9IGRhdGEuZ2V0VXRmU3RyaW5nKCd1c2VyJyk7XG5cblx0XHRcdC8vIERpc3BsYXkgbm90aWZpY2F0aW9uXG5cdFx0XHRpZiAodXBkYXRlciA9PSB0aGlzLnNtYXJ0Rm94Lm15U2VsZi5uYW1lKVxuXHRcdFx0XHR0aGlzLnNoZWxsQ3RybC5zaG93Tm90aWZpY2F0aW9uKCdTU0wgY2VydGlmaWNhdGUnLCAnU1NMIGNlcnRpZmljYXRlIGtleXN0b3JlIHdhcyB1cGxvYWRlZCBzdWNjZXNzZnVsbHknKTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd05vdGlmaWNhdGlvbignU1NMIGNlcnRpZmljYXRlJywgYEFkbWluaXN0cmF0b3IgJHt1cGRhdGVyfSBoYXMgdXBsb2FkZWQgYSBuZXcgU1NMIGNlcnRpZmljYXRlIGtleXN0b3JlYCk7XG5cblx0XHRcdC8vIFdoZW4gYSBjZXJ0aWZpY2F0ZSBpcyB1cGxvYWRlZCwgSFRUUFMgaXMgYWxzbyBlbmFibGVkIGF1dG9tYXRpY2FsbHk6XG5cdFx0XHQvLyB3ZSBoYXZlIHRvIHVwZGF0ZSB0aGUgaW50ZXJmYWNlIGFjY29yZGluZ2x5XG5cblx0XHRcdC8vIEdldCB0aGUgcmVsZXZhbnQgQ29uZmlndXJhdGlvbiBGb3JtIEl0ZW1cblx0XHRcdGNvbnN0IGVuYWJsZUh0dHBzQ0kgPSB0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmdldENvbmZpZ0Zvcm1JdGVtKCd3ZWJTZXJ2ZXIuZW5hYmxlSHR0cHMnKTtcblxuXHRcdFx0Ly8gVXBkYXRlIENvbmZpZ3VyYXRpb24gUGFyYW1ldGVyIGFzc29jaWF0ZWQgd2l0aCB0aGUgQ29uZmlndXJhdGlvbiBGb3JtIEl0ZW1cblx0XHRcdGVuYWJsZUh0dHBzQ0kuZGF0YS52YWx1ZSA9IHRydWU7XG5cdFx0XHRlbmFibGVIdHRwc0NJLmRhdGEucmVzZXRJc01vZGlmaWVkKCk7IC8vIFRoaXMgaXMgbmVlZGVkIHRvIGF2b2lkIHRoZSBDb25maWd1cmF0aW9uIFBhcmFtZXRlciB0byBmbGFnZ2VkIGFzICdjaGFuZ2VkJ1xuXG5cdFx0XHQvLyBEaXNwbGF5IHRoZSBuZXcgdmFsdWUgb2YgdGhlIENvbmZpZ3VyYXRpb24gRm9ybSBJdGVtXG5cdFx0XHRlbmFibGVIdHRwc0NJLl9zZXRXaWRnZXRWYWx1ZSgpOyAvLyBEaXNwbGF5IHRoZSBuZXcgdmFsdWUgaW4gdGhlIGNvbmZpZyBmb3JtIGl0ZW1cblx0XHR9XG5cdH1cblxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBQUklWQVRFIE1FVEhPRFNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRfZW5hYmxlQnV0dG9ucyhlbmFibGVkKVxuXHR7XG5cdFx0JCgnI3NyYy1yZWxvYWRCdXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGVkKTtcblx0XHQkKCcjc3JjLXN1Ym1pdEJ1dHRvbicpLmF0dHIoJ2Rpc2FibGVkJywgIWVuYWJsZWQpO1xuXHRcdCQoJyNzcmMtYmFja3VwQ2hlY2snKS5hdHRyKCdkaXNhYmxlZCcsICFlbmFibGVkKTtcblxuXHRcdGlmICghdGhpcy5fc3NsTG9ja2VkKVxuXHRcdFx0dGhpcy5fc3NsQ2VydE1hbmFnZXIuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cdH1cblxuXHRfc3dpdGNoVmlldyh2aWV3SWQpXG5cdHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3JjLXZpZXdzdGFjaycpLnNlbGVjdGVkRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHZpZXdJZCk7XG5cdH1cblxuXHRfY2xlYXJUYWJzKClcblx0e1xuXHRcdC8vIERlc3Ryb3kgc2Nyb2xsaW5nIHRhYnNcblx0XHQkKCcjc3JjLXRhYk5hdmlnYXRvciAjdGFicycpLnNjcm9sbGluZ1RhYnMoJ2Rlc3Ryb3knKTtcblxuXHRcdC8vIFJlbW92ZSBhbGwgdGFiIG5hdmlnYXRvciBjb250ZW50XG5cdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlci5kZXN0cm95SW50ZXJmYWNlKCk7XG5cdH1cblxuXHRfb25SZWxvYWRDbGljaygpXG5cdHtcblx0XHQvLyBEaXNhYmxlIGJ1dHRvbnNcblx0XHR0aGlzLl9lbmFibGVCdXR0b25zKGZhbHNlKTtcblxuXHRcdC8vIFN3aXRjaCB0byBsb2FkaW5nIHZpZXdcblx0XHR0aGlzLl9zd2l0Y2hWaWV3KCdzcmMtbG9hZGluZycpO1xuXG5cdFx0Ly8gSGlkZSB2YWxpZGF0aW9uIG1lc3NhZ2VzXG5cdFx0dGhpcy5faW50ZXJmYWNlQnVpbGRlci5yZXNldFZhbGlkYXRpb24oKTtcblxuXHRcdC8vIFJlcXVlc3QgY29uZmlndXJhdGlvbiBkYXRhIHRvIHNlcnZlciBpbnN0YW5jZVxuXHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfR0VUX0NPTkZJRyk7XG5cdH1cblxuXHRfb25TdWJtaXRDbGljaygpXG5cdHtcblx0XHQvLyBDaGVjayB2YWxpZGl0eVxuXHRcdGlmICh0aGlzLl9pbnRlcmZhY2VCdWlsZGVyLmNoZWNrSXNWYWxpZCgpKVxuXHRcdHtcblx0XHRcdGxldCBjaGFuZ2VzID0gdGhpcy5faW50ZXJmYWNlQnVpbGRlci5nZXRDaGFuZ2VkRGF0YSgpO1xuXG5cdFx0XHRpZiAoY2hhbmdlcy5zaXplKCkgPiAwKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBEaXNhYmxlIGJ1dHRvbnNcblx0XHRcdFx0dGhpcy5fZW5hYmxlQnV0dG9ucyhmYWxzZSk7XG5cblx0XHRcdFx0Ly8gRGlzYWJsZSBmb3JtIGl0ZW1zXG5cdFx0XHRcdHRoaXMuX2ludGVyZmFjZUJ1aWxkZXIuZGlzYWJsZUludGVyZmFjZSh0cnVlKTtcblxuXHRcdFx0XHQvLyBTZW5kIHVwZGF0ZWQgc2V0dGluZ3MgdG8gc2VydmVyIGluc3RhbmNlXG5cdFx0XHRcdGxldCBwYXJhbXMgPSBuZXcgU0ZTMlguU0ZTT2JqZWN0KCk7XG5cdFx0XHRcdHBhcmFtcy5wdXRTRlNBcnJheSgnc2V0dGluZ3MnLCBjaGFuZ2VzKTtcblx0XHRcdFx0cGFyYW1zLnB1dEJvb2woJ2JhY2t1cCcsICQoJyNzcmMtYmFja3VwQ2hlY2snKS5wcm9wKCdjaGVja2VkJykpO1xuXG5cdFx0XHRcdHRoaXMuc2VuZEV4dGVuc2lvblJlcXVlc3QodGhpcy5SRVFfVVBEQVRFX0NPTkZJRywgcGFyYW1zKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdFx0dGhpcy5zaGVsbEN0cmwuc2hvd1NpbXBsZUFsZXJ0KCdVbmFibGUgdG8gc3VibWl0IGNvbmZpZ3VyYXRpb24gY2hhbmdlcyBkdWUgdG8gYW4gaW52YWxpZCB2YWx1ZTsgcGxlYXNlIHZlcmlmeSB0aGUgaGlnaGxpZ2h0ZWQgZm9ybSBmaWVsZHMgaW4gYWxsIHRhYnMuJywgdHJ1ZSk7XG5cdH1cblxuXG59XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUM1ZEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0EiLCJzb3VyY2VSb290IjoiIn0=