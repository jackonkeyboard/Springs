export class Point {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    public get x(): number {
        return this._x;
    }

    public get y(): number {
        return this._y;
    }

    public set x(x: number) {
        this._x = x;
    }

    public set y(y: number) {
        this._y = y;
    }

    public dist(p: Point): number {
        return Math.sqrt(Math.pow(p.x - this._x, 2) + Math.pow(p.y - this._y, 2))
    }
}