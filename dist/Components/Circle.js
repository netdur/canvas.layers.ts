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
    var Component_1, Circle;
    return {
        setters: [
            function (Component_1_1) {
                Component_1 = Component_1_1;
            }
        ],
        execute: function () {
            Circle = (function (_super) {
                __extends(Circle, _super);
                function Circle() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.isSVGshape = true;
                    return _this;
                }
                Circle.prototype.clearComponent = function () { };
                return Circle;
            }(Component_1.Component));
            Circle = __decorate([
                Component_1.RegisterComponent({
                    selector: 'circle',
                    svg: '<circle cx="200" cy="160" r="40" stroke="black" stroke-width="3" fill="red" />'
                })
            ], Circle);
            exports_1("Circle", Circle);
        }
    };
});
