System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var LayerCollection;
    return {
        setters: [],
        execute: function () {
            LayerCollection = (function () {
                function LayerCollection(layer) {
                    this.list = new Array();
                    this.layer = layer;
                }
                LayerCollection.prototype.add = function (layer) {
                    layer.setParent(this.layer);
                    this.list.push(layer);
                    layer.markRectsDamaged();
                };
                LayerCollection.prototype.insert = function (layer) {
                    layer.setParent(this.layer);
                    this.list.splice(0, 0, layer);
                    layer.markRectsDamaged();
                };
                LayerCollection.prototype.remove = function (layer) {
                    var index = this.getLayerIndex(layer);
                    if (index > -1) {
                        this.list.splice(index, 1);
                    }
                    layer.markRectsDamaged();
                    layer.setParent(null);
                };
                LayerCollection.prototype.length = function () {
                    return this.list.length;
                };
                LayerCollection.prototype.at = function (index) {
                    return this.list[index];
                };
                LayerCollection.prototype.raiseToTop = function (layer) {
                    var index = this.getLayerIndex(layer);
                    if (index > -1) {
                        this.list.splice(index, 1);
                        this.add(layer);
                    }
                };
                LayerCollection.prototype.lowerToBottom = function (layer) {
                    var index = this.getLayerIndex(layer);
                    if (index > -1) {
                        this.list.splice(index, 1);
                        this.insert(layer);
                    }
                };
                LayerCollection.prototype.getLayerIndex = function (layer) {
                    for (var i in this.list) {
                        if (this.list[i] == layer) {
                            return parseInt(i);
                        }
                    }
                    return -1;
                };
                return LayerCollection;
            }());
            exports_1("LayerCollection", LayerCollection);
        }
    };
});
