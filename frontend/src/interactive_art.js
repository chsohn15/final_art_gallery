function loadInteractiveArt(){
mainBody.innerHTML = "" 
mainBody.innerHTML = 
`<h1>Create Your Own Artwork!</h1>
<canvas id="myCanvas" width="560" height="360"></canvas>

<select id="color-selector">
    <option value="black">Black</option>
    <option value="red">Red</option>
    <option value="blue">Blue</option>
    <option value="green">Green</option>
    <option value="yellow">Yellow</option>
    <option value="purple">Purple</option>
</select>
<select id="background-color-selector">
    <option value="white">White</option>
    <option value="#00BFFF">Sky Blue</option>
    <option value="#90EE90">Light Green</option>
    <option value="#FFFF99">Yellow</option>
    <option value="#C71585">Violet Red</option>
</select>
<select id="thickness-selector">
    <option value=1>1</option>
    <option value=2>2</option>
    <option value=3>3</option>
    <option value=4>4</option>
    <option value=5>5</option>
    <option value=6>6</option>
    <option value=7>7</option>
    <option value=8>8</option>
    <option value=9>9</option>
    <option value=10>10</option>
</select>
<button id="img-save-btn">Save</button>`

let drawing = false;
let x = 0;
let y = 0;

const myPics = document.getElementById('myPics');
const context = myCanvas.getContext('2d');
const canvas = document.getElementById('myCanvas')


function drawLine(context, x1, y1, x2, y2) {

    const color = document.querySelector('#color-selector').value
    const thickness = document.querySelector('#thickness-selector').value

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

}