System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var DamagedRectManager;
    return {
        setters: [],
        execute: function () {
            DamagedRectManager = (function () {
                function DamagedRectManager(layer, supportsTransparency) {
                    this.damagedRects = new Array();
                    this.layer = layer;
                    this.damagedRects = new Array();
                    this.supportsTransparency = supportsTransparency;
                }
                DamagedRectManager.prototype.addDamagedRect = function (rect) {
                    var newRects = new Array();
                    var remainingRects = new Array();
                    newRects.push(rect);
                    for (var i = 0; i < this.damagedRects.length; ++i) {
                        for (var j = 0; j < newRects.length; ++j) {
                            var intersection = this.damagedRects[i].splitIntersection(newRects[j], remainingRects);
                            if (intersection) {
                                newRects.splice(j, 1);
                                j--;
                                for (var k = 0; k < remainingRects.length; ++k) {
                                    newRects.unshift(remainingRects[k]);
                                    j++;
                                }
                                remainingRects = new Array();
                            }
                        }
                    }
                    for (var i = 0; i < newRects.length; ++i) {
                        this.damagedRects.push(newRects[i]);
                    }
                };
                DamagedRectManager.prototype.redraw = function () {
                    this.drawRects(this.layer, this.damagedRects);
                    this.damagedRects = new Array();
                };
                DamagedRectManager.prototype.drawRects = function (layer, damagedRects) {
                    if (!layer.isVisible())
                        return;
                    if (damagedRects.length == 0)
                        return;
                    var layerRect = layer.getRectClippedToHierarchy();
                    var remainingRects = new Array();
                    var subRects = new Array();
                    for (var i = 0; i < damagedRects.length; ++i) {
                        var damagedRect = damagedRects[i];
                        var intersection = layerRect.splitIntersection(damagedRect, remainingRects);
                        if (intersection) {
                            damagedRects.splice(i, 1);
                            i--;
                            for (var j = 0; j < remainingRects.length; ++j) {
                                damagedRects.unshift(remainingRects[j]);
                                i++;
                            }
                            remainingRects = new Array();
                            subRects.push(intersection);
                            if (this.supportsTransparency) {
                                damagedRects.unshift(intersection);
                                i++;
                                layer.render(intersection);
                                for (var j = 0; j < layer.getChildren().length(); ++j) {
                                    this.drawRects(layer.getChildren().at(j), subRects);
                                    if (subRects.length == 0)
                                        break;
                                }
                            }
                            else {
                                for (var j = layer.getChildren().length() - 1; j >= 0; --j) {
                                    this.drawRects(layer.getChildren().at(j), subRects);
                                    if (subRects.length == 0)
                                        break;
                                }
                                for (var j = 0; j < subRects.length; ++j) {
                                    layer.render(subRects[j]);
                                }
                            }
                            subRects = new Array();
                        }
                    }
                };
                return DamagedRectManager;
            }());
            exports_1("DamagedRectManager", DamagedRectManager);
        }
    };
});
