System.register(["../core/Component"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var Component_1, Circler;
    return {
        setters: [
            function (Component_1_1) {
                Component_1 = Component_1_1;
            }
        ],
        execute: function () {
            Circler = (function (_super) {
                __extends(Circler, _super);
                function Circler() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.radius = 40;
                    _this.angel = 0;
                    return _this;
                }
                Circler.prototype.clearComponent = function () { };
                Circler.prototype.render = function () {
                    var rules = this.getStyle();
                    var radius = this.radius + 10 * Math.abs(Math.cos(this.angel));
                    this.path = new Path2D();
                    this.path.arc(200, 300, radius, 0, Math.PI * 2, false);
                    this.canvas.ctx.save();
                    this.canvas.ctx.fillStyle = rules['background-color'];
                    this.canvas.ctx.fill(this.path);
                    this.canvas.ctx.restore();
                };
                return Circler;
            }(Component_1.Component));
            Circler = __decorate([
                Component_1.RegisterComponent({
                    selector: 'circler',
                    style: "\n        circler {\n            background: gray;\n            top: 0px;\n            left: 0px;\n        }\n    "
                })
            ], Circler);
            exports_1("Circler", Circler);
        }
    };
});
