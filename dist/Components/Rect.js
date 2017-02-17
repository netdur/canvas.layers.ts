System.register(["../core/Component", "../core/CSS"], function (exports_1, context_1) {
    "use strict";
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var Component_1, CSS_1, Rect;
    return {
        setters: [
            function (Component_1_1) {
                Component_1 = Component_1_1;
            },
            function (CSS_1_1) {
                CSS_1 = CSS_1_1;
            }
        ],
        execute: function () {
            Rect = (function (_super) {
                __extends(Rect, _super);
                function Rect() {
                    var _this = _super.call(this) || this;
                    _this.x = 0;
                    _this.y = 0;
                    _this.width = 0;
                    _this.height = 0;
                    var css = new CSS_1.CSS();
                    _this.rules = css.rulesBySelector(_this.name);
                    _this.x = parseInt(_this.rules['left']);
                    _this.y = parseInt(_this.rules['top']);
                    _this.width = parseInt(_this.rules['width']);
                    _this.height = parseInt(_this.rules['height']);
                    return _this;
                }
                Rect.prototype.clearComponent = function () {
                };
                Rect.prototype.render = function () {
                    this.path = new Path2D();
                    this.path.rect(this.x, this.y, this.width, this.height);
                    this.canvas.ctx.save();
                    this.canvas.ctx.fillStyle = this.rules['background-color'];
                    this.canvas.ctx.fill(this.path);
                    this.canvas.ctx.lineWidth = parseInt(this.rules['border-top-width']);
                    this.canvas.ctx.strokeStyle = this.rules['border-top-color'];
                    this.canvas.ctx.stroke(this.path);
                    this.canvas.ctx.restore();
                };
                return Rect;
            }(Component_1.Component));
            Rect = __decorate([
                Component_1.RegisterComponent({
                    selector: 'rect',
                    style: "\n        rect {\n            border: 1px red solid;\n            background: green;\n            top: 0px;\n            left: 0px;\n            width: 100px;\n            height: 50px;\n        }\n    "
                }),
                __metadata("design:paramtypes", [])
            ], Rect);
            exports_1("Rect", Rect);
        }
    };
});
