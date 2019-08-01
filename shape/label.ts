interface circleConfig {
  center: number[];
  label?: string;
}

export default class label {
  ctx: any;
  center: number[];
  drag: boolean = true;
  type: string = 'label';
  label: string;

  constructor(ctx: any, config: circleConfig) {
    const { center } = config;
    this.ctx = ctx;
    this.center = [
      center[0] === undefined ? 0 : center[0],
      center[1] === undefined ? 0 : center[1]
    ];

    this.label = config.label || '';
  }

  painting() {
    let x = this.center[0];
    let y = this.center[1];
    if (this.label === '') return;
    this.ctx.beginPath();
    var textStyle = this.ctx.measureText(this.label); // TextMetrics
    this.ctx.rect(x + 20, y - 20, textStyle.width + 10, 20);
    this.ctx.stroke();

    this.ctx.fillText(this.label, x + 25, y - 6);

    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x + 20, y - 10);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  adjust(left: number, top: number, label: string) {
    this.center[0] = left;
    this.center[1] = top;
  }

  editLable(text: string) {
    this.label = text;
  }
}
