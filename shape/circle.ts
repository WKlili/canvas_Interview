interface circleConfig {
  center: number[];
  radius: number;
  type: string;
  label?: any;
}

export default class circle {
  ctx: any;
  center: number[];
  radius: number;
  type: string;
  drag: boolean = true;
  label: any;

  constructor(ctx: any, config: circleConfig) {
    const { center, radius, type, label } = config;
    this.ctx = ctx;
    this.center = [
      center[0] === undefined ? radius : center[0],
      center[1] === undefined ? radius : center[1]
    ];
    this.radius = radius;
    this.type = type;
    if (label) {
      this.label = label;
      this.label.painting();
    }

    this.painting();
  }

  painting() {
    if (this.label) {
      this.label.adjust(this.center[0], this.center[1]);
    }
    this.ctx.beginPath();
    this.ctx.arc(
      this.center[0],
      this.center[1],
      this.radius,
      0,
      Math.PI * 2,
      false
    );

    this.ctx.strokeStyle = '#333';
    this.ctx.fill();
    this.ctx.closePath();
  }

  adjust(left: number, top: number) {
    this.center[0] = left;
    this.center[1] = top;
  }
}
