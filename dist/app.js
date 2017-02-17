System.register(["./Layer", "./Container"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Layer_1, Container_1, Main, ex;
    return {
        setters: [
            function (Layer_1_1) {
                Layer_1 = Layer_1_1;
            },
            function (Container_1_1) {
                Container_1 = Container_1_1;
            }
        ],
        execute: function () {
            Main = function () {
                var i = 0;
                document.getElementById("ex").addEventListener("click", function (e) {
                    ex();
                    i++;
                    this.innerText = "add box " + i;
                }, false);
                ex();
            };
            ex = function () {
                var canvas = document.getElementById("c");
                var container = new Container_1.Container(canvas, true);
                container.onRender = function (layer, rect, context) {
                    context.fillStyle = '#000';
                    context.fillRect(0, 0, layer.getWidth(), layer.getHeight());
                };
                var layer1 = new Layer_1.Layer(10, 10, 380, 380);
                container.getChildren().add(layer1);
                layer1.setPermeable(true);
                layer1.onRender = function (layer, rect, context) {
                    context.fillStyle = '#00f';
                    context.fillRect(0, 0, layer.getWidth(), layer.getHeight());
                };
                var layer2 = new Layer_1.Layer(0, 175, 400, 50);
                layer1.getChildren().add(layer2);
                layer2.onRender = function (layer, rect, context) {
                    context.fillStyle = '#eee';
                    context.fillRect(0, 0, layer.getWidth(), layer.getHeight());
                };
                var layer3 = new Layer_1.Layer(10, 10, 20, 20);
                layer1.getChildren().add(layer3);
                layer3.lowerToBottom();
                layer3.onRender = function (layer, rect, context) {
                    context.fillStyle = '#f00';
                    context.fillRect(0, 0, layer.getWidth(), layer.getHeight());
                };
                container.redraw();
                var dx = 1;
                var dy = 2;
                var anim = function () {
                    layer3.moveTo(layer3.getRelativeX() + dx, layer3.getRelativeY() + dy);
                    if (layer3.getRelativeX() >= layer3.getParent().getWidth()) {
                        dx = -1;
                    }
                    else if (layer3.getRelativeX() <= -layer3.getWidth()) {
                        dx = 1;
                    }
                    if (layer3.getRelativeY() >= layer3.getParent().getHeight()) {
                        dy = -2;
                    }
                    else if (layer3.getRelativeY() <= -layer3.getHeight()) {
                        dy = 2;
                    }
                    container.redraw();
                    requestAnimationFrame(anim);
                };
                requestAnimationFrame(anim);
            };
            Main();
        }
    };
});
