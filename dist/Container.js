System.register(["./DamagedRectManager", "./Layer"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __moduleName = context_1 && context_1.id;
    var DamagedRectManager_1, Layer_1, Container;
    return {
        setters: [
            function (DamagedRectManager_1_1) {
                DamagedRectManager_1 = DamagedRectManager_1_1;
            },
            function (Layer_1_1) {
                Layer_1 = Layer_1_1;
            }
        ],
        execute: function () {
            Container = (function (_super) {
                __extends(Container, _super);
                function Container(canvas, supportsTransparency) {
                    var _this = _super.call(this, 0, 0, canvas.width, canvas.height) || this;
                    _this.canvas = canvas;
                    _this.damagedRectManager = new DamagedRectManager_1.DamagedRectManager(_this, supportsTransparency);
                    _this.damagedRectManager.addDamagedRect(_this.rect);
                    return _this;
                }
                Container.prototype.getDamagedRectManager = function () {
                    return this.damagedRectManager;
                };
                Container.prototype.redraw = function () {
                    this.damagedRectManager.redraw();
                };
                return Container;
            }(Layer_1.Layer));
            exports_1("Container", Container);
        }
    };
});
