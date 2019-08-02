export default function scaleCanvas(ctx: any, canvas: any) {
  const devicePixelRatio = window.devicePixelRatio || 1,
    backingStoreRatio =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1,
    ratio = devicePixelRatio / backingStoreRatio;

  const oldWidth = canvas.width;
  const oldHeight = canvas.height;
  canvas.width = oldWidth * ratio;
  canvas.height = oldHeight * ratio;
  canvas.style.width = oldWidth + 'px';
  canvas.style.height = oldHeight + 'px';

  ctx.scale(ratio, ratio);

  return ratio;
}
