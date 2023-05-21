import React, { useRef, useEffect } from 'react'
import { Circle } from "../classes/Circle";
import { GravitationalCircle } from "../classes/GravitationalCircle";
import { FieldCircle } from "../classes/FieldCircle";
import { Point } from "../classes/Point";
import { Ball } from "../classes/Ball";
import { Momentum } from "../classes/Momentum";

let lastBall: Ball | null = null;

const Canvas = ({ problem }: { problem: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasWidth = problem === 3 ? 1000 : 500;
  const circle = getCircle(problem);

  const drawCircle = (ctx: any, frameCount: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctx.clearRect(0, 0, canvasWidth, 500);
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
    if (cP !== null) {
      lastBall = cP;
    }
    if (lastBall) {
      ctx.beginPath();
      ctx.arc((lastBall.cord.x * 250) + 250, (lastBall.cord.y * 250) + 250, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    }

    console.log(lastBall)
  }

  const drawField = (ctx: any, frameCount: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    ctx.clearRect(0, 0, canvasWidth, 500);
    ctx.save();
    ctx.beginPath();
    ctx.arc(250, 250, 250, Math.PI / 2, 1.5 * Math.PI);

    ctx.moveTo(250, 0);
    ctx.lineTo(750, 0);

    ctx.arc(750, 250, 250, 1.5 * Math.PI, 0.5 * Math.PI);

    ctx.moveTo(250, 500);
    ctx.lineTo(750, 500);

    ctx.strokeStyle = "#2465D3";
    ctx.stroke();
    ctx.clip();

    ctx.restore();
    ctx.stroke();

    let cP = circle.next();
    if (cP !== null) {
      lastBall = cP;
    }
    if (lastBall) {
      ctx.beginPath();
      ctx.arc((lastBall.cord.x * 250) + 500, (lastBall.cord.y * 250) + 250, 5, 0, 2 * Math.PI);
      ctx.fillStyle = 'red';
      ctx.fill();
    }

    console.log(lastBall)
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
      if (problem === 3) {
        drawField(context, frameCount)
      } else {
        drawCircle(context, frameCount)
      }
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [drawCircle, drawField])

  return <canvas ref={canvasRef} width={canvasWidth} height={500} />
}

function getCircle(p: number): Circle {
  if (p === 1) {
    return new Circle(
      new Point(0, 0),
      1,
      new Ball(new Point(-0.42, 0.67), new Momentum(0.002, -0.005))
    );
  }
  else if (p === 2) {
    return new GravitationalCircle(
      new Point(0, 0),
      1,
      new Ball(new Point(-0.42, 0.67), new Momentum(0.002, -0.005))
    );
  }
  return new FieldCircle(
    new Point(0, 0),
    1,
    new Ball(new Point(0.023, 0.089), new Momentum(0.009, 0.012)),
  );
}

export default Canvas