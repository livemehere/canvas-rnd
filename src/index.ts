import Canvas from "./Canvas";

const canvas = new Canvas({
  canvas: document.querySelector("canvas")!,
  resizeTo: window,
  backgroundColor: "#000",
  fps: 144,
});

const { ctx } = canvas;
const pos = { x: 0, y: 0 };
canvas.render = (delta, elapsed) => {
  ctx.clearRect(0, 0, canvas.stageWidth, canvas.stageHeight);
  pos.x++;
  pos.y++;
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
};
