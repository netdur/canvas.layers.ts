System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Easing;
    return {
        setters: [],
        execute: function () {
            Easing = (function () {
                function Easing() {
                }
                Easing.linearEase = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * currentIteration / totalIterations + startValue;
                };
                Easing.easeInQuad = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (currentIteration /= totalIterations) * currentIteration + startValue;
                };
                Easing.easeOutQuad = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return -changeInValue * (currentIteration /= totalIterations) * (currentIteration - 2) + startValue;
                };
                Easing.easeInOutQuad = function (currentIteration, startValue, changeInValue, totalIterations) {
                    if ((currentIteration /= totalIterations / 2) < 1) {
                        return changeInValue / 2 * currentIteration * currentIteration + startValue;
                    }
                    return -changeInValue / 2 * ((--currentIteration) * (currentIteration - 2) - 1) + startValue;
                };
                Easing.easeInCubic = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.pow(currentIteration / totalIterations, 3) + startValue;
                };
                Easing.easeOutCubic = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 3) + 1) + startValue;
                };
                Easing.easeInOutCubic = function (currentIteration, startValue, changeInValue, totalIterations) {
                    if ((currentIteration /= totalIterations / 2) < 1) {
                        return changeInValue / 2 * Math.pow(currentIteration, 3) + startValue;
                    }
                    return changeInValue / 2 * (Math.pow(currentIteration - 2, 3) + 2) + startValue;
                };
                Easing.easeInQuart = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.pow(currentIteration / totalIterations, 4) + startValue;
                };
                Easing.easeOutQuart = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return -changeInValue * (Math.pow(currentIteration / totalIterations - 1, 4) - 1) + startValue;
                };
                Easing.easeInOutQuart = function (currentIteration, startValue, changeInValue, totalIterations) {
                    if ((currentIteration /= totalIterations / 2) < 1) {
                        return changeInValue / 2 * Math.pow(currentIteration, 4) + startValue;
                    }
                    return -changeInValue / 2 * (Math.pow(currentIteration - 2, 4) - 2) + startValue;
                };
                Easing.easeInQuint = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.pow(currentIteration / totalIterations, 5) + startValue;
                };
                Easing.easeOutQuint = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (Math.pow(currentIteration / totalIterations - 1, 5) + 1) + startValue;
                };
                Easing.easeInOutQuint = function (currentIteration, startValue, changeInValue, totalIterations) {
                    if ((currentIteration /= totalIterations / 2) < 1) {
                        return changeInValue / 2 * Math.pow(currentIteration, 5) + startValue;
                    }
                    return changeInValue / 2 * (Math.pow(currentIteration - 2, 5) + 2) + startValue;
                };
                Easing.easeInSine = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (1 - Math.cos(currentIteration / totalIterations * (Math.PI / 2))) + startValue;
                };
                Easing.easeOutSine = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.sin(currentIteration / totalIterations * (Math.PI / 2)) + startValue;
                };
                Easing.easeInOutSine = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue / 2 * (1 - Math.cos(Math.PI * currentIteration / totalIterations)) + startValue;
                };
                Easing.easeInExpo = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.pow(2, 10 * (currentIteration / totalIterations - 1)) + startValue;
                };
                Easing.easeOutExpo = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (-Math.pow(2, -10 * currentIteration / totalIterations) + 1) + startValue;
                };
                Easing.easeInOutExpo = function (currentIteration, startValue, changeInValue, totalIterations) {
                    if ((currentIteration /= totalIterations / 2) < 1) {
                        return changeInValue / 2 * Math.pow(2, 10 * (currentIteration - 1)) + startValue;
                    }
                    return changeInValue / 2 * (-Math.pow(2, -10 * --currentIteration) + 2) + startValue;
                };
                Easing.easeInCirc = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * (1 - Math.sqrt(1 - (currentIteration /= totalIterations) * currentIteration)) + startValue;
                };
                Easing.easeOutCirc = function (currentIteration, startValue, changeInValue, totalIterations) {
                    return changeInValue * Math.sqrt(1 - (currentIteration = currentIteration / totalIterations - 1) * currentIteration) + startValue;
                };
                Easing.easeInOutCirc = function (currentIteration, startValue, changeInValue, totalIterations) {
                    if ((currentIteration /= totalIterations / 2) < 1) {
                        return changeInValue / 2 * (1 - Math.sqrt(1 - currentIteration * currentIteration)) + startValue;
                    }
                    return changeInValue / 2 * (Math.sqrt(1 - (currentIteration -= 2) * currentIteration) + 1) + startValue;
                };
                return Easing;
            }());
            exports_1("Easing", Easing);
        }
    };
});
