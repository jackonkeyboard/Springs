import { Ball } from "./Ball";
import { Momentum } from "./Momentum";
import { Point } from "./Point";

export class Circle{
    protected count: number = 0;
    protected center: Point;
    protected ball: Ball;
    protected radius: number;

    constructor(p: Point, radius: number, ball: Ball){
        this.center = p;
        this.radius = radius;
        this.ball = ball;
    }

    public isWithinCircle(p: Point): boolean{
        return this.center.dist(p) < this.radius;
    }

    public isOnCircle(p: Point): boolean{
        return Math.abs(this.radius - this.center.dist(p)) <= 0.01;
    }

    public isOutOfCircle(p: Point): boolean{
        return this.center.dist(p) > this.radius;
    }

    public next(): Ball | null{
        if(this.count >= 30){
            return null;
        }
        let nextPoint = this.ball.next();
        if(this.isOnCircle(nextPoint)){
            this.count++;
            let {x, y} = this.ball.cord;
            const p = document.createElement("p");
            p.innerText = `${x} ${y}`;
            document.getElementById('data-save')?.appendChild(p)
            if(this.count >= 30){
                return this.ball;
            }
            const {x: mX, y: mY} = this.ball.momentum;
            this.ball.momentum = new Momentum(
                ((y * y - x * x) * mX) - (2 * x * y * mY),
                (-2 * x * y * mX )+ ((Math.pow(x, 2) - Math.pow(y, 2)) * mY)
            );
        }
        return this.ball;
    }
}