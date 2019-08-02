import scaleCanvas from './shape/scaleCanvas';
import circle from './shape/circle';
import bezier from './shape/bezier';
import label from './shape/label';

const canvas: any = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
//渐变背景
const ratio = scaleCanvas(ctx, canvas);

drawBk();
function drawBk() {
  ctx.beginPath();
  var linear = ctx.createLinearGradient(0, 0, 512, 0);
  linear.addColorStop(0, '#ffffff');
  linear.addColorStop(1, '#000000');
  ctx.fillStyle = linear;
  ctx.fillRect(0, 0, 512 * ratio, 512 * ratio);
  ctx.fillStyle = '#000000';
  ctx.closePath();
}

const canvasInfo = canvas.getBoundingClientRect();
let renderList: object[] = [];

const addEvent = () => {
  let startX: number,
    startY: number,
    choosedIndex: number = -1;

  canvas.addEventListener('mousedown', (e: any) => {
    startX = e.clientX * ratio;
    startY = e.clientY * ratio;

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

    const target: any = renderList[renderList.length - 1];
    if (target.type === 'label') {
      let word = prompt('请输入注释内容', '');
      if (word) {
        target.editLable(word);
      }
    }

    document.addEventListener('dblclick', mouseDblclick);
    document.addEventListener('mousemove', mousemoveEvent);
    document.addEventListener('mouseup', mouseupEvent);
    painting();
  });

  function itemToLast(index: number) {
    const lastItem = renderList.splice(index, 1)[0];

    renderList.push(lastItem);
  }

  function mouseDblclick() {
    const target: any = renderList[renderList.length - 1];
    if (target.type !== 'bezier') {
      let word = prompt('请输入注释内容', '');
      if (word) {
        target.label.label = word;
      }
    }
    painting();
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

let point1 = [100, 100];

let label1 = new label(ctx, {
  center: point1,
  label: 'start'
});

let circle1 = new circle(ctx, {
  center: point1,
  radius: 5,
  type: 'start',
  label: label1,
  ratio
});

let point2 = [300, 300];

let label2 = new label(ctx, {
  center: point2,
  label: 'end'
});

let circle2 = new circle(ctx, {
  center: point2,
  radius: 5,
  type: 'end',
  label: label2,
  ratio
});

let c1point = [100, 300];

let label3 = new label(ctx, {
  center: c1point
});

let c1 = new circle(ctx, {
  center: c1point,
  radius: 5,
  type: 'c1',
  label: label3,
  ratio
});

let c2point = [300, 100];

let label4 = new label(ctx, {
  center: c2point
});

let c2 = new circle(ctx, {
  center: c2point,
  radius: 5,
  type: 'c2',
  label: label4,
  ratio
});

let bezierLine = new bezier(ctx, {
  startx: point1[0],
  starty: point1[1],
  endx: point2[0],
  endy: point2[1],
  c1x: c1point[0],
  c1y: c1point[1],
  c2x: c2point[0],
  c2y: c2point[1]
});

Array.prototype.push.apply(renderList, [
  label1,
  label2,
  label3,
  label4,
  circle1,
  circle2,
  c1,
  c2,
  bezierLine
]);

const painting = () => {
  ctx.clearRect(0, 0, canvasInfo.width, canvasInfo.height);
  drawBk();
  renderList.forEach((it: any) => {
    it.painting();
  });
};

canvas.addEventListener('click', function(e: any) {});
