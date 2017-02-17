System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var AnimationFrameQueue;
    return {
        setters: [],
        execute: function () {
            AnimationFrameQueue = (function () {
                function AnimationFrameQueue() {
                    this.queue = new Array();
                }
                AnimationFrameQueue.prototype.add = function (callback) {
                    var _this = this;
                    this.queue.push(requestAnimationFrame(function () {
                        _this.queue.shift();
                        callback();
                    }));
                };
                AnimationFrameQueue.prototype.clear = function () {
                    for (var i = 0, len = this.queue.length; i < len; i++) {
                        window.cancelAnimationFrame(this.queue[i]);
                    }
                };
                AnimationFrameQueue.delay = function (ms) {
                    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
                };
                return AnimationFrameQueue;
            }());
            AnimationFrameQueue.nextFrame = function () {
                var resolve = null;
                var promise = new Promise(function (r) { return resolve = r; });
                if (resolve != null)
                    window.requestAnimationFrame(resolve);
                return promise;
            };
            exports_1("AnimationFrameQueue", AnimationFrameQueue);
        }
    };
});
