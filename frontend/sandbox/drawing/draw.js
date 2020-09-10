// When true, moving the mouse draws on the canvas
let drawing = false;
let x = 0;
let y = 0;

const myPics = document.getElementById('myPics');
const context = myCanvas.getContext('2d');

// event.offsetX, event.offsetY gives the (x,y) offset from the edge of the canvas.

// Add the event listeners for mousedown, mousemove, and mouseup
function drawLine(context, x1, y1, x2, y2) {

    const color = document.querySelector('#color-picker').value
    const thickness = document.querySelector('#thickness-picker').value
    const backgroundColor = document.querySelector('#background-color-picker').value
    //debugger
    const canvas = document.getElementById('myCanvas')
    canvas.style.background = backgroundColor
    // context.fillStyle = backgroundColor
    // context.fillRect(0, 0, canvas.width, canvas.height)

    context.globalCompositeOperation = 'destination-over';

    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = thickness;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
  }

myCanvas.addEventListener('mousedown', e => {
  x = e.offsetX;
  y = e.offsetY;
  drawing = true;
});

myCanvas.addEventListener('mousemove', e => {
  if (drawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener('mouseup', e => {
  if (drawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    drawing = false;
  }

  
});







//https://developer.mozilla.org/en-US/docs/Web/API/Element/mousedown_event