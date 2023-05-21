import { Ball } from "./Ball";
import { Momentum } from "./Momentum";
import { Point } from "./Point";
import { Circle } from "./Circle";

export class GravitationalCircle extends Circle{
    private G: number = 0.01;
    private t: number = 0;

    constructor(p: Point, radius: number, ball: Ball){
        super(p, radius, ball);
        this.G = 0.01;
        this.t = 0;
    }

    public nextT(){
        this.t += 0.00001;
    }

    public override next(): Ball | null{
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