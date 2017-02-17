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
    var Component_1, Pacman;
    return {
        setters: [
            function (Component_1_1) {
                Component_1 = Component_1_1;
            }
        ],
        execute: function () {
            Pacman = (function (_super) {
                __extends(Pacman, _super);
                function Pacman() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.isCSSshape = true;
                    return _this;
                }
                Pacman.prototype.clearComponent = function () { };
                return Pacman;
            }(Component_1.Component));
            Pacman = __decorate([
                Component_1.RegisterComponent({
                    selector: 'pacman',
                    style: "\n        pacman {\n            width: 0px;\n            height: 0px;\n            border-right: 60px solid transparent;\n            border-top: 60px solid lightblue;\n            border-bottom: 60px solid lightblue;\n            border-left: 60px solid lightblue;\n            border-top-right-radius: 60px;\n            border-top-left-radius: 60px;\n            border-bottom-right-radius: 60px;\n            border-bottom-left-radius: 60px;\n        }\n    "
                })
            ], Pacman);
            exports_1("Pacman", Pacman);
        }
    };
});
