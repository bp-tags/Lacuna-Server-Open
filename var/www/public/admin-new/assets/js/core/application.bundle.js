/*! (c) gotoAndPlay | All rights reserved */
var application =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"application": 0
/******/ 	};
/******/
/******/
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "assets/js/core/modules/" + ({"module-0":"module-0","module-1":"module-1","module-10":"module-10","module-11":"module-11","module-12~module-13~module-9":"module-12~module-13~module-9","module-12":"module-12","module-2":"module-2","module-3":"module-3","module-4":"module-4","module-6":"module-6","module-8":"module-8","vendors~module-13~module-5~module-7":"vendors~module-13~module-5~module-7","module-13":"module-13","module-5":"module-5","module-7":"module-7","vendors~module-9":"vendors~module-9","module-9":"module-9"}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonpapplication"] = window["webpackJsonpapplication"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/application.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/application.js":
/*!****************************!*\
  !*** ./src/application.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _shell_controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shell-controller */ "./src/shell-controller.js");


$( document ).ready(function()
{
    console.info("SmartFoxServer 2X AdminTool ready!");

	// Create shell controller instance
	this.controller = new _shell_controller__WEBPACK_IMPORTED_MODULE_0__["ShellController"]();
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/components/view-stack.js":
/*!**************************************!*\
  !*** ./src/components/view-stack.js ***!
  \**************************************/
/*! exports provided: ViewStack */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewStack", function() { return ViewStack; });
class ViewStack extends HTMLElement
{
	constructor()
	{
	    super();

		// Attach a shadow root
		const shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.innerHTML = `
			<style>
				:host {}

				::slotted(:not([aria-selected="true"])) {
			      display: none !important;
			    }
			</style>
			<slot></slot>
		`;

		// Select first item
		this.selectedIndex = 0;
	}

	get selectedElement()
	{
		return this._selectedElement;
	}

	set selectedElement(element)
	{
		if (element != null && element.parentNode == this)
		{
			this._selectedElement = element;

			for (let element of this.children)
			{
				if (element == this._selectedElement)
					element.setAttribute('aria-selected', 'true');
				else
					element.removeAttribute('aria-selected');
			}
		}
		else
		{
			console.error('Element is not a child of ViewStack');
		}
	}

	get selectedIndex()
	{
		return Array.from(this.children).indexOf(this._selectedElement);
	}

	set selectedIndex(index)
	{
		if (this.children.length > 0)
		{
			if (this.children[index] == null)
			{
				console.error("Invalid ViewStack index");
				return;
			}

			let element = this.children[index];
			this.selectedElement = element;
		}
	}
}

// DEFINE COMPONENT
if (!window.customElements.get('view-stack'))
	window.customElements.define('view-stack', ViewStack);


/***/ }),

/***/ "./src/managers/chat-manager.js":
/*!**************************************!*\
  !*** ./src/managers/chat-manager.js ***!
  \**************************************/
/*! exports provided: ChatManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatManager", function() { return ChatManager; });
class ChatManager
{
	constructor(shellCtrl)
	{
		this.USERVAR_MODULE = 'mod';

		this.shellCtrl = shellCtrl;

		// TODO Implement chat manager after creating the chat UI in main shell
	}

	/**
	 * Called by the shell when the user loads a new module, so that this info
	 * can be saved in the user variables and displayed in the chat's userlist.
	 */
	setCurrentModule(moduleId)
	{
		// Save module id in user variables
		let userVar = new SFS2X.SFSUserVariable(this.USERVAR_MODULE, moduleId);
		this.shellCtrl.smartFox.send(new SFS2X.SetUserVariablesRequest([userVar]));
	}
}


/***/ }),

/***/ "./src/managers/connection-manager.js":
/*!********************************************!*\
  !*** ./src/managers/connection-manager.js ***!
  \********************************************/
/*! exports provided: ConnectionManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionManager", function() { return ConnectionManager; });
/* harmony import */ var _utils_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/event-dispatcher */ "./src/utils/event-dispatcher.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");



class ConnectionManager extends _utils_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]
{
	constructor(shellCtrl)
	{
		super();

		this.ADMIN_ZONE_NAME = "--=={{{ AdminZone }}}==--";
		this.EXTENSION_ERROR = "error";

		this.COMMANDS_PREFIX = "admin";
		this.COMMAND_RESTART = "restart";
		this.COMMAND_HALT = "halt";

		this.shellCtrl = shellCtrl;
	}

	get smartFox()
	{
		return this._sf;
	}

	connect(config, username, password)
	{
		// Set additional configuration options
		config.zone = this.ADMIN_ZONE_NAME;
		config.debug = false;

		// Create SmartFox instance
		this._sf = new SFS2X.SmartFox(config);

		// Add listeners to SmartFox events useful to the shell
		this._addSFSEventListeners();

		// Save reference to connection details
		this._config = config;
		this._username = username;
		this._password = password;

		// Connect to SmartFoxServer instance
		this._sf.connect();
	}

	disconnect()
	{
		this._sf.disconnect();
	}

	restartServer()
	{
		if (this._sf.isConnected)
			this._sf.send(new SFS2X.ExtensionRequest(this.COMMANDS_PREFIX + "." + this.COMMAND_RESTART));
	}

	haltServer()
	{
		if (this._sf.isConnected)
			this._sf.send(new SFS2X.ExtensionRequest(this.COMMANDS_PREFIX + "." + this.COMMAND_HALT));
	}

	/* --------- PRIVATE UTILITY METHODS --------- */

	_addSFSEventListeners()
	{
		this._sf.addEventListener(SFS2X.SFSEvent.CONNECTION, this._onConnection, this);
		this._sf.addEventListener(SFS2X.SFSEvent.CONNECTION_LOST, this._onConnectionLost, this);
		this._sf.addEventListener(SFS2X.SFSEvent.LOGIN, this._onLogin, this);
		this._sf.addEventListener(SFS2X.SFSEvent.LOGIN_ERROR, this._onLoginError, this);
		this._sf.addEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this._onExtensionResponse, this);
	}

	_reset()
	{
		// Remove SFS event listeners
		this._sf.removeEventListener(SFS2X.SFSEvent.CONNECTION, this._onConnection);
		this._sf.removeEventListener(SFS2X.SFSEvent.CONNECTION_LOST, this._onConnectionLost);
		this._sf.removeEventListener(SFS2X.SFSEvent.LOGIN, this._onLogin);
		this._sf.removeEventListener(SFS2X.SFSEvent.LOGIN_ERROR, this._onLoginError);
		this._sf.removeEventListener(SFS2X.SFSEvent.EXTENSION_RESPONSE, this._onExtensionResponse);

		// Delete SmartFox class instance
		this._sf = null;

		// Delete connection details
		this._config = null;
		this._username = null;
		this._password = null;
	}

	_login()
	{
		// The current AdminTool version must be sent to the server during login, to check if it is up-to-date
		let params = new SFS2X.SFSObject();
		params.putInt('clientVer', this.shellCtrl.intVersion);

		// Login
		this._sf.send( new SFS2X.LoginRequest(this._username, this._password, params, this._config.zone) );
	}

	/* --------- SMARTFOX EVENT LISTENERS --------- */

	_onConnection(evtParams)
	{
		if (evtParams.success)
		{
			// Dispatch connection event
			this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].CONNECTION);

			// Send login request
			this._login();
		}
		else
		{
			// Dispatch error event
			this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].ERROR, {message: `Unable to connect to ${this._config.host}:${this._config.port}`});

			// Reset status
			this._reset();
		}
	}

	_onConnectionLost(evtParams)
	{
		let reason = evtParams.reason;

		if (reason != SFS2X.ClientDisconnectionReason.MANUAL)
		{
			var msg;

			// Log disconnection message stating the reason
			if (reason == SFS2X.ClientDisconnectionReason.IDLE)
				msg = 'inactivity';
			else
			{
				msg = 'unknown reason';

				if (reason != SFS2X.ClientDisconnectionReason.UNKNOWN)
					msg += ` (server reported: ${reason})`;
			}

			// Dispatch error event
			this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].ERROR, {message: `A disconnection occurred due to ${msg}; please reconnect`});
		}
		else
		{
			// Dispatch disconnection event
			this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].DISCONNECTION);
		}

		// Reset
		this._reset();
	}

	_onLogin(evtParams)
	{
		let data = evtParams.data;

		let params = {
			serverVersion: data.getUtfString('serverVer'),
			serverName: data.getUtfString('serverName'),
			serverUptime: data.getIntArray('uptime'),
			procControlEnabled: data.getBool('procCtrl'),
			allowHalt: data.getBool('allowHalt'),
			modules: data.getSFSArray('modules')
		};

		// Dispatch login event
		this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].LOGIN, params);
	}

	_onLoginError(evtParams)
	{
		// Disconnect from server
		this._sf.disconnect();

		// Dispatch error event
		this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].ERROR, {message: evtParams.errorMessage});
	}

	_onExtensionResponse(evtParams)
	{
		if (evtParams.cmd == this.EXTENSION_ERROR)
		{
			let data = evtParams.params;

			// An unexpected error occurred in the Admin Tool server-side extension
			this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ConnectionManagerEvent"].SERVER_ERROR, {message: 'An unexpected error occurred in the Admin Tool server-side extension, please check the server-side logs; the extension reported: ' + data.getUtfString('error')});
		}
	}
}


/***/ }),

/***/ "./src/managers/module-manager.js":
/*!****************************************!*\
  !*** ./src/managers/module-manager.js ***!
  \****************************************/
/*! exports provided: ModuleManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleManager", function() { return ModuleManager; });
/* harmony import */ var _utils_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/event-dispatcher */ "./src/utils/event-dispatcher.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");
/* harmony import */ var _utils_utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utilities */ "./src/utils/utilities.js");




class ModuleManager extends _utils_event_dispatcher__WEBPACK_IMPORTED_MODULE_0__["EventDispatcher"]
{
	constructor(shellCtrl, container)
	{
		super();

		this._shellCtrl = shellCtrl;
		this._container = container;
		this._currentModuleId = null;

		// Add listener for navigation items click
		this._container.on('click', '.nav-item', $.proxy(function(event) {
			event.preventDefault();

			let moduleId = event.currentTarget.dataset.id;
			let moduleData = this._moduleConfigById[moduleId];

			if (moduleId != this._currentModuleId)
			{
				// Load selected module
				this._loadModule(moduleData);
			}

			// Close navigation
			this._shellCtrl._toggleNav(false);
		}, this));

		// Add listener to show tooltip
		this._container.kendoTooltip({
			filter: 'li[data-id]',
			content: $.proxy(function(event) {
				let moduleId = event.target[0].dataset.id;
				let moduleData = this._moduleConfigById[moduleId];
		        return `<strong>${moduleData.name}</strong><br><span>${moduleData.description}</span>`;
		    }, this)
		});

		/* TESTING MEMORY LEAKS IN MODULES LOADING
		ADD THIS IN THE MAIN VIEW TO START THE TEST: <div><button id="temp">test</button><span id="cnt"></span></div>
		$('#temp').click(
			$.proxy(function(event)
			{
				this.cnt = 0;
				if (this.timer == null)
				{
					this.timer = window.setInterval($.proxy(function() {

						$('#cnt').text(this.cnt++)
						if (this._currentModuleId == 'Dashboard')
							this._loadModule(this._moduleConfigById['ServerConfigurator']);
						else
							this._loadModule(this._moduleConfigById['Dashboard']);
					}, this), 500);
				}
				else
				{
					window.clearInterval(this.timer);
					this.timer = null;
				}
			}, this)
		);
		*/
	}

	initModulesList(modulesData, loadModuleId = null)
	{
		// SETUP MODULES LIST

		// Empty container of module selection buttons
		this._container.empty();

		this._moduleConfigById = {};
		var firstModule = null;
		var loadModule = null;

		for (let i = 0; i < modulesData.size(); i++)
		{
			let moduleData = this._getModuleObject(modulesData.getSFSObject(i));

			this._moduleConfigById[moduleData.id] = moduleData;

			// Get first module
			if (i == 0)
				firstModule = moduleData;

			// Get passed module
			if (moduleData.id == loadModuleId)
				loadModule = moduleData;

			// Display module button
			let moduleButton = this._createModuleButton(moduleData);
			let element = this._container.append(moduleButton);
		}

		// LOAD INITIAL MODULE

		// If module is not passed, load the first one of the modules list
		if (loadModule == null)
			loadModule = firstModule;

		this._loadModule(loadModule);
	}

	unloadModule()
	{
		this._destroyCurrentModule();
	}

	get currentModuleId()
	{
		return this._currentModuleId;
	}

	get currentModule()
	{
		return document.querySelector('.module');
	}

	_getModuleObject(sfsObj)
	{
		// Get icon source string
		var iconSrc = null;

		if (sfsObj.containsKey('icon'))
		{
			let iconByteArray = sfsObj.getByteArray('icon');
			let iconBase64String = btoa(String.fromCharCode(...iconByteArray));

			iconSrc = 'data:image/png;base64,' + iconBase64String;
		}

		return {
			id: sfsObj.getUtfString('id'),
			name: sfsObj.getUtfString('name'),
			description: sfsObj.getUtfString('description'),
			isSub: sfsObj.getBool('isSub'),
			iconSrc: iconSrc,
			tag: Object(_utils_utilities__WEBPACK_IMPORTED_MODULE_2__["toKebabCase"])(sfsObj.getUtfString('id'))
		}
	}

	_createModuleButton(moduleData)
	{
		return `
			<li class="nav-item" data-id="${moduleData.id}">
				<img src="${moduleData.iconSrc}">
				<label>${moduleData.name}</label>
			</li>
		`;
	}

	_loadModule(moduleData)
	{
		// Load the HTML file of the module
		$('<module/>').load(`modules/${moduleData.tag}.html`, $.proxy(function(html, status) {
			
			if (status != 'error')
			{
				// Load the JS file of the module
				__webpack_require__("./src/modules lazy recursive ^\\.\\/.*\\.js$")(`./${moduleData.tag}.js`).then(module => {

					// Destroy current module
					this._destroyCurrentModule();

					// Define loaded module (if necessary)
					if (!window.customElements.get(moduleData.tag + '-module'))
					 	window.customElements.define(moduleData.tag + '-module', module.default);

					// Append new module
					$('div.module-loader').append(html);

					// Initialize module
					this.currentModule.initialize(moduleData, this._shellCtrl);

					// Save current module id
					this._currentModuleId = moduleData.id;

					// Dispatch event
					this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ModuleManagerEvent"].MODULE_LOADED, {moduleData: moduleData});
				})
				.catch(error => {
					// Log error details
					this._shellCtrl.logMessage(error, 'warn');

					// Dispatch error event
					this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ModuleManagerEvent"].MODULE_LOAD_ERROR, {message: `${moduleData.name} module's controller (js) couldn't be loaded.`});
				});
			}
			else
			{
				// Dispatch error event
				this.dispatchEvent(_utils_events__WEBPACK_IMPORTED_MODULE_1__["ModuleManagerEvent"].MODULE_LOAD_ERROR, {message: `${moduleData.name} module's view (html) not found.`});
			}
		}, this));
	}

	_destroyCurrentModule()
	{
		// Get a reference to current module
		const mod = this.currentModule;

		// Call destroy method on module's class
		if (mod != null)
			mod.destroy();

		// Empty module container
		$('div.module-loader').empty();

		this._currentModuleId = null;
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/modules lazy recursive ^\\.\\/.*\\.js$":
/*!********************************************************!*\
  !*** ./src/modules lazy ^\.\/.*\.js$ namespace object ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./analytics.js": [
		"./src/modules/analytics.js",
		"module-0"
	],
	"./ban-manager.js": [
		"./src/modules/ban-manager.js",
		"module-1"
	],
	"./base-module.js": [
		"./src/modules/base-module.js",
		"module-2"
	],
	"./blue-box-monitor.js": [
		"./src/modules/blue-box-monitor.js",
		"module-3"
	],
	"./console.js": [
		"./src/modules/console.js",
		"module-4"
	],
	"./dashboard.js": [
		"./src/modules/dashboard.js",
		"vendors~module-13~module-5~module-7",
		"module-5"
	],
	"./extension-manager.js": [
		"./src/modules/extension-manager.js",
		"module-6"
	],
	"./license-manager.js": [
		"./src/modules/license-manager.js",
		"vendors~module-13~module-5~module-7",
		"module-7"
	],
	"./log-viewer.js": [
		"./src/modules/log-viewer.js",
		"module-8"
	],
	"./server-configurator.js": [
		"./src/modules/server-configurator.js",
		"vendors~module-9",
		"module-12~module-13~module-9",
		"module-9"
	],
	"./servlet-manager.js": [
		"./src/modules/servlet-manager.js",
		"module-10"
	],
	"./template.js": [
		"./src/modules/template.js",
		"module-11"
	],
	"./zone-configurator.js": [
		"./src/modules/zone-configurator.js",
		"module-12~module-13~module-9",
		"module-12"
	],
	"./zone-monitor.js": [
		"./src/modules/zone-monitor.js",
		"vendors~module-13~module-5~module-7",
		"module-12~module-13~module-9",
		"module-13"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/modules lazy recursive ^\\.\\/.*\\.js$";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/shell-controller.js":
/*!*********************************!*\
  !*** ./src/shell-controller.js ***!
  \*********************************/
/*! exports provided: ShellController */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShellController", function() { return ShellController; });
/* harmony import */ var _components_view_stack__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/view-stack */ "./src/components/view-stack.js");
/* harmony import */ var _managers_module_manager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./managers/module-manager */ "./src/managers/module-manager.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/events */ "./src/utils/events.js");
/* harmony import */ var _managers_connection_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./managers/connection-manager */ "./src/managers/connection-manager.js");
/* harmony import */ var _managers_chat_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./managers/chat-manager */ "./src/managers/chat-manager.js");
/* harmony import */ var _utils_dot_properties_parse__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/dot-properties-parse */ "./src/utils/dot-properties-parse.js");
/* harmony import */ var _utils_dot_properties_parse__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_utils_dot_properties_parse__WEBPACK_IMPORTED_MODULE_5__);








class ShellController
{
	constructor()
	{
		// Set constants and variables

		this.VERSION_MAJOR = 3;
		this.VERSION_MINOR = 0;
		this.VERSION_SUB = 0;

		this.DEFAULT_WS_PORT = 8080;
		this.DEFAULT_WSS_PORT = 8443;

		this.DEFAULT_USERNAME = 'sfsadmin';
		this.DEFAULT_PASSWORD = 'sfsadmin';

		this._loginValidator = null;

		// Create modules manager instance and add event listeners
		this._modManager = new _managers_module_manager__WEBPACK_IMPORTED_MODULE_1__["ModuleManager"](this, $('.nav-main'));
		this._modManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ModuleManagerEvent"].MODULE_LOADED, this._onModuleLoaded, this);
		this._modManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ModuleManagerEvent"].MODULE_LOAD_ERROR, this._onModuleLoadError, this);

		// Create connection manager instance and add event listeners
		this._connManager = new _managers_connection_manager__WEBPACK_IMPORTED_MODULE_3__["ConnectionManager"](this);
		this._connManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ConnectionManagerEvent"].CONNECTION, this._onConnection, this);
		this._connManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ConnectionManagerEvent"].LOGIN, this._onLogin, this);
		this._connManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ConnectionManagerEvent"].DISCONNECTION, this._onDisconnection, this);
		this._connManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ConnectionManagerEvent"].ERROR, this._onConnManagerError, this);
		this._connManager.addEventListener(_utils_events__WEBPACK_IMPORTED_MODULE_2__["ConnectionManagerEvent"].SERVER_ERROR, this._onServerError, this);

		// Create admin chat manager
		this._chatManager = new _managers_chat_manager__WEBPACK_IMPORTED_MODULE_4__["ChatManager"](this);

		/* --------------------------- */

		// Initialize views
		this._initViews();

		// Show login view
		this._switchShellView('login-view');
	}

	//---------------------------------
	// VIEW INITIALIZERS
	//---------------------------------

	/**
	 * Initialize login view.
	 */
	_initLoginView()
	{
		// Set default input values (password never saved)
		let host = window.location.hostname;
		let port = this.DEFAULT_WS_PORT;
		let encrypt = false;
		let user = 'sfsadmin';
		let remember = false;

		// Load "last-server" cookie
		let data = Cookies.getJSON('last-server')
        if (data)
		{
			host = data.host;
            port = data.port;
			encrypt = data.encrypt;
			user = data.user;
			remember = true;
        }

		// Retrieve host from GET parameter
		let getHost = this._getUrlParameter('host');
		if (getHost)
			host = getHost;

		// Set input values
		$('#loginHost').val(host);
		$('#loginUsername').val(user);
		$('#loginEncrypt').prop('checked', encrypt);
		$('#rememberLogin').prop('checked', remember);

		// Initialize numeric input
		$('#loginPort').kendoNumericTextBox({
			format: '#####',
			value: port
		});

		// Initialize the Kendo UI Validator on the "form" container
		// (NOTE: does NOT have to be an actual <form> tag)
		this._loginValidator = $('#loginForm').kendoValidator({
			validateOnBlur: true
		}).data('kendoValidator');

		// Add listener to validate the form when the Connect button is clicked
		$('#loginButton').click($.proxy(this._onConnectClick, this));

		// Add listener to submit form on Enter key press
		$('#loginForm').keyup(function(event) {
			if (event.key !== 'Enter') return;

			$('#loginButton').click();
			event.preventDefault();
		});

		// Add listener to encrypt checkbox
		$('#loginEncrypt').change($.proxy(function(event) {
			let port = this.DEFAULT_WS_PORT;

			if ($('#loginEncrypt').prop('checked'))
				port = this.DEFAULT_WSS_PORT;

			$('#loginPort').data('kendoNumericTextBox').value(port);
		}, this));

		// Hide error message container
		$('#login-error').hide();
	}

	/**
	 * Initialize module view.
	 */
	_initModuleView()
	{
		// Add listeners to open/close menu buttons
		$('.nav-open').click($.proxy(function(event) {
			event.preventDefault();
			this._toggleNav(true);
		}, this));

		$('.nav-close, .nav-overlay').click($.proxy(function(event) {
			event.preventDefault();
			this._toggleNav(false);
		}, this));

		// Add listeners to service buttons
		$('#restart-button').click($.proxy(this._onRestartClick, this));
		$('#halt-button').click($.proxy(this._onHaltClick, this));
		$('#help-button').click($.proxy(this._onHelpClick, this));
		$('#disconnect-button').click($.proxy(this._onDisconnectClick, this));

		// Add listener to show tooltip on service buttons hover
		$('.nav-service').kendoTooltip({
			filter: 'li[title]'
		});

		// Add listener to scroll main view to top if status bar is clicked
		$('#status-bar').click(function(event) {
			event.preventDefault();
			$('main').animate({ scrollTop: 0 }, 'fast');
		});
	}

	//---------------------------------
	// UI EVENT LISTENERS
	//---------------------------------

	/**
	 * Validate login form and connect+login to SmartFoxServer.
	 */
	_onConnectClick(event)
	{
		// Hide any previous error message
		$('#login-error').hide();
		$('#login-error').text('');

		// Validate login form
		if (this._loginValidator.validate())
		{
			// Disable login form
			this._enableLoginForm(false);

			// Retrieve connection details
			let config = {};
			config.host = $('#loginHost').val().trim();
			config.port = $('#loginPort').data('kendoNumericTextBox').value();
			config.useSSL = $('#loginEncrypt').prop('checked');

			let username = $('#loginUsername').val().trim();
			let password = $('#loginPassword').val();

			// Save input values to cookie (except password)...
			// ...or clear previously saved cookie
			if ($('#rememberLogin').prop('checked'))
			{
				Cookies.set('last-server', {
					host: config.host,
					port: config.port,
					encrypt: config.useSSL,
					user: username

				}, {expires: 30});
			}
			else
			{
				Cookies.remove('last-server');
			}

			// Connect to SFS2X & login
			this._connManager.connect(config, username, password);
		}
	}

	/**
	 * Restart SmartFoxServer.
	 */
	_onRestartClick(event)
	{
		let message = 'Are you sure you want to stop and restart this instance of SmartFoxServer 2X?';
		this.showConfirmWarning(message, $.proxy(this._onRestartConfirmDialogConfirm, this));
	}

	/**
	 * Halt SmartFoxServer.
	 */
	_onHaltClick(event)
	{
		let message = 'Are you sure you want to stop this instance of SmartFoxServer 2X?<br>You won\'t be able to restart it using the Administration Tool.';
		this.showConfirmWarning(message, $.proxy(this._onHaltConfirmDialogConfirm, this));
	}

	/**
	 * Open online documentation.
	 */
	_onHelpClick(event)
	{
		// Open online doc
		window.open(`http://docs2x.smartfoxserver.com/GettingStarted/admintool-${this._modManager.currentModuleId}`, '_blank');
	}

	/**
	 * Disconnect from server.
	 */
	_onDisconnectClick(event)
	{
		this._connManager.disconnect();
	}

	//------------------------------------
	// CONNECTION MANAGER EVENT LISTENERS
	//------------------------------------

	_onConnection(evtParams)
	{
		// Log message
		this.logMessage(`Connection to ${this._connManager.smartFox.config.host}:${this._connManager.smartFox.config.port} established`);
	}

	_onLogin(evtParams)
	{
		// Log message
		this.logMessage(`Successful login to ${this._connManager.smartFox.config.host}:${this._connManager.smartFox.config.port} performed`);

		// Get last loaded module from cookies
		let loadModuleId = null;
		let data = Cookies.getJSON('last-module')
        if (data)
			loadModuleId = data.id;

		// Init the modules list with the configuration returned by the server and: load last saved module, or first module in the list, or passed module id
		this._modManager.initModulesList(evtParams.modules, loadModuleId);

		// Save current uptime
		this._uptime = evtParams.serverUptime;

		// Show/hide Halt and Restart buttons depending if:
		// 1) this feature is supported for the server operating system
		// 2) the administrator who just logged in has the permission to execute these actions
		this._showHaltRestartButtons(evtParams.procControlEnabled && evtParams.allowHalt);

		// Switch to modules view
		this._goToModulesView(evtParams.serverVersion, evtParams.serverName);

		// If default username and password have been used...
		if ($('#loginUsername').val() == this.DEFAULT_USERNAME && $('#loginPassword').val() == this.DEFAULT_PASSWORD)
		{
			// ...show alert
			this.showSimpleAlert('You are using the default administration profile which is highly insecure, please make sure to immediately change the password.');

			// ...show non-removable message in alert bar
			$('#alert-bar').show();
			$('#alert-bar').text('You are using the default administration profile which is highly insecure, please change the password.');
		}
	}

	/**
	 * Listener called when the user disconnected voluntarily.
	 */
	_onDisconnection(evtParams)
	{
		// Remove any popup or alert
		this.removeDialog();

		// Switch back to login view
		this._goToLoginView();

		// Hide navigation if open
		this._toggleNav(false);
	}

	/**
	 * Listener called when an error caused a disconnection.
	 */
	_onConnManagerError(evtParams)
	{
		// Remove any popup or alert
		this.removeDialog();

		// Log system message
		this.logMessage(evtParams.message, 'warn');

		// Switch back to login view
		this._goToLoginView();

		// Display error in login view
		$('#login-error').text(evtParams.message);
		$('#login-error').show();
	}

	/**
	 * Listener called when an unexpected server-side error occurs.
	 */
	_onServerError(evtParams)
	{
		// Show an alert
		this.showSimpleAlert(evtParams.message);
	}

	//---------------------------------
	// OTHER EVENT LISTENERS
	//---------------------------------

	_onModuleLoaded(evtParams)
	{
		const moduleData = evtParams.moduleData;

		// Save last loaded module to cookies
		Cookies.set('last-module', {
			id: moduleData.id
		}, {expires: 30});

		// Display module title
		$('#module-title').show();
		$('#module-title-label').text(moduleData.name);

		// Tell the chat manager which module has been loaded
		this._chatManager.setCurrentModule(moduleData.id);

		// Assign the .selected class to the selected navigation item
		$('.nav-main').find(`[data-id='${moduleData.id}']`).addClass('selected').siblings('.selected').removeClass('selected');
	}

	_onModuleLoadError(evtParams)
	{
		// Show an alert
		this.showSimpleAlert(evtParams.message);
	}

	_onRestartConfirmDialogConfirm()
	{
		// Send restart server request
		this._connManager.restartServer();
	}

	_onHaltConfirmDialogConfirm()
	{
		// Send halt server request
		this._connManager.haltServer();
	}

	//---------------------------------
	// PUBLIC METHODS
	// This members are used by the sub-managers (i.e. ConnectionManager)
	// or the modules to communicate with this shell controller.
	//---------------------------------

	get smartFox()
	{
		return this._connManager.smartFox;
	}

	get intVersion()
	{
		var version = this.VERSION_MAJOR;
		version += (this.VERSION_MINOR < 10 ? '0' : '') + this.VERSION_MINOR;
		version += (this.VERSION_SUB < 10 ? '0' : '') + this.VERSION_SUB;

		return Number(version);
	}

	get stringVersion()
	{
		return this.VERSION_MAJOR + '.' + this.VERSION_MINOR + '.' + this.VERSION_SUB;
	}

	logMessage(message, type = 'log')
	{
		switch (type) {
			case 'info':
				console.info('[ ADMINTOOL | INFO ] ' + message);
				break;
			case 'warn':
				console.warn('[ ADMINTOOL | WARN ] ' + message);
				break;
			case 'error':
				console.error('[ ADMINTOOL | ERROR ] ' + message);
				break;
			default:
				console.log('[ ADMINTOOL | INFO ] ' + message);
		}
	}

	removeDialog()
	{
		// Hide any showing modal
		$('.modal').modal('hide');

		// Hide any showing toast
		$('.toast').toast('hide');

		// Remove shell's dialog
		if (this._dialog != null)
		{
			this._dialog.close();
			this._dialog.destroy();
			this._dialog = null;
		}

		// Enable the following if other Kendo dialogs are used in modules
		/*
		// Remove any other dialog (inner to module)
		$('.k-dialog-content').each(function(index) {
			// Confirm dialog
			let confirm = $(this).data('kendoConfirm');
			if (confirm)
			{
				confirm.close();
				confirm.destroy();
			}
		});
		*/
	}

	/**
	 * Show simple alert.
	 */
	showSimpleAlert(text, isWarning = true)
	{
		// Create and show dialog
		this._dialog = kendo.alert(text);
		this._dialog.title(isWarning ? 'Warning' : 'Information');

		// Set custom class for styling
		this._dialog.wrapper.addClass(isWarning ? 'is-warning' : 'is-info');

		// Log message too
		// (we encapsule the text in a span and extract the text again to remove inner html tags)
		let html = $('<span>' + text + '</span>');
		this.logMessage(html.text(), isWarning ? 'warn' : 'info');
	}

	/**
	 * Show confirm alert.
	 */
	showConfirmWarning(text, confirmHandler)
	{
		// Create dialog
		this._dialog = $('<div></div>').kendoConfirm({
	      title: 'Warning',
	      content: text,
		  actions: [
	          {
	              text: 'OK',
	              primary: true,
	              action: confirmHandler
	          },
	      ]
	  	}).data('kendoConfirm');

		// Set custom class for styling
		this._dialog.wrapper.addClass('is-warning');

		// Show dialog
		this._dialog.open();
	}

	showNotification(title, message)
	{
		// Display notification
		let toast = $(`
			<div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="4000">
				<div class="toast-header">
					<strong class="mr-auto">${title}</strong>
					<button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="toast-body">${message}</div>
			</div>
		`);

		$('.toast-container').append(toast);
		toast.toast('show');

		// Log message too
		// (we encapsule the text in a span and extract the text again to remove inner html tags)
		let html = $('<span>' + title + ' - ' + message + '</span>');
		this.logMessage(html.text(), 'info');

	}

	//---------------------------------
	// PRIVATE METHODS
	//---------------------------------

	_initViews()
	{
		// Initialize login view
		this._initLoginView();

		// Initialize module view
		this._initModuleView();
	}

	/**
	 * Switch view in top view stack.
	 * @param  {string} viewId Identifier of the viewstask child to display.
	 */
	_switchShellView(viewId)
	{
		document.getElementById('shell').selectedElement = document.getElementById(viewId);

		// (jQuery alternative)
		// $('#shell')[0].selectedElement = $('#shell').children('#' + viewId)[0];
	}

	/**
	 * Enable/disable login form.
	 */
	_enableLoginForm(enable)
	{
		// Enable/disable fieldset (works for all non-kendo inputs)
		$('#loginForm fieldset').prop('disabled', !enable);

		// Enable/disable numeric textbox
		$('#loginPort').data('kendoNumericTextBox').enable(enable);
	}

	_toggleNav(bool)
	{
		$('.nav-container, .nav-overlay').toggleClass('is-visible', bool);
		$('.module-container').toggleClass('scale-down', bool);
	}

	_getUrlParameter(param)
	{
		let pageURL = window.location.search.substring(1);
		let urlVariables = pageURL.split('&');

		for (var i = 0; i < urlVariables.length; i++) {
			let paramName = urlVariables[i].split('=');
			if (paramName[0] == param && paramName[1] != '')
				return paramName[1];
		}

		return null;
	}

	_goToLoginView()
	{
		// Clear password field
		$('#loginPassword').val('');

		// Switch to login view
		this._switchShellView('login-view');

		// Unload current module
		this._modManager.unloadModule();

		// Enable login form
		this._enableLoginForm(true);

		// Remove uptime updater
		clearInterval(this._uptimeTimer);
	}

	_goToModulesView(serverVersion, serverName)
	{
		// Hide module title
		$('#module-title').hide();
		$('#module-title-label').text('');

		// Hide alert bar
		$('#alert-bar').hide();

		// Show server version in the header
		$('#sfs-version-value').text(serverVersion);

		// Set server name, IP and port in module's title bar
		let host = `${this._connManager.smartFox.config.host}:${this._connManager.smartFox.config.port}` + (serverName != '' ? ` [${serverName}]` : '');
		$('#host-label').text(host);

		// Save current SFS version
		this._currentSfsVersion = serverVersion;

		// Check new SFS version availability
		this._checkAvailableSfsVersion();

		// Start uptime updater
		this._uptimeTimer = setInterval($.proxy(this._updateUptime, this), 1000);

		// Switch to modules view
		this._switchShellView('module-view');
	}

	_showHaltRestartButtons(show)
	{
		if (show)
		{
			$('#restart-button').show();
			$('#halt-button').show();
		}
		else
		{
			$('#restart-button').hide();
			$('#halt-button').hide();
		}
	}

	_checkAvailableSfsVersion()
	{
		// Remove class to hide update button style and notification icon
		$('#sfs-version').removeClass('is-active');

		// Remove update button click listeners
		$('#sfs-version-button').off('click');

		// Load file containing latest SFS version info
		$.ajax({
			type: 'GET',
			url: 'https://www.smartfoxserver.com/downloads/sfs2x/latestVersion.txt',
        	dataType: 'text',
			success: $.proxy(this._onLatestSfsVersionInfoLoaded, this),
			error: $.proxy(function() {
				this.logMessage('Unable to check new server version availability on SmartFoxServer website', 'warn');
			}, this)
		});
	}

	_onLatestSfsVersionInfoLoaded(data)
	{
		// Parse returned data
		const v = Object(_utils_dot_properties_parse__WEBPACK_IMPORTED_MODULE_5__["parse"])(data);

		if (v.version != null && this._isSfsVersionNewer(v.version, this._currentSfsVersion))
		{
			this.tempflag = true;
			this.logMessage('An updated version of SmartFoxServer 2X is available for download', 'info');

			// Set upgrade dialog details
			this._sfsUpdateDetails = v;

			// Add listener to show SFS version update modal
			$('#sfs-version-button').click(function() {
				$('#serverUpdateModal').modal({
					backdrop: 'static',
					keyboard: false,
				});
			});

			// Set class to show update button style and notification icon
			$('#sfs-version').addClass('is-active');

			// Update modal content
			const newVer = this._sfsUpdateDetails;
			const currVer = this._currentSfsVersion;

			let modal = $('#serverUpdateModal');

			// Update modal content
			$('#newVersLb', modal).text(newVer.version);
			$('#updTypeLb', modal).text(newVer.isPatch ? 'patch' : 'full installer');
			$('#reqVersLb', modal).text(newVer.isPatch ? ' (requires version ' + newVer.requires + ' or later)' : '');
			$('#currVersLb', modal).text(currVer);
			$('#serverUpdateModalLink', modal).attr('href', newVer.url);
		}
	}

	_isSfsVersionNewer(availableVer, currentVer)
	{
		const MAJ = 0;
		const MIN = 1;
		const SUB = 2;

		const available = availableVer.split('.');
		const current = currentVer.split('.');

		// Check major version
		if (available[MAJ] > current[MAJ])
			return true;
		else if (available[MAJ] == current[MAJ])
		{
			// Check minor version
			if (available[MIN] > current[MIN])
				return true;
			else if (available[MIN] == current[MIN])
			{
				// Check sub version
				if (available[SUB] > current[SUB])
					return true;
			}
		}

		return false;
	}

	_updateUptime()
	{
		let days = this._uptime[0];
		let hours = this._uptime[1];
		let minutes = this._uptime[2];
		let seconds = this._uptime[3] + 1;

		if (seconds > 59)
		{
			seconds = 0;
			minutes += 1;

			if (minutes > 59)
			{
				minutes = 0;
				hours += 1;

				if (hours > 23)
				{
					hours = 0;
					days += 1;
				}
			}
		}

		this._uptime[3] = seconds;
		this._uptime[2] = minutes;
		this._uptime[1] = hours;
		this._uptime[0] = days;

		// Send updated uptime to current module (if loaded)
		let module = this._modManager.currentModule;
		if (module != null)
			module.onUptimeUpdated(this._uptime);
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "jquery")))

/***/ }),

/***/ "./src/utils/dot-properties-parse.js":
/*!*******************************************!*\
  !*** ./src/utils/dot-properties-parse.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const atComment = (src, offset) => {
  const ch = src[offset]
  return ch === '#' || ch === '!'
}

const atLineEnd = (src, offset) => {
  const ch = src[offset]
  return !ch || ch === '\r' || ch === '\n'
}

const endOfIndent = (src, offset) => {
  let ch = src[offset]
  while (ch === '\t' || ch === '\f' || ch === ' ') {
    offset += 1
    ch = src[offset]
  }
  return offset
}

const endOfComment = (src, offset) => {
  let ch = src[offset]
  while (ch && ch !== '\r' && ch !== '\n') {
    offset += 1
    ch = src[offset]
  }
  return offset
}

const endOfKey = (src, offset) => {
  let ch = src[offset]
  while (ch && ch !== '\r' && ch !== '\n' && ch !== '\t' && ch !== '\f' && ch !== ' ' && ch !== ':' && ch !== '=') {
    if (ch === '\\') {
      if (src[offset + 1] === '\n') {
        offset = endOfIndent(src, offset + 2)
      } else {
        offset += 2
      }
    } else {
      offset += 1
    }
    ch = src[offset]
  }
  return offset
}

const endOfSeparator = (src, offset) => {
  let ch = src[offset]
  let hasEqSign = false
  loop: while (ch === '\t' || ch === '\f' || ch === ' ' || ch === '=' || ch === ':' || ch === '\\') {
    switch (ch) {
      case '\\':
        if (src[offset + 1] !== '\n') break loop
        offset = endOfIndent(src, offset + 2)
        break
      case '=':
      case ':':
        if (hasEqSign) break loop
        hasEqSign = true
        // fallthrough
      default:
        offset += 1
    }
    ch = src[offset]
  }
  return offset
}

const endOfValue = (src, offset) => {
  let ch = src[offset]
  while (ch && ch !== '\r' && ch !== '\n') {
    offset += ch === '\\' ? 2 : 1
    ch = src[offset]
  }
  return offset
}

const unescape = (str) => str.replace(/\\(u[0-9a-fA-F]{4}|\r?\n[ \t\f]*|.)?/g, (match, code) => {
  switch (code && code[0]) {
    case 'f': return '\f'
    case 'n': return '\n'
    case 'r': return '\r'
    case 't': return '\t'
    case 'u':
      const c = parseInt(code.substr(1), 16)
      return isNaN(c) ? code : String.fromCharCode(c)
    case '\r':
    case '\n':
    case undefined:
      return ''
    default:
      return code
  }
})

/**
 * Splits the input string into an array of logical lines
 *
 * Key-value pairs are [key, value] arrays with string values. Escape sequences
 * in keys and values are parsed. Empty lines are included as empty strings, and
 * comments as strings that start with '#' or '! characters. Leading whitespace
 * is not included.
 *
 * @see https://docs.oracle.com/javase/9/docs/api/java/util/Properties.html#load(java.io.Reader)
 *
 * @param {string} src
 * @returns Array<string | string[]]>
 */
function parseLines (src) {
  const lines = []
  for (i = 0; i < src.length; ++i) {
    if (src[i] === '\n' && src[i - 1] === '\r') i += 1
    if (!src[i]) break
    const keyStart = endOfIndent(src, i)
    if (atLineEnd(src, keyStart)) {
      lines.push('')
      i = keyStart
      continue
    }
    if (atComment(src, keyStart)) {
      const commentEnd = endOfComment(src, keyStart)
      lines.push(src.slice(keyStart, commentEnd))
      i = commentEnd
      continue
    }
    const keyEnd = endOfKey(src, keyStart)
    const key = unescape(src.slice(keyStart, keyEnd))
    const valueStart = endOfSeparator(src, keyEnd)
    if (atLineEnd(src, valueStart)) {
      lines.push([key, ''])
      i = valueStart
      continue
    }
    const valueEnd = endOfValue(src, valueStart)
    const value = unescape(src.slice(valueStart, valueEnd))
    lines.push([key, value])
    i = valueEnd
  }
  return lines
}

/**
 * Parses an input string read from a .properties file into a JavaScript Object
 *
 * If the second `path` parameter is true, dots '.' in keys will result in a
 * multi-level object (use a string value to customise). If a parent level is
 * directly assigned a value while it also has a child with an assigned value,
 * the parent value will be assigned to its empty string '' key. Repeated keys
 * will take the last assigned value. Key order is not guaranteed, but is likely
 * to match the order of the input lines.
 *
 * @param {string} src
 * @param {boolean | string} [path=false]
 */
function parse (src, path) {
  const pathSep = typeof path === 'string' ? path : '.'
  return parseLines(src).reduce((res, line) => {
    if (Array.isArray(line)) {
      const [key, value] = line
      if (path) {
        const keyPath = key.split(pathSep)
        let parent = res
        while (keyPath.length >= 2) {
          const p = keyPath.shift()
          if (!parent[p]) {
            parent[p] = {}
          } else if (typeof parent[p] !== 'object') {
            parent[p] = { '': parent[p] }
          }
          parent = parent[p]
        }
        const leaf = keyPath[0]
        if (typeof parent[leaf] === 'object') {
          parent[leaf][''] = value
        } else {
          parent[leaf] = value
        }
      } else {
        res[key] = value
      }
    }
    return res
  }, {})
}

module.exports = { parse, parseLines }


/***/ }),

/***/ "./src/utils/event-dispatcher.js":
/*!***************************************!*\
  !*** ./src/utils/event-dispatcher.js ***!
  \***************************************/
/*! exports provided: EventDispatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventDispatcher", function() { return EventDispatcher; });
class EventDispatcher {
	constructor() {
		this._listenersByEvent = {};
	}

	/**
	 * Registers an event listener function that will receive notification of an event.
	 *
	 * <p>If you no longer need an event listener, remove it by calling the <em>removeEventListener()</em> method, or memory issues could arise.
	 * In fact event listeners are not automatically removed from memory.</p>
	 *
	 * @param	{string} evtType	The type of event to listen to.
	 * @param	{function} callback	The listener function that processes the event. This function should accept an object as its only parameter, which in turn contains the event parameters.
	 * @param	{object} scope		The object that acts as a context for the event listener: it is the object that acts as a "parent scope" for the callback function, thus providing context (i.e. access to variables and other mehtods) to the function itself.
	 */
	addEventListener(evtType, callback, scope)
	{
		if (!this._listenersByEvent[evtType])
			this._listenersByEvent[evtType] = [];

		this._listenersByEvent[evtType].push({callback:callback, scope:scope});
	}

	/**
	 * Removes an event listener.
	 *
	 * @param	{string} evtType	The type of event to remove.
	 * @param	{function} callback	The listener function to be removed.
	 */
	removeEventListener(evtType, callback)
	{
		const listeners = this._listenersByEvent[evtType];

		if (listeners)
		{
			for (let i = 0; i < listeners.length; i++)
			{
				if (listeners[i].callback === callback)
				{
					listeners.splice(i, 1);
					break;
				}
			}
		}
	}

	dispatchEvent(evtType, evtObj)
	{
		const listeners = this._listenersByEvent[evtType];

		if (listeners)
		{
			for (let listener of listeners)
				listener.callback.call(listener.scope, evtObj);
		}
	}
}


/***/ }),

/***/ "./src/utils/events.js":
/*!*****************************!*\
  !*** ./src/utils/events.js ***!
  \*****************************/
/*! exports provided: ConnectionManagerEvent, ModuleManagerEvent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionManagerEvent", function() { return ConnectionManagerEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModuleManagerEvent", function() { return ModuleManagerEvent; });
const ConnectionManagerEvent = Object.freeze({
	CONNECTION: 'connection',
	LOGIN: 'login',
	DISCONNECTION: 'disconnection',
	ERROR: 'error',
	SERVER_ERROR: 'serverError',
});

const ModuleManagerEvent = Object.freeze({
	MODULE_LOADED: 'module-loaded',
	MODULE_LOAD_ERROR: 'module-load-error',
});


/***/ }),

/***/ "./src/utils/utilities.js":
/*!********************************!*\
  !*** ./src/utils/utilities.js ***!
  \********************************/
/*! exports provided: toKebabCase, bytesToSize, kBytesToSize, capitalizeFirst, filterClassName, roundToDecimals, scaleBytes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toKebabCase", function() { return toKebabCase; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bytesToSize", function() { return bytesToSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kBytesToSize", function() { return kBytesToSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "capitalizeFirst", function() { return capitalizeFirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterClassName", function() { return filterClassName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "roundToDecimals", function() { return roundToDecimals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scaleBytes", function() { return scaleBytes; });
const toKebabCase = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

function bytesToSize(bytes, decimals = 1, zeroUnit = '', suffix = '') {
	if (bytes === 0)
		return '0 ' + zeroUnit + (zeroUnit != '' ? suffix : '');

	if (bytes < 1) // Can happen in chart axis labels!
	 	return `${bytes} Bytes${suffix}`;

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i] + suffix;
}

function kBytesToSize(kBytes, decimals = 1, zeroUnit = '', suffix = '') {
	return bytesToSize(kBytes * 1000, decimals, zeroUnit, suffix);
}

function capitalizeFirst(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function filterClassName(element, index, array)
{
	if (element.endsWith('.py'))
		return (element.endsWith('Extension.py'));
	else if (element.endsWith('.js'))
		return (element.endsWith('Extension.js'));
	else
		return (element.endsWith('Extension'));
}

function roundToDecimals(value, decimals) {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

function scaleBytes(bytes, decimals = 1) {
	let obj = {};

	const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	if (bytes > 0)
	{
		const k = 1000;
		const dm = decimals < 0 ? 0 : decimals;
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		obj.value = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
		obj.unit = sizes[i];
	}
	else
	{
		obj.value = 0;
		obj.unit = sizes[0];
	}

	return obj;
}


/***/ }),

/***/ "jquery":
/*!*************************!*\
  !*** external "jQuery" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRzL2pzL2NvcmUvYXBwbGljYXRpb24uYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvYXBwbGljYXRpb24uanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvY29tcG9uZW50cy92aWV3LXN0YWNrLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL21hbmFnZXJzL2NoYXQtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy9tYW5hZ2Vycy9jb25uZWN0aW9uLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvbWFuYWdlcnMvbW9kdWxlLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vYXBwbGljYXRpb24vLi9zcmMvc2hlbGwtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy91dGlscy9kb3QtcHJvcGVydGllcy1wYXJzZS5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy91dGlscy9ldmVudC1kaXNwYXRjaGVyLmpzIiwid2VicGFjazovL2FwcGxpY2F0aW9uLy4vc3JjL3V0aWxzL2V2ZW50cy5qcyIsIndlYnBhY2s6Ly9hcHBsaWNhdGlvbi8uL3NyYy91dGlscy91dGlsaXRpZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG4gXHRmdW5jdGlvbiB3ZWJwYWNrSnNvbnBDYWxsYmFjayhkYXRhKSB7XG4gXHRcdHZhciBjaHVua0lkcyA9IGRhdGFbMF07XG4gXHRcdHZhciBtb3JlTW9kdWxlcyA9IGRhdGFbMV07XG5cblxuIFx0XHQvLyBhZGQgXCJtb3JlTW9kdWxlc1wiIHRvIHRoZSBtb2R1bGVzIG9iamVjdCxcbiBcdFx0Ly8gdGhlbiBmbGFnIGFsbCBcImNodW5rSWRzXCIgYXMgbG9hZGVkIGFuZCBmaXJlIGNhbGxiYWNrXG4gXHRcdHZhciBtb2R1bGVJZCwgY2h1bmtJZCwgaSA9IDAsIHJlc29sdmVzID0gW107XG4gXHRcdGZvcig7aSA8IGNodW5rSWRzLmxlbmd0aDsgaSsrKSB7XG4gXHRcdFx0Y2h1bmtJZCA9IGNodW5rSWRzW2ldO1xuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuIFx0XHRcdFx0cmVzb2x2ZXMucHVzaChpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0pO1xuIFx0XHRcdH1cbiBcdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuIFx0XHR9XG4gXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuIFx0XHRcdGlmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG4gXHRcdFx0XHRtb2R1bGVzW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcbiBcdFx0XHR9XG4gXHRcdH1cbiBcdFx0aWYocGFyZW50SnNvbnBGdW5jdGlvbikgcGFyZW50SnNvbnBGdW5jdGlvbihkYXRhKTtcblxuIFx0XHR3aGlsZShyZXNvbHZlcy5sZW5ndGgpIHtcbiBcdFx0XHRyZXNvbHZlcy5zaGlmdCgpKCk7XG4gXHRcdH1cblxuIFx0fTtcblxuXG4gXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuIFx0Ly8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4gXHQvLyBQcm9taXNlID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxuIFx0dmFyIGluc3RhbGxlZENodW5rcyA9IHtcbiBcdFx0XCJhcHBsaWNhdGlvblwiOiAwXG4gXHR9O1xuXG5cblxuIFx0Ly8gc2NyaXB0IHBhdGggZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIGpzb25wU2NyaXB0U3JjKGNodW5rSWQpIHtcbiBcdFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18ucCArIFwiYXNzZXRzL2pzL2NvcmUvbW9kdWxlcy9cIiArICh7XCJtb2R1bGUtMFwiOlwibW9kdWxlLTBcIixcIm1vZHVsZS0xXCI6XCJtb2R1bGUtMVwiLFwibW9kdWxlLTEwXCI6XCJtb2R1bGUtMTBcIixcIm1vZHVsZS0xMVwiOlwibW9kdWxlLTExXCIsXCJtb2R1bGUtMTJ+bW9kdWxlLTEzfm1vZHVsZS05XCI6XCJtb2R1bGUtMTJ+bW9kdWxlLTEzfm1vZHVsZS05XCIsXCJtb2R1bGUtMTJcIjpcIm1vZHVsZS0xMlwiLFwibW9kdWxlLTJcIjpcIm1vZHVsZS0yXCIsXCJtb2R1bGUtM1wiOlwibW9kdWxlLTNcIixcIm1vZHVsZS00XCI6XCJtb2R1bGUtNFwiLFwibW9kdWxlLTZcIjpcIm1vZHVsZS02XCIsXCJtb2R1bGUtOFwiOlwibW9kdWxlLThcIixcInZlbmRvcnN+bW9kdWxlLTEzfm1vZHVsZS01fm1vZHVsZS03XCI6XCJ2ZW5kb3Jzfm1vZHVsZS0xM35tb2R1bGUtNX5tb2R1bGUtN1wiLFwibW9kdWxlLTEzXCI6XCJtb2R1bGUtMTNcIixcIm1vZHVsZS01XCI6XCJtb2R1bGUtNVwiLFwibW9kdWxlLTdcIjpcIm1vZHVsZS03XCIsXCJ2ZW5kb3Jzfm1vZHVsZS05XCI6XCJ2ZW5kb3Jzfm1vZHVsZS05XCIsXCJtb2R1bGUtOVwiOlwibW9kdWxlLTlcIn1bY2h1bmtJZF18fGNodW5rSWQpICsgXCIuYnVuZGxlLmpzXCJcbiBcdH1cblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG4gXHQvLyBUaGlzIGZpbGUgY29udGFpbnMgb25seSB0aGUgZW50cnkgY2h1bmsuXG4gXHQvLyBUaGUgY2h1bmsgbG9hZGluZyBmdW5jdGlvbiBmb3IgYWRkaXRpb25hbCBjaHVua3NcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZSA9IGZ1bmN0aW9uIHJlcXVpcmVFbnN1cmUoY2h1bmtJZCkge1xuIFx0XHR2YXIgcHJvbWlzZXMgPSBbXTtcblxuXG4gXHRcdC8vIEpTT05QIGNodW5rIGxvYWRpbmcgZm9yIGphdmFzY3JpcHRcblxuIFx0XHR2YXIgaW5zdGFsbGVkQ2h1bmtEYXRhID0gaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuIFx0XHRpZihpbnN0YWxsZWRDaHVua0RhdGEgIT09IDApIHsgLy8gMCBtZWFucyBcImFscmVhZHkgaW5zdGFsbGVkXCIuXG5cbiBcdFx0XHQvLyBhIFByb21pc2UgbWVhbnMgXCJjdXJyZW50bHkgbG9hZGluZ1wiLlxuIFx0XHRcdGlmKGluc3RhbGxlZENodW5rRGF0YSkge1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0pO1xuIFx0XHRcdH0gZWxzZSB7XG4gXHRcdFx0XHQvLyBzZXR1cCBQcm9taXNlIGluIGNodW5rIGNhY2hlXG4gXHRcdFx0XHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuIFx0XHRcdFx0XHRpbnN0YWxsZWRDaHVua0RhdGEgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSBbcmVzb2x2ZSwgcmVqZWN0XTtcbiBcdFx0XHRcdH0pO1xuIFx0XHRcdFx0cHJvbWlzZXMucHVzaChpbnN0YWxsZWRDaHVua0RhdGFbMl0gPSBwcm9taXNlKTtcblxuIFx0XHRcdFx0Ly8gc3RhcnQgY2h1bmsgbG9hZGluZ1xuIFx0XHRcdFx0dmFyIGhlYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuIFx0XHRcdFx0dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuIFx0XHRcdFx0dmFyIG9uU2NyaXB0Q29tcGxldGU7XG5cbiBcdFx0XHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04JztcbiBcdFx0XHRcdHNjcmlwdC50aW1lb3V0ID0gMTIwO1xuIFx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcbiBcdFx0XHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuIFx0XHRcdFx0fVxuIFx0XHRcdFx0c2NyaXB0LnNyYyA9IGpzb25wU2NyaXB0U3JjKGNodW5rSWQpO1xuXG4gXHRcdFx0XHRvblNjcmlwdENvbXBsZXRlID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gXHRcdFx0XHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cbiBcdFx0XHRcdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcbiBcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuIFx0XHRcdFx0XHR2YXIgY2h1bmsgPSBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF07XG4gXHRcdFx0XHRcdGlmKGNodW5rICE9PSAwKSB7XG4gXHRcdFx0XHRcdFx0aWYoY2h1bmspIHtcbiBcdFx0XHRcdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG4gXHRcdFx0XHRcdFx0XHR2YXIgcmVhbFNyYyA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuc3JjO1xuIFx0XHRcdFx0XHRcdFx0dmFyIGVycm9yID0gbmV3IEVycm9yKCdMb2FkaW5nIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJyk7XG4gXHRcdFx0XHRcdFx0XHRlcnJvci50eXBlID0gZXJyb3JUeXBlO1xuIFx0XHRcdFx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG4gXHRcdFx0XHRcdFx0XHRjaHVua1sxXShlcnJvcik7XG4gXHRcdFx0XHRcdFx0fVxuIFx0XHRcdFx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcbiBcdFx0XHRcdFx0fVxuIFx0XHRcdFx0fTtcbiBcdFx0XHRcdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuIFx0XHRcdFx0XHRvblNjcmlwdENvbXBsZXRlKHsgdHlwZTogJ3RpbWVvdXQnLCB0YXJnZXQ6IHNjcmlwdCB9KTtcbiBcdFx0XHRcdH0sIDEyMDAwMCk7XG4gXHRcdFx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlO1xuIFx0XHRcdFx0aGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuIFx0XHRcdH1cbiBcdFx0fVxuIFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuIFx0fTtcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBvbiBlcnJvciBmdW5jdGlvbiBmb3IgYXN5bmMgbG9hZGluZ1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vZSA9IGZ1bmN0aW9uKGVycikgeyBjb25zb2xlLmVycm9yKGVycik7IHRocm93IGVycjsgfTtcblxuIFx0dmFyIGpzb25wQXJyYXkgPSB3aW5kb3dbXCJ3ZWJwYWNrSnNvbnBhcHBsaWNhdGlvblwiXSA9IHdpbmRvd1tcIndlYnBhY2tKc29ucGFwcGxpY2F0aW9uXCJdIHx8IFtdO1xuIFx0dmFyIG9sZEpzb25wRnVuY3Rpb24gPSBqc29ucEFycmF5LnB1c2guYmluZChqc29ucEFycmF5KTtcbiBcdGpzb25wQXJyYXkucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrO1xuIFx0anNvbnBBcnJheSA9IGpzb25wQXJyYXkuc2xpY2UoKTtcbiBcdGZvcih2YXIgaSA9IDA7IGkgPCBqc29ucEFycmF5Lmxlbmd0aDsgaSsrKSB3ZWJwYWNrSnNvbnBDYWxsYmFjayhqc29ucEFycmF5W2ldKTtcbiBcdHZhciBwYXJlbnRKc29ucEZ1bmN0aW9uID0gb2xkSnNvbnBGdW5jdGlvbjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYXBwbGljYXRpb24uanNcIik7XG4iLCJpbXBvcnQge1NoZWxsQ29udHJvbGxlcn0gZnJvbSAnLi9zaGVsbC1jb250cm9sbGVyJztcblxuJCggZG9jdW1lbnQgKS5yZWFkeShmdW5jdGlvbigpXG57XG4gICAgY29uc29sZS5pbmZvKFwiU21hcnRGb3hTZXJ2ZXIgMlggQWRtaW5Ub29sIHJlYWR5IVwiKTtcblxuXHQvLyBDcmVhdGUgc2hlbGwgY29udHJvbGxlciBpbnN0YW5jZVxuXHR0aGlzLmNvbnRyb2xsZXIgPSBuZXcgU2hlbGxDb250cm9sbGVyKCk7XG59KTtcbiIsImV4cG9ydCBjbGFzcyBWaWV3U3RhY2sgZXh0ZW5kcyBIVE1MRWxlbWVudFxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0ICAgIHN1cGVyKCk7XG5cblx0XHQvLyBBdHRhY2ggYSBzaGFkb3cgcm9vdFxuXHRcdGNvbnN0IHNoYWRvd1Jvb3QgPSB0aGlzLmF0dGFjaFNoYWRvdyh7bW9kZTogJ29wZW4nfSk7XG5cdFx0c2hhZG93Um9vdC5pbm5lckhUTUwgPSBgXG5cdFx0XHQ8c3R5bGU+XG5cdFx0XHRcdDpob3N0IHt9XG5cblx0XHRcdFx0OjpzbG90dGVkKDpub3QoW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdKSkge1xuXHRcdFx0ICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuXHRcdFx0ICAgIH1cblx0XHRcdDwvc3R5bGU+XG5cdFx0XHQ8c2xvdD48L3Nsb3Q+XG5cdFx0YDtcblxuXHRcdC8vIFNlbGVjdCBmaXJzdCBpdGVtXG5cdFx0dGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcblx0fVxuXG5cdGdldCBzZWxlY3RlZEVsZW1lbnQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NlbGVjdGVkRWxlbWVudDtcblx0fVxuXG5cdHNldCBzZWxlY3RlZEVsZW1lbnQoZWxlbWVudClcblx0e1xuXHRcdGlmIChlbGVtZW50ICE9IG51bGwgJiYgZWxlbWVudC5wYXJlbnROb2RlID09IHRoaXMpXG5cdFx0e1xuXHRcdFx0dGhpcy5fc2VsZWN0ZWRFbGVtZW50ID0gZWxlbWVudDtcblxuXHRcdFx0Zm9yIChsZXQgZWxlbWVudCBvZiB0aGlzLmNoaWxkcmVuKVxuXHRcdFx0e1xuXHRcdFx0XHRpZiAoZWxlbWVudCA9PSB0aGlzLl9zZWxlY3RlZEVsZW1lbnQpXG5cdFx0XHRcdFx0ZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCAndHJ1ZScpO1xuXHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0ZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoJ0VsZW1lbnQgaXMgbm90IGEgY2hpbGQgb2YgVmlld1N0YWNrJyk7XG5cdFx0fVxuXHR9XG5cblx0Z2V0IHNlbGVjdGVkSW5kZXgoKVxuXHR7XG5cdFx0cmV0dXJuIEFycmF5LmZyb20odGhpcy5jaGlsZHJlbikuaW5kZXhPZih0aGlzLl9zZWxlY3RlZEVsZW1lbnQpO1xuXHR9XG5cblx0c2V0IHNlbGVjdGVkSW5kZXgoaW5kZXgpXG5cdHtcblx0XHRpZiAodGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwKVxuXHRcdHtcblx0XHRcdGlmICh0aGlzLmNoaWxkcmVuW2luZGV4XSA9PSBudWxsKVxuXHRcdFx0e1xuXHRcdFx0XHRjb25zb2xlLmVycm9yKFwiSW52YWxpZCBWaWV3U3RhY2sgaW5kZXhcIik7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0bGV0IGVsZW1lbnQgPSB0aGlzLmNoaWxkcmVuW2luZGV4XTtcblx0XHRcdHRoaXMuc2VsZWN0ZWRFbGVtZW50ID0gZWxlbWVudDtcblx0XHR9XG5cdH1cbn1cblxuLy8gREVGSU5FIENPTVBPTkVOVFxuaWYgKCF3aW5kb3cuY3VzdG9tRWxlbWVudHMuZ2V0KCd2aWV3LXN0YWNrJykpXG5cdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUoJ3ZpZXctc3RhY2snLCBWaWV3U3RhY2spO1xuIiwiZXhwb3J0IGNsYXNzIENoYXRNYW5hZ2VyXG57XG5cdGNvbnN0cnVjdG9yKHNoZWxsQ3RybClcblx0e1xuXHRcdHRoaXMuVVNFUlZBUl9NT0RVTEUgPSAnbW9kJztcblxuXHRcdHRoaXMuc2hlbGxDdHJsID0gc2hlbGxDdHJsO1xuXG5cdFx0Ly8gVE9ETyBJbXBsZW1lbnQgY2hhdCBtYW5hZ2VyIGFmdGVyIGNyZWF0aW5nIHRoZSBjaGF0IFVJIGluIG1haW4gc2hlbGxcblx0fVxuXG5cdC8qKlxuXHQgKiBDYWxsZWQgYnkgdGhlIHNoZWxsIHdoZW4gdGhlIHVzZXIgbG9hZHMgYSBuZXcgbW9kdWxlLCBzbyB0aGF0IHRoaXMgaW5mb1xuXHQgKiBjYW4gYmUgc2F2ZWQgaW4gdGhlIHVzZXIgdmFyaWFibGVzIGFuZCBkaXNwbGF5ZWQgaW4gdGhlIGNoYXQncyB1c2VybGlzdC5cblx0ICovXG5cdHNldEN1cnJlbnRNb2R1bGUobW9kdWxlSWQpXG5cdHtcblx0XHQvLyBTYXZlIG1vZHVsZSBpZCBpbiB1c2VyIHZhcmlhYmxlc1xuXHRcdGxldCB1c2VyVmFyID0gbmV3IFNGUzJYLlNGU1VzZXJWYXJpYWJsZSh0aGlzLlVTRVJWQVJfTU9EVUxFLCBtb2R1bGVJZCk7XG5cdFx0dGhpcy5zaGVsbEN0cmwuc21hcnRGb3guc2VuZChuZXcgU0ZTMlguU2V0VXNlclZhcmlhYmxlc1JlcXVlc3QoW3VzZXJWYXJdKSk7XG5cdH1cbn1cbiIsImltcG9ydCB7RXZlbnREaXNwYXRjaGVyfSBmcm9tICcuLi91dGlscy9ldmVudC1kaXNwYXRjaGVyJztcbmltcG9ydCB7Q29ubmVjdGlvbk1hbmFnZXJFdmVudH0gZnJvbSAnLi4vdXRpbHMvZXZlbnRzJztcblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb25NYW5hZ2VyIGV4dGVuZHMgRXZlbnREaXNwYXRjaGVyXG57XG5cdGNvbnN0cnVjdG9yKHNoZWxsQ3RybClcblx0e1xuXHRcdHN1cGVyKCk7XG5cblx0XHR0aGlzLkFETUlOX1pPTkVfTkFNRSA9IFwiLS09PXt7eyBBZG1pblpvbmUgfX19PT0tLVwiO1xuXHRcdHRoaXMuRVhURU5TSU9OX0VSUk9SID0gXCJlcnJvclwiO1xuXG5cdFx0dGhpcy5DT01NQU5EU19QUkVGSVggPSBcImFkbWluXCI7XG5cdFx0dGhpcy5DT01NQU5EX1JFU1RBUlQgPSBcInJlc3RhcnRcIjtcblx0XHR0aGlzLkNPTU1BTkRfSEFMVCA9IFwiaGFsdFwiO1xuXG5cdFx0dGhpcy5zaGVsbEN0cmwgPSBzaGVsbEN0cmw7XG5cdH1cblxuXHRnZXQgc21hcnRGb3goKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX3NmO1xuXHR9XG5cblx0Y29ubmVjdChjb25maWcsIHVzZXJuYW1lLCBwYXNzd29yZClcblx0e1xuXHRcdC8vIFNldCBhZGRpdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9uc1xuXHRcdGNvbmZpZy56b25lID0gdGhpcy5BRE1JTl9aT05FX05BTUU7XG5cdFx0Y29uZmlnLmRlYnVnID0gZmFsc2U7XG5cblx0XHQvLyBDcmVhdGUgU21hcnRGb3ggaW5zdGFuY2Vcblx0XHR0aGlzLl9zZiA9IG5ldyBTRlMyWC5TbWFydEZveChjb25maWcpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVycyB0byBTbWFydEZveCBldmVudHMgdXNlZnVsIHRvIHRoZSBzaGVsbFxuXHRcdHRoaXMuX2FkZFNGU0V2ZW50TGlzdGVuZXJzKCk7XG5cblx0XHQvLyBTYXZlIHJlZmVyZW5jZSB0byBjb25uZWN0aW9uIGRldGFpbHNcblx0XHR0aGlzLl9jb25maWcgPSBjb25maWc7XG5cdFx0dGhpcy5fdXNlcm5hbWUgPSB1c2VybmFtZTtcblx0XHR0aGlzLl9wYXNzd29yZCA9IHBhc3N3b3JkO1xuXG5cdFx0Ly8gQ29ubmVjdCB0byBTbWFydEZveFNlcnZlciBpbnN0YW5jZVxuXHRcdHRoaXMuX3NmLmNvbm5lY3QoKTtcblx0fVxuXG5cdGRpc2Nvbm5lY3QoKVxuXHR7XG5cdFx0dGhpcy5fc2YuZGlzY29ubmVjdCgpO1xuXHR9XG5cblx0cmVzdGFydFNlcnZlcigpXG5cdHtcblx0XHRpZiAodGhpcy5fc2YuaXNDb25uZWN0ZWQpXG5cdFx0XHR0aGlzLl9zZi5zZW5kKG5ldyBTRlMyWC5FeHRlbnNpb25SZXF1ZXN0KHRoaXMuQ09NTUFORFNfUFJFRklYICsgXCIuXCIgKyB0aGlzLkNPTU1BTkRfUkVTVEFSVCkpO1xuXHR9XG5cblx0aGFsdFNlcnZlcigpXG5cdHtcblx0XHRpZiAodGhpcy5fc2YuaXNDb25uZWN0ZWQpXG5cdFx0XHR0aGlzLl9zZi5zZW5kKG5ldyBTRlMyWC5FeHRlbnNpb25SZXF1ZXN0KHRoaXMuQ09NTUFORFNfUFJFRklYICsgXCIuXCIgKyB0aGlzLkNPTU1BTkRfSEFMVCkpO1xuXHR9XG5cblx0LyogLS0tLS0tLS0tIFBSSVZBVEUgVVRJTElUWSBNRVRIT0RTIC0tLS0tLS0tLSAqL1xuXG5cdF9hZGRTRlNFdmVudExpc3RlbmVycygpXG5cdHtcblx0XHR0aGlzLl9zZi5hZGRFdmVudExpc3RlbmVyKFNGUzJYLlNGU0V2ZW50LkNPTk5FQ1RJT04sIHRoaXMuX29uQ29ubmVjdGlvbiwgdGhpcyk7XG5cdFx0dGhpcy5fc2YuYWRkRXZlbnRMaXN0ZW5lcihTRlMyWC5TRlNFdmVudC5DT05ORUNUSU9OX0xPU1QsIHRoaXMuX29uQ29ubmVjdGlvbkxvc3QsIHRoaXMpO1xuXHRcdHRoaXMuX3NmLmFkZEV2ZW50TGlzdGVuZXIoU0ZTMlguU0ZTRXZlbnQuTE9HSU4sIHRoaXMuX29uTG9naW4sIHRoaXMpO1xuXHRcdHRoaXMuX3NmLmFkZEV2ZW50TGlzdGVuZXIoU0ZTMlguU0ZTRXZlbnQuTE9HSU5fRVJST1IsIHRoaXMuX29uTG9naW5FcnJvciwgdGhpcyk7XG5cdFx0dGhpcy5fc2YuYWRkRXZlbnRMaXN0ZW5lcihTRlMyWC5TRlNFdmVudC5FWFRFTlNJT05fUkVTUE9OU0UsIHRoaXMuX29uRXh0ZW5zaW9uUmVzcG9uc2UsIHRoaXMpO1xuXHR9XG5cblx0X3Jlc2V0KClcblx0e1xuXHRcdC8vIFJlbW92ZSBTRlMgZXZlbnQgbGlzdGVuZXJzXG5cdFx0dGhpcy5fc2YucmVtb3ZlRXZlbnRMaXN0ZW5lcihTRlMyWC5TRlNFdmVudC5DT05ORUNUSU9OLCB0aGlzLl9vbkNvbm5lY3Rpb24pO1xuXHRcdHRoaXMuX3NmLnJlbW92ZUV2ZW50TGlzdGVuZXIoU0ZTMlguU0ZTRXZlbnQuQ09OTkVDVElPTl9MT1NULCB0aGlzLl9vbkNvbm5lY3Rpb25Mb3N0KTtcblx0XHR0aGlzLl9zZi5yZW1vdmVFdmVudExpc3RlbmVyKFNGUzJYLlNGU0V2ZW50LkxPR0lOLCB0aGlzLl9vbkxvZ2luKTtcblx0XHR0aGlzLl9zZi5yZW1vdmVFdmVudExpc3RlbmVyKFNGUzJYLlNGU0V2ZW50LkxPR0lOX0VSUk9SLCB0aGlzLl9vbkxvZ2luRXJyb3IpO1xuXHRcdHRoaXMuX3NmLnJlbW92ZUV2ZW50TGlzdGVuZXIoU0ZTMlguU0ZTRXZlbnQuRVhURU5TSU9OX1JFU1BPTlNFLCB0aGlzLl9vbkV4dGVuc2lvblJlc3BvbnNlKTtcblxuXHRcdC8vIERlbGV0ZSBTbWFydEZveCBjbGFzcyBpbnN0YW5jZVxuXHRcdHRoaXMuX3NmID0gbnVsbDtcblxuXHRcdC8vIERlbGV0ZSBjb25uZWN0aW9uIGRldGFpbHNcblx0XHR0aGlzLl9jb25maWcgPSBudWxsO1xuXHRcdHRoaXMuX3VzZXJuYW1lID0gbnVsbDtcblx0XHR0aGlzLl9wYXNzd29yZCA9IG51bGw7XG5cdH1cblxuXHRfbG9naW4oKVxuXHR7XG5cdFx0Ly8gVGhlIGN1cnJlbnQgQWRtaW5Ub29sIHZlcnNpb24gbXVzdCBiZSBzZW50IHRvIHRoZSBzZXJ2ZXIgZHVyaW5nIGxvZ2luLCB0byBjaGVjayBpZiBpdCBpcyB1cC10by1kYXRlXG5cdFx0bGV0IHBhcmFtcyA9IG5ldyBTRlMyWC5TRlNPYmplY3QoKTtcblx0XHRwYXJhbXMucHV0SW50KCdjbGllbnRWZXInLCB0aGlzLnNoZWxsQ3RybC5pbnRWZXJzaW9uKTtcblxuXHRcdC8vIExvZ2luXG5cdFx0dGhpcy5fc2Yuc2VuZCggbmV3IFNGUzJYLkxvZ2luUmVxdWVzdCh0aGlzLl91c2VybmFtZSwgdGhpcy5fcGFzc3dvcmQsIHBhcmFtcywgdGhpcy5fY29uZmlnLnpvbmUpICk7XG5cdH1cblxuXHQvKiAtLS0tLS0tLS0gU01BUlRGT1ggRVZFTlQgTElTVEVORVJTIC0tLS0tLS0tLSAqL1xuXG5cdF9vbkNvbm5lY3Rpb24oZXZ0UGFyYW1zKVxuXHR7XG5cdFx0aWYgKGV2dFBhcmFtcy5zdWNjZXNzKVxuXHRcdHtcblx0XHRcdC8vIERpc3BhdGNoIGNvbm5lY3Rpb24gZXZlbnRcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChDb25uZWN0aW9uTWFuYWdlckV2ZW50LkNPTk5FQ1RJT04pO1xuXG5cdFx0XHQvLyBTZW5kIGxvZ2luIHJlcXVlc3Rcblx0XHRcdHRoaXMuX2xvZ2luKCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQvLyBEaXNwYXRjaCBlcnJvciBldmVudFxuXHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KENvbm5lY3Rpb25NYW5hZ2VyRXZlbnQuRVJST1IsIHttZXNzYWdlOiBgVW5hYmxlIHRvIGNvbm5lY3QgdG8gJHt0aGlzLl9jb25maWcuaG9zdH06JHt0aGlzLl9jb25maWcucG9ydH1gfSk7XG5cblx0XHRcdC8vIFJlc2V0IHN0YXR1c1xuXHRcdFx0dGhpcy5fcmVzZXQoKTtcblx0XHR9XG5cdH1cblxuXHRfb25Db25uZWN0aW9uTG9zdChldnRQYXJhbXMpXG5cdHtcblx0XHRsZXQgcmVhc29uID0gZXZ0UGFyYW1zLnJlYXNvbjtcblxuXHRcdGlmIChyZWFzb24gIT0gU0ZTMlguQ2xpZW50RGlzY29ubmVjdGlvblJlYXNvbi5NQU5VQUwpXG5cdFx0e1xuXHRcdFx0dmFyIG1zZztcblxuXHRcdFx0Ly8gTG9nIGRpc2Nvbm5lY3Rpb24gbWVzc2FnZSBzdGF0aW5nIHRoZSByZWFzb25cblx0XHRcdGlmIChyZWFzb24gPT0gU0ZTMlguQ2xpZW50RGlzY29ubmVjdGlvblJlYXNvbi5JRExFKVxuXHRcdFx0XHRtc2cgPSAnaW5hY3Rpdml0eSc7XG5cdFx0XHRlbHNlXG5cdFx0XHR7XG5cdFx0XHRcdG1zZyA9ICd1bmtub3duIHJlYXNvbic7XG5cblx0XHRcdFx0aWYgKHJlYXNvbiAhPSBTRlMyWC5DbGllbnREaXNjb25uZWN0aW9uUmVhc29uLlVOS05PV04pXG5cdFx0XHRcdFx0bXNnICs9IGAgKHNlcnZlciByZXBvcnRlZDogJHtyZWFzb259KWA7XG5cdFx0XHR9XG5cblx0XHRcdC8vIERpc3BhdGNoIGVycm9yIGV2ZW50XG5cdFx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoQ29ubmVjdGlvbk1hbmFnZXJFdmVudC5FUlJPUiwge21lc3NhZ2U6IGBBIGRpc2Nvbm5lY3Rpb24gb2NjdXJyZWQgZHVlIHRvICR7bXNnfTsgcGxlYXNlIHJlY29ubmVjdGB9KTtcblx0XHR9XG5cdFx0ZWxzZVxuXHRcdHtcblx0XHRcdC8vIERpc3BhdGNoIGRpc2Nvbm5lY3Rpb24gZXZlbnRcblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChDb25uZWN0aW9uTWFuYWdlckV2ZW50LkRJU0NPTk5FQ1RJT04pO1xuXHRcdH1cblxuXHRcdC8vIFJlc2V0XG5cdFx0dGhpcy5fcmVzZXQoKTtcblx0fVxuXG5cdF9vbkxvZ2luKGV2dFBhcmFtcylcblx0e1xuXHRcdGxldCBkYXRhID0gZXZ0UGFyYW1zLmRhdGE7XG5cblx0XHRsZXQgcGFyYW1zID0ge1xuXHRcdFx0c2VydmVyVmVyc2lvbjogZGF0YS5nZXRVdGZTdHJpbmcoJ3NlcnZlclZlcicpLFxuXHRcdFx0c2VydmVyTmFtZTogZGF0YS5nZXRVdGZTdHJpbmcoJ3NlcnZlck5hbWUnKSxcblx0XHRcdHNlcnZlclVwdGltZTogZGF0YS5nZXRJbnRBcnJheSgndXB0aW1lJyksXG5cdFx0XHRwcm9jQ29udHJvbEVuYWJsZWQ6IGRhdGEuZ2V0Qm9vbCgncHJvY0N0cmwnKSxcblx0XHRcdGFsbG93SGFsdDogZGF0YS5nZXRCb29sKCdhbGxvd0hhbHQnKSxcblx0XHRcdG1vZHVsZXM6IGRhdGEuZ2V0U0ZTQXJyYXkoJ21vZHVsZXMnKVxuXHRcdH07XG5cblx0XHQvLyBEaXNwYXRjaCBsb2dpbiBldmVudFxuXHRcdHRoaXMuZGlzcGF0Y2hFdmVudChDb25uZWN0aW9uTWFuYWdlckV2ZW50LkxPR0lOLCBwYXJhbXMpO1xuXHR9XG5cblx0X29uTG9naW5FcnJvcihldnRQYXJhbXMpXG5cdHtcblx0XHQvLyBEaXNjb25uZWN0IGZyb20gc2VydmVyXG5cdFx0dGhpcy5fc2YuZGlzY29ubmVjdCgpO1xuXG5cdFx0Ly8gRGlzcGF0Y2ggZXJyb3IgZXZlbnRcblx0XHR0aGlzLmRpc3BhdGNoRXZlbnQoQ29ubmVjdGlvbk1hbmFnZXJFdmVudC5FUlJPUiwge21lc3NhZ2U6IGV2dFBhcmFtcy5lcnJvck1lc3NhZ2V9KTtcblx0fVxuXG5cdF9vbkV4dGVuc2lvblJlc3BvbnNlKGV2dFBhcmFtcylcblx0e1xuXHRcdGlmIChldnRQYXJhbXMuY21kID09IHRoaXMuRVhURU5TSU9OX0VSUk9SKVxuXHRcdHtcblx0XHRcdGxldCBkYXRhID0gZXZ0UGFyYW1zLnBhcmFtcztcblxuXHRcdFx0Ly8gQW4gdW5leHBlY3RlZCBlcnJvciBvY2N1cnJlZCBpbiB0aGUgQWRtaW4gVG9vbCBzZXJ2ZXItc2lkZSBleHRlbnNpb25cblx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChDb25uZWN0aW9uTWFuYWdlckV2ZW50LlNFUlZFUl9FUlJPUiwge21lc3NhZ2U6ICdBbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycmVkIGluIHRoZSBBZG1pbiBUb29sIHNlcnZlci1zaWRlIGV4dGVuc2lvbiwgcGxlYXNlIGNoZWNrIHRoZSBzZXJ2ZXItc2lkZSBsb2dzOyB0aGUgZXh0ZW5zaW9uIHJlcG9ydGVkOiAnICsgZGF0YS5nZXRVdGZTdHJpbmcoJ2Vycm9yJyl9KTtcblx0XHR9XG5cdH1cbn1cbiIsImltcG9ydCB7RXZlbnREaXNwYXRjaGVyfSBmcm9tICcuLi91dGlscy9ldmVudC1kaXNwYXRjaGVyJztcbmltcG9ydCB7TW9kdWxlTWFuYWdlckV2ZW50fSBmcm9tICcuLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IHt0b0tlYmFiQ2FzZX0gZnJvbSAnLi4vdXRpbHMvdXRpbGl0aWVzJztcblxuZXhwb3J0IGNsYXNzIE1vZHVsZU1hbmFnZXIgZXh0ZW5kcyBFdmVudERpc3BhdGNoZXJcbntcblx0Y29uc3RydWN0b3Ioc2hlbGxDdHJsLCBjb250YWluZXIpXG5cdHtcblx0XHRzdXBlcigpO1xuXG5cdFx0dGhpcy5fc2hlbGxDdHJsID0gc2hlbGxDdHJsO1xuXHRcdHRoaXMuX2NvbnRhaW5lciA9IGNvbnRhaW5lcjtcblx0XHR0aGlzLl9jdXJyZW50TW9kdWxlSWQgPSBudWxsO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIGZvciBuYXZpZ2F0aW9uIGl0ZW1zIGNsaWNrXG5cdFx0dGhpcy5fY29udGFpbmVyLm9uKCdjbGljaycsICcubmF2LWl0ZW0nLCAkLnByb3h5KGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRsZXQgbW9kdWxlSWQgPSBldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuaWQ7XG5cdFx0XHRsZXQgbW9kdWxlRGF0YSA9IHRoaXMuX21vZHVsZUNvbmZpZ0J5SWRbbW9kdWxlSWRdO1xuXG5cdFx0XHRpZiAobW9kdWxlSWQgIT0gdGhpcy5fY3VycmVudE1vZHVsZUlkKVxuXHRcdFx0e1xuXHRcdFx0XHQvLyBMb2FkIHNlbGVjdGVkIG1vZHVsZVxuXHRcdFx0XHR0aGlzLl9sb2FkTW9kdWxlKG1vZHVsZURhdGEpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDbG9zZSBuYXZpZ2F0aW9uXG5cdFx0XHR0aGlzLl9zaGVsbEN0cmwuX3RvZ2dsZU5hdihmYWxzZSk7XG5cdFx0fSwgdGhpcykpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIHNob3cgdG9vbHRpcFxuXHRcdHRoaXMuX2NvbnRhaW5lci5rZW5kb1Rvb2x0aXAoe1xuXHRcdFx0ZmlsdGVyOiAnbGlbZGF0YS1pZF0nLFxuXHRcdFx0Y29udGVudDogJC5wcm94eShmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRsZXQgbW9kdWxlSWQgPSBldmVudC50YXJnZXRbMF0uZGF0YXNldC5pZDtcblx0XHRcdFx0bGV0IG1vZHVsZURhdGEgPSB0aGlzLl9tb2R1bGVDb25maWdCeUlkW21vZHVsZUlkXTtcblx0XHQgICAgICAgIHJldHVybiBgPHN0cm9uZz4ke21vZHVsZURhdGEubmFtZX08L3N0cm9uZz48YnI+PHNwYW4+JHttb2R1bGVEYXRhLmRlc2NyaXB0aW9ufTwvc3Bhbj5gO1xuXHRcdCAgICB9LCB0aGlzKVxuXHRcdH0pO1xuXG5cdFx0LyogVEVTVElORyBNRU1PUlkgTEVBS1MgSU4gTU9EVUxFUyBMT0FESU5HXG5cdFx0QUREIFRISVMgSU4gVEhFIE1BSU4gVklFVyBUTyBTVEFSVCBUSEUgVEVTVDogPGRpdj48YnV0dG9uIGlkPVwidGVtcFwiPnRlc3Q8L2J1dHRvbj48c3BhbiBpZD1cImNudFwiPjwvc3Bhbj48L2Rpdj5cblx0XHQkKCcjdGVtcCcpLmNsaWNrKFxuXHRcdFx0JC5wcm94eShmdW5jdGlvbihldmVudClcblx0XHRcdHtcblx0XHRcdFx0dGhpcy5jbnQgPSAwO1xuXHRcdFx0XHRpZiAodGhpcy50aW1lciA9PSBudWxsKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0dGhpcy50aW1lciA9IHdpbmRvdy5zZXRJbnRlcnZhbCgkLnByb3h5KGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdFx0XHQkKCcjY250JykudGV4dCh0aGlzLmNudCsrKVxuXHRcdFx0XHRcdFx0aWYgKHRoaXMuX2N1cnJlbnRNb2R1bGVJZCA9PSAnRGFzaGJvYXJkJylcblx0XHRcdFx0XHRcdFx0dGhpcy5fbG9hZE1vZHVsZSh0aGlzLl9tb2R1bGVDb25maWdCeUlkWydTZXJ2ZXJDb25maWd1cmF0b3InXSk7XG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHRoaXMuX2xvYWRNb2R1bGUodGhpcy5fbW9kdWxlQ29uZmlnQnlJZFsnRGFzaGJvYXJkJ10pO1xuXHRcdFx0XHRcdH0sIHRoaXMpLCA1MDApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2Vcblx0XHRcdFx0e1xuXHRcdFx0XHRcdHdpbmRvdy5jbGVhckludGVydmFsKHRoaXMudGltZXIpO1xuXHRcdFx0XHRcdHRoaXMudGltZXIgPSBudWxsO1xuXHRcdFx0XHR9XG5cdFx0XHR9LCB0aGlzKVxuXHRcdCk7XG5cdFx0Ki9cblx0fVxuXG5cdGluaXRNb2R1bGVzTGlzdChtb2R1bGVzRGF0YSwgbG9hZE1vZHVsZUlkID0gbnVsbClcblx0e1xuXHRcdC8vIFNFVFVQIE1PRFVMRVMgTElTVFxuXG5cdFx0Ly8gRW1wdHkgY29udGFpbmVyIG9mIG1vZHVsZSBzZWxlY3Rpb24gYnV0dG9uc1xuXHRcdHRoaXMuX2NvbnRhaW5lci5lbXB0eSgpO1xuXG5cdFx0dGhpcy5fbW9kdWxlQ29uZmlnQnlJZCA9IHt9O1xuXHRcdHZhciBmaXJzdE1vZHVsZSA9IG51bGw7XG5cdFx0dmFyIGxvYWRNb2R1bGUgPSBudWxsO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBtb2R1bGVzRGF0YS5zaXplKCk7IGkrKylcblx0XHR7XG5cdFx0XHRsZXQgbW9kdWxlRGF0YSA9IHRoaXMuX2dldE1vZHVsZU9iamVjdChtb2R1bGVzRGF0YS5nZXRTRlNPYmplY3QoaSkpO1xuXG5cdFx0XHR0aGlzLl9tb2R1bGVDb25maWdCeUlkW21vZHVsZURhdGEuaWRdID0gbW9kdWxlRGF0YTtcblxuXHRcdFx0Ly8gR2V0IGZpcnN0IG1vZHVsZVxuXHRcdFx0aWYgKGkgPT0gMClcblx0XHRcdFx0Zmlyc3RNb2R1bGUgPSBtb2R1bGVEYXRhO1xuXG5cdFx0XHQvLyBHZXQgcGFzc2VkIG1vZHVsZVxuXHRcdFx0aWYgKG1vZHVsZURhdGEuaWQgPT0gbG9hZE1vZHVsZUlkKVxuXHRcdFx0XHRsb2FkTW9kdWxlID0gbW9kdWxlRGF0YTtcblxuXHRcdFx0Ly8gRGlzcGxheSBtb2R1bGUgYnV0dG9uXG5cdFx0XHRsZXQgbW9kdWxlQnV0dG9uID0gdGhpcy5fY3JlYXRlTW9kdWxlQnV0dG9uKG1vZHVsZURhdGEpO1xuXHRcdFx0bGV0IGVsZW1lbnQgPSB0aGlzLl9jb250YWluZXIuYXBwZW5kKG1vZHVsZUJ1dHRvbik7XG5cdFx0fVxuXG5cdFx0Ly8gTE9BRCBJTklUSUFMIE1PRFVMRVxuXG5cdFx0Ly8gSWYgbW9kdWxlIGlzIG5vdCBwYXNzZWQsIGxvYWQgdGhlIGZpcnN0IG9uZSBvZiB0aGUgbW9kdWxlcyBsaXN0XG5cdFx0aWYgKGxvYWRNb2R1bGUgPT0gbnVsbClcblx0XHRcdGxvYWRNb2R1bGUgPSBmaXJzdE1vZHVsZTtcblxuXHRcdHRoaXMuX2xvYWRNb2R1bGUobG9hZE1vZHVsZSk7XG5cdH1cblxuXHR1bmxvYWRNb2R1bGUoKVxuXHR7XG5cdFx0dGhpcy5fZGVzdHJveUN1cnJlbnRNb2R1bGUoKTtcblx0fVxuXG5cdGdldCBjdXJyZW50TW9kdWxlSWQoKVxuXHR7XG5cdFx0cmV0dXJuIHRoaXMuX2N1cnJlbnRNb2R1bGVJZDtcblx0fVxuXG5cdGdldCBjdXJyZW50TW9kdWxlKClcblx0e1xuXHRcdHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kdWxlJyk7XG5cdH1cblxuXHRfZ2V0TW9kdWxlT2JqZWN0KHNmc09iailcblx0e1xuXHRcdC8vIEdldCBpY29uIHNvdXJjZSBzdHJpbmdcblx0XHR2YXIgaWNvblNyYyA9IG51bGw7XG5cblx0XHRpZiAoc2ZzT2JqLmNvbnRhaW5zS2V5KCdpY29uJykpXG5cdFx0e1xuXHRcdFx0bGV0IGljb25CeXRlQXJyYXkgPSBzZnNPYmouZ2V0Qnl0ZUFycmF5KCdpY29uJyk7XG5cdFx0XHRsZXQgaWNvbkJhc2U2NFN0cmluZyA9IGJ0b2EoU3RyaW5nLmZyb21DaGFyQ29kZSguLi5pY29uQnl0ZUFycmF5KSk7XG5cblx0XHRcdGljb25TcmMgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LCcgKyBpY29uQmFzZTY0U3RyaW5nO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRpZDogc2ZzT2JqLmdldFV0ZlN0cmluZygnaWQnKSxcblx0XHRcdG5hbWU6IHNmc09iai5nZXRVdGZTdHJpbmcoJ25hbWUnKSxcblx0XHRcdGRlc2NyaXB0aW9uOiBzZnNPYmouZ2V0VXRmU3RyaW5nKCdkZXNjcmlwdGlvbicpLFxuXHRcdFx0aXNTdWI6IHNmc09iai5nZXRCb29sKCdpc1N1YicpLFxuXHRcdFx0aWNvblNyYzogaWNvblNyYyxcblx0XHRcdHRhZzogdG9LZWJhYkNhc2Uoc2ZzT2JqLmdldFV0ZlN0cmluZygnaWQnKSlcblx0XHR9XG5cdH1cblxuXHRfY3JlYXRlTW9kdWxlQnV0dG9uKG1vZHVsZURhdGEpXG5cdHtcblx0XHRyZXR1cm4gYFxuXHRcdFx0PGxpIGNsYXNzPVwibmF2LWl0ZW1cIiBkYXRhLWlkPVwiJHttb2R1bGVEYXRhLmlkfVwiPlxuXHRcdFx0XHQ8aW1nIHNyYz1cIiR7bW9kdWxlRGF0YS5pY29uU3JjfVwiPlxuXHRcdFx0XHQ8bGFiZWw+JHttb2R1bGVEYXRhLm5hbWV9PC9sYWJlbD5cblx0XHRcdDwvbGk+XG5cdFx0YDtcblx0fVxuXG5cdF9sb2FkTW9kdWxlKG1vZHVsZURhdGEpXG5cdHtcblx0XHQvLyBMb2FkIHRoZSBIVE1MIGZpbGUgb2YgdGhlIG1vZHVsZVxuXHRcdCQoJzxtb2R1bGUvPicpLmxvYWQoYG1vZHVsZXMvJHttb2R1bGVEYXRhLnRhZ30uaHRtbGAsICQucHJveHkoZnVuY3Rpb24oaHRtbCwgc3RhdHVzKSB7XG5cdFx0XHRcblx0XHRcdGlmIChzdGF0dXMgIT0gJ2Vycm9yJylcblx0XHRcdHtcblx0XHRcdFx0Ly8gTG9hZCB0aGUgSlMgZmlsZSBvZiB0aGUgbW9kdWxlXG5cdFx0XHRcdGltcG9ydCgvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcIm1vZHVsZS1cIiAqLyBgLi4vbW9kdWxlcy8ke21vZHVsZURhdGEudGFnfS5qc2ApLnRoZW4obW9kdWxlID0+IHtcblxuXHRcdFx0XHRcdC8vIERlc3Ryb3kgY3VycmVudCBtb2R1bGVcblx0XHRcdFx0XHR0aGlzLl9kZXN0cm95Q3VycmVudE1vZHVsZSgpO1xuXG5cdFx0XHRcdFx0Ly8gRGVmaW5lIGxvYWRlZCBtb2R1bGUgKGlmIG5lY2Vzc2FyeSlcblx0XHRcdFx0XHRpZiAoIXdpbmRvdy5jdXN0b21FbGVtZW50cy5nZXQobW9kdWxlRGF0YS50YWcgKyAnLW1vZHVsZScpKVxuXHRcdFx0XHRcdCBcdHdpbmRvdy5jdXN0b21FbGVtZW50cy5kZWZpbmUobW9kdWxlRGF0YS50YWcgKyAnLW1vZHVsZScsIG1vZHVsZS5kZWZhdWx0KTtcblxuXHRcdFx0XHRcdC8vIEFwcGVuZCBuZXcgbW9kdWxlXG5cdFx0XHRcdFx0JCgnZGl2Lm1vZHVsZS1sb2FkZXInKS5hcHBlbmQoaHRtbCk7XG5cblx0XHRcdFx0XHQvLyBJbml0aWFsaXplIG1vZHVsZVxuXHRcdFx0XHRcdHRoaXMuY3VycmVudE1vZHVsZS5pbml0aWFsaXplKG1vZHVsZURhdGEsIHRoaXMuX3NoZWxsQ3RybCk7XG5cblx0XHRcdFx0XHQvLyBTYXZlIGN1cnJlbnQgbW9kdWxlIGlkXG5cdFx0XHRcdFx0dGhpcy5fY3VycmVudE1vZHVsZUlkID0gbW9kdWxlRGF0YS5pZDtcblxuXHRcdFx0XHRcdC8vIERpc3BhdGNoIGV2ZW50XG5cdFx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KE1vZHVsZU1hbmFnZXJFdmVudC5NT0RVTEVfTE9BREVELCB7bW9kdWxlRGF0YTogbW9kdWxlRGF0YX0pO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2goZXJyb3IgPT4ge1xuXHRcdFx0XHRcdC8vIExvZyBlcnJvciBkZXRhaWxzXG5cdFx0XHRcdFx0dGhpcy5fc2hlbGxDdHJsLmxvZ01lc3NhZ2UoZXJyb3IsICd3YXJuJyk7XG5cblx0XHRcdFx0XHQvLyBEaXNwYXRjaCBlcnJvciBldmVudFxuXHRcdFx0XHRcdHRoaXMuZGlzcGF0Y2hFdmVudChNb2R1bGVNYW5hZ2VyRXZlbnQuTU9EVUxFX0xPQURfRVJST1IsIHttZXNzYWdlOiBgJHttb2R1bGVEYXRhLm5hbWV9IG1vZHVsZSdzIGNvbnRyb2xsZXIgKGpzKSBjb3VsZG4ndCBiZSBsb2FkZWQuYH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Ly8gRGlzcGF0Y2ggZXJyb3IgZXZlbnRcblx0XHRcdFx0dGhpcy5kaXNwYXRjaEV2ZW50KE1vZHVsZU1hbmFnZXJFdmVudC5NT0RVTEVfTE9BRF9FUlJPUiwge21lc3NhZ2U6IGAke21vZHVsZURhdGEubmFtZX0gbW9kdWxlJ3MgdmlldyAoaHRtbCkgbm90IGZvdW5kLmB9KTtcblx0XHRcdH1cblx0XHR9LCB0aGlzKSk7XG5cdH1cblxuXHRfZGVzdHJveUN1cnJlbnRNb2R1bGUoKVxuXHR7XG5cdFx0Ly8gR2V0IGEgcmVmZXJlbmNlIHRvIGN1cnJlbnQgbW9kdWxlXG5cdFx0Y29uc3QgbW9kID0gdGhpcy5jdXJyZW50TW9kdWxlO1xuXG5cdFx0Ly8gQ2FsbCBkZXN0cm95IG1ldGhvZCBvbiBtb2R1bGUncyBjbGFzc1xuXHRcdGlmIChtb2QgIT0gbnVsbClcblx0XHRcdG1vZC5kZXN0cm95KCk7XG5cblx0XHQvLyBFbXB0eSBtb2R1bGUgY29udGFpbmVyXG5cdFx0JCgnZGl2Lm1vZHVsZS1sb2FkZXInKS5lbXB0eSgpO1xuXG5cdFx0dGhpcy5fY3VycmVudE1vZHVsZUlkID0gbnVsbDtcblx0fVxufVxuIiwiaW1wb3J0IHtWaWV3U3RhY2t9IGZyb20gJy4vY29tcG9uZW50cy92aWV3LXN0YWNrJztcbmltcG9ydCB7TW9kdWxlTWFuYWdlcn0gZnJvbSAnLi9tYW5hZ2Vycy9tb2R1bGUtbWFuYWdlcic7XG5pbXBvcnQge01vZHVsZU1hbmFnZXJFdmVudH0gZnJvbSAnLi91dGlscy9ldmVudHMnO1xuaW1wb3J0IHtDb25uZWN0aW9uTWFuYWdlcn0gZnJvbSAnLi9tYW5hZ2Vycy9jb25uZWN0aW9uLW1hbmFnZXInO1xuaW1wb3J0IHtDb25uZWN0aW9uTWFuYWdlckV2ZW50fSBmcm9tICcuL3V0aWxzL2V2ZW50cyc7XG5pbXBvcnQge0NoYXRNYW5hZ2VyfSBmcm9tICcuL21hbmFnZXJzL2NoYXQtbWFuYWdlcic7XG5pbXBvcnQge3BhcnNlfSBmcm9tICcuL3V0aWxzL2RvdC1wcm9wZXJ0aWVzLXBhcnNlJztcblxuZXhwb3J0IGNsYXNzIFNoZWxsQ29udHJvbGxlclxue1xuXHRjb25zdHJ1Y3RvcigpXG5cdHtcblx0XHQvLyBTZXQgY29uc3RhbnRzIGFuZCB2YXJpYWJsZXNcblxuXHRcdHRoaXMuVkVSU0lPTl9NQUpPUiA9IDM7XG5cdFx0dGhpcy5WRVJTSU9OX01JTk9SID0gMDtcblx0XHR0aGlzLlZFUlNJT05fU1VCID0gMDtcblxuXHRcdHRoaXMuREVGQVVMVF9XU19QT1JUID0gODA4MDtcblx0XHR0aGlzLkRFRkFVTFRfV1NTX1BPUlQgPSA4NDQzO1xuXG5cdFx0dGhpcy5ERUZBVUxUX1VTRVJOQU1FID0gJ3Nmc2FkbWluJztcblx0XHR0aGlzLkRFRkFVTFRfUEFTU1dPUkQgPSAnc2ZzYWRtaW4nO1xuXG5cdFx0dGhpcy5fbG9naW5WYWxpZGF0b3IgPSBudWxsO1xuXG5cdFx0Ly8gQ3JlYXRlIG1vZHVsZXMgbWFuYWdlciBpbnN0YW5jZSBhbmQgYWRkIGV2ZW50IGxpc3RlbmVyc1xuXHRcdHRoaXMuX21vZE1hbmFnZXIgPSBuZXcgTW9kdWxlTWFuYWdlcih0aGlzLCAkKCcubmF2LW1haW4nKSk7XG5cdFx0dGhpcy5fbW9kTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKE1vZHVsZU1hbmFnZXJFdmVudC5NT0RVTEVfTE9BREVELCB0aGlzLl9vbk1vZHVsZUxvYWRlZCwgdGhpcyk7XG5cdFx0dGhpcy5fbW9kTWFuYWdlci5hZGRFdmVudExpc3RlbmVyKE1vZHVsZU1hbmFnZXJFdmVudC5NT0RVTEVfTE9BRF9FUlJPUiwgdGhpcy5fb25Nb2R1bGVMb2FkRXJyb3IsIHRoaXMpO1xuXG5cdFx0Ly8gQ3JlYXRlIGNvbm5lY3Rpb24gbWFuYWdlciBpbnN0YW5jZSBhbmQgYWRkIGV2ZW50IGxpc3RlbmVyc1xuXHRcdHRoaXMuX2Nvbm5NYW5hZ2VyID0gbmV3IENvbm5lY3Rpb25NYW5hZ2VyKHRoaXMpO1xuXHRcdHRoaXMuX2Nvbm5NYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoQ29ubmVjdGlvbk1hbmFnZXJFdmVudC5DT05ORUNUSU9OLCB0aGlzLl9vbkNvbm5lY3Rpb24sIHRoaXMpO1xuXHRcdHRoaXMuX2Nvbm5NYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoQ29ubmVjdGlvbk1hbmFnZXJFdmVudC5MT0dJTiwgdGhpcy5fb25Mb2dpbiwgdGhpcyk7XG5cdFx0dGhpcy5fY29ubk1hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihDb25uZWN0aW9uTWFuYWdlckV2ZW50LkRJU0NPTk5FQ1RJT04sIHRoaXMuX29uRGlzY29ubmVjdGlvbiwgdGhpcyk7XG5cdFx0dGhpcy5fY29ubk1hbmFnZXIuYWRkRXZlbnRMaXN0ZW5lcihDb25uZWN0aW9uTWFuYWdlckV2ZW50LkVSUk9SLCB0aGlzLl9vbkNvbm5NYW5hZ2VyRXJyb3IsIHRoaXMpO1xuXHRcdHRoaXMuX2Nvbm5NYW5hZ2VyLmFkZEV2ZW50TGlzdGVuZXIoQ29ubmVjdGlvbk1hbmFnZXJFdmVudC5TRVJWRVJfRVJST1IsIHRoaXMuX29uU2VydmVyRXJyb3IsIHRoaXMpO1xuXG5cdFx0Ly8gQ3JlYXRlIGFkbWluIGNoYXQgbWFuYWdlclxuXHRcdHRoaXMuX2NoYXRNYW5hZ2VyID0gbmV3IENoYXRNYW5hZ2VyKHRoaXMpO1xuXG5cdFx0LyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG5cblx0XHQvLyBJbml0aWFsaXplIHZpZXdzXG5cdFx0dGhpcy5faW5pdFZpZXdzKCk7XG5cblx0XHQvLyBTaG93IGxvZ2luIHZpZXdcblx0XHR0aGlzLl9zd2l0Y2hTaGVsbFZpZXcoJ2xvZ2luLXZpZXcnKTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFZJRVcgSU5JVElBTElaRVJTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0LyoqXG5cdCAqIEluaXRpYWxpemUgbG9naW4gdmlldy5cblx0ICovXG5cdF9pbml0TG9naW5WaWV3KClcblx0e1xuXHRcdC8vIFNldCBkZWZhdWx0IGlucHV0IHZhbHVlcyAocGFzc3dvcmQgbmV2ZXIgc2F2ZWQpXG5cdFx0bGV0IGhvc3QgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG5cdFx0bGV0IHBvcnQgPSB0aGlzLkRFRkFVTFRfV1NfUE9SVDtcblx0XHRsZXQgZW5jcnlwdCA9IGZhbHNlO1xuXHRcdGxldCB1c2VyID0gJ3Nmc2FkbWluJztcblx0XHRsZXQgcmVtZW1iZXIgPSBmYWxzZTtcblxuXHRcdC8vIExvYWQgXCJsYXN0LXNlcnZlclwiIGNvb2tpZVxuXHRcdGxldCBkYXRhID0gQ29va2llcy5nZXRKU09OKCdsYXN0LXNlcnZlcicpXG4gICAgICAgIGlmIChkYXRhKVxuXHRcdHtcblx0XHRcdGhvc3QgPSBkYXRhLmhvc3Q7XG4gICAgICAgICAgICBwb3J0ID0gZGF0YS5wb3J0O1xuXHRcdFx0ZW5jcnlwdCA9IGRhdGEuZW5jcnlwdDtcblx0XHRcdHVzZXIgPSBkYXRhLnVzZXI7XG5cdFx0XHRyZW1lbWJlciA9IHRydWU7XG4gICAgICAgIH1cblxuXHRcdC8vIFJldHJpZXZlIGhvc3QgZnJvbSBHRVQgcGFyYW1ldGVyXG5cdFx0bGV0IGdldEhvc3QgPSB0aGlzLl9nZXRVcmxQYXJhbWV0ZXIoJ2hvc3QnKTtcblx0XHRpZiAoZ2V0SG9zdClcblx0XHRcdGhvc3QgPSBnZXRIb3N0O1xuXG5cdFx0Ly8gU2V0IGlucHV0IHZhbHVlc1xuXHRcdCQoJyNsb2dpbkhvc3QnKS52YWwoaG9zdCk7XG5cdFx0JCgnI2xvZ2luVXNlcm5hbWUnKS52YWwodXNlcik7XG5cdFx0JCgnI2xvZ2luRW5jcnlwdCcpLnByb3AoJ2NoZWNrZWQnLCBlbmNyeXB0KTtcblx0XHQkKCcjcmVtZW1iZXJMb2dpbicpLnByb3AoJ2NoZWNrZWQnLCByZW1lbWJlcik7XG5cblx0XHQvLyBJbml0aWFsaXplIG51bWVyaWMgaW5wdXRcblx0XHQkKCcjbG9naW5Qb3J0Jykua2VuZG9OdW1lcmljVGV4dEJveCh7XG5cdFx0XHRmb3JtYXQ6ICcjIyMjIycsXG5cdFx0XHR2YWx1ZTogcG9ydFxuXHRcdH0pO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgS2VuZG8gVUkgVmFsaWRhdG9yIG9uIHRoZSBcImZvcm1cIiBjb250YWluZXJcblx0XHQvLyAoTk9URTogZG9lcyBOT1QgaGF2ZSB0byBiZSBhbiBhY3R1YWwgPGZvcm0+IHRhZylcblx0XHR0aGlzLl9sb2dpblZhbGlkYXRvciA9ICQoJyNsb2dpbkZvcm0nKS5rZW5kb1ZhbGlkYXRvcih7XG5cdFx0XHR2YWxpZGF0ZU9uQmx1cjogdHJ1ZVxuXHRcdH0pLmRhdGEoJ2tlbmRvVmFsaWRhdG9yJyk7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gdmFsaWRhdGUgdGhlIGZvcm0gd2hlbiB0aGUgQ29ubmVjdCBidXR0b24gaXMgY2xpY2tlZFxuXHRcdCQoJyNsb2dpbkJ1dHRvbicpLmNsaWNrKCQucHJveHkodGhpcy5fb25Db25uZWN0Q2xpY2ssIHRoaXMpKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lciB0byBzdWJtaXQgZm9ybSBvbiBFbnRlciBrZXkgcHJlc3Ncblx0XHQkKCcjbG9naW5Gb3JtJykua2V5dXAoZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGlmIChldmVudC5rZXkgIT09ICdFbnRlcicpIHJldHVybjtcblxuXHRcdFx0JCgnI2xvZ2luQnV0dG9uJykuY2xpY2soKTtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fSk7XG5cblx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gZW5jcnlwdCBjaGVja2JveFxuXHRcdCQoJyNsb2dpbkVuY3J5cHQnKS5jaGFuZ2UoJC5wcm94eShmdW5jdGlvbihldmVudCkge1xuXHRcdFx0bGV0IHBvcnQgPSB0aGlzLkRFRkFVTFRfV1NfUE9SVDtcblxuXHRcdFx0aWYgKCQoJyNsb2dpbkVuY3J5cHQnKS5wcm9wKCdjaGVja2VkJykpXG5cdFx0XHRcdHBvcnQgPSB0aGlzLkRFRkFVTFRfV1NTX1BPUlQ7XG5cblx0XHRcdCQoJyNsb2dpblBvcnQnKS5kYXRhKCdrZW5kb051bWVyaWNUZXh0Qm94JykudmFsdWUocG9ydCk7XG5cdFx0fSwgdGhpcykpO1xuXG5cdFx0Ly8gSGlkZSBlcnJvciBtZXNzYWdlIGNvbnRhaW5lclxuXHRcdCQoJyNsb2dpbi1lcnJvcicpLmhpZGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBJbml0aWFsaXplIG1vZHVsZSB2aWV3LlxuXHQgKi9cblx0X2luaXRNb2R1bGVWaWV3KClcblx0e1xuXHRcdC8vIEFkZCBsaXN0ZW5lcnMgdG8gb3Blbi9jbG9zZSBtZW51IGJ1dHRvbnNcblx0XHQkKCcubmF2LW9wZW4nKS5jbGljaygkLnByb3h5KGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5fdG9nZ2xlTmF2KHRydWUpO1xuXHRcdH0sIHRoaXMpKTtcblxuXHRcdCQoJy5uYXYtY2xvc2UsIC5uYXYtb3ZlcmxheScpLmNsaWNrKCQucHJveHkoZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLl90b2dnbGVOYXYoZmFsc2UpO1xuXHRcdH0sIHRoaXMpKTtcblxuXHRcdC8vIEFkZCBsaXN0ZW5lcnMgdG8gc2VydmljZSBidXR0b25zXG5cdFx0JCgnI3Jlc3RhcnQtYnV0dG9uJykuY2xpY2soJC5wcm94eSh0aGlzLl9vblJlc3RhcnRDbGljaywgdGhpcykpO1xuXHRcdCQoJyNoYWx0LWJ1dHRvbicpLmNsaWNrKCQucHJveHkodGhpcy5fb25IYWx0Q2xpY2ssIHRoaXMpKTtcblx0XHQkKCcjaGVscC1idXR0b24nKS5jbGljaygkLnByb3h5KHRoaXMuX29uSGVscENsaWNrLCB0aGlzKSk7XG5cdFx0JCgnI2Rpc2Nvbm5lY3QtYnV0dG9uJykuY2xpY2soJC5wcm94eSh0aGlzLl9vbkRpc2Nvbm5lY3RDbGljaywgdGhpcykpO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIHNob3cgdG9vbHRpcCBvbiBzZXJ2aWNlIGJ1dHRvbnMgaG92ZXJcblx0XHQkKCcubmF2LXNlcnZpY2UnKS5rZW5kb1Rvb2x0aXAoe1xuXHRcdFx0ZmlsdGVyOiAnbGlbdGl0bGVdJ1xuXHRcdH0pO1xuXG5cdFx0Ly8gQWRkIGxpc3RlbmVyIHRvIHNjcm9sbCBtYWluIHZpZXcgdG8gdG9wIGlmIHN0YXR1cyBiYXIgaXMgY2xpY2tlZFxuXHRcdCQoJyNzdGF0dXMtYmFyJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHQkKCdtYWluJykuYW5pbWF0ZSh7IHNjcm9sbFRvcDogMCB9LCAnZmFzdCcpO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gVUkgRVZFTlQgTElTVEVORVJTXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cblx0LyoqXG5cdCAqIFZhbGlkYXRlIGxvZ2luIGZvcm0gYW5kIGNvbm5lY3QrbG9naW4gdG8gU21hcnRGb3hTZXJ2ZXIuXG5cdCAqL1xuXHRfb25Db25uZWN0Q2xpY2soZXZlbnQpXG5cdHtcblx0XHQvLyBIaWRlIGFueSBwcmV2aW91cyBlcnJvciBtZXNzYWdlXG5cdFx0JCgnI2xvZ2luLWVycm9yJykuaGlkZSgpO1xuXHRcdCQoJyNsb2dpbi1lcnJvcicpLnRleHQoJycpO1xuXG5cdFx0Ly8gVmFsaWRhdGUgbG9naW4gZm9ybVxuXHRcdGlmICh0aGlzLl9sb2dpblZhbGlkYXRvci52YWxpZGF0ZSgpKVxuXHRcdHtcblx0XHRcdC8vIERpc2FibGUgbG9naW4gZm9ybVxuXHRcdFx0dGhpcy5fZW5hYmxlTG9naW5Gb3JtKGZhbHNlKTtcblxuXHRcdFx0Ly8gUmV0cmlldmUgY29ubmVjdGlvbiBkZXRhaWxzXG5cdFx0XHRsZXQgY29uZmlnID0ge307XG5cdFx0XHRjb25maWcuaG9zdCA9ICQoJyNsb2dpbkhvc3QnKS52YWwoKS50cmltKCk7XG5cdFx0XHRjb25maWcucG9ydCA9ICQoJyNsb2dpblBvcnQnKS5kYXRhKCdrZW5kb051bWVyaWNUZXh0Qm94JykudmFsdWUoKTtcblx0XHRcdGNvbmZpZy51c2VTU0wgPSAkKCcjbG9naW5FbmNyeXB0JykucHJvcCgnY2hlY2tlZCcpO1xuXG5cdFx0XHRsZXQgdXNlcm5hbWUgPSAkKCcjbG9naW5Vc2VybmFtZScpLnZhbCgpLnRyaW0oKTtcblx0XHRcdGxldCBwYXNzd29yZCA9ICQoJyNsb2dpblBhc3N3b3JkJykudmFsKCk7XG5cblx0XHRcdC8vIFNhdmUgaW5wdXQgdmFsdWVzIHRvIGNvb2tpZSAoZXhjZXB0IHBhc3N3b3JkKS4uLlxuXHRcdFx0Ly8gLi4ub3IgY2xlYXIgcHJldmlvdXNseSBzYXZlZCBjb29raWVcblx0XHRcdGlmICgkKCcjcmVtZW1iZXJMb2dpbicpLnByb3AoJ2NoZWNrZWQnKSlcblx0XHRcdHtcblx0XHRcdFx0Q29va2llcy5zZXQoJ2xhc3Qtc2VydmVyJywge1xuXHRcdFx0XHRcdGhvc3Q6IGNvbmZpZy5ob3N0LFxuXHRcdFx0XHRcdHBvcnQ6IGNvbmZpZy5wb3J0LFxuXHRcdFx0XHRcdGVuY3J5cHQ6IGNvbmZpZy51c2VTU0wsXG5cdFx0XHRcdFx0dXNlcjogdXNlcm5hbWVcblxuXHRcdFx0XHR9LCB7ZXhwaXJlczogMzB9KTtcblx0XHRcdH1cblx0XHRcdGVsc2Vcblx0XHRcdHtcblx0XHRcdFx0Q29va2llcy5yZW1vdmUoJ2xhc3Qtc2VydmVyJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENvbm5lY3QgdG8gU0ZTMlggJiBsb2dpblxuXHRcdFx0dGhpcy5fY29ubk1hbmFnZXIuY29ubmVjdChjb25maWcsIHVzZXJuYW1lLCBwYXNzd29yZCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIFJlc3RhcnQgU21hcnRGb3hTZXJ2ZXIuXG5cdCAqL1xuXHRfb25SZXN0YXJ0Q2xpY2soZXZlbnQpXG5cdHtcblx0XHRsZXQgbWVzc2FnZSA9ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gc3RvcCBhbmQgcmVzdGFydCB0aGlzIGluc3RhbmNlIG9mIFNtYXJ0Rm94U2VydmVyIDJYPyc7XG5cdFx0dGhpcy5zaG93Q29uZmlybVdhcm5pbmcobWVzc2FnZSwgJC5wcm94eSh0aGlzLl9vblJlc3RhcnRDb25maXJtRGlhbG9nQ29uZmlybSwgdGhpcykpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbHQgU21hcnRGb3hTZXJ2ZXIuXG5cdCAqL1xuXHRfb25IYWx0Q2xpY2soZXZlbnQpXG5cdHtcblx0XHRsZXQgbWVzc2FnZSA9ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gc3RvcCB0aGlzIGluc3RhbmNlIG9mIFNtYXJ0Rm94U2VydmVyIDJYPzxicj5Zb3Ugd29uXFwndCBiZSBhYmxlIHRvIHJlc3RhcnQgaXQgdXNpbmcgdGhlIEFkbWluaXN0cmF0aW9uIFRvb2wuJztcblx0XHR0aGlzLnNob3dDb25maXJtV2FybmluZyhtZXNzYWdlLCAkLnByb3h5KHRoaXMuX29uSGFsdENvbmZpcm1EaWFsb2dDb25maXJtLCB0aGlzKSk7XG5cdH1cblxuXHQvKipcblx0ICogT3BlbiBvbmxpbmUgZG9jdW1lbnRhdGlvbi5cblx0ICovXG5cdF9vbkhlbHBDbGljayhldmVudClcblx0e1xuXHRcdC8vIE9wZW4gb25saW5lIGRvY1xuXHRcdHdpbmRvdy5vcGVuKGBodHRwOi8vZG9jczJ4LnNtYXJ0Zm94c2VydmVyLmNvbS9HZXR0aW5nU3RhcnRlZC9hZG1pbnRvb2wtJHt0aGlzLl9tb2RNYW5hZ2VyLmN1cnJlbnRNb2R1bGVJZH1gLCAnX2JsYW5rJyk7XG5cdH1cblxuXHQvKipcblx0ICogRGlzY29ubmVjdCBmcm9tIHNlcnZlci5cblx0ICovXG5cdF9vbkRpc2Nvbm5lY3RDbGljayhldmVudClcblx0e1xuXHRcdHRoaXMuX2Nvbm5NYW5hZ2VyLmRpc2Nvbm5lY3QoKTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIENPTk5FQ1RJT04gTUFOQUdFUiBFVkVOVCBMSVNURU5FUlNcblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHRfb25Db25uZWN0aW9uKGV2dFBhcmFtcylcblx0e1xuXHRcdC8vIExvZyBtZXNzYWdlXG5cdFx0dGhpcy5sb2dNZXNzYWdlKGBDb25uZWN0aW9uIHRvICR7dGhpcy5fY29ubk1hbmFnZXIuc21hcnRGb3guY29uZmlnLmhvc3R9OiR7dGhpcy5fY29ubk1hbmFnZXIuc21hcnRGb3guY29uZmlnLnBvcnR9IGVzdGFibGlzaGVkYCk7XG5cdH1cblxuXHRfb25Mb2dpbihldnRQYXJhbXMpXG5cdHtcblx0XHQvLyBMb2cgbWVzc2FnZVxuXHRcdHRoaXMubG9nTWVzc2FnZShgU3VjY2Vzc2Z1bCBsb2dpbiB0byAke3RoaXMuX2Nvbm5NYW5hZ2VyLnNtYXJ0Rm94LmNvbmZpZy5ob3N0fToke3RoaXMuX2Nvbm5NYW5hZ2VyLnNtYXJ0Rm94LmNvbmZpZy5wb3J0fSBwZXJmb3JtZWRgKTtcblxuXHRcdC8vIEdldCBsYXN0IGxvYWRlZCBtb2R1bGUgZnJvbSBjb29raWVzXG5cdFx0bGV0IGxvYWRNb2R1bGVJZCA9IG51bGw7XG5cdFx0bGV0IGRhdGEgPSBDb29raWVzLmdldEpTT04oJ2xhc3QtbW9kdWxlJylcbiAgICAgICAgaWYgKGRhdGEpXG5cdFx0XHRsb2FkTW9kdWxlSWQgPSBkYXRhLmlkO1xuXG5cdFx0Ly8gSW5pdCB0aGUgbW9kdWxlcyBsaXN0IHdpdGggdGhlIGNvbmZpZ3VyYXRpb24gcmV0dXJuZWQgYnkgdGhlIHNlcnZlciBhbmQ6IGxvYWQgbGFzdCBzYXZlZCBtb2R1bGUsIG9yIGZpcnN0IG1vZHVsZSBpbiB0aGUgbGlzdCwgb3IgcGFzc2VkIG1vZHVsZSBpZFxuXHRcdHRoaXMuX21vZE1hbmFnZXIuaW5pdE1vZHVsZXNMaXN0KGV2dFBhcmFtcy5tb2R1bGVzLCBsb2FkTW9kdWxlSWQpO1xuXG5cdFx0Ly8gU2F2ZSBjdXJyZW50IHVwdGltZVxuXHRcdHRoaXMuX3VwdGltZSA9IGV2dFBhcmFtcy5zZXJ2ZXJVcHRpbWU7XG5cblx0XHQvLyBTaG93L2hpZGUgSGFsdCBhbmQgUmVzdGFydCBidXR0b25zIGRlcGVuZGluZyBpZjpcblx0XHQvLyAxKSB0aGlzIGZlYXR1cmUgaXMgc3VwcG9ydGVkIGZvciB0aGUgc2VydmVyIG9wZXJhdGluZyBzeXN0ZW1cblx0XHQvLyAyKSB0aGUgYWRtaW5pc3RyYXRvciB3aG8ganVzdCBsb2dnZWQgaW4gaGFzIHRoZSBwZXJtaXNzaW9uIHRvIGV4ZWN1dGUgdGhlc2UgYWN0aW9uc1xuXHRcdHRoaXMuX3Nob3dIYWx0UmVzdGFydEJ1dHRvbnMoZXZ0UGFyYW1zLnByb2NDb250cm9sRW5hYmxlZCAmJiBldnRQYXJhbXMuYWxsb3dIYWx0KTtcblxuXHRcdC8vIFN3aXRjaCB0byBtb2R1bGVzIHZpZXdcblx0XHR0aGlzLl9nb1RvTW9kdWxlc1ZpZXcoZXZ0UGFyYW1zLnNlcnZlclZlcnNpb24sIGV2dFBhcmFtcy5zZXJ2ZXJOYW1lKTtcblxuXHRcdC8vIElmIGRlZmF1bHQgdXNlcm5hbWUgYW5kIHBhc3N3b3JkIGhhdmUgYmVlbiB1c2VkLi4uXG5cdFx0aWYgKCQoJyNsb2dpblVzZXJuYW1lJykudmFsKCkgPT0gdGhpcy5ERUZBVUxUX1VTRVJOQU1FICYmICQoJyNsb2dpblBhc3N3b3JkJykudmFsKCkgPT0gdGhpcy5ERUZBVUxUX1BBU1NXT1JEKVxuXHRcdHtcblx0XHRcdC8vIC4uLnNob3cgYWxlcnRcblx0XHRcdHRoaXMuc2hvd1NpbXBsZUFsZXJ0KCdZb3UgYXJlIHVzaW5nIHRoZSBkZWZhdWx0IGFkbWluaXN0cmF0aW9uIHByb2ZpbGUgd2hpY2ggaXMgaGlnaGx5IGluc2VjdXJlLCBwbGVhc2UgbWFrZSBzdXJlIHRvIGltbWVkaWF0ZWx5IGNoYW5nZSB0aGUgcGFzc3dvcmQuJyk7XG5cblx0XHRcdC8vIC4uLnNob3cgbm9uLXJlbW92YWJsZSBtZXNzYWdlIGluIGFsZXJ0IGJhclxuXHRcdFx0JCgnI2FsZXJ0LWJhcicpLnNob3coKTtcblx0XHRcdCQoJyNhbGVydC1iYXInKS50ZXh0KCdZb3UgYXJlIHVzaW5nIHRoZSBkZWZhdWx0IGFkbWluaXN0cmF0aW9uIHByb2ZpbGUgd2hpY2ggaXMgaGlnaGx5IGluc2VjdXJlLCBwbGVhc2UgY2hhbmdlIHRoZSBwYXNzd29yZC4nKTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogTGlzdGVuZXIgY2FsbGVkIHdoZW4gdGhlIHVzZXIgZGlzY29ubmVjdGVkIHZvbHVudGFyaWx5LlxuXHQgKi9cblx0X29uRGlzY29ubmVjdGlvbihldnRQYXJhbXMpXG5cdHtcblx0XHQvLyBSZW1vdmUgYW55IHBvcHVwIG9yIGFsZXJ0XG5cdFx0dGhpcy5yZW1vdmVEaWFsb2coKTtcblxuXHRcdC8vIFN3aXRjaCBiYWNrIHRvIGxvZ2luIHZpZXdcblx0XHR0aGlzLl9nb1RvTG9naW5WaWV3KCk7XG5cblx0XHQvLyBIaWRlIG5hdmlnYXRpb24gaWYgb3BlblxuXHRcdHRoaXMuX3RvZ2dsZU5hdihmYWxzZSk7XG5cdH1cblxuXHQvKipcblx0ICogTGlzdGVuZXIgY2FsbGVkIHdoZW4gYW4gZXJyb3IgY2F1c2VkIGEgZGlzY29ubmVjdGlvbi5cblx0ICovXG5cdF9vbkNvbm5NYW5hZ2VyRXJyb3IoZXZ0UGFyYW1zKVxuXHR7XG5cdFx0Ly8gUmVtb3ZlIGFueSBwb3B1cCBvciBhbGVydFxuXHRcdHRoaXMucmVtb3ZlRGlhbG9nKCk7XG5cblx0XHQvLyBMb2cgc3lzdGVtIG1lc3NhZ2Vcblx0XHR0aGlzLmxvZ01lc3NhZ2UoZXZ0UGFyYW1zLm1lc3NhZ2UsICd3YXJuJyk7XG5cblx0XHQvLyBTd2l0Y2ggYmFjayB0byBsb2dpbiB2aWV3XG5cdFx0dGhpcy5fZ29Ub0xvZ2luVmlldygpO1xuXG5cdFx0Ly8gRGlzcGxheSBlcnJvciBpbiBsb2dpbiB2aWV3XG5cdFx0JCgnI2xvZ2luLWVycm9yJykudGV4dChldnRQYXJhbXMubWVzc2FnZSk7XG5cdFx0JCgnI2xvZ2luLWVycm9yJykuc2hvdygpO1xuXHR9XG5cblx0LyoqXG5cdCAqIExpc3RlbmVyIGNhbGxlZCB3aGVuIGFuIHVuZXhwZWN0ZWQgc2VydmVyLXNpZGUgZXJyb3Igb2NjdXJzLlxuXHQgKi9cblx0X29uU2VydmVyRXJyb3IoZXZ0UGFyYW1zKVxuXHR7XG5cdFx0Ly8gU2hvdyBhbiBhbGVydFxuXHRcdHRoaXMuc2hvd1NpbXBsZUFsZXJ0KGV2dFBhcmFtcy5tZXNzYWdlKTtcblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIE9USEVSIEVWRU5UIExJU1RFTkVSU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdF9vbk1vZHVsZUxvYWRlZChldnRQYXJhbXMpXG5cdHtcblx0XHRjb25zdCBtb2R1bGVEYXRhID0gZXZ0UGFyYW1zLm1vZHVsZURhdGE7XG5cblx0XHQvLyBTYXZlIGxhc3QgbG9hZGVkIG1vZHVsZSB0byBjb29raWVzXG5cdFx0Q29va2llcy5zZXQoJ2xhc3QtbW9kdWxlJywge1xuXHRcdFx0aWQ6IG1vZHVsZURhdGEuaWRcblx0XHR9LCB7ZXhwaXJlczogMzB9KTtcblxuXHRcdC8vIERpc3BsYXkgbW9kdWxlIHRpdGxlXG5cdFx0JCgnI21vZHVsZS10aXRsZScpLnNob3coKTtcblx0XHQkKCcjbW9kdWxlLXRpdGxlLWxhYmVsJykudGV4dChtb2R1bGVEYXRhLm5hbWUpO1xuXG5cdFx0Ly8gVGVsbCB0aGUgY2hhdCBtYW5hZ2VyIHdoaWNoIG1vZHVsZSBoYXMgYmVlbiBsb2FkZWRcblx0XHR0aGlzLl9jaGF0TWFuYWdlci5zZXRDdXJyZW50TW9kdWxlKG1vZHVsZURhdGEuaWQpO1xuXG5cdFx0Ly8gQXNzaWduIHRoZSAuc2VsZWN0ZWQgY2xhc3MgdG8gdGhlIHNlbGVjdGVkIG5hdmlnYXRpb24gaXRlbVxuXHRcdCQoJy5uYXYtbWFpbicpLmZpbmQoYFtkYXRhLWlkPScke21vZHVsZURhdGEuaWR9J11gKS5hZGRDbGFzcygnc2VsZWN0ZWQnKS5zaWJsaW5ncygnLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG5cdH1cblxuXHRfb25Nb2R1bGVMb2FkRXJyb3IoZXZ0UGFyYW1zKVxuXHR7XG5cdFx0Ly8gU2hvdyBhbiBhbGVydFxuXHRcdHRoaXMuc2hvd1NpbXBsZUFsZXJ0KGV2dFBhcmFtcy5tZXNzYWdlKTtcblx0fVxuXG5cdF9vblJlc3RhcnRDb25maXJtRGlhbG9nQ29uZmlybSgpXG5cdHtcblx0XHQvLyBTZW5kIHJlc3RhcnQgc2VydmVyIHJlcXVlc3Rcblx0XHR0aGlzLl9jb25uTWFuYWdlci5yZXN0YXJ0U2VydmVyKCk7XG5cdH1cblxuXHRfb25IYWx0Q29uZmlybURpYWxvZ0NvbmZpcm0oKVxuXHR7XG5cdFx0Ly8gU2VuZCBoYWx0IHNlcnZlciByZXF1ZXN0XG5cdFx0dGhpcy5fY29ubk1hbmFnZXIuaGFsdFNlcnZlcigpO1xuXHR9XG5cblx0Ly8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gUFVCTElDIE1FVEhPRFNcblx0Ly8gVGhpcyBtZW1iZXJzIGFyZSB1c2VkIGJ5IHRoZSBzdWItbWFuYWdlcnMgKGkuZS4gQ29ubmVjdGlvbk1hbmFnZXIpXG5cdC8vIG9yIHRoZSBtb2R1bGVzIHRvIGNvbW11bmljYXRlIHdpdGggdGhpcyBzaGVsbCBjb250cm9sbGVyLlxuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdGdldCBzbWFydEZveCgpXG5cdHtcblx0XHRyZXR1cm4gdGhpcy5fY29ubk1hbmFnZXIuc21hcnRGb3g7XG5cdH1cblxuXHRnZXQgaW50VmVyc2lvbigpXG5cdHtcblx0XHR2YXIgdmVyc2lvbiA9IHRoaXMuVkVSU0lPTl9NQUpPUjtcblx0XHR2ZXJzaW9uICs9ICh0aGlzLlZFUlNJT05fTUlOT1IgPCAxMCA/ICcwJyA6ICcnKSArIHRoaXMuVkVSU0lPTl9NSU5PUjtcblx0XHR2ZXJzaW9uICs9ICh0aGlzLlZFUlNJT05fU1VCIDwgMTAgPyAnMCcgOiAnJykgKyB0aGlzLlZFUlNJT05fU1VCO1xuXG5cdFx0cmV0dXJuIE51bWJlcih2ZXJzaW9uKTtcblx0fVxuXG5cdGdldCBzdHJpbmdWZXJzaW9uKClcblx0e1xuXHRcdHJldHVybiB0aGlzLlZFUlNJT05fTUFKT1IgKyAnLicgKyB0aGlzLlZFUlNJT05fTUlOT1IgKyAnLicgKyB0aGlzLlZFUlNJT05fU1VCO1xuXHR9XG5cblx0bG9nTWVzc2FnZShtZXNzYWdlLCB0eXBlID0gJ2xvZycpXG5cdHtcblx0XHRzd2l0Y2ggKHR5cGUpIHtcblx0XHRcdGNhc2UgJ2luZm8nOlxuXHRcdFx0XHRjb25zb2xlLmluZm8oJ1sgQURNSU5UT09MIHwgSU5GTyBdICcgKyBtZXNzYWdlKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlICd3YXJuJzpcblx0XHRcdFx0Y29uc29sZS53YXJuKCdbIEFETUlOVE9PTCB8IFdBUk4gXSAnICsgbWVzc2FnZSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSAnZXJyb3InOlxuXHRcdFx0XHRjb25zb2xlLmVycm9yKCdbIEFETUlOVE9PTCB8IEVSUk9SIF0gJyArIG1lc3NhZ2UpO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdGNvbnNvbGUubG9nKCdbIEFETUlOVE9PTCB8IElORk8gXSAnICsgbWVzc2FnZSk7XG5cdFx0fVxuXHR9XG5cblx0cmVtb3ZlRGlhbG9nKClcblx0e1xuXHRcdC8vIEhpZGUgYW55IHNob3dpbmcgbW9kYWxcblx0XHQkKCcubW9kYWwnKS5tb2RhbCgnaGlkZScpO1xuXG5cdFx0Ly8gSGlkZSBhbnkgc2hvd2luZyB0b2FzdFxuXHRcdCQoJy50b2FzdCcpLnRvYXN0KCdoaWRlJyk7XG5cblx0XHQvLyBSZW1vdmUgc2hlbGwncyBkaWFsb2dcblx0XHRpZiAodGhpcy5fZGlhbG9nICE9IG51bGwpXG5cdFx0e1xuXHRcdFx0dGhpcy5fZGlhbG9nLmNsb3NlKCk7XG5cdFx0XHR0aGlzLl9kaWFsb2cuZGVzdHJveSgpO1xuXHRcdFx0dGhpcy5fZGlhbG9nID0gbnVsbDtcblx0XHR9XG5cblx0XHQvLyBFbmFibGUgdGhlIGZvbGxvd2luZyBpZiBvdGhlciBLZW5kbyBkaWFsb2dzIGFyZSB1c2VkIGluIG1vZHVsZXNcblx0XHQvKlxuXHRcdC8vIFJlbW92ZSBhbnkgb3RoZXIgZGlhbG9nIChpbm5lciB0byBtb2R1bGUpXG5cdFx0JCgnLmstZGlhbG9nLWNvbnRlbnQnKS5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XG5cdFx0XHQvLyBDb25maXJtIGRpYWxvZ1xuXHRcdFx0bGV0IGNvbmZpcm0gPSAkKHRoaXMpLmRhdGEoJ2tlbmRvQ29uZmlybScpO1xuXHRcdFx0aWYgKGNvbmZpcm0pXG5cdFx0XHR7XG5cdFx0XHRcdGNvbmZpcm0uY2xvc2UoKTtcblx0XHRcdFx0Y29uZmlybS5kZXN0cm95KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0Ki9cblx0fVxuXG5cdC8qKlxuXHQgKiBTaG93IHNpbXBsZSBhbGVydC5cblx0ICovXG5cdHNob3dTaW1wbGVBbGVydCh0ZXh0LCBpc1dhcm5pbmcgPSB0cnVlKVxuXHR7XG5cdFx0Ly8gQ3JlYXRlIGFuZCBzaG93IGRpYWxvZ1xuXHRcdHRoaXMuX2RpYWxvZyA9IGtlbmRvLmFsZXJ0KHRleHQpO1xuXHRcdHRoaXMuX2RpYWxvZy50aXRsZShpc1dhcm5pbmcgPyAnV2FybmluZycgOiAnSW5mb3JtYXRpb24nKTtcblxuXHRcdC8vIFNldCBjdXN0b20gY2xhc3MgZm9yIHN0eWxpbmdcblx0XHR0aGlzLl9kaWFsb2cud3JhcHBlci5hZGRDbGFzcyhpc1dhcm5pbmcgPyAnaXMtd2FybmluZycgOiAnaXMtaW5mbycpO1xuXG5cdFx0Ly8gTG9nIG1lc3NhZ2UgdG9vXG5cdFx0Ly8gKHdlIGVuY2Fwc3VsZSB0aGUgdGV4dCBpbiBhIHNwYW4gYW5kIGV4dHJhY3QgdGhlIHRleHQgYWdhaW4gdG8gcmVtb3ZlIGlubmVyIGh0bWwgdGFncylcblx0XHRsZXQgaHRtbCA9ICQoJzxzcGFuPicgKyB0ZXh0ICsgJzwvc3Bhbj4nKTtcblx0XHR0aGlzLmxvZ01lc3NhZ2UoaHRtbC50ZXh0KCksIGlzV2FybmluZyA/ICd3YXJuJyA6ICdpbmZvJyk7XG5cdH1cblxuXHQvKipcblx0ICogU2hvdyBjb25maXJtIGFsZXJ0LlxuXHQgKi9cblx0c2hvd0NvbmZpcm1XYXJuaW5nKHRleHQsIGNvbmZpcm1IYW5kbGVyKVxuXHR7XG5cdFx0Ly8gQ3JlYXRlIGRpYWxvZ1xuXHRcdHRoaXMuX2RpYWxvZyA9ICQoJzxkaXY+PC9kaXY+Jykua2VuZG9Db25maXJtKHtcblx0ICAgICAgdGl0bGU6ICdXYXJuaW5nJyxcblx0ICAgICAgY29udGVudDogdGV4dCxcblx0XHQgIGFjdGlvbnM6IFtcblx0ICAgICAgICAgIHtcblx0ICAgICAgICAgICAgICB0ZXh0OiAnT0snLFxuXHQgICAgICAgICAgICAgIHByaW1hcnk6IHRydWUsXG5cdCAgICAgICAgICAgICAgYWN0aW9uOiBjb25maXJtSGFuZGxlclxuXHQgICAgICAgICAgfSxcblx0ICAgICAgXVxuXHQgIFx0fSkuZGF0YSgna2VuZG9Db25maXJtJyk7XG5cblx0XHQvLyBTZXQgY3VzdG9tIGNsYXNzIGZvciBzdHlsaW5nXG5cdFx0dGhpcy5fZGlhbG9nLndyYXBwZXIuYWRkQ2xhc3MoJ2lzLXdhcm5pbmcnKTtcblxuXHRcdC8vIFNob3cgZGlhbG9nXG5cdFx0dGhpcy5fZGlhbG9nLm9wZW4oKTtcblx0fVxuXG5cdHNob3dOb3RpZmljYXRpb24odGl0bGUsIG1lc3NhZ2UpXG5cdHtcblx0XHQvLyBEaXNwbGF5IG5vdGlmaWNhdGlvblxuXHRcdGxldCB0b2FzdCA9ICQoYFxuXHRcdFx0PGRpdiBjbGFzcz1cInRvYXN0XCIgcm9sZT1cImFsZXJ0XCIgYXJpYS1saXZlPVwiYXNzZXJ0aXZlXCIgYXJpYS1hdG9taWM9XCJ0cnVlXCIgZGF0YS1kZWxheT1cIjQwMDBcIj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRvYXN0LWhlYWRlclwiPlxuXHRcdFx0XHRcdDxzdHJvbmcgY2xhc3M9XCJtci1hdXRvXCI+JHt0aXRsZX08L3N0cm9uZz5cblx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm1sLTIgbWItMSBjbG9zZVwiIGRhdGEtZGlzbWlzcz1cInRvYXN0XCIgYXJpYS1sYWJlbD1cIkNsb3NlXCI+XG5cdFx0XHRcdFx0XHQ8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj4mdGltZXM7PC9zcGFuPlxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRvYXN0LWJvZHlcIj4ke21lc3NhZ2V9PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHRgKTtcblxuXHRcdCQoJy50b2FzdC1jb250YWluZXInKS5hcHBlbmQodG9hc3QpO1xuXHRcdHRvYXN0LnRvYXN0KCdzaG93Jyk7XG5cblx0XHQvLyBMb2cgbWVzc2FnZSB0b29cblx0XHQvLyAod2UgZW5jYXBzdWxlIHRoZSB0ZXh0IGluIGEgc3BhbiBhbmQgZXh0cmFjdCB0aGUgdGV4dCBhZ2FpbiB0byByZW1vdmUgaW5uZXIgaHRtbCB0YWdzKVxuXHRcdGxldCBodG1sID0gJCgnPHNwYW4+JyArIHRpdGxlICsgJyAtICcgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcblx0XHR0aGlzLmxvZ01lc3NhZ2UoaHRtbC50ZXh0KCksICdpbmZvJyk7XG5cblx0fVxuXG5cdC8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFBSSVZBVEUgTUVUSE9EU1xuXHQvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdF9pbml0Vmlld3MoKVxuXHR7XG5cdFx0Ly8gSW5pdGlhbGl6ZSBsb2dpbiB2aWV3XG5cdFx0dGhpcy5faW5pdExvZ2luVmlldygpO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBtb2R1bGUgdmlld1xuXHRcdHRoaXMuX2luaXRNb2R1bGVWaWV3KCk7XG5cdH1cblxuXHQvKipcblx0ICogU3dpdGNoIHZpZXcgaW4gdG9wIHZpZXcgc3RhY2suXG5cdCAqIEBwYXJhbSAge3N0cmluZ30gdmlld0lkIElkZW50aWZpZXIgb2YgdGhlIHZpZXdzdGFzayBjaGlsZCB0byBkaXNwbGF5LlxuXHQgKi9cblx0X3N3aXRjaFNoZWxsVmlldyh2aWV3SWQpXG5cdHtcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hlbGwnKS5zZWxlY3RlZEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh2aWV3SWQpO1xuXG5cdFx0Ly8gKGpRdWVyeSBhbHRlcm5hdGl2ZSlcblx0XHQvLyAkKCcjc2hlbGwnKVswXS5zZWxlY3RlZEVsZW1lbnQgPSAkKCcjc2hlbGwnKS5jaGlsZHJlbignIycgKyB2aWV3SWQpWzBdO1xuXHR9XG5cblx0LyoqXG5cdCAqIEVuYWJsZS9kaXNhYmxlIGxvZ2luIGZvcm0uXG5cdCAqL1xuXHRfZW5hYmxlTG9naW5Gb3JtKGVuYWJsZSlcblx0e1xuXHRcdC8vIEVuYWJsZS9kaXNhYmxlIGZpZWxkc2V0ICh3b3JrcyBmb3IgYWxsIG5vbi1rZW5kbyBpbnB1dHMpXG5cdFx0JCgnI2xvZ2luRm9ybSBmaWVsZHNldCcpLnByb3AoJ2Rpc2FibGVkJywgIWVuYWJsZSk7XG5cblx0XHQvLyBFbmFibGUvZGlzYWJsZSBudW1lcmljIHRleHRib3hcblx0XHQkKCcjbG9naW5Qb3J0JykuZGF0YSgna2VuZG9OdW1lcmljVGV4dEJveCcpLmVuYWJsZShlbmFibGUpO1xuXHR9XG5cblx0X3RvZ2dsZU5hdihib29sKVxuXHR7XG5cdFx0JCgnLm5hdi1jb250YWluZXIsIC5uYXYtb3ZlcmxheScpLnRvZ2dsZUNsYXNzKCdpcy12aXNpYmxlJywgYm9vbCk7XG5cdFx0JCgnLm1vZHVsZS1jb250YWluZXInKS50b2dnbGVDbGFzcygnc2NhbGUtZG93bicsIGJvb2wpO1xuXHR9XG5cblx0X2dldFVybFBhcmFtZXRlcihwYXJhbSlcblx0e1xuXHRcdGxldCBwYWdlVVJMID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHJpbmcoMSk7XG5cdFx0bGV0IHVybFZhcmlhYmxlcyA9IHBhZ2VVUkwuc3BsaXQoJyYnKTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdXJsVmFyaWFibGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRsZXQgcGFyYW1OYW1lID0gdXJsVmFyaWFibGVzW2ldLnNwbGl0KCc9Jyk7XG5cdFx0XHRpZiAocGFyYW1OYW1lWzBdID09IHBhcmFtICYmIHBhcmFtTmFtZVsxXSAhPSAnJylcblx0XHRcdFx0cmV0dXJuIHBhcmFtTmFtZVsxXTtcblx0XHR9XG5cblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdF9nb1RvTG9naW5WaWV3KClcblx0e1xuXHRcdC8vIENsZWFyIHBhc3N3b3JkIGZpZWxkXG5cdFx0JCgnI2xvZ2luUGFzc3dvcmQnKS52YWwoJycpO1xuXG5cdFx0Ly8gU3dpdGNoIHRvIGxvZ2luIHZpZXdcblx0XHR0aGlzLl9zd2l0Y2hTaGVsbFZpZXcoJ2xvZ2luLXZpZXcnKTtcblxuXHRcdC8vIFVubG9hZCBjdXJyZW50IG1vZHVsZVxuXHRcdHRoaXMuX21vZE1hbmFnZXIudW5sb2FkTW9kdWxlKCk7XG5cblx0XHQvLyBFbmFibGUgbG9naW4gZm9ybVxuXHRcdHRoaXMuX2VuYWJsZUxvZ2luRm9ybSh0cnVlKTtcblxuXHRcdC8vIFJlbW92ZSB1cHRpbWUgdXBkYXRlclxuXHRcdGNsZWFySW50ZXJ2YWwodGhpcy5fdXB0aW1lVGltZXIpO1xuXHR9XG5cblx0X2dvVG9Nb2R1bGVzVmlldyhzZXJ2ZXJWZXJzaW9uLCBzZXJ2ZXJOYW1lKVxuXHR7XG5cdFx0Ly8gSGlkZSBtb2R1bGUgdGl0bGVcblx0XHQkKCcjbW9kdWxlLXRpdGxlJykuaGlkZSgpO1xuXHRcdCQoJyNtb2R1bGUtdGl0bGUtbGFiZWwnKS50ZXh0KCcnKTtcblxuXHRcdC8vIEhpZGUgYWxlcnQgYmFyXG5cdFx0JCgnI2FsZXJ0LWJhcicpLmhpZGUoKTtcblxuXHRcdC8vIFNob3cgc2VydmVyIHZlcnNpb24gaW4gdGhlIGhlYWRlclxuXHRcdCQoJyNzZnMtdmVyc2lvbi12YWx1ZScpLnRleHQoc2VydmVyVmVyc2lvbik7XG5cblx0XHQvLyBTZXQgc2VydmVyIG5hbWUsIElQIGFuZCBwb3J0IGluIG1vZHVsZSdzIHRpdGxlIGJhclxuXHRcdGxldCBob3N0ID0gYCR7dGhpcy5fY29ubk1hbmFnZXIuc21hcnRGb3guY29uZmlnLmhvc3R9OiR7dGhpcy5fY29ubk1hbmFnZXIuc21hcnRGb3guY29uZmlnLnBvcnR9YCArIChzZXJ2ZXJOYW1lICE9ICcnID8gYCBbJHtzZXJ2ZXJOYW1lfV1gIDogJycpO1xuXHRcdCQoJyNob3N0LWxhYmVsJykudGV4dChob3N0KTtcblxuXHRcdC8vIFNhdmUgY3VycmVudCBTRlMgdmVyc2lvblxuXHRcdHRoaXMuX2N1cnJlbnRTZnNWZXJzaW9uID0gc2VydmVyVmVyc2lvbjtcblxuXHRcdC8vIENoZWNrIG5ldyBTRlMgdmVyc2lvbiBhdmFpbGFiaWxpdHlcblx0XHR0aGlzLl9jaGVja0F2YWlsYWJsZVNmc1ZlcnNpb24oKTtcblxuXHRcdC8vIFN0YXJ0IHVwdGltZSB1cGRhdGVyXG5cdFx0dGhpcy5fdXB0aW1lVGltZXIgPSBzZXRJbnRlcnZhbCgkLnByb3h5KHRoaXMuX3VwZGF0ZVVwdGltZSwgdGhpcyksIDEwMDApO1xuXG5cdFx0Ly8gU3dpdGNoIHRvIG1vZHVsZXMgdmlld1xuXHRcdHRoaXMuX3N3aXRjaFNoZWxsVmlldygnbW9kdWxlLXZpZXcnKTtcblx0fVxuXG5cdF9zaG93SGFsdFJlc3RhcnRCdXR0b25zKHNob3cpXG5cdHtcblx0XHRpZiAoc2hvdylcblx0XHR7XG5cdFx0XHQkKCcjcmVzdGFydC1idXR0b24nKS5zaG93KCk7XG5cdFx0XHQkKCcjaGFsdC1idXR0b24nKS5zaG93KCk7XG5cdFx0fVxuXHRcdGVsc2Vcblx0XHR7XG5cdFx0XHQkKCcjcmVzdGFydC1idXR0b24nKS5oaWRlKCk7XG5cdFx0XHQkKCcjaGFsdC1idXR0b24nKS5oaWRlKCk7XG5cdFx0fVxuXHR9XG5cblx0X2NoZWNrQXZhaWxhYmxlU2ZzVmVyc2lvbigpXG5cdHtcblx0XHQvLyBSZW1vdmUgY2xhc3MgdG8gaGlkZSB1cGRhdGUgYnV0dG9uIHN0eWxlIGFuZCBub3RpZmljYXRpb24gaWNvblxuXHRcdCQoJyNzZnMtdmVyc2lvbicpLnJlbW92ZUNsYXNzKCdpcy1hY3RpdmUnKTtcblxuXHRcdC8vIFJlbW92ZSB1cGRhdGUgYnV0dG9uIGNsaWNrIGxpc3RlbmVyc1xuXHRcdCQoJyNzZnMtdmVyc2lvbi1idXR0b24nKS5vZmYoJ2NsaWNrJyk7XG5cblx0XHQvLyBMb2FkIGZpbGUgY29udGFpbmluZyBsYXRlc3QgU0ZTIHZlcnNpb24gaW5mb1xuXHRcdCQuYWpheCh7XG5cdFx0XHR0eXBlOiAnR0VUJyxcblx0XHRcdHVybDogJ2h0dHBzOi8vd3d3LnNtYXJ0Zm94c2VydmVyLmNvbS9kb3dubG9hZHMvc2ZzMngvbGF0ZXN0VmVyc2lvbi50eHQnLFxuICAgICAgICBcdGRhdGFUeXBlOiAndGV4dCcsXG5cdFx0XHRzdWNjZXNzOiAkLnByb3h5KHRoaXMuX29uTGF0ZXN0U2ZzVmVyc2lvbkluZm9Mb2FkZWQsIHRoaXMpLFxuXHRcdFx0ZXJyb3I6ICQucHJveHkoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHRoaXMubG9nTWVzc2FnZSgnVW5hYmxlIHRvIGNoZWNrIG5ldyBzZXJ2ZXIgdmVyc2lvbiBhdmFpbGFiaWxpdHkgb24gU21hcnRGb3hTZXJ2ZXIgd2Vic2l0ZScsICd3YXJuJyk7XG5cdFx0XHR9LCB0aGlzKVxuXHRcdH0pO1xuXHR9XG5cblx0X29uTGF0ZXN0U2ZzVmVyc2lvbkluZm9Mb2FkZWQoZGF0YSlcblx0e1xuXHRcdC8vIFBhcnNlIHJldHVybmVkIGRhdGFcblx0XHRjb25zdCB2ID0gcGFyc2UoZGF0YSk7XG5cblx0XHRpZiAodi52ZXJzaW9uICE9IG51bGwgJiYgdGhpcy5faXNTZnNWZXJzaW9uTmV3ZXIodi52ZXJzaW9uLCB0aGlzLl9jdXJyZW50U2ZzVmVyc2lvbikpXG5cdFx0e1xuXHRcdFx0dGhpcy50ZW1wZmxhZyA9IHRydWU7XG5cdFx0XHR0aGlzLmxvZ01lc3NhZ2UoJ0FuIHVwZGF0ZWQgdmVyc2lvbiBvZiBTbWFydEZveFNlcnZlciAyWCBpcyBhdmFpbGFibGUgZm9yIGRvd25sb2FkJywgJ2luZm8nKTtcblxuXHRcdFx0Ly8gU2V0IHVwZ3JhZGUgZGlhbG9nIGRldGFpbHNcblx0XHRcdHRoaXMuX3Nmc1VwZGF0ZURldGFpbHMgPSB2O1xuXG5cdFx0XHQvLyBBZGQgbGlzdGVuZXIgdG8gc2hvdyBTRlMgdmVyc2lvbiB1cGRhdGUgbW9kYWxcblx0XHRcdCQoJyNzZnMtdmVyc2lvbi1idXR0b24nKS5jbGljayhmdW5jdGlvbigpIHtcblx0XHRcdFx0JCgnI3NlcnZlclVwZGF0ZU1vZGFsJykubW9kYWwoe1xuXHRcdFx0XHRcdGJhY2tkcm9wOiAnc3RhdGljJyxcblx0XHRcdFx0XHRrZXlib2FyZDogZmFsc2UsXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIFNldCBjbGFzcyB0byBzaG93IHVwZGF0ZSBidXR0b24gc3R5bGUgYW5kIG5vdGlmaWNhdGlvbiBpY29uXG5cdFx0XHQkKCcjc2ZzLXZlcnNpb24nKS5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XG5cblx0XHRcdC8vIFVwZGF0ZSBtb2RhbCBjb250ZW50XG5cdFx0XHRjb25zdCBuZXdWZXIgPSB0aGlzLl9zZnNVcGRhdGVEZXRhaWxzO1xuXHRcdFx0Y29uc3QgY3VyclZlciA9IHRoaXMuX2N1cnJlbnRTZnNWZXJzaW9uO1xuXG5cdFx0XHRsZXQgbW9kYWwgPSAkKCcjc2VydmVyVXBkYXRlTW9kYWwnKTtcblxuXHRcdFx0Ly8gVXBkYXRlIG1vZGFsIGNvbnRlbnRcblx0XHRcdCQoJyNuZXdWZXJzTGInLCBtb2RhbCkudGV4dChuZXdWZXIudmVyc2lvbik7XG5cdFx0XHQkKCcjdXBkVHlwZUxiJywgbW9kYWwpLnRleHQobmV3VmVyLmlzUGF0Y2ggPyAncGF0Y2gnIDogJ2Z1bGwgaW5zdGFsbGVyJyk7XG5cdFx0XHQkKCcjcmVxVmVyc0xiJywgbW9kYWwpLnRleHQobmV3VmVyLmlzUGF0Y2ggPyAnIChyZXF1aXJlcyB2ZXJzaW9uICcgKyBuZXdWZXIucmVxdWlyZXMgKyAnIG9yIGxhdGVyKScgOiAnJyk7XG5cdFx0XHQkKCcjY3VyclZlcnNMYicsIG1vZGFsKS50ZXh0KGN1cnJWZXIpO1xuXHRcdFx0JCgnI3NlcnZlclVwZGF0ZU1vZGFsTGluaycsIG1vZGFsKS5hdHRyKCdocmVmJywgbmV3VmVyLnVybCk7XG5cdFx0fVxuXHR9XG5cblx0X2lzU2ZzVmVyc2lvbk5ld2VyKGF2YWlsYWJsZVZlciwgY3VycmVudFZlcilcblx0e1xuXHRcdGNvbnN0IE1BSiA9IDA7XG5cdFx0Y29uc3QgTUlOID0gMTtcblx0XHRjb25zdCBTVUIgPSAyO1xuXG5cdFx0Y29uc3QgYXZhaWxhYmxlID0gYXZhaWxhYmxlVmVyLnNwbGl0KCcuJyk7XG5cdFx0Y29uc3QgY3VycmVudCA9IGN1cnJlbnRWZXIuc3BsaXQoJy4nKTtcblxuXHRcdC8vIENoZWNrIG1ham9yIHZlcnNpb25cblx0XHRpZiAoYXZhaWxhYmxlW01BSl0gPiBjdXJyZW50W01BSl0pXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRlbHNlIGlmIChhdmFpbGFibGVbTUFKXSA9PSBjdXJyZW50W01BSl0pXG5cdFx0e1xuXHRcdFx0Ly8gQ2hlY2sgbWlub3IgdmVyc2lvblxuXHRcdFx0aWYgKGF2YWlsYWJsZVtNSU5dID4gY3VycmVudFtNSU5dKVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdGVsc2UgaWYgKGF2YWlsYWJsZVtNSU5dID09IGN1cnJlbnRbTUlOXSlcblx0XHRcdHtcblx0XHRcdFx0Ly8gQ2hlY2sgc3ViIHZlcnNpb25cblx0XHRcdFx0aWYgKGF2YWlsYWJsZVtTVUJdID4gY3VycmVudFtTVUJdKVxuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdF91cGRhdGVVcHRpbWUoKVxuXHR7XG5cdFx0bGV0IGRheXMgPSB0aGlzLl91cHRpbWVbMF07XG5cdFx0bGV0IGhvdXJzID0gdGhpcy5fdXB0aW1lWzFdO1xuXHRcdGxldCBtaW51dGVzID0gdGhpcy5fdXB0aW1lWzJdO1xuXHRcdGxldCBzZWNvbmRzID0gdGhpcy5fdXB0aW1lWzNdICsgMTtcblxuXHRcdGlmIChzZWNvbmRzID4gNTkpXG5cdFx0e1xuXHRcdFx0c2Vjb25kcyA9IDA7XG5cdFx0XHRtaW51dGVzICs9IDE7XG5cblx0XHRcdGlmIChtaW51dGVzID4gNTkpXG5cdFx0XHR7XG5cdFx0XHRcdG1pbnV0ZXMgPSAwO1xuXHRcdFx0XHRob3VycyArPSAxO1xuXG5cdFx0XHRcdGlmIChob3VycyA+IDIzKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aG91cnMgPSAwO1xuXHRcdFx0XHRcdGRheXMgKz0gMTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMuX3VwdGltZVszXSA9IHNlY29uZHM7XG5cdFx0dGhpcy5fdXB0aW1lWzJdID0gbWludXRlcztcblx0XHR0aGlzLl91cHRpbWVbMV0gPSBob3Vycztcblx0XHR0aGlzLl91cHRpbWVbMF0gPSBkYXlzO1xuXG5cdFx0Ly8gU2VuZCB1cGRhdGVkIHVwdGltZSB0byBjdXJyZW50IG1vZHVsZSAoaWYgbG9hZGVkKVxuXHRcdGxldCBtb2R1bGUgPSB0aGlzLl9tb2RNYW5hZ2VyLmN1cnJlbnRNb2R1bGU7XG5cdFx0aWYgKG1vZHVsZSAhPSBudWxsKVxuXHRcdFx0bW9kdWxlLm9uVXB0aW1lVXBkYXRlZCh0aGlzLl91cHRpbWUpO1xuXHR9XG59XG4iLCJjb25zdCBhdENvbW1lbnQgPSAoc3JjLCBvZmZzZXQpID0+IHtcbiAgY29uc3QgY2ggPSBzcmNbb2Zmc2V0XVxuICByZXR1cm4gY2ggPT09ICcjJyB8fCBjaCA9PT0gJyEnXG59XG5cbmNvbnN0IGF0TGluZUVuZCA9IChzcmMsIG9mZnNldCkgPT4ge1xuICBjb25zdCBjaCA9IHNyY1tvZmZzZXRdXG4gIHJldHVybiAhY2ggfHwgY2ggPT09ICdcXHInIHx8IGNoID09PSAnXFxuJ1xufVxuXG5jb25zdCBlbmRPZkluZGVudCA9IChzcmMsIG9mZnNldCkgPT4ge1xuICBsZXQgY2ggPSBzcmNbb2Zmc2V0XVxuICB3aGlsZSAoY2ggPT09ICdcXHQnIHx8IGNoID09PSAnXFxmJyB8fCBjaCA9PT0gJyAnKSB7XG4gICAgb2Zmc2V0ICs9IDFcbiAgICBjaCA9IHNyY1tvZmZzZXRdXG4gIH1cbiAgcmV0dXJuIG9mZnNldFxufVxuXG5jb25zdCBlbmRPZkNvbW1lbnQgPSAoc3JjLCBvZmZzZXQpID0+IHtcbiAgbGV0IGNoID0gc3JjW29mZnNldF1cbiAgd2hpbGUgKGNoICYmIGNoICE9PSAnXFxyJyAmJiBjaCAhPT0gJ1xcbicpIHtcbiAgICBvZmZzZXQgKz0gMVxuICAgIGNoID0gc3JjW29mZnNldF1cbiAgfVxuICByZXR1cm4gb2Zmc2V0XG59XG5cbmNvbnN0IGVuZE9mS2V5ID0gKHNyYywgb2Zmc2V0KSA9PiB7XG4gIGxldCBjaCA9IHNyY1tvZmZzZXRdXG4gIHdoaWxlIChjaCAmJiBjaCAhPT0gJ1xccicgJiYgY2ggIT09ICdcXG4nICYmIGNoICE9PSAnXFx0JyAmJiBjaCAhPT0gJ1xcZicgJiYgY2ggIT09ICcgJyAmJiBjaCAhPT0gJzonICYmIGNoICE9PSAnPScpIHtcbiAgICBpZiAoY2ggPT09ICdcXFxcJykge1xuICAgICAgaWYgKHNyY1tvZmZzZXQgKyAxXSA9PT0gJ1xcbicpIHtcbiAgICAgICAgb2Zmc2V0ID0gZW5kT2ZJbmRlbnQoc3JjLCBvZmZzZXQgKyAyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2Zmc2V0ICs9IDJcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb2Zmc2V0ICs9IDFcbiAgICB9XG4gICAgY2ggPSBzcmNbb2Zmc2V0XVxuICB9XG4gIHJldHVybiBvZmZzZXRcbn1cblxuY29uc3QgZW5kT2ZTZXBhcmF0b3IgPSAoc3JjLCBvZmZzZXQpID0+IHtcbiAgbGV0IGNoID0gc3JjW29mZnNldF1cbiAgbGV0IGhhc0VxU2lnbiA9IGZhbHNlXG4gIGxvb3A6IHdoaWxlIChjaCA9PT0gJ1xcdCcgfHwgY2ggPT09ICdcXGYnIHx8IGNoID09PSAnICcgfHwgY2ggPT09ICc9JyB8fCBjaCA9PT0gJzonIHx8IGNoID09PSAnXFxcXCcpIHtcbiAgICBzd2l0Y2ggKGNoKSB7XG4gICAgICBjYXNlICdcXFxcJzpcbiAgICAgICAgaWYgKHNyY1tvZmZzZXQgKyAxXSAhPT0gJ1xcbicpIGJyZWFrIGxvb3BcbiAgICAgICAgb2Zmc2V0ID0gZW5kT2ZJbmRlbnQoc3JjLCBvZmZzZXQgKyAyKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnPSc6XG4gICAgICBjYXNlICc6JzpcbiAgICAgICAgaWYgKGhhc0VxU2lnbikgYnJlYWsgbG9vcFxuICAgICAgICBoYXNFcVNpZ24gPSB0cnVlXG4gICAgICAgIC8vIGZhbGx0aHJvdWdoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBvZmZzZXQgKz0gMVxuICAgIH1cbiAgICBjaCA9IHNyY1tvZmZzZXRdXG4gIH1cbiAgcmV0dXJuIG9mZnNldFxufVxuXG5jb25zdCBlbmRPZlZhbHVlID0gKHNyYywgb2Zmc2V0KSA9PiB7XG4gIGxldCBjaCA9IHNyY1tvZmZzZXRdXG4gIHdoaWxlIChjaCAmJiBjaCAhPT0gJ1xccicgJiYgY2ggIT09ICdcXG4nKSB7XG4gICAgb2Zmc2V0ICs9IGNoID09PSAnXFxcXCcgPyAyIDogMVxuICAgIGNoID0gc3JjW29mZnNldF1cbiAgfVxuICByZXR1cm4gb2Zmc2V0XG59XG5cbmNvbnN0IHVuZXNjYXBlID0gKHN0cikgPT4gc3RyLnJlcGxhY2UoL1xcXFwodVswLTlhLWZBLUZdezR9fFxccj9cXG5bIFxcdFxcZl0qfC4pPy9nLCAobWF0Y2gsIGNvZGUpID0+IHtcbiAgc3dpdGNoIChjb2RlICYmIGNvZGVbMF0pIHtcbiAgICBjYXNlICdmJzogcmV0dXJuICdcXGYnXG4gICAgY2FzZSAnbic6IHJldHVybiAnXFxuJ1xuICAgIGNhc2UgJ3InOiByZXR1cm4gJ1xccidcbiAgICBjYXNlICd0JzogcmV0dXJuICdcXHQnXG4gICAgY2FzZSAndSc6XG4gICAgICBjb25zdCBjID0gcGFyc2VJbnQoY29kZS5zdWJzdHIoMSksIDE2KVxuICAgICAgcmV0dXJuIGlzTmFOKGMpID8gY29kZSA6IFN0cmluZy5mcm9tQ2hhckNvZGUoYylcbiAgICBjYXNlICdcXHInOlxuICAgIGNhc2UgJ1xcbic6XG4gICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICByZXR1cm4gJydcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGNvZGVcbiAgfVxufSlcblxuLyoqXG4gKiBTcGxpdHMgdGhlIGlucHV0IHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIGxvZ2ljYWwgbGluZXNcbiAqXG4gKiBLZXktdmFsdWUgcGFpcnMgYXJlIFtrZXksIHZhbHVlXSBhcnJheXMgd2l0aCBzdHJpbmcgdmFsdWVzLiBFc2NhcGUgc2VxdWVuY2VzXG4gKiBpbiBrZXlzIGFuZCB2YWx1ZXMgYXJlIHBhcnNlZC4gRW1wdHkgbGluZXMgYXJlIGluY2x1ZGVkIGFzIGVtcHR5IHN0cmluZ3MsIGFuZFxuICogY29tbWVudHMgYXMgc3RyaW5ncyB0aGF0IHN0YXJ0IHdpdGggJyMnIG9yICchIGNoYXJhY3RlcnMuIExlYWRpbmcgd2hpdGVzcGFjZVxuICogaXMgbm90IGluY2x1ZGVkLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly9kb2NzLm9yYWNsZS5jb20vamF2YXNlLzkvZG9jcy9hcGkvamF2YS91dGlsL1Byb3BlcnRpZXMuaHRtbCNsb2FkKGphdmEuaW8uUmVhZGVyKVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBzcmNcbiAqIEByZXR1cm5zIEFycmF5PHN0cmluZyB8IHN0cmluZ1tdXT5cbiAqL1xuZnVuY3Rpb24gcGFyc2VMaW5lcyAoc3JjKSB7XG4gIGNvbnN0IGxpbmVzID0gW11cbiAgZm9yIChpID0gMDsgaSA8IHNyYy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChzcmNbaV0gPT09ICdcXG4nICYmIHNyY1tpIC0gMV0gPT09ICdcXHInKSBpICs9IDFcbiAgICBpZiAoIXNyY1tpXSkgYnJlYWtcbiAgICBjb25zdCBrZXlTdGFydCA9IGVuZE9mSW5kZW50KHNyYywgaSlcbiAgICBpZiAoYXRMaW5lRW5kKHNyYywga2V5U3RhcnQpKSB7XG4gICAgICBsaW5lcy5wdXNoKCcnKVxuICAgICAgaSA9IGtleVN0YXJ0XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICBpZiAoYXRDb21tZW50KHNyYywga2V5U3RhcnQpKSB7XG4gICAgICBjb25zdCBjb21tZW50RW5kID0gZW5kT2ZDb21tZW50KHNyYywga2V5U3RhcnQpXG4gICAgICBsaW5lcy5wdXNoKHNyYy5zbGljZShrZXlTdGFydCwgY29tbWVudEVuZCkpXG4gICAgICBpID0gY29tbWVudEVuZFxuICAgICAgY29udGludWVcbiAgICB9XG4gICAgY29uc3Qga2V5RW5kID0gZW5kT2ZLZXkoc3JjLCBrZXlTdGFydClcbiAgICBjb25zdCBrZXkgPSB1bmVzY2FwZShzcmMuc2xpY2Uoa2V5U3RhcnQsIGtleUVuZCkpXG4gICAgY29uc3QgdmFsdWVTdGFydCA9IGVuZE9mU2VwYXJhdG9yKHNyYywga2V5RW5kKVxuICAgIGlmIChhdExpbmVFbmQoc3JjLCB2YWx1ZVN0YXJ0KSkge1xuICAgICAgbGluZXMucHVzaChba2V5LCAnJ10pXG4gICAgICBpID0gdmFsdWVTdGFydFxuICAgICAgY29udGludWVcbiAgICB9XG4gICAgY29uc3QgdmFsdWVFbmQgPSBlbmRPZlZhbHVlKHNyYywgdmFsdWVTdGFydClcbiAgICBjb25zdCB2YWx1ZSA9IHVuZXNjYXBlKHNyYy5zbGljZSh2YWx1ZVN0YXJ0LCB2YWx1ZUVuZCkpXG4gICAgbGluZXMucHVzaChba2V5LCB2YWx1ZV0pXG4gICAgaSA9IHZhbHVlRW5kXG4gIH1cbiAgcmV0dXJuIGxpbmVzXG59XG5cbi8qKlxuICogUGFyc2VzIGFuIGlucHV0IHN0cmluZyByZWFkIGZyb20gYSAucHJvcGVydGllcyBmaWxlIGludG8gYSBKYXZhU2NyaXB0IE9iamVjdFxuICpcbiAqIElmIHRoZSBzZWNvbmQgYHBhdGhgIHBhcmFtZXRlciBpcyB0cnVlLCBkb3RzICcuJyBpbiBrZXlzIHdpbGwgcmVzdWx0IGluIGFcbiAqIG11bHRpLWxldmVsIG9iamVjdCAodXNlIGEgc3RyaW5nIHZhbHVlIHRvIGN1c3RvbWlzZSkuIElmIGEgcGFyZW50IGxldmVsIGlzXG4gKiBkaXJlY3RseSBhc3NpZ25lZCBhIHZhbHVlIHdoaWxlIGl0IGFsc28gaGFzIGEgY2hpbGQgd2l0aCBhbiBhc3NpZ25lZCB2YWx1ZSxcbiAqIHRoZSBwYXJlbnQgdmFsdWUgd2lsbCBiZSBhc3NpZ25lZCB0byBpdHMgZW1wdHkgc3RyaW5nICcnIGtleS4gUmVwZWF0ZWQga2V5c1xuICogd2lsbCB0YWtlIHRoZSBsYXN0IGFzc2lnbmVkIHZhbHVlLiBLZXkgb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQsIGJ1dCBpcyBsaWtlbHlcbiAqIHRvIG1hdGNoIHRoZSBvcmRlciBvZiB0aGUgaW5wdXQgbGluZXMuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNyY1xuICogQHBhcmFtIHtib29sZWFuIHwgc3RyaW5nfSBbcGF0aD1mYWxzZV1cbiAqL1xuZnVuY3Rpb24gcGFyc2UgKHNyYywgcGF0aCkge1xuICBjb25zdCBwYXRoU2VwID0gdHlwZW9mIHBhdGggPT09ICdzdHJpbmcnID8gcGF0aCA6ICcuJ1xuICByZXR1cm4gcGFyc2VMaW5lcyhzcmMpLnJlZHVjZSgocmVzLCBsaW5lKSA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobGluZSkpIHtcbiAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGxpbmVcbiAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgIGNvbnN0IGtleVBhdGggPSBrZXkuc3BsaXQocGF0aFNlcClcbiAgICAgICAgbGV0IHBhcmVudCA9IHJlc1xuICAgICAgICB3aGlsZSAoa2V5UGF0aC5sZW5ndGggPj0gMikge1xuICAgICAgICAgIGNvbnN0IHAgPSBrZXlQYXRoLnNoaWZ0KClcbiAgICAgICAgICBpZiAoIXBhcmVudFtwXSkge1xuICAgICAgICAgICAgcGFyZW50W3BdID0ge31cbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJlbnRbcF0gIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBwYXJlbnRbcF0gPSB7ICcnOiBwYXJlbnRbcF0gfVxuICAgICAgICAgIH1cbiAgICAgICAgICBwYXJlbnQgPSBwYXJlbnRbcF1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBsZWFmID0ga2V5UGF0aFswXVxuICAgICAgICBpZiAodHlwZW9mIHBhcmVudFtsZWFmXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBwYXJlbnRbbGVhZl1bJyddID0gdmFsdWVcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJlbnRbbGVhZl0gPSB2YWx1ZVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNba2V5XSA9IHZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXNcbiAgfSwge30pXG59XG5cbm1vZHVsZS5leHBvcnRzID0geyBwYXJzZSwgcGFyc2VMaW5lcyB9XG4iLCJleHBvcnQgY2xhc3MgRXZlbnREaXNwYXRjaGVyIHtcblx0Y29uc3RydWN0b3IoKSB7XG5cdFx0dGhpcy5fbGlzdGVuZXJzQnlFdmVudCA9IHt9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJlZ2lzdGVycyBhbiBldmVudCBsaXN0ZW5lciBmdW5jdGlvbiB0aGF0IHdpbGwgcmVjZWl2ZSBub3RpZmljYXRpb24gb2YgYW4gZXZlbnQuXG5cdCAqXG5cdCAqIDxwPklmIHlvdSBubyBsb25nZXIgbmVlZCBhbiBldmVudCBsaXN0ZW5lciwgcmVtb3ZlIGl0IGJ5IGNhbGxpbmcgdGhlIDxlbT5yZW1vdmVFdmVudExpc3RlbmVyKCk8L2VtPiBtZXRob2QsIG9yIG1lbW9yeSBpc3N1ZXMgY291bGQgYXJpc2UuXG5cdCAqIEluIGZhY3QgZXZlbnQgbGlzdGVuZXJzIGFyZSBub3QgYXV0b21hdGljYWxseSByZW1vdmVkIGZyb20gbWVtb3J5LjwvcD5cblx0ICpcblx0ICogQHBhcmFtXHR7c3RyaW5nfSBldnRUeXBlXHRUaGUgdHlwZSBvZiBldmVudCB0byBsaXN0ZW4gdG8uXG5cdCAqIEBwYXJhbVx0e2Z1bmN0aW9ufSBjYWxsYmFja1x0VGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRoYXQgcHJvY2Vzc2VzIHRoZSBldmVudC4gVGhpcyBmdW5jdGlvbiBzaG91bGQgYWNjZXB0IGFuIG9iamVjdCBhcyBpdHMgb25seSBwYXJhbWV0ZXIsIHdoaWNoIGluIHR1cm4gY29udGFpbnMgdGhlIGV2ZW50IHBhcmFtZXRlcnMuXG5cdCAqIEBwYXJhbVx0e29iamVjdH0gc2NvcGVcdFx0VGhlIG9iamVjdCB0aGF0IGFjdHMgYXMgYSBjb250ZXh0IGZvciB0aGUgZXZlbnQgbGlzdGVuZXI6IGl0IGlzIHRoZSBvYmplY3QgdGhhdCBhY3RzIGFzIGEgXCJwYXJlbnQgc2NvcGVcIiBmb3IgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uLCB0aHVzIHByb3ZpZGluZyBjb250ZXh0IChpLmUuIGFjY2VzcyB0byB2YXJpYWJsZXMgYW5kIG90aGVyIG1laHRvZHMpIHRvIHRoZSBmdW5jdGlvbiBpdHNlbGYuXG5cdCAqL1xuXHRhZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGNhbGxiYWNrLCBzY29wZSlcblx0e1xuXHRcdGlmICghdGhpcy5fbGlzdGVuZXJzQnlFdmVudFtldnRUeXBlXSlcblx0XHRcdHRoaXMuX2xpc3RlbmVyc0J5RXZlbnRbZXZ0VHlwZV0gPSBbXTtcblxuXHRcdHRoaXMuX2xpc3RlbmVyc0J5RXZlbnRbZXZ0VHlwZV0ucHVzaCh7Y2FsbGJhY2s6Y2FsbGJhY2ssIHNjb3BlOnNjb3BlfSk7XG5cdH1cblxuXHQvKipcblx0ICogUmVtb3ZlcyBhbiBldmVudCBsaXN0ZW5lci5cblx0ICpcblx0ICogQHBhcmFtXHR7c3RyaW5nfSBldnRUeXBlXHRUaGUgdHlwZSBvZiBldmVudCB0byByZW1vdmUuXG5cdCAqIEBwYXJhbVx0e2Z1bmN0aW9ufSBjYWxsYmFja1x0VGhlIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIGJlIHJlbW92ZWQuXG5cdCAqL1xuXHRyZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIGNhbGxiYWNrKVxuXHR7XG5cdFx0Y29uc3QgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzQnlFdmVudFtldnRUeXBlXTtcblxuXHRcdGlmIChsaXN0ZW5lcnMpXG5cdFx0e1xuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspXG5cdFx0XHR7XG5cdFx0XHRcdGlmIChsaXN0ZW5lcnNbaV0uY2FsbGJhY2sgPT09IGNhbGxiYWNrKVxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0bGlzdGVuZXJzLnNwbGljZShpLCAxKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGRpc3BhdGNoRXZlbnQoZXZ0VHlwZSwgZXZ0T2JqKVxuXHR7XG5cdFx0Y29uc3QgbGlzdGVuZXJzID0gdGhpcy5fbGlzdGVuZXJzQnlFdmVudFtldnRUeXBlXTtcblxuXHRcdGlmIChsaXN0ZW5lcnMpXG5cdFx0e1xuXHRcdFx0Zm9yIChsZXQgbGlzdGVuZXIgb2YgbGlzdGVuZXJzKVxuXHRcdFx0XHRsaXN0ZW5lci5jYWxsYmFjay5jYWxsKGxpc3RlbmVyLnNjb3BlLCBldnRPYmopO1xuXHRcdH1cblx0fVxufVxuIiwiZXhwb3J0IGNvbnN0IENvbm5lY3Rpb25NYW5hZ2VyRXZlbnQgPSBPYmplY3QuZnJlZXplKHtcblx0Q09OTkVDVElPTjogJ2Nvbm5lY3Rpb24nLFxuXHRMT0dJTjogJ2xvZ2luJyxcblx0RElTQ09OTkVDVElPTjogJ2Rpc2Nvbm5lY3Rpb24nLFxuXHRFUlJPUjogJ2Vycm9yJyxcblx0U0VSVkVSX0VSUk9SOiAnc2VydmVyRXJyb3InLFxufSk7XG5cbmV4cG9ydCBjb25zdCBNb2R1bGVNYW5hZ2VyRXZlbnQgPSBPYmplY3QuZnJlZXplKHtcblx0TU9EVUxFX0xPQURFRDogJ21vZHVsZS1sb2FkZWQnLFxuXHRNT0RVTEVfTE9BRF9FUlJPUjogJ21vZHVsZS1sb2FkLWVycm9yJyxcbn0pO1xuIiwiZXhwb3J0IGNvbnN0IHRvS2ViYWJDYXNlID0gKHN0cikgPT5cbiAgc3RyICYmXG4gIHN0clxuICAgIC5tYXRjaCgvW0EtWl17Mix9KD89W0EtWl1bYS16XStbMC05XSp8XFxiKXxbQS1aXT9bYS16XStbMC05XSp8W0EtWl18WzAtOV0rL2cpXG4gICAgLm1hcCh4ID0+IHgudG9Mb3dlckNhc2UoKSlcbiAgICAuam9pbignLScpO1xuXG5leHBvcnQgZnVuY3Rpb24gYnl0ZXNUb1NpemUoYnl0ZXMsIGRlY2ltYWxzID0gMSwgemVyb1VuaXQgPSAnJywgc3VmZml4ID0gJycpIHtcblx0aWYgKGJ5dGVzID09PSAwKVxuXHRcdHJldHVybiAnMCAnICsgemVyb1VuaXQgKyAoemVyb1VuaXQgIT0gJycgPyBzdWZmaXggOiAnJyk7XG5cblx0aWYgKGJ5dGVzIDwgMSkgLy8gQ2FuIGhhcHBlbiBpbiBjaGFydCBheGlzIGxhYmVscyFcblx0IFx0cmV0dXJuIGAke2J5dGVzfSBCeXRlcyR7c3VmZml4fWA7XG5cbiAgICBjb25zdCBrID0gMTAwMDtcbiAgICBjb25zdCBkbSA9IGRlY2ltYWxzIDwgMCA/IDAgOiBkZWNpbWFscztcbiAgICBjb25zdCBzaXplcyA9IFsnQnl0ZXMnLCAnS0InLCAnTUInLCAnR0InLCAnVEInLCAnUEInLCAnRUInLCAnWkInLCAnWUInXTtcblxuICAgIGNvbnN0IGkgPSBNYXRoLmZsb29yKE1hdGgubG9nKGJ5dGVzKSAvIE1hdGgubG9nKGspKTtcblxuICAgIHJldHVybiBwYXJzZUZsb2F0KChieXRlcyAvIE1hdGgucG93KGssIGkpKS50b0ZpeGVkKGRtKSkgKyAnICcgKyBzaXplc1tpXSArIHN1ZmZpeDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGtCeXRlc1RvU2l6ZShrQnl0ZXMsIGRlY2ltYWxzID0gMSwgemVyb1VuaXQgPSAnJywgc3VmZml4ID0gJycpIHtcblx0cmV0dXJuIGJ5dGVzVG9TaXplKGtCeXRlcyAqIDEwMDAsIGRlY2ltYWxzLCB6ZXJvVW5pdCwgc3VmZml4KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhcGl0YWxpemVGaXJzdChzdHJpbmcpIHtcblx0cmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpbHRlckNsYXNzTmFtZShlbGVtZW50LCBpbmRleCwgYXJyYXkpXG57XG5cdGlmIChlbGVtZW50LmVuZHNXaXRoKCcucHknKSlcblx0XHRyZXR1cm4gKGVsZW1lbnQuZW5kc1dpdGgoJ0V4dGVuc2lvbi5weScpKTtcblx0ZWxzZSBpZiAoZWxlbWVudC5lbmRzV2l0aCgnLmpzJykpXG5cdFx0cmV0dXJuIChlbGVtZW50LmVuZHNXaXRoKCdFeHRlbnNpb24uanMnKSk7XG5cdGVsc2Vcblx0XHRyZXR1cm4gKGVsZW1lbnQuZW5kc1dpdGgoJ0V4dGVuc2lvbicpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJvdW5kVG9EZWNpbWFscyh2YWx1ZSwgZGVjaW1hbHMpIHtcbiAgcmV0dXJuIE51bWJlcihNYXRoLnJvdW5kKHZhbHVlICsgJ2UnICsgZGVjaW1hbHMpICsgJ2UtJyArIGRlY2ltYWxzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNjYWxlQnl0ZXMoYnl0ZXMsIGRlY2ltYWxzID0gMSkge1xuXHRsZXQgb2JqID0ge307XG5cblx0Y29uc3Qgc2l6ZXMgPSBbJ0J5dGVzJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJywgJ1BCJywgJ0VCJywgJ1pCJywgJ1lCJ107XG5cblx0aWYgKGJ5dGVzID4gMClcblx0e1xuXHRcdGNvbnN0IGsgPSAxMDAwO1xuXHRcdGNvbnN0IGRtID0gZGVjaW1hbHMgPCAwID8gMCA6IGRlY2ltYWxzO1xuXHRcdGNvbnN0IGkgPSBNYXRoLmZsb29yKE1hdGgubG9nKGJ5dGVzKSAvIE1hdGgubG9nKGspKTtcblxuXHRcdG9iai52YWx1ZSA9IHBhcnNlRmxvYXQoKGJ5dGVzIC8gTWF0aC5wb3coaywgaSkpLnRvRml4ZWQoZG0pKTtcblx0XHRvYmoudW5pdCA9IHNpemVzW2ldO1xuXHR9XG5cdGVsc2Vcblx0e1xuXHRcdG9iai52YWx1ZSA9IDA7XG5cdFx0b2JqLnVuaXQgPSBzaXplc1swXTtcblx0fVxuXG5cdHJldHVybiBvYmo7XG59XG4iXSwibWFwcGluZ3MiOiI7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbk1BO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDUkE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3ZFQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNyQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUMvTEE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ROQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN0dkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN4TEE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3hEQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNYQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==