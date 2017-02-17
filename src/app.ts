import { Layer } from './Layer';
import { Container } from './Container';

const Main = () => {
    let i = 0;
    document.getElementById("ex").addEventListener("click", function(e) {
        ex()
        i++;
        this.innerText = `add box ${i}`;
    }, false);
    ex();
}

const ex = () => {
    const canvas = document.getElementById("c");
    const container = new Container(canvas as HTMLCanvasElement, true);

    container.onRender = function(layer: any, rect: any, context: any) {
        context.fillStyle = '#000';
        context.fillRect(0, 0, layer.getWidth(), layer.getHeight());
    }

    const layer1 = new Layer(10, 10, 380, 380);
    container.getChildren().add(layer1);
	
	layer1.setPermeable(true);

    layer1.onRender = function(layer: any, rect: any, context: any) {
        context.fillStyle = '#00f';
        context.fillRect(0, 0, layer.getWidth(), layer.getHeight());
    }

    const layer2 = new Layer(0, 175, 400, 50);
    layer1.getChildren().add(layer2);

    layer2.onRender = function(layer: any, rect: any, context: any) {
        context.fillStyle = '#eee';
        context.fillRect(0, 0, layer.getWidth(), layer.getHeight());
    }

    const layer3 = new Layer(10, 10, 20, 20);
    layer1.getChildren().add(layer3);
	
	layer3.lowerToBottom();

    layer3.onRender = function(layer: any, rect: any, context: any) {
        // console.trace();
        context.fillStyle = '#f00';
        context.fillRect(0, 0, layer.getWidth(), layer.getHeight());
    }

    container.redraw();

    //*
    let dx = 1;
    let dy = 2;
    const anim = () => {
        layer3.moveTo(layer3.getRelativeX() + dx, layer3.getRelativeY() + dy);
	
        if (layer3.getRelativeX() >= layer3.getParent().getWidth()) {
            dx = -1;
        } else if (layer3.getRelativeX() <= -layer3.getWidth()) {
            dx = 1;
        }
        
        if (layer3.getRelativeY() >= layer3.getParent().getHeight()) {
            dy = -2;
        } else if (layer3.getRelativeY() <= -layer3.getHeight()) {
            dy = 2;
        }
        
        container.redraw();

        requestAnimationFrame(anim);
    };

    requestAnimationFrame(anim);
    //*/
}

// document.addEventListener("DOMContentLoaded", e => new Main(), false);
Main()
