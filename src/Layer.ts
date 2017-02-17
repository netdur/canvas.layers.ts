import { Rectangle } from './Rectangle'
import { LayerCollection } from './LayerCollection'
import { DamagedRectManager } from './DamagedRectManager';

export class Layer {

    parent: Layer = null
    visible: boolean = true
    canvas: HTMLCanvasElement = null
    permeable: boolean = false
    onRender: Function = null;

    rect: Rectangle
    children: LayerCollection

    constructor(x: number, y: number, width: number, height: number) {
        this.rect = new Rectangle(x, y, width, height);
        this.children = new LayerCollection(this);
    }

    getX(): number {
        if (this.parent != null) {
            return this.rect.x + this.getParent().getX();
        }
        return this.rect.x;
    }

    getY(): number {
        if (this.parent != null) {
            return this.rect.y + this.getParent().getY();
        }
        return this.rect.y;
    }

    getRelativeX(): number {
        return this.rect.x;
    }

    getRelativeY(): number {
        return this.rect.y;
    }

    getParent(): Layer {
        return this.parent;
    }

    setParent(parent: Layer) {
        this.parent = parent;
    }

    getRect(): Rectangle {
        return this.rect;
    }

    isPermeable(): boolean {
        return this.permeable;
    }

    setPermeable(permeable: boolean) {
        this.permeable = permeable;
    }

    getChildren(): LayerCollection {
        return this.children;
    }

    getWidth(): number {
        return this.rect.width;
    }

    getHeight(): number {
        return this.rect.height;
    }

    getClientRect(): Rectangle {
        return new Rectangle(0, 0, this.getWidth(), this.getHeight());
    }

    getRectClippedToHierarchy(): Rectangle {

        var rect = new Rectangle(this.getX(), this.getY(), this.getWidth(), this.getHeight());

        var parent = this.parent;
        var layer = this as Layer;

        while (parent) {
            var parentRect = parent.getRect();
            rect.clipToIntersect(parentRect);
            layer = parent;
            parent = parent.getParent();
        }

        return rect;
    }

    isVisible(): boolean {
        if (!this.visible) return false;
        if (!this.parent) return this.visible;
        return (this.parent.isVisible());
    }

    getCanvas(): HTMLCanvasElement {
        if (!this.canvas) {
            if (this.parent) {
                this.canvas = this.parent.getCanvas();
            }
        }
        return this.canvas;
    }

    getDamagedRectManager(): DamagedRectManager | null {
        if (this.parent) return this.parent.getDamagedRectManager();
        return null;
    }

    markRectsDamaged() {
        var damagedRectManager = this.getDamagedRectManager();

        if (!damagedRectManager) return;

        if (damagedRectManager.supportsTransparency) {

            // We are supporting transparency, so we need to mark the entire layer
            // as damaged
            damagedRectManager.addDamagedRect(this.getRectClippedToHierarchy());
        } else {
            // We are not supporting transparency, so we mark the visible regions
            // as damaged.
            var damagedRects = this.getVisibleRects();

            for (var i in damagedRects) {
                damagedRectManager.addDamagedRect(damagedRects[i]);
            }
        }
    }

    markRectDamaged(rect: any) {
        var visibleRects;
        var damagedRectManager = this.getDamagedRectManager();

        if (!damagedRectManager) return;

        // If we are supporting transparency, we need to redraw the portions of the
        // rect that overlap any part of this layer.  If not, we only need to
        // redraw the portions of the rect that overlap the visible regions of the
        // rect
        if (damagedRectManager.supportsTransparency) {
            visibleRects = new Array();
            visibleRects.push(this.rect);
        } else {
            visibleRects = this.getVisibleRects();
        }

        // Convert the rect to the absolute position
        var absoluteRect = new Rectangle(rect.x + this.getX(), rect.y + this.getY(), rect.width, rect.height);

        // Work out which areas of the rect intersect the visible portion of the
        // layer
        var damagedRects = new Array();

        for (var i in visibleRects) {
            var intersect = absoluteRect.splitIntersection(visibleRects[i], []);
            if (intersect) {
                damagedRects.push(intersect);
            }
        }

        // Send all damaged rects to the manager
        for (var i in damagedRects) {
            damagedRectManager.addDamagedRect(damagedRects[i]);
        }
    }

    getVisibleRects() {

        var rect = new Rectangle(this.getX(), this.getY(), this.getWidth(), this.getHeight());

        var visibleRects = new Array();
        visibleRects.push(rect);

        var layer = this as Layer;
        var parent = this.parent;

        while (parent && layer) {
            var layerIndex = parent.getChildren().getLayerIndex(layer) + 1;

            if (layerIndex > 0) {
                for (var i = layerIndex; i < parent.getChildren().length(); i++) {
                    for (var j = 0; j < visibleRects.length; ++j) {
                        var remainingRects = new Array();

                        var child = parent.getChildren().at(i);
                        var childRect = new Rectangle(child.getX(), child.getY(), child.getWidth(), child.getHeight());

                        if (childRect.splitIntersection(visibleRects[j], remainingRects)) {
                            visibleRects.splice(j, 1);
                            j--;

                            for (var k in remainingRects) {
                                visibleRects.unshift(remainingRects[k]);
                                j++;
                            }
                        }
                    }

                    if (visibleRects.length == 0) break;
                }
            }

            if (visibleRects.length > 0) {
                layer = parent;
                if (parent) {
                    parent = parent.getParent();
                }
            } else {
                return visibleRects;
            }
        }

        return visibleRects;
    }

    close() {
        if (this.parent != null) {
            this.parent.getChildren().remove(this);
        }
    }

    render(rect: Rectangle) {
        if (!this.isVisible()) return;

        var context = this.getCanvas().getContext("2d");
        requestAnimationFrame(() => {
            context.save();
            context.beginPath();
            context.rect(rect.x, rect.y, rect.width, rect.height);
            context.clip();

            context.translate(this.getX(), this.getY());

            if (this.onRender != null) this.onRender(this, rect, context);

            context.closePath();
            context.restore();

            // Enable this to draw rects around all clipping regions
            /*
            context.save();
            context.beginPath();
            context.rect(0, 0, 400, 400);
            context.clip();
            
            context.strokeStyle = '#f00';
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            context.closePath();
            context.restore();
            */
        });
    }

    checkLayerCollision(layer: Layer): boolean {
        return this.checkRectCollision(layer.getRect());
    }

    checkRectCollision(rect: Rectangle): boolean {
        if (!this.isVisible()) return false;

        var x = this.getX();
        var y = this.getY();

        if (rect.x + rect.width <= x) return false;
        if (rect.x >= x + this.rect.width) return false;
        if (rect.y + rect.height <= y) return false;
        if (rect.y >= y + this.rect.height) return false;

        return true;
    }

    checkPointCollision(x: number, y: number): boolean {
        if (!this.isVisible()) return false;

        var thisX = this.getX();
        var thisY = this.getY();

        if (x < thisX) return false;
        if (x >= thisX + this.rect.width) return false;
        if (y < thisY) return false;
        if (y >= thisY + this.rect.height) return false;

        return true;
    }

    getMinChildX(): number {
        if (this.permeable) return -Number.MAX_VALUE;
        return 0;
    }

    getMinChildY(): number {
        if (this.permeable) return -Number.MAX_VALUE;
        return 0;
    }

    getMaxChildX(): number {
        if (this.permeable) return Number.MAX_VALUE;
        return this.rect.width - 1;
    }

    getMaxChildY(): number {
        if (this.permeable) return Number.MAX_VALUE;
        return this.rect.height - 1;
    }

    moveTo(x: number, y: number) {
        if (this.parent != null) {
            if (!this.parent.isPermeable()) {
                var minX = this.parent.getMinChildX();
                var maxX = this.parent.getMaxChildX() - this.rect.width + 1;
                var minY = this.parent.getMinChildY();
                var maxY = this.parent.getMaxChildY() - this.rect.height + 1;

                if (x < minX) x = minX;
                if (x > maxX) x = maxX;
                if (y < minY) y = minY;
                if (y > maxY) y = maxY;
            }
        }
        if (this.rect.x == x && this.rect.y == y) return;
        this.hide();
        this.rect.x = x;
        this.rect.y = y;
        this.show();
    }

    resize(width: number, height: number) {
        if (this.parent != null) {
            if (!this.parent.isPermeable()) {
                var maxWidth = this.parent.getMaxChildX() - this.rect.x + 1;
                var maxHeight = this.parent.getMaxChildY() - this.rect.y + 1;

                if (width > maxWidth) width = maxWidth;
                if (height > maxHeight) height = maxHeight;
            }
        }
        if (this.rect.width == width && this.rect.height == height) return;
        this.hide();
        this.rect.width = width;
        this.rect.height = height;
        this.show();
    }

    hide() {
        if (this.visible) {
            this.visible = false;
            this.markRectsDamaged();
        }
    }

    show() {
        if (!this.visible) {
            this.visible = true;
            this.markRectsDamaged();
        }
    }

    raiseToTop() {
        if (this.parent != null) {
            this.hide();
            this.parent.raiseChildToTop(this);
            this.show();
        }
    }

    raiseChildToTop(child: any) {
        this.children.raiseToTop(child);
    }

    lowerToBottom() {
        if (this.parent != null) {
            this.hide();
            this.parent.lowerChildToBottom(this);
            this.show();
        }
    }

    lowerChildToBottom(child: any) {
        this.children.lowerToBottom(child);
    }

    getLayerAt(x: number, y: number) : Layer | void {
        if (this.checkPointCollision(x, y)) {
            var layer = null;

            for (var i = 0; i < this.children.length(); ++i) {
                layer = this.children.at(i).getLayerAt(x, y);

                if (layer) return layer;
            }

            return this;
        }
        return null;
    }
}