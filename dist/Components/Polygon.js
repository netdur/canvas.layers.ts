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
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var Component_1, Polygon;
    return {
        setters: [
            function (Component_1_1) {
                Component_1 = Component_1_1;
            }
        ],
        execute: function () {
            Polygon = (function (_super) {
                __extends(Polygon, _super);
                function Polygon(points) {
                    if (points === void 0) { points = []; }
                    var _this = _super.call(this) || this;
                    _this.points = points;
                    return _this;
                }
                Polygon.prototype.clearComponent = function () { };
                Polygon.prototype.render = function () {
                    this.clearComponent();
                    var rules = this.getStyle();
                    this.path = new Path2D();
                    this.path.moveTo(this.points[0].x, this.points[0].y);
                    this.path.lineTo(this.points[1].x, this.points[1].y);
                    this.path.lineTo(this.points[2].x, this.points[2].y);
                    this.path.closePath();
                    this.canvas.ctx.save();
                    this.canvas.ctx.fillStyle = rules['background-color'];
                    this.canvas.ctx.fill(this.path);
                    this.canvas.ctx.lineWidth = parseInt(rules['border-top-width']);
                    this.canvas.ctx.strokeStyle = rules['border-top-style'];
                    this.canvas.ctx.stroke(this.path);
                    this.canvas.ctx.restore();
                };
                return Polygon;
            }(Component_1.Component));
            Polygon = __decorate([
                Component_1.RegisterComponent({
                    selector: 'polygon',
                    style: "\n        polygon {\n            border: 1px black solid;\n            background: pink;\n        }\n    "
                }),
                __metadata("design:paramtypes", [Array])
            ], Polygon);
            exports_1("Polygon", Polygon);
        }
    };
});
