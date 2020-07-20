const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

let painting = false;
let erase = false;
let grid = false;
let circle = false;

let fillColor = "white";

let beginX = 0;
let beginY = 0;

ctx.fillStyle = "white";

//let currentstrokeStyle = "black";

//ctx.strokeStyle = document.getElementById("color").value;

function chooseBlack() {
  document.getElementById("color").value = "#000000";
  //currentstrokeStyle = ctx.strokeStyle;
  erase = false;
  grid = false;
  circle = false;
}

function chooseRed() {
  document.getElementById("color").value = "#FF0000";
  //currentstrokeStyle = ctx.strokeStyle;
  erase = false;
  grid = false;
  circle = false;
}

function chooseBlue() {
  document.getElementById("color").value = "#0000FF";
  //currentstrokeStyle = ctx.strokeStyle;
  erase = false;
  grid = false;
  circle = false;
}

function chooseGreen() {
  document.getElementById("color").value = "#008000";
  //currentstrokeStyle = ctx.strokeStyle;
  erase = false;
  grid = false;
  circle = false;
}

function chooseYellow() {
  document.getElementById("color").value = "#FFFF00";
  //currentstrokeStyle = ctx.strokeStyle;
  erase = false;
  grid = false;
  circle = false;
}

function eraseDrawing() {
  //currentstrokeStyle = ctx.strokeStyle;
  document.getElementById("color").value = ctx.fillStyle;
  erase = true;
  grid = false;
  circle = false;
}

function startPaint(e) {
  painting = true;
  beginX = e.clientX - 5;
  beginY = e.clientY - 90;
}
function distance(a, b) {
  return Math.sqrt(a * a + b * b);
}

function endPaint(e) {
  painting = false;
  ctx.lineWidth = 5;
  if (grid) {
    //ctx.strokeStyle = "black";
    ctx.strokeStyle = document.getElementById("color").value;
    ctx.strokeRect(
      beginX,
      beginY,
      e.clientX - 5 - beginX,
      e.clientY - 90 - beginY
    );
  }
  if (circle) {
    //ctx.strokeStyle = "black";
    ctx.strokeStyle = document.getElementById("color").value;
    console.log("asdfasdfasdfas");
    ctx.arc(
      beginX,
      beginY,
      distance(e.clientX - 5 - beginX, e.clientY - 90 - beginY),
      0,
      2 * Math.PI
    );
    ctx.stroke();
  }
  ctx.beginPath();
}

function paint(e) {
  if (painting) {
    if (!grid && !circle) {
      if (erase) {
        ctx.lineWidth = 20;
      } else {
        ctx.lineWidth = 10;
      }
      simpleDraw(e);
    } else {
      drawGrid_Circle(e);
    }
  }
  return;
}
function simpleDraw(e) {
  ctx.lineCap = "round";
  ctx.strokeStyle = document.getElementById("color").value;
  ctx.lineTo(e.clientX - 5, e.clientY - 90);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - 5, e.clientY - 90);
}

function activateGrid() {
  grid = true;
  circle = false;
}

function activateCircle() {
  circle = true;
  grid = false;
}

function drawGrid_Circle(e) {
  ctx.strokeStyle = currentstrokeStyle;
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  currentX = e.clientX - 5;
  currentY = e.clientY - 90;
  ctx.strokeRect(
    beginX,
    beginY,
    e.clientX - 5 - beginX,
    e.clientY - 90 - beginY
  );
  ctx.strokeRect(
    beginX,
    beginY,
    e.clientX - 5 - beginX,
    e.clientY - 90 - beginY
  );
}

function clear_grid(e) {
  ctx.strokeStyle = ctx.fillStyle;
  ctx.strokeRect(beginX, beginY, currentX - beginX, currentY - beginY);
  ctx.strokeStyle = currentstrokeStyle;
}

function clearCanvas() {
  ctx.fillStyle = fillColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //if (ctx.strokeStyle == "white"){ctx.strokeStyle = "black";}
}

canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("mouseup", endPaint);
canvas.addEventListener("mousemove", paint);
if (grid) {
  if (currentX != e.clientX - 5 || currentY != e.clientY - 90) {
    canvas.addEventListener("mousemove", clear_grid);
  }
}

function changeBgc() {
  var selectBox = document.getElementById("BackgroundSelect");
  fillColor = selectBox.options[selectBox.selectedIndex].value;
  ctx.fillStyle = fillColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}
