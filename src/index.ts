import App from "./App";

const app = new App({
  canvas: document.querySelector("canvas")!,
  resizeTo: window,
  backgroundColor: "#000",
  fps: 144,
});

const { ctx } = app;
const pos = { x: 0, y: 0 };
app.render = (delta, elapsed) => {
  ctx.clearRect(0, 0, app.stageWidth, app.stageHeight);
  pos.x++;
  pos.y++;
  ctx.beginPath();
  ctx.fillStyle = "#fff";
  ctx.arc(pos.x, pos.y, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
};
