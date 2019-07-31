import circle from './shape/circle';

const canvas: any = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const canvasInfo = canvas.getBoundingClientRect();
let renderList: object[] = [];

const addEvent = () => {
  let startX: number,
    startY: number,
    choosedIndex: number = -1;

  canvas.addEventListener('mousedown', (e: any) => {
    startX = e.clientX;
    startY = e.clientY;

    const ifhave = renderList.map((it: any, index: number) => {
      it.painting();
      if (ctx.isPointInPath(startX, startY)) {
        choosedIndex = index;
        return true;
      }
      return false;
    });

    if (!ifhave.includes(true)) {
      choosedIndex = -1;
    }

    if (choosedIndex !== -1) {
      itemToLast(choosedIndex);
    }

    document.addEventListener('mousemove', mousemoveEvent);
    document.addEventListener('mouseup', mouseupEvent);
    painting();
  });

  function itemToLast(index: number) {
    const lastItem = renderList.splice(index, 1)[0];

    renderList.push(lastItem);
  }

  function mousemoveEvent(e: any) {
    if (choosedIndex === -1) return;
    const target: any = renderList[renderList.length - 1];
    const currentX = e.clientX;
    const currentY = e.clientY;
    target.adjust(currentX - startX, currentY - startY);
    startX = currentX;
    startY = currentY;
    painting();
  }

  function mouseupEvent(e: any) {
    if (choosedIndex === -1) return;
    const target: any = renderList[renderList.length - 1];
    const currentX = e.clientX;
    const currentY = e.clientY;

    target.adjust(currentX - startX, currentY - startY);
    startX = currentX;
    startY = currentY;
    painting();
    document.removeEventListener('mousemove', mousemoveEvent);
    document.removeEventListener('mouseup', mouseupEvent);
  }
};

addEvent();

let circle1 = new circle(ctx, {
  center: [50, 50],
  radius: 5
});

let circle2 = new circle(ctx, {
  center: [300, 300],
  radius: 5
});

circle1.painting();
circle2.painting();

Array.prototype.push.apply(renderList, [circle1, circle2]);

const painting = () => {
  ctx.clearRect(0, 0, canvasInfo.width, canvasInfo.height);
  renderList.forEach((it: any) => it.painting());
};

canvas.addEventListener('click', function(e: any) {});

// ctx.lineWidth = 6;
// ctx.strokeStyle = '#333';
// ctx.beginPath();
// ctx.moveTo(34, 141);
// ctx.bezierCurveTo(10, 29, 197, 95, 121, 211);

// bt = p0(1-t)3 + 3p1t(1-t)2 + 3p2t2(1-t) + p3t3
