import circle from './shape/circle';
import bezier from './shape/bezier';

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
      if (ctx.isPointInPath(startX, startY) && it.drag === true) {
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
    target.adjust(currentX, currentY);
    startX = currentX;
    startY = currentY;

    if (target.type === 'start') {
      bezierLine.adjustStart(startX, startY);
    } else if (target.type === 'end') {
      bezierLine.adjustEnd(startX, startY);
    } else if (target.type === 'c1') {
      bezierLine.adjustC1(startX, startY);
    } else if (target.type === 'c2') {
      bezierLine.adjustC2(startX, startY);
    }

    painting();
  }

  function mouseupEvent(e: any) {
    if (choosedIndex === -1) return;
    const target: any = renderList[renderList.length - 1];
    const currentX = e.clientX;
    const currentY = e.clientY;

    target.adjust(currentX, currentY);
    startX = currentX;
    startY = currentY;
    painting();
    document.removeEventListener('mousemove', mousemoveEvent);
    document.removeEventListener('mouseup', mouseupEvent);
  }
};

addEvent();

let circle1 = new circle(ctx, {
  center: [20, 20],
  radius: 5,
  type: 'start'
});

let circle2 = new circle(ctx, {
  center: [300, 300],
  radius: 5,
  type: 'end'
});

let c1 = new circle(ctx, {
  center: [20, 100],
  radius: 5,
  type: 'c1'
});

let c2 = new circle(ctx, {
  center: [300, 200],
  radius: 5,
  type: 'c2'
});

let bezierLine = new bezier(ctx, {
  startx: 20,
  starty: 20,
  endx: 300,
  endy: 300,
  c1x: 20,
  c1y: 100,
  c2x: 300,
  c2y: 200
});

circle1.painting();
circle2.painting();
c1.painting();
c2.painting();
bezierLine.painting();

Array.prototype.push.apply(renderList, [circle1, circle2, c1, c2, bezierLine]);

const painting = () => {
  ctx.clearRect(0, 0, canvasInfo.width, canvasInfo.height);
  renderList.forEach((it: any) => it.painting());
};

canvas.addEventListener('click', function(e: any) {});
