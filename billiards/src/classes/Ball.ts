import { Momentum } from "./Momentum";
import { Point } from "./Point";

export class Ball {
    private _cord: Point;
    private _momentum: Momentum;

    constructor(cord: Point, momentum: Momentum) {
        this._cord = cord;
        this._momentum = momentum;
    }

    public get cord(): Point{
        return this._cord;
    }

    public get momentum(): Momentum{
        return this._momentum;
    }

    public set momentum(m: Momentum){
        this._momentum = m;
    }

    public next(): Point{
        this._cord.x += this._momentum.x ;
        this._cord.y += this._momentum.y ;
        return this._cord;
    }
}