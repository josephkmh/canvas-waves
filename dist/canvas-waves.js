(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["CanvasWaves"] = factory();
	else
		root["CanvasWaves"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Canvas.js":
/*!***********************!*\
  !*** ./src/Canvas.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst Canvas = ({ selector, gradient, color, opacity }) => {\n  let parent = undefined;\n\n  switch (typeof selector) {\n    case \"string\":\n      parent = document.querySelector(selector);\n      break;\n    case \"object\":\n      parent = selector;\n      break;\n  }\n\n  if (!parent) {\n    throw new Error(\"Parent element could not be found.\");\n  }\n\n  if (parent.style.position !== \"relative\" || \"absolute\") {\n    parent.style.position = \"relative\";\n  }\n  const canvas = document.createElement(\"canvas\");\n  canvas.style.position = \"absolute\";\n  canvas.style.top = \"0\";\n  canvas.style.left = \"0\";\n  canvas.style.width = \"100%\";\n  canvas.style.height = \"100%\";\n  canvas.style.opacity = opacity;\n  canvas.height = parent.clientHeight;\n  canvas.width = parent.clientWidth;\n\n  /**\n   * Prepare context for rendering\n   */\n  canvas.ctx = canvas.getContext(\"2d\");\n  if (gradient) {\n    canvas.ctx.fillStyle = gradient;\n  } else {\n    canvas.ctx.fillStyle = color;\n  }\n\n  /**\n   * Add canvas to DOM\n   */\n  if (parent.children.length == 0) {\n    parent.appendChild(canvas);\n  } else {\n    parent.insertBefore(canvas, parent.children[0]);\n  }\n\n  return canvas;\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Canvas);\n\n\n//# sourceURL=webpack://CanvasWaves/./src/Canvas.js?");

/***/ }),

/***/ "./src/Node.js":
/*!*********************!*\
  !*** ./src/Node.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/**\n * A single node on the canvas\n */\nfunction Node({canvasWidth, canvasHeight, index, numberOfNodes, wavesVisible}) {\n\n  /**\n   * Initialize position on the canvas\n   */\n  this.x = (canvasWidth / (numberOfNodes - 1)) * index;\n  this.y = canvasHeight;\n  this.index = index;\n\n  /**\n   * Calculate\n   */\n  this.positionMultiplier = index / numberOfNodes;\n\n  this.numberOffset = (2 * Math.PI * (index / numberOfNodes)) / (1 / wavesVisible);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Node);\n\n//# sourceURL=webpack://CanvasWaves/./src/Node.js?");

/***/ }),

/***/ "./src/Wave.js":
/*!*********************!*\
  !*** ./src/Wave.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Node_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Node.js */ \"./src/Node.js\");\n/* harmony import */ var _Canvas_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Canvas.js */ \"./src/Canvas.js\");\n\n\n\nfunction Wave(\n  selector,\n  {\n    baseHeight = 0,\n    nodeCount,\n    speed = 10000,\n    color = \"#000000\",\n    gradient = false,\n    horizontalOffset = 0,\n    startFlat = false,\n    opacity = 1,\n    waveGrows = false,\n    waveHeight = \"50%\",\n    wavesVisible = 0.5,\n    waveAngle = 0\n  } = {}\n) {\n  this.animating = null;\n  this.baseHeight = baseHeight;\n  this.color = color;\n  this.horizontalOffsetTime = horizontalOffset * speed;\n  this.speed = speed;\n  this.speedDecrementInterval = 10;\n  this.startFlat = startFlat;\n  this.startTime;\n  this.waveAngleRadians = waveAngle * (Math.PI / 180);\n  this.waveGrows = waveGrows;\n\n  /**\n   * Set up the canvas & context\n   */\n  this.canvas = Object(_Canvas_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({ selector, gradient, color, opacity });\n\n  const numberOfNodes = nodeCount || Math.floor(this.canvas.width / 30);\n  this.nodes = [];\n  for (let i = 0; i < numberOfNodes; i++) {\n    this.nodes.push(\n      new _Node_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\n        numberOfNodes,\n        canvasWidth: this.canvas.width,\n        canvasHeight: this.canvas.height,\n        wavesVisible: wavesVisible,\n        index: i\n      })\n    );\n  }\n  this.spaceBetweenNodes = this.canvas.width / (this.nodes.length - 1);\n\n  /**\n   * Parse user provided values into pixel values (in case a string percentage is provided)\n   */\n  this.pixelWaveHeight = this.userInputToPixelValue(\n    waveHeight,\n    this.canvas.height\n  );\n  this.pixelBaseHeight = this.userInputToPixelValue(\n    baseHeight,\n    this.canvas.height\n  );\n\n  /**\n   * Draw initial position of wave\n   */\n  this.updateNodes();\n  this.draw();\n}\n\nWave.prototype = {\n  /**\n   * Animate the wave\n   */\n  animate: function() {\n    // halt execution if animation has been turned off\n    if (this.animating === false) {\n      return;\n    }\n    this.animating = true;\n\n    // update nodes, repaint canvas and request next animation frame\n    this.updateNodes();\n    this.draw();\n    if (this.isPaused) return;\n    requestAnimationFrame(this.animate.bind(this));\n  },\n\n  animateWithSlowdown: function() {\n    let currentTime = this.timestamp();\n    if (currentTime > this.stopCompletionTimestamp) {\n      return;\n    }\n    this.horizontalOffsetTime = this.getProgressPercentage() * this.speed;\n    this.startTime = currentTime;\n    this.cyclesSinceStopRequested += 1;\n    this.updateNodes(\n      this.getProgressRadians() + 0.01 * this.cyclesSinceStopRequested\n    );\n    this.draw();\n    requestAnimationFrame(this.animateWithSlowdown.bind(this));\n  },\n\n  destroy() {\n    this.animating = false;\n    this.canvas.remove();\n    this.deregister();\n  },\n\n  /**\n   * Draw the current nodes on the canvas context\n   */\n  draw: function() {\n    let ctx = this.canvas.ctx;\n    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    ctx.beginPath();\n    ctx.moveTo(0, this.canvas.height);\n    this.nodes.forEach(node => {\n      ctx.lineTo(node.x, node.y);\n    });\n    ctx.lineTo(this.canvas.width, this.canvas.height);\n    ctx.lineTo(0, this.canvas.height);\n    ctx.closePath();\n    ctx.fill();\n  },\n\n  pause: function(timeToStop = 0) {\n    this.animating = false;\n\n    if (timeToStop > 0) {\n      this.cyclesSinceStopRequested = 0;\n      this.stopInitiatedTimestamp = this.timestamp();\n      this.stopCompletionTimestamp = this.stopInitiatedTimestamp + timeToStop;\n      this.animateWithSlowdown(timeToStop);\n    } else {\n      this.horizontalOffsetTime = this.getProgressPercentage() * this.speed;\n      this.startTime = null;\n      console.log(this);\n    }\n  },\n\n  resume: function() {\n    this.animating = true;\n    this.animate();\n  },\n\n  /**\n   * Calculate the current progress in radians\n   */\n  getProgressRadians: function() {\n    let currentTime = this.timestamp();\n    if (!this.startTime && this.animating) {\n      this.startTime = currentTime;\n    }\n    let startTime = this.startTime || currentTime;\n    let timeElapsed =\n      (currentTime - startTime + this.horizontalOffsetTime) % this.speed;\n    let progress = timeElapsed / this.speed;\n    return progress * 2 * Math.PI;\n  },\n\n  getProgressPercentage: function() {\n    // calculate the current progress from 0-1\n    let currentTime = this.timestamp();\n    if (!this.startTime && this.animating) {\n      this.startTime = currentTime;\n    }\n    let timeElapsed =\n      (currentTime - this.startTime + this.horizontalOffsetTime) % this.speed;\n    let progress = timeElapsed / this.speed;\n    return progress;\n  },\n\n  /**\n   * Return current timestamp\n   */\n  timestamp: () => {\n    return new Date().getTime();\n  },\n\n  /**\n   * Toggle animation of the wave\n   */\n  toggleAnimation: function() {\n    if (!this.animating) {\n      this.animating = true;\n      this.animate();\n    } else {\n      this.horizontalOffsetTime = this.getProgressPercentage() * this.speed;\n      this.startTime = null;\n      this.animating = false;\n    }\n  },\n\n  /**\n   * Update nodes based on current time\n   */\n  updateNodes: function() {\n    let progress = this.getProgressRadians();\n\n    this.nodes.forEach(node => {\n      // if (this.startFlat && progress < nodePositionMultiplier) {   node.y =\n      // this.canvasHeight - this.baseHeight;   return }\n\n      let offset =\n        ((Math.sin(progress - node.numberOffset) + 1) / 2) *\n        this.pixelWaveHeight;\n      if (this.waveGrows) {\n        offset =\n          offset * (node.index / (this.nodes.length - 1)) * this.waveGrows;\n      }\n      if (this.waveAngleRadians) {\n        offset +=\n          Math.tan(this.waveAngleRadians) * this.spaceBetweenNodes * node.index;\n      }\n      let yValue = this.canvas.height - offset - this.pixelBaseHeight;\n\n      node.y = yValue;\n    });\n  },\n\n  /**\n   * Convert user input to pixels in case they provide a string specifying a percentage\n   */\n  userInputToPixelValue: (userInput, percentageOf) => {\n    if (!userInput) {\n      return 0;\n    } else if (typeof userInput === \"number\") {\n      return userInput;\n    } else if (typeof userInput === \"string\") {\n      const percentage = parseInt(userInput, 10) / 100;\n      return percentageOf * percentage;\n    }\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Wave);\n\n\n//# sourceURL=webpack://CanvasWaves/./src/Wave.js?");

/***/ }),

/***/ "./src/canvas-waves.js":
/*!*****************************!*\
  !*** ./src/canvas-waves.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Wave__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Wave */ \"./src/Wave.js\");\n\n\nfunction CanvasWaves() {\n  let waveCount = 0;\n  let waves = [];\n\n  const deregister = id => {\n    let filtered = waves.filter(w => w.id !== id);\n    waves.length = 0;\n    [].push.apply(waves, filtered);\n  };\n\n  const clearAll = () => {\n    waves.forEach(wave => wave.destroy());\n  };\n\n  const create = (selector, options) => {\n    const wave = new _Wave__WEBPACK_IMPORTED_MODULE_0__[\"default\"](selector, options);\n    wave.id = ++waveCount;\n    wave.deregister = () => deregister(wave.id);\n    waves.push(wave);\n    return wave;\n  };\n\n  return {\n    create,\n    all: waves,\n    clearAll\n  };\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CanvasWaves);\n\n\n//# sourceURL=webpack://CanvasWaves/./src/canvas-waves.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const CanvasWaves = __webpack_require__(/*! ./canvas-waves.js */ \"./src/canvas-waves.js\").default;\nmodule.exports = new CanvasWaves();\n\n\n//# sourceURL=webpack://CanvasWaves/./src/index.js?");

/***/ })

/******/ });
});