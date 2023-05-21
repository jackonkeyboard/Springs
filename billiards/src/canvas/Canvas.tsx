import React, { useRef, useEffect } from 'react'
import { Circle } from "../classes/Circle";
import { GravitationalCircle } from "../classes/GravitationalCircle";
import { Point } from "../classes/Point";
import { Ball } from "../classes/Ball";
import { Momentum } from "../classes/Momentum";

// let circle = new Circle(
//   new Point(0, 0),
//   1,
//   new Ball(new Point(0.1950506607563342, 0.9751114766472828), new Momentum(0.0013170115894287596, -0.00800182069877837))
// );
//new Ball(new Point(0.7, 0.1), new Momentum(0.009,0.007))


let circle = new GravitationalCircle(
  new Point(0, 0),
  1,
  new Ball(new Point(-0.42, 0.67), new Momentum(0.002, -0.005))
);

let lastBall: Ball | null = null;

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const draw = (ctx: any, frameCount: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctx.clearRect(0, 0, 500, 500);
    let x = canvas.width / 2;
    let y = canvas.width / 2
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, canvas.width / 2, 0, 2 * Math.PI);

    ctx.strokeStyle = "#2465D3";
    ctx.stroke();
    ctx.clip();

    ctx.restore();
    ctx.stroke();

    let cP = circle.next();
    if(cP !== null) {
      lastBall = cP;
    }
    if(lastBall){
      ctx.beginPath();
      ctx.arc((lastBall.cord.x * 250) + 250, (lastBall.cord.y * 250) + 250, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    }

    // console.log(lastBall)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return;
    const context = canvas.getContext('2d')
    let frameCount = 0
    let animationFrameId: number;

    //Our draw came here
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])

  return <canvas ref={canvasRef} width={500} height={500} />
}

export default Canvas