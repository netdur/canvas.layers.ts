import { Layer } from './Layer';

export class LayerCollection {
    
    list = new Array<Layer>();
	layer: Layer

    constructor(layer: Layer) {
		this.layer = layer;
	}

    add(layer: Layer) {
        layer.setParent(this.layer);
        this.list.push(layer);
        layer.markRectsDamaged();
    }

    insert(layer: Layer) {
        layer.setParent(this.layer);
        this.list.splice(0, 0, layer);
        layer.markRectsDamaged();	
    }

    remove(layer: Layer) {
        const index = this.getLayerIndex(layer);
        if (index > -1) {
            this.list.splice(index, 1);
        }
        layer.markRectsDamaged();
        layer.setParent(null);
    }

    length(): number {
        return this.list.length;
    }
            
    at(index: number): Layer {
        return this.list[index];
    }

    raiseToTop(layer: Layer) {
        const index = this.getLayerIndex(layer);
        if (index > -1) {
            this.list.splice(index, 1);
            this.add(layer);
        }
    }

    lowerToBottom(layer: Layer) {
        const index = this.getLayerIndex(layer);
        if (index > -1) {
            this.list.splice(index, 1);
            this.insert(layer)
        }
    }
            
    getLayerIndex(layer: Layer): number {
        for (let i in this.list) {
            if (this.list[i] == layer) {
                return parseInt(i);
            }
        }
        return -1;
    }
}