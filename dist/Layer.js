System.register(["./Rectangle", "./LayerCollection"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Rectangle_1, LayerCollection_1, Layer;
    return {
        setters: [
            function (Rectangle_1_1) {
                Rectangle_1 = Rectangle_1_1;
            },
            function (LayerCollection_1_1) {
                LayerCollection_1 = LayerCollection_1_1;
            }
        ],
        execute: function () {
            Layer = (function () {
                function Layer(x, y, width, height) {
                    this.parent = null;
                    this.visible = true;
                    this.canvas = null;
                    this.permeable = false;
                    this.onRender = null;
                    this.rect = new Rectangle_1.Rectangle(x, y, width, height);
                    this.children = new LayerCollection_1.LayerCollection(this);
                }
                Layer.prototype.getX = function () {
                    if (this.parent != null) {
                        return this.rect.x + this.getParent().getX();
                    }
                    return this.rect.x;
                };
                Layer.prototype.getY = function () {
                    if (this.parent != null) {
                        return this.rect.y + this.getParent().getY();
                    }
                    return this.rect.y;
                };
                Layer.prototype.getRelativeX = function () {
                    return this.rect.x;
                };
                Layer.prototype.getRelativeY = function () {
                    return this.rect.y;
                };
                Layer.prototype.getParent = function () {
                    return this.parent;
                };
                Layer.prototype.setParent = function (parent) {
                    this.parent = parent;
                };
                Layer.prototype.getRect = function () {
                    return this.rect;
                };
                Layer.prototype.isPermeable = function () {
                    return this.permeable;
                };
                Layer.prototype.setPermeable = function (permeable) {
                    this.permeable = permeable;
                };
                Layer.prototype.getChildren = function () {
                    return this.children;
                };
                Layer.prototype.getWidth = function () {
                    return this.rect.width;
                };
                Layer.prototype.getHeight = function () {
                    return this.rect.height;
                };
                Layer.prototype.getClientRect = function () {
                    return new Rectangle_1.Rectangle(0, 0, this.getWidth(), this.getHeight());
                };
                Layer.prototype.getRectClippedToHierarchy = function () {
                    var rect = new Rectangle_1.Rectangle(this.getX(), this.getY(), this.getWidth(), this.getHeight());
                    var parent = this.parent;
                    var layer = this;
                    while (parent) {
                        var parentRect = parent.getRect();
                        rect.clipToIntersect(parentRect);
                        layer = parent;
                        parent = parent.getParent();
                    }
                    return rect;
                };
                Layer.prototype.isVisible = function () {
                    if (!this.visible)
                        return false;
                    if (!this.parent)
                        return this.visible;
                    return (this.parent.isVisible());
                };
                Layer.prototype.getCanvas = function () {
                    if (!this.canvas) {
                        if (this.parent) {
                            this.canvas = this.parent.getCanvas();
                        }
                    }
                    return this.canvas;
                };
                Layer.prototype.getDamagedRectManager = function () {
                    if (this.parent)
                        return this.parent.getDamagedRectManager();
                    return null;
                };
                Layer.prototype.markRectsDamaged = function () {
                    var damagedRectManager = this.getDamagedRectManager();
                    if (!damagedRectManager)
                        return;
                    if (damagedRectManager.supportsTransparency) {
                        damagedRectManager.addDamagedRect(this.getRectClippedToHierarchy());
                    }
                    else {
                        var damagedRects = this.getVisibleRects();
                        for (var i in damagedRects) {
                            damagedRectManager.addDamagedRect(damagedRects[i]);
                        }
                    }
                };
                Layer.prototype.markRectDamaged = function (rect) {
                    var visibleRects;
                    var damagedRectManager = this.getDamagedRectManager();
                    if (!damagedRectManager)
                        return;
                    if (damagedRectManager.supportsTransparency) {
                        visibleRects = new Array();
                        visibleRects.push(this.rect);
                    }
                    else {
                        visibleRects = this.getVisibleRects();
                    }
                    var absoluteRect = new Rectangle_1.Rectangle(rect.x + this.getX(), rect.y + this.getY(), rect.width, rect.height);
                    var damagedRects = new Array();
                    for (var i in visibleRects) {
                        var intersect = absoluteRect.splitIntersection(visibleRects[i], []);
                        if (intersect) {
                            damagedRects.push(intersect);
                        }
                    }
                    for (var i in damagedRects) {
                        damagedRectManager.addDamagedRect(damagedRects[i]);
                    }
                };
                Layer.prototype.getVisibleRects = function () {
                    var rect = new Rectangle_1.Rectangle(this.getX(), this.getY(), this.getWidth(), this.getHeight());
                    var visibleRects = new Array();
                    visibleRects.push(rect);
                    var layer = this;
                    var parent = this.parent;
                    while (parent && layer) {
                        var layerIndex = parent.getChildren().getLayerIndex(layer) + 1;
                        if (layerIndex > 0) {
                            for (var i = layerIndex; i < parent.getChildren().length(); i++) {
                                for (var j = 0; j < visibleRects.length; ++j) {
                                    var remainingRects = new Array();
                                    var child = parent.getChildren().at(i);
                                    var childRect = new Rectangle_1.Rectangle(child.getX(), child.getY(), child.getWidth(), child.getHeight());
                                    if (childRect.splitIntersection(visibleRects[j], remainingRects)) {
                                        visibleRects.splice(j, 1);
                                        j--;
                                        for (var k in remainingRects) {
                                            visibleRects.unshift(remainingRects[k]);
                                            j++;
                                        }
                                    }
                                }
                                if (visibleRects.length == 0)
                                    break;
                            }
                        }
                        if (visibleRects.length > 0) {
                            layer = parent;
                            if (parent) {
                                parent = parent.getParent();
                            }
                        }
                        else {
                            return visibleRects;
                        }
                    }
                    return visibleRects;
                };
                Layer.prototype.close = function () {
                    if (this.parent != null) {
                        this.parent.getChildren().remove(this);
                    }
                };
                Layer.prototype.render = function (rect) {
                    var _this = this;
                    if (!this.isVisible())
                        return;
                    var context = this.getCanvas().getContext("2d");
                    requestAnimationFrame(function () {
                        context.save();
                        context.beginPath();
                        context.rect(rect.x, rect.y, rect.width, rect.height);
                        context.clip();
                        context.translate(_this.getX(), _this.getY());
                        if (_this.onRender != null)
                            _this.onRender(_this, rect, context);
                        context.closePath();
                        context.restore();
                    });
                };
                Layer.prototype.checkLayerCollision = function (layer) {
                    return this.checkRectCollision(layer.getRect());
                };
                Layer.prototype.checkRectCollision = function (rect) {
                    if (!this.isVisible())
                        return false;
                    var x = this.getX();
                    var y = this.getY();
                    if (rect.x + rect.width <= x)
                        return false;
                    if (rect.x >= x + this.rect.width)
                        return false;
                    if (rect.y + rect.height <= y)
                        return false;
                    if (rect.y >= y + this.rect.height)
                        return false;
                    return true;
                };
                Layer.prototype.checkPointCollision = function (x, y) {
                    if (!this.isVisible())
                        return false;
                    var thisX = this.getX();
                    var thisY = this.getY();
                    if (x < thisX)
                        return false;
                    if (x >= thisX + this.rect.width)
                        return false;
                    if (y < thisY)
                        return false;
                    if (y >= thisY + this.rect.height)
                        return false;
                    return true;
                };
                Layer.prototype.getMinChildX = function () {
                    if (this.permeable)
                        return -Number.MAX_VALUE;
                    return 0;
                };
                Layer.prototype.getMinChildY = function () {
                    if (this.permeable)
                        return -Number.MAX_VALUE;
                    return 0;
                };
                Layer.prototype.getMaxChildX = function () {
                    if (this.permeable)
                        return Number.MAX_VALUE;
                    return this.rect.width - 1;
                };
                Layer.prototype.getMaxChildY = function () {
                    if (this.permeable)
                        return Number.MAX_VALUE;
                    return this.rect.height - 1;
                };
                Layer.prototype.moveTo = function (x, y) {
                    if (this.parent != null) {
                        if (!this.parent.isPermeable()) {
                            var minX = this.parent.getMinChildX();
                            var maxX = this.parent.getMaxChildX() - this.rect.width + 1;
                            var minY = this.parent.getMinChildY();
                            var maxY = this.parent.getMaxChildY() - this.rect.height + 1;
                            if (x < minX)
                                x = minX;
                            if (x > maxX)
                                x = maxX;
                            if (y < minY)
                                y = minY;
                            if (y > maxY)
                                y = maxY;
                        }
                    }
                    if (this.rect.x == x && this.rect.y == y)
                        return;
                    this.hide();
                    this.rect.x = x;
                    this.rect.y = y;
                    this.show();
                };
                Layer.prototype.resize = function (width, height) {
                    if (this.parent != null) {
                        if (!this.parent.isPermeable()) {
                            var maxWidth = this.parent.getMaxChildX() - this.rect.x + 1;
                            var maxHeight = this.parent.getMaxChildY() - this.rect.y + 1;
                            if (width > maxWidth)
                                width = maxWidth;
                            if (height > maxHeight)
                                height = maxHeight;
                        }
                    }
                    if (this.rect.width == width && this.rect.height == height)
                        return;
                    this.hide();
                    this.rect.width = width;
                    this.rect.height = height;
                    this.show();
                };
                Layer.prototype.hide = function () {
                    if (this.visible) {
                        this.visible = false;
                        this.markRectsDamaged();
                    }
                };
                Layer.prototype.show = function () {
                    if (!this.visible) {
                        this.visible = true;
                        this.markRectsDamaged();
                    }
                };
                Layer.prototype.raiseToTop = function () {
                    if (this.parent != null) {
                        this.hide();
                        this.parent.raiseChildToTop(this);
                        this.show();
                    }
                };
                Layer.prototype.raiseChildToTop = function (child) {
                    this.children.raiseToTop(child);
                };
                Layer.prototype.lowerToBottom = function () {
                    if (this.parent != null) {
                        this.hide();
                        this.parent.lowerChildToBottom(this);
                        this.show();
                    }
                };
                Layer.prototype.lowerChildToBottom = function (child) {
                    this.children.lowerToBottom(child);
                };
                Layer.prototype.getLayerAt = function (x, y) {
                    if (this.checkPointCollision(x, y)) {
                        var layer = null;
                        for (var i = 0; i < this.children.length(); ++i) {
                            layer = this.children.at(i).getLayerAt(x, y);
                            if (layer)
                                return layer;
                        }
                        return this;
                    }
                    return null;
                };
                return Layer;
            }());
            exports_1("Layer", Layer);
        }
    };
});
