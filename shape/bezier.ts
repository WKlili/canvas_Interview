interface circleConfig {
  startx: number;
  starty: number;
  endx: number;
  endy: number;
  c1x: number;
  c1y: number;
  c2x: number;
  c2y: number;
}

export default class bezier {
  ctx: any;
  type: string = 'bezier';
  startx: number;
  starty: number;

  endx: number;
  endy: number;

  c1x: number;
  c1y: number;

  c2x: number;
  c2y: number;

  drag: boolean = false;

  constructor(ctx: any, config: circleConfig) {
    const { startx, starty, endx, endy, c1x, c1y, c2x, c2y } = config;
    this.ctx = ctx;
    this.startx = startx;
    this.starty = starty;
    this.endx = endx;
    this.endy = endy;
    this.c1x = c1x;
    this.c1y = c1y;
    this.c2x = c2x;
    this.c2y = c2y;

    this.painting();
  }

  painting() {
    const { ctx, startx, starty, endx, endy, c1x, c1y, c2x, c2y } = this;
    ctx.beginPath();
    ctx.moveTo(startx, starty);
    ctx.bezierCurveTo(c1x, c1y, c2x, c2y, endx, endy);
    ctx.stroke();
    ctx.closePath();
  }

  adjustStart(x: number, y: number) {
    this.startx = x;
    this.starty = y;
  }

  adjustEnd(x: number, y: number) {
    this.endx = x;
    this.endy = y;
  }

  adjustC1(x: number, y: number) {
    this.c1x = x;
    this.c1y = y;
  }

  adjustC2(x: number, y: number) {
    this.c2x = x;
    this.c2y = y;
  }
}
