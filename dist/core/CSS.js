System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var CSS;
    return {
        setters: [],
        execute: function () {
            CSS = (function () {
                function CSS() {
                }
                CSS.prototype.rulesBySelector = function (selector) {
                    var definedRules = {};
                    for (var i = 0; i < document.styleSheets.length; i++) {
                        var styleSheet = document.styleSheets[i];
                        for (var j = 0; j < styleSheet.cssRules.length; j++) {
                            var rules = styleSheet.cssRules[j];
                            if (rules.selectorText != selector)
                                continue;
                            for (var rule in rules.style) {
                                if (isNaN(parseInt(rule)))
                                    continue;
                                var key = rules.style[rule];
                                definedRules[key] = rules.style[key];
                            }
                        }
                    }
                    return definedRules;
                };
                CSS.prototype.obj2css = function (css) {
                    var res = "";
                    for (var key in css) {
                        res += key + ": " + css[key] + ";";
                    }
                    return res;
                };
                return CSS;
            }());
            exports_1("CSS", CSS);
        }
    };
});
