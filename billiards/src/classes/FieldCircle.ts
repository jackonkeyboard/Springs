import { Ball } from "./Ball";
import { Momentum } from "./Momentum";
import { Point } from "./Point";
import { Circle } from "./Circle";

export class FieldCircle extends Circle {
    private firstSemiCircleCenter: Point;
    private secondSemiCircleCenter: Point;
    private topLineY: number;
    private bottomLineY: number;

    private L: number = 2;

    constructor(center: Point, radius: number, ball: Ball) {
        super(center, radius, ball);
        this.firstSemiCircleCenter = new Point(
            center.x - (this.L / 2),
            center.y
        )
        this.secondSemiCircleCenter = new Point(
            center.x + (this.L / 2),
            center.y
        )
        this.topLineY = center.y - radius;
        this.bottomLineY = center.y + radius;
    }

    public isOnLeftCircle(p: Point): boolean {
        const isOnLeftCircle = p.x < this.firstSemiCircleCenter.x && 
            (Math.abs(this.radius - this.firstSemiCircleCenter.dist(p)) <= 0.01 ||
            this.firstSemiCircleCenter.dist(p) > this.radius)
        return isOnLeftCircle;
    }

    public isOnRightCircle(p: Point): boolean {
        const isOnRightCircle = p.x > this.secondSemiCircleCenter.x && 
            (Math.abs(this.radius - this.secondSemiCircleCenter.dist(p)) <= 0.01 ||
            this.secondSemiCircleCenter.dist(p) > this.radius)
        return isOnRightCircle;
    }

    public override isOnCircle(p: Point): boolean {
        return this.isOnLeftCircle(p) || this.isOnRightCircle(p);
    }

    public isOnLine(p: Point): boolean {
        return Math.abs(p.y - this.topLineY) <= 0.001 || p.y < this.topLineY
            || Math.abs(p.y - this.bottomLineY) <= 0.001 || p.y > this.bottomLineY;
    }

    public override next(): Ball | null {
        const nextPoint = this.ball.next();
        if (this.isOnCircle(nextPoint)) {
            this.count++;
            let { x, y } = this.ball.cord;
            const { x: mX, y: mY } = this.ball.momentum;
            const cX = this.isOnLeftCircle(nextPoint) ? this.firstSemiCircleCenter.x : this.secondSemiCircleCenter.x
            this.ball.momentum = new Momentum(
                ((y * y - (x - cX) ** 2) * mX) - (2 * (x - cX) * y * mY),
                (-2 * (x - cX) * y * mX) + (((x - cX) ** 2 - Math.pow(y, 2)) * mY)
            );
        } else if (this.isOnLine(nextPoint)) {
            this.count++;
            let { x } = this.ball.cord;
            const p = document.createElement("p");
            p.innerText = `${x}`;
            document.getElementById('data-save')?.appendChild(p)
            const { x: mX, y: mY } = this.ball.momentum;
            this.ball.momentum = new Momentum(
                mX,
                -mY,
            );
        }
        console.log(this.count)
        return this.ball;
    }
}