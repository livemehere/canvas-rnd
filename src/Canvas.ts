interface AppProps {
  canvas: HTMLCanvasElement;
  resizeTo?: HTMLElement | Window;
  backgroundColor?: string;
  fps?: number;
}

type Render = (delta: number, elapsed: number) => void;

export default class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  width!: number;
  height!: number;
  stageWidth!: number;
  stageHeight!: number;
  resizeTo: HTMLElement | Window;
  dpr = window.devicePixelRatio || 1;

  private prevTime = performance.now();
  private delta: number;
  elapsed: number;
  fps: number;
  private readonly fpsInterval: number;

  private _render?: Render;

  constructor(props: AppProps) {
    /* SET */
    this.canvas = props.canvas;
    this.ctx = this.canvas.getContext("2d")!;
    this.resizeTo = props.resizeTo || this.canvas.parentElement!;
    this.canvas.style.backgroundColor = props.backgroundColor || "transparent";

    this.fps = props.fps || 60;
    this.fpsInterval = 1000 / this.fps;
    this.delta = 0;
    this.elapsed = 0;

    /* INIT */
    this.setSize(this.resizeTo);
    window.addEventListener("resize", () => {
      this.setSize(this.resizeTo);
    });
  }

  private setSize(parent: HTMLElement | Window) {
    if (parent instanceof Window) {
      /* window */
      this.width = parent.innerWidth;
      this.height = parent.innerHeight;
      this.canvas.style.position = "fixed";
      this.canvas.style.left = "0";
      this.canvas.style.top = "0";
    } else {
      /* HTMLElement */
      this.width = parent.clientWidth;
      this.height = parent.clientHeight;
    }

    this.stageWidth = this.width * this.dpr;
    this.stageHeight = this.height * this.dpr;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.ctx.scale(this.dpr, this.dpr);

    this.canvas.style.width = this.width + "px";
    this.canvas.style.height = this.height + "px";
  }

  set render(cb: Render) {
    this._render = cb;
    this.animate();
  }

  animate() {
    if (!this._render) return;
    requestAnimationFrame(this.animate.bind(this));

    const now = performance.now();
    this.delta = now - this.prevTime;
    this.elapsed += this.delta;
    if (this.delta < this.fpsInterval) return;
    this.prevTime = now - (this.delta % this.fpsInterval);

    this._render(this.delta, this.elapsed);
  }
}
