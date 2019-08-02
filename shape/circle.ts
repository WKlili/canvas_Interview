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
    this.drawPointBack();
    this.ctx.beginPath();
    this.ctx.fillStyle = '#000000';
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

  drawPointBack() {
    const { ctx, center } = this;
    ctx.beginPath();
    // 开始滤镜处理
    var imgData = ctx.getImageData(center[0] - 15, center[1] - 15, 30, 30);

    for (let x = -imgData.width / 2; x < imgData.width / 2; x++) {
      for (let y = -imgData.height / 2; y < imgData.height / 2; y++) {
        if (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)) <= 15) {
          var idx = (x + 15 + (y + 15) * imgData.width) * 4;

          var r = imgData.data[idx + 0];
          var g = imgData.data[idx + 1];
          var b = imgData.data[idx + 2];
          var gray = 0.299 * r + 0.587 * g + 0.114 * b;

          imgData.data[idx + 0] = gray + 150; // Red channel
          imgData.data[idx + 1] = gray; // Green channel
          imgData.data[idx + 2] = gray; // Blue channel
          imgData.data[idx + 3] = 255; // Alpha channel
        }
      }
    }

    ctx.putImageData(imgData, center[0] - 15, center[1] - 15); // 重写图像数据
    ctx.closePath();
  }

  adjust(left: number, top: number) {
    this.center[0] = left;
    this.center[1] = top;
  }
}
