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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shape_circle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shape/circle */ \"./shape/circle.ts\");\n/* harmony import */ var _shape_bezier__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shape/bezier */ \"./shape/bezier.ts\");\n/* harmony import */ var _shape_label__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shape/label */ \"./shape/label.ts\");\n\n\n\nvar canvas = document.getElementById('canvas');\nvar ctx = canvas.getContext('2d');\n//渐变背景\ndrawBk();\nfunction drawBk() {\n    ctx.beginPath();\n    var linear = ctx.createLinearGradient(0, 0, 512, 0);\n    linear.addColorStop(0, '#000000');\n    linear.addColorStop(1, '#ffffff');\n    ctx.fillStyle = linear;\n    ctx.fillRect(0, 0, 512, 512);\n    ctx.fillStyle = '#000000';\n    ctx.closePath();\n    // 开始滤镜处理\n    var imgData = ctx.getImageData(0, 0, 512, 512);\n    for (var i = 0; i < imgData.data.length / 4; ++i) {\n        var red = imgData.data[i * 4], green = imgData.data[i * 4 + 1], blue = imgData.data[i * 4 + 2];\n        // 刷新RGB，注意：\n        // imgData.data[i * 4 + 3]存放的是alpha，不需要改动\n        imgData.data[i * 4] = 255 - red;\n        imgData.data[i * 4 + 1] = 255 - green;\n        imgData.data[i * 4 + 2] = 255 - blue;\n    }\n    ctx.putImageData(imgData, 0, 0); // 重写图像数据\n}\nvar canvasInfo = canvas.getBoundingClientRect();\nvar renderList = [];\nvar addEvent = function () {\n    var startX, startY, choosedIndex = -1;\n    canvas.addEventListener('mousedown', function (e) {\n        startX = e.clientX;\n        startY = e.clientY;\n        var ifhave = renderList.map(function (it, index) {\n            it.painting();\n            if (ctx.isPointInPath(startX, startY) && it.drag === true) {\n                choosedIndex = index;\n                return true;\n            }\n            return false;\n        });\n        if (!ifhave.includes(true)) {\n            choosedIndex = -1;\n        }\n        if (choosedIndex !== -1) {\n            itemToLast(choosedIndex);\n        }\n        var target = renderList[renderList.length - 1];\n        if (target.type === 'label') {\n            var word = prompt('请输入注释内容', '');\n            if (word) {\n                target.editLable(word);\n            }\n        }\n        document.addEventListener('dblclick', mouseDblclick);\n        document.addEventListener('mousemove', mousemoveEvent);\n        document.addEventListener('mouseup', mouseupEvent);\n        painting();\n    });\n    function itemToLast(index) {\n        var lastItem = renderList.splice(index, 1)[0];\n        renderList.push(lastItem);\n    }\n    function mouseDblclick() {\n        var target = renderList[renderList.length - 1];\n        if (target.type !== 'bezier') {\n            var word = prompt('请输入注释内容', '');\n            if (word) {\n                target.label.label = word;\n            }\n        }\n        painting();\n    }\n    function mousemoveEvent(e) {\n        if (choosedIndex === -1)\n            return;\n        var target = renderList[renderList.length - 1];\n        var currentX = e.clientX;\n        var currentY = e.clientY;\n        target.adjust(currentX, currentY);\n        startX = currentX;\n        startY = currentY;\n        if (target.type === 'start') {\n            bezierLine.adjustStart(startX, startY);\n        }\n        else if (target.type === 'end') {\n            bezierLine.adjustEnd(startX, startY);\n        }\n        else if (target.type === 'c1') {\n            bezierLine.adjustC1(startX, startY);\n        }\n        else if (target.type === 'c2') {\n            bezierLine.adjustC2(startX, startY);\n        }\n        painting();\n    }\n    function mouseupEvent(e) {\n        if (choosedIndex === -1)\n            return;\n        var target = renderList[renderList.length - 1];\n        var currentX = e.clientX;\n        var currentY = e.clientY;\n        target.adjust(currentX, currentY);\n        startX = currentX;\n        startY = currentY;\n        painting();\n        document.removeEventListener('mousemove', mousemoveEvent);\n        document.removeEventListener('mouseup', mouseupEvent);\n    }\n};\naddEvent();\nvar point1 = [100, 100];\nvar label1 = new _shape_label__WEBPACK_IMPORTED_MODULE_2__[\"default\"](ctx, {\n    center: point1,\n    label: 'start'\n});\nvar circle1 = new _shape_circle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, {\n    center: point1,\n    radius: 5,\n    type: 'start',\n    label: label1\n});\nvar point2 = [300, 300];\nvar label2 = new _shape_label__WEBPACK_IMPORTED_MODULE_2__[\"default\"](ctx, {\n    center: point2,\n    label: 'end'\n});\nvar circle2 = new _shape_circle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, {\n    center: point2,\n    radius: 5,\n    type: 'end',\n    label: label2\n});\nvar c1point = [100, 300];\nvar label3 = new _shape_label__WEBPACK_IMPORTED_MODULE_2__[\"default\"](ctx, {\n    center: c1point\n});\nvar c1 = new _shape_circle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, {\n    center: c1point,\n    radius: 5,\n    type: 'c1',\n    label: label3\n});\nvar c2point = [300, 100];\nvar label4 = new _shape_label__WEBPACK_IMPORTED_MODULE_2__[\"default\"](ctx, {\n    center: c2point\n});\nvar c2 = new _shape_circle__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, {\n    center: c2point,\n    radius: 5,\n    type: 'c2',\n    label: label4\n});\nvar bezierLine = new _shape_bezier__WEBPACK_IMPORTED_MODULE_1__[\"default\"](ctx, {\n    startx: point1[0],\n    starty: point1[1],\n    endx: point2[0],\n    endy: point2[1],\n    c1x: c1point[0],\n    c1y: c1point[1],\n    c2x: c2point[0],\n    c2y: c2point[1]\n});\nArray.prototype.push.apply(renderList, [\n    label1,\n    label2,\n    label3,\n    label4,\n    circle1,\n    circle2,\n    c1,\n    c2,\n    bezierLine\n]);\nvar painting = function () {\n    ctx.clearRect(0, 0, canvasInfo.width, canvasInfo.height);\n    drawBk();\n    renderList.forEach(function (it) {\n        it.painting();\n    });\n};\ncanvas.addEventListener('click', function (e) { });\n\n\n//# sourceURL=webpack:///./index.ts?");

/***/ }),

/***/ "./shape/bezier.ts":
/*!*************************!*\
  !*** ./shape/bezier.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar bezier = /** @class */ (function () {\n    function bezier(ctx, config) {\n        this.type = 'bezier';\n        this.drag = false;\n        var startx = config.startx, starty = config.starty, endx = config.endx, endy = config.endy, c1x = config.c1x, c1y = config.c1y, c2x = config.c2x, c2y = config.c2y;\n        this.ctx = ctx;\n        this.startx = startx;\n        this.starty = starty;\n        this.endx = endx;\n        this.endy = endy;\n        this.c1x = c1x;\n        this.c1y = c1y;\n        this.c2x = c2x;\n        this.c2y = c2y;\n        this.painting();\n    }\n    bezier.prototype.painting = function () {\n        var _a = this, ctx = _a.ctx, startx = _a.startx, starty = _a.starty, endx = _a.endx, endy = _a.endy, c1x = _a.c1x, c1y = _a.c1y, c2x = _a.c2x, c2y = _a.c2y;\n        ctx.beginPath();\n        ctx.moveTo(startx, starty);\n        ctx.bezierCurveTo(c1x, c1y, c2x, c2y, endx, endy);\n        ctx.stroke();\n        ctx.closePath();\n    };\n    bezier.prototype.adjustStart = function (x, y) {\n        this.startx = x;\n        this.starty = y;\n    };\n    bezier.prototype.adjustEnd = function (x, y) {\n        this.endx = x;\n        this.endy = y;\n    };\n    bezier.prototype.adjustC1 = function (x, y) {\n        this.c1x = x;\n        this.c1y = y;\n    };\n    bezier.prototype.adjustC2 = function (x, y) {\n        this.c2x = x;\n        this.c2y = y;\n    };\n    return bezier;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (bezier);\n\n\n//# sourceURL=webpack:///./shape/bezier.ts?");

/***/ }),

/***/ "./shape/circle.ts":
/*!*************************!*\
  !*** ./shape/circle.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar circle = /** @class */ (function () {\n    function circle(ctx, config) {\n        this.drag = true;\n        var center = config.center, radius = config.radius, type = config.type, label = config.label;\n        this.ctx = ctx;\n        this.center = [\n            center[0] === undefined ? radius : center[0],\n            center[1] === undefined ? radius : center[1]\n        ];\n        this.radius = radius;\n        this.type = type;\n        if (label) {\n            this.label = label;\n            this.label.painting();\n        }\n        this.painting();\n    }\n    circle.prototype.painting = function () {\n        if (this.label) {\n            this.label.adjust(this.center[0], this.center[1]);\n        }\n        this.drawPointBack();\n        this.ctx.beginPath();\n        this.ctx.fillStyle = '#000000';\n        this.ctx.arc(this.center[0], this.center[1], this.radius, 0, Math.PI * 2, false);\n        this.ctx.strokeStyle = '#333';\n        this.ctx.fill();\n        this.ctx.closePath();\n    };\n    circle.prototype.drawPointBack = function () {\n        var _a = this, ctx = _a.ctx, center = _a.center;\n        ctx.beginPath();\n        // 开始滤镜处理\n        var imgData = ctx.getImageData(center[0] - 15, center[1] - 15, 30, 30);\n        for (var x = -imgData.width / 2; x < imgData.width / 2; x++) {\n            for (var y = -imgData.height / 2; y < imgData.height / 2; y++) {\n                if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <= 15) {\n                    var idx = (x + 15 + (y + 15) * imgData.width) * 4;\n                    var r = imgData.data[idx + 0];\n                    var g = imgData.data[idx + 1];\n                    var b = imgData.data[idx + 2];\n                    var gray = 0.299 * r + 0.587 * g + 0.114 * b;\n                    imgData.data[idx + 0] = gray + 150; // Red channel\n                    imgData.data[idx + 1] = gray; // Green channel\n                    imgData.data[idx + 2] = gray; // Blue channel\n                    imgData.data[idx + 3] = 255; // Alpha channel\n                }\n            }\n        }\n        ctx.putImageData(imgData, center[0] - 15, center[1] - 15); // 重写图像数据\n        ctx.closePath();\n    };\n    circle.prototype.adjust = function (left, top) {\n        this.center[0] = left;\n        this.center[1] = top;\n    };\n    return circle;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (circle);\n\n\n//# sourceURL=webpack:///./shape/circle.ts?");

/***/ }),

/***/ "./shape/label.ts":
/*!************************!*\
  !*** ./shape/label.ts ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nvar label = /** @class */ (function () {\n    function label(ctx, config) {\n        this.drag = true;\n        this.type = 'label';\n        var center = config.center;\n        this.ctx = ctx;\n        this.center = [\n            center[0] === undefined ? 0 : center[0],\n            center[1] === undefined ? 0 : center[1]\n        ];\n        this.label = config.label || '';\n    }\n    label.prototype.painting = function () {\n        var x = this.center[0];\n        var y = this.center[1];\n        if (this.label === '')\n            return;\n        this.ctx.beginPath();\n        var textStyle = this.ctx.measureText(this.label); // TextMetrics\n        this.ctx.rect(x + 20, y - 20, textStyle.width + 10, 20);\n        this.ctx.stroke();\n        this.ctx.fillText(this.label, x + 25, y - 6);\n        this.ctx.moveTo(x, y);\n        this.ctx.lineTo(x + 20, y - 10);\n        this.ctx.stroke();\n        this.ctx.closePath();\n    };\n    label.prototype.adjust = function (left, top, label) {\n        this.center[0] = left;\n        this.center[1] = top;\n    };\n    label.prototype.editLable = function (text) {\n        this.label = text;\n    };\n    return label;\n}());\n/* harmony default export */ __webpack_exports__[\"default\"] = (label);\n\n\n//# sourceURL=webpack:///./shape/label.ts?");

/***/ })

/******/ });