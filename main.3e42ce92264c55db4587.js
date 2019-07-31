/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.ts":
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shape_circle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape/circle */ \"./shape/circle.ts\");\n/* harmony import */ var _shape_bezier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shape/bezier */ \"./shape/bezier.ts\");\n\n\nvar canvas = document.getElementById('canvas');\nvar ctx = canvas.getContext('2d');\nvar canvasInfo = canvas.getBoundingClientRect();\nvar renderList = [];\nvar addEvent = function () {\n    var startX, startY, choosedIndex = -1;\n    canvas.addEventListener('mousedown', function (e) {\n        startX = e.clientX;\n        startY = e.clientY;\n        var ifhave = renderList.map(function (it, index) {\n            it.painting();\n            if (ctx.isPointInPath(startX, startY) && it.drag === true) {\n                choosedIndex = index;\n                return true;\n            }\n            return false;\n        });\n        if (!ifhave.includes(true)) {\n            choosedIndex = -1;\n        }\n        if (choosedIndex !== -1) {\n            itemToLast(choosedIndex);\n        }\n        document.addEventListener('mousemove', mousemoveEvent);\n        document.addEventListener('mouseup', mouseupEvent);\n        painting();\n    });\n    function itemToLast(index) {\n        var lastItem = renderList.splice(index, 1)[0];\n        renderList.push(lastItem);\n    }\n    function mousemoveEvent(e) {\n        if (choosedIndex === -1)\n            return;\n        var target = renderList[renderList.length - 1];\n        var currentX = e.clientX;\n        var currentY = e.clientY;\n        target.adjust(currentX, currentY);\n        startX = currentX;\n        startY = currentY;\n        if (target.type === 'start') {\n            bezierLine.adjustStart(startX, startY);\n        }\n        else if (target.type === 'end') {\n            bezierLine.adjustEnd(startX, startY);\n        }\n        else if (target.type === 'c1') {\n            bezierLine.adjustC1(startX, startY);\n        }\n        else if (target.type === 'c2') {\n            bezierLine.adjustC2(startX, startY);\n        }\n        painting();\n    }\n    function mouseupEvent(e) {\n        if (choosedIndex === -1)\n            return;\n        var target = renderList[renderList.length - 1];\n        var currentX = e.clientX;\n        var currentY = e.clientY;\n        target.adjust(currentX, currentY);\n        startX = currentX;\n        startY = currentY;\n        painting();\n        document.removeEventListener('mousemove', mousemoveEvent);\n        document.removeEventListener('mouseup', mouseupEvent);\n    }\n};\naddEvent();\nvar circle1 = new _shape_circle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, {\n    center: [20, 20],\n    radius: 5,\n    type: 'start'\n});\nvar circle2 = new _shape_circle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, {\n    center: [300, 300],\n    radius: 5,\n    type: 'end'\n});\nvar c1 = new _shape_circle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, {\n    center: [20, 100],\n    radius: 5,\n    type: 'c1'\n});\nvar c2 = new _shape_circle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, {\n    center: [300, 200],\n    radius: 5,\n    type: 'c2'\n});\nvar bezierLine = new _shape_bezier__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ctx, {\n    startx: 20,\n    starty: 20,\n    endx: 300,\n    endy: 300,\n    c1x: 20,\n    c1y: 100,\n    c2x: 300,\n    c2y: 200\n});\ncircle1.painting();\ncircle2.painting();\nc1.painting();\nc2.painting();\nbezierLine.painting();\nArray.prototype.push.apply(renderList, [circle1, circle2, c1, c2, bezierLine]);\nvar painting = function () {\n    ctx.clearRect(0, 0, canvasInfo.width, canvasInfo.height);\n    renderList.forEach(function (it) { return it.painting(); });\n};\ncanvas.addEventListener('click', function (e) { });\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "./shape/bezier.ts":
/*!*************************!*\
  !*** ./shape/bezier.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar circle = /** @class */ (function () {\n    function circle(ctx, config) {\n        this.drag = false;\n        var startx = config.startx, starty = config.starty, endx = config.endx, endy = config.endy, c1x = config.c1x, c1y = config.c1y, c2x = config.c2x, c2y = config.c2y;\n        this.ctx = ctx;\n        this.startx = startx;\n        this.starty = starty;\n        this.endx = endx;\n        this.endy = endy;\n        this.c1x = c1x;\n        this.c1y = c1y;\n        this.c2x = c2x;\n        this.c2y = c2y;\n    }\n    circle.prototype.painting = function () {\n        var _a = this, ctx = _a.ctx, startx = _a.startx, starty = _a.starty, endx = _a.endx, endy = _a.endy, c1x = _a.c1x, c1y = _a.c1y, c2x = _a.c2x, c2y = _a.c2y;\n        ctx.beginPath();\n        ctx.moveTo(startx, starty);\n        ctx.bezierCurveTo(c1x, c1y, c2x, c2y, endx, endy);\n        ctx.stroke();\n        ctx.closePath();\n    };\n    circle.prototype.adjustStart = function (x, y) {\n        this.startx = x;\n        this.starty = y;\n    };\n    circle.prototype.adjustEnd = function (x, y) {\n        this.endx = x;\n        this.endy = y;\n    };\n    circle.prototype.adjustC1 = function (x, y) {\n        this.c1x = x;\n        this.c1y = y;\n    };\n    circle.prototype.adjustC2 = function (x, y) {\n        this.c2x = x;\n        this.c2y = y;\n    };\n    return circle;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (circle);\n\n\n//# sourceURL=webpack:///./shape/bezier.ts?");

/***/ }),

/***/ "./shape/circle.ts":
/*!*************************!*\
  !*** ./shape/circle.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar circle = /** @class */ (function () {\n    function circle(ctx, config) {\n        this.drag = true;\n        var center = config.center, radius = config.radius, type = config.type;\n        this.ctx = ctx;\n        this.center = [\n            center[0] === undefined ? radius : center[0],\n            center[1] === undefined ? radius : center[1]\n        ];\n        this.radius = radius;\n        this.type = type;\n    }\n    circle.prototype.painting = function () {\n        this.ctx.beginPath();\n        this.ctx.arc(this.center[0], this.center[1], this.radius, 0, Math.PI * 2, false);\n        this.ctx.strokeStyle = '#333';\n        this.ctx.fill();\n        this.ctx.closePath();\n    };\n    circle.prototype.adjust = function (left, top) {\n        this.center[0] = left;\n        this.center[1] = top;\n    };\n    return circle;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (circle);\n\n\n//# sourceURL=webpack:///./shape/circle.ts?");

/***/ })

/******/ });