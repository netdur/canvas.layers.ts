System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rectangle;
    return {
        setters: [],
        execute: function () {
            Rectangle = (function () {
                function Rectangle(x, y, width, height) {
                    this.x = x;
                    this.y = y;
                    this.width = width;
                    this.height = height;
                }
                Rectangle.prototype.getX2 = function () {
                    return this.x + this.width - 1;
                };
                Rectangle.prototype.getY2 = function () {
                    return this.y + this.height - 1;
                };
                Rectangle.prototype.getIntersect = function (rect) {
                    var x1 = this.x > rect.x ? this.x : rect.x;
                    var y1 = this.y > rect.y ? this.y : rect.y;
                    var x2 = this.getX2() < rect.getX2() ? this.getX2() : rect.getX2();
                    var y2 = this.getY2() < rect.getY2() ? this.getY2() : rect.getY2();
                    return new Rectangle(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
                };
                Rectangle.prototype.getAddition = function (rect) {
                    var x1 = this.x < rect.x ? this.x : rect.x;
                    var y1 = this.y < rect.y ? this.y : rect.x;
                    var x2 = this.getX2() > rect.getX2() ? this.getX2() : rect.getX2();
                    var y2 = this.getY2() > rect.getY2() ? this.getY2() : rect.getY2();
                    return new Rectangle(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
                };
                Rectangle.prototype.clipToIntersect = function (rect) {
                    var clipped = this.getIntersect(rect);
                    this.x = clipped.x;
                    this.y = clipped.y;
                    this.width = clipped.width;
                    this.height = clipped.height;
                };
                Rectangle.prototype.expandToInclude = function (rect) {
                    var addition = this.getAddition(rect);
                    this.x = addition.x;
                    this.y = addition.y;
                    this.width = addition.width;
                    this.height = addition.height;
                };
                Rectangle.prototype.hasDimensions = function () {
                    if (this.width < 1)
                        return false;
                    if (this.height < 1)
                        return false;
                    return true;
                };
                Rectangle.prototype.intersects = function (rect) {
                    return ((this.x + this.width > rect.x) &&
                        (this.y + this.height > rect.y) &&
                        (this.x < rect.x + rect.width) &&
                        (this.y < rect.y + rect.height));
                };
                Rectangle.prototype.contains = function (x, y) {
                    return ((x >= this.x) &&
                        (y >= this.y) &&
                        (x < this.x + this.width) &&
                        (y < this.y + this.height));
                };
                Rectangle.prototype.splitIntersection = function (rect, remainderRects) {
                    if (!this.intersects(rect))
                        return null;
                    var intersection = new Rectangle(rect.x, rect.y, rect.width, rect.height);
                    if (intersection.x < this.x) {
                        var left = new Rectangle(0, 0, 0, 0);
                        left.x = intersection.x;
                        left.y = intersection.y;
                        left.width = this.x - intersection.x;
                        left.height = intersection.height;
                        remainderRects.push(left);
                        intersection.x = this.x;
                        intersection.width -= left.width;
                    }
                    if (intersection.x + intersection.width > this.x + this.width) {
                        var right = new Rectangle(0, 0, 0, 0);
                        right.x = this.x + this.width;
                        right.y = intersection.y;
                        right.width = intersection.width - (this.x + this.width - intersection.x);
                        right.height = intersection.height;
                        remainderRects.push(right);
                        intersection.width -= right.width;
                    }
                    if (intersection.y < this.y) {
                        var top_1 = new Rectangle(0, 0, 0, 0);
                        top_1.x = intersection.x;
                        top_1.y = intersection.y;
                        top_1.width = intersection.width;
                        top_1.height = this.y - intersection.y;
                        remainderRects.push(top_1);
                        intersection.y = this.y;
                        intersection.height -= top_1.height;
                    }
                    if (intersection.y + intersection.height > this.y + this.height) {
                        var bottom = new Rectangle(0, 0, 0, 0);
                        bottom.x = intersection.x;
                        bottom.y = this.y + this.height;
                        bottom.width = intersection.width;
                        bottom.height = intersection.height - (this.y + this.height - intersection.y);
                        remainderRects.push(bottom);
                        intersection.height -= bottom.height;
                    }
                    return intersection;
                };
                return Rectangle;
            }());
            exports_1("Rectangle", Rectangle);
        }
    };
});
