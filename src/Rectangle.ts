export class Rectangle {

    x: number
	y: number
    width: number
    height: number

    constructor(x: number, y: number, width: number, height: number) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

    getX2(): number {
        return this.x + this.width - 1;
    }

    getY2(): number {
        return this.y + this.height - 1;
    }

    getIntersect(rect: Rectangle): Rectangle {
        const x1 = this.x > rect.x ? this.x : rect.x;
        const y1 = this.y > rect.y ? this.y : rect.y;
        const x2 = this.getX2() < rect.getX2() ? this.getX2() : rect.getX2();
        const y2 = this.getY2() < rect.getY2() ? this.getY2() : rect.getY2();
        return new Rectangle(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
    }

    getAddition(rect: Rectangle): Rectangle {
        const x1 = this.x < rect.x ? this.x : rect.x;
        const y1 = this.y < rect.y ? this.y : rect.x;
        const x2 = this.getX2() > rect.getX2() ? this.getX2() : rect.getX2();
        const y2 = this.getY2() > rect.getY2() ? this.getY2() : rect.getY2();
        return new Rectangle(x1, y1, x2 - x1 + 1, y2 - y1 + 1);
    }

    clipToIntersect(rect: Rectangle) {
        const clipped = this.getIntersect(rect);
        this.x = clipped.x;
        this.y = clipped.y;
        this.width = clipped.width;
        this.height = clipped.height;
    }

    expandToInclude(rect: Rectangle) {
        const addition = this.getAddition(rect);
        this.x = addition.x;
        this.y = addition.y;
        this.width = addition.width;
        this.height = addition.height;
    }

    hasDimensions(): boolean {
        if (this.width < 1) return false;
        if (this.height < 1) return false;
        return true;
    }

    intersects(rect: Rectangle): boolean {
        return ((this.x + this.width > rect.x) &&
                (this.y + this.height > rect.y) &&
                (this.x < rect.x + rect.width) &&
                (this.y < rect.y + rect.height));
    }

    contains(x: number, y: number): boolean {
        return ((x >= this.x) &&
                (y >= this.y) &&
                (x < this.x + this.width) &&
                (y < this.y + this.height));
    }

    splitIntersection(rect: Rectangle, remainderRects: any): Rectangle {

        if (!this.intersects(rect)) return null;
        
        const intersection = new Rectangle(rect.x, rect.y, rect.width, rect.height);

        if (intersection.x < this.x) {
            const left = new Rectangle(0, 0, 0, 0);
            left.x = intersection.x;
            left.y = intersection.y;
            left.width = this.x - intersection.x;
            left.height = intersection.height;
            remainderRects.push(left);
            intersection.x = this.x;
            intersection.width -= left.width;
        }

        if (intersection.x + intersection.width > this.x + this.width) {
            const right = new Rectangle(0, 0, 0, 0);
            right.x = this.x + this.width;
            right.y = intersection.y;
            right.width = intersection.width - (this.x + this.width - intersection.x);
            right.height = intersection.height;
            remainderRects.push(right);
            intersection.width -= right.width;
        }

        if (intersection.y < this.y) {
            const top = new Rectangle(0, 0, 0, 0);
            top.x = intersection.x;
            top.y = intersection.y;
            top.width = intersection.width;
            top.height = this.y - intersection.y;
            remainderRects.push(top);
            intersection.y = this.y;
            intersection.height -= top.height;
        }

        if (intersection.y + intersection.height > this.y + this.height) {
            const bottom = new Rectangle(0, 0, 0, 0);
            bottom.x = intersection.x;
            bottom.y = this.y + this.height;
            bottom.width = intersection.width;
            bottom.height = intersection.height - (this.y + this.height - intersection.y);
            remainderRects.push(bottom);
            intersection.height -= bottom.height;
        }
        
        return intersection;
    }
}