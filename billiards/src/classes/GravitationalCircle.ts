import { Ball } from "./Ball";
import { Momentum } from "./Momentum";
import { Point } from "./Point";

export class GravitationalCircle{
    private count: number = 0;
    private center: Point;
    private ball: Ball;
    private radius: number;
    private G: number = 0.01;
    private t: number = 0;

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

    public nextT(){
        this.t += 0.00001;
    }

    public next(): Ball | null{
        if(this.count >= 40){
            return null;
        }
        const nextPoint = this.ball.next();
        this.nextT();
        if(this.isOnCircle(nextPoint)){
            this.count++;
            let {x, y} = this.ball.cord;
            const p = document.createElement("p");
            p.innerText = `${x} ${y}`;
            document.getElementById('data-save')?.appendChild(p)
            if(this.count >= 40){
                return this.ball;
            }
            const {x: mX, y: mY} = this.ball.momentum;
            this.ball.momentum = new Momentum(
                ((y * y - x * x) * mX) - (2 * x * y * mY),
                (-2 * x * y * mX )+ ((Math.pow(x, 2) - Math.pow(y, 2)) * mY)
            );
        }else{
            const {x: mX, y: mY} = this.ball.momentum;
            this.ball.momentum = new Momentum(
                mX,
                mY + this.t * this.G,
            );
        }
        return this.ball;
    }
}