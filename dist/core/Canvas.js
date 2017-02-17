System.register(["./CSS", "./AnimationFrameQueue"], function (exports_1, context_1) {
    "use strict";
    var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (this && this.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
        return { next: verb(0), "throw": verb(1), "return": verb(2) };
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [0, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __moduleName = context_1 && context_1.id;
    var CSS_1, AnimationFrameQueue_1, Canvas;
    return {
        setters: [
            function (CSS_1_1) {
                CSS_1 = CSS_1_1;
            },
            function (AnimationFrameQueue_1_1) {
                AnimationFrameQueue_1 = AnimationFrameQueue_1_1;
            }
        ],
        execute: function () {
            Canvas = (function () {
                function Canvas(_a) {
                    var _b = _a.id, id = _b === void 0 ? "" : _b, canvas = _a.canvas, _c = _a.fullScreen, fullScreen = _c === void 0 ? false : _c, _d = _a.offScreen, offScreen = _d === void 0 ? false : _d, _e = _a.width, width = _e === void 0 ? 600 : _e, _f = _a.height, height = _f === void 0 ? 400 : _f, _g = _a.scale, scale = _g === void 0 ? devicePixelRatio : _g;
                    var _this = this;
                    this.queue = new AnimationFrameQueue_1.AnimationFrameQueue();
                    this.css = new CSS_1.CSS();
                    this.tree = new Set();
                    if (canvas instanceof HTMLCanvasElement) {
                        this.element = canvas;
                    }
                    if (id != "" && !(canvas instanceof HTMLCanvasElement)) {
                        this.element = document.getElementById(id);
                    }
                    else {
                        this.element = document.createElement("canvas");
                        if (!offScreen) {
                            document.body.appendChild(this.element);
                        }
                    }
                    if (fullScreen) {
                        this.element.width = document.body.clientWidth * scale;
                        this.element.height = document.body.clientHeight * scale;
                    }
                    else {
                        this.element.width = width * scale;
                        this.element.height = height * scale;
                    }
                    window.addEventListener('resize', function (e) {
                        requestAnimationFrame(function () {
                            if (fullScreen) {
                                _this.element.width = document.body.clientWidth * scale;
                                _this.element.height = document.body.clientHeight * scale;
                                _this.render();
                            }
                        });
                    });
                    this.id = id;
                    this.ctx = this.element.getContext("2d", { alpha: false });
                    this.ctx.scale(scale, scale);
                    this.element.addEventListener("click", function (e) { return _this.emit("click", e); });
                }
                Canvas.prototype.emit = function (label, e) {
                    var _this = this;
                    var position = this.getPosition();
                    var x = e.clientX - position.x;
                    var y = e.clientY - position.y;
                    this.tree.forEach(function (component) {
                        if (component.path != null
                            && _this.ctx.isPointInPath(component.path, x, y)) {
                            component.emit(label, e);
                        }
                    });
                };
                Canvas.prototype.add = function (component, render) {
                    if (render === void 0) { render = false; }
                    component.canvas = this;
                    this.tree.add(component);
                    if (render == false)
                        return;
                    this.queue.add(function () {
                        component.render();
                    });
                };
                Canvas.prototype.nextFrame = function () {
                    return __awaiter(this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    this.render();
                                    return [4 /*yield*/, AnimationFrameQueue_1.AnimationFrameQueue.nextFrame()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    });
                };
                Canvas.prototype.getPosition = function (el) {
                    if (el === void 0) { el = this.element; }
                    var x = 0;
                    var y = 0;
                    while (el) {
                        x += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                        y += (el.offsetTop - el.scrollTop + el.clientTop);
                        el = el.offsetParent;
                    }
                    return {
                        x: x,
                        y: y
                    };
                };
                Canvas.prototype.render = function () {
                    var _this = this;
                    this.queue.add(function () {
                        _this.ctx.fillStyle = "#eeeeee";
                        _this.ctx.fillRect(0, 0, _this.element.width, _this.element.height);
                        _this.tree.forEach(function (component) {
                            component.render();
                        });
                    });
                };
                return Canvas;
            }());
            Canvas.poolSize = 40;
            exports_1("Canvas", Canvas);
        }
    };
});
