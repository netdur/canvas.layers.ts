import { DamagedRectManager } from './DamagedRectManager';
import { Layer } from './Layer'

export class Container extends Layer {

    canvas: HTMLCanvasElement
	damagedRectManager: DamagedRectManager

    constructor(canvas: HTMLCanvasElement, supportsTransparency: boolean) {
        super(0, 0, canvas.width, canvas.height);
		this.canvas = canvas;
		this.damagedRectManager = new DamagedRectManager(this, supportsTransparency);
		this.damagedRectManager.addDamagedRect(this.rect);
	}

    getDamagedRectManager(): DamagedRectManager {
        return this.damagedRectManager;
    }

    redraw() {
    	this.damagedRectManager.redraw();
    }
}