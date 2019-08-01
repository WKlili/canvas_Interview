export default class Arrow {
  ctx: any;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  theta: number;
  headlen: number;
  width: number;
  color: string;

  constructor({ ctx, fromX, fromY, toX, toY, theta, headlen, width, color }) {
    this.ctx = ctx;
    this.fromX = fromX;
    this.fromY = fromY;
    this.toX = toX;
    this.toY = toY;
    this.theta = theta;
    this.headlen = headlen;
    this.width = width;
    this.color = color;
  }

  painting() {
    const { ctx, fromX, fromY, toX, toY, theta, headlen, width, color } = this;

    this.theta = theta || 30;
    this.headlen = headlen || 10;
    this.width = width || 1;
    this.color = color || '#000';

    var angle = (Math.atan2(fromY - toY, fromX - toX) * 180) / Math.PI,
      angle1 = ((angle + theta) * Math.PI) / 180,
      angle2 = ((angle - theta) * Math.PI) / 180,
      topX = headlen * Math.cos(angle1),
      topY = headlen * Math.sin(angle1),
      botX = headlen * Math.cos(angle2),
      botY = headlen * Math.sin(angle2);

    ctx.save();
    ctx.beginPath();

    var arrowX = fromX - topX,
      arrowY = fromY - topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(fromX, fromY);
    arrowX = fromX - botX;
    arrowY = fromY - botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);

    // Reverse length on the other side
    arrowX = toX + topX;
    arrowY = toY + topY;
    ctx.moveTo(arrowX, arrowY);
    ctx.lineTo(toX, toY);
    arrowX = toX + botX;
    arrowY = toY + botY;
    ctx.lineTo(arrowX, arrowY);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.restore();
  }
}
