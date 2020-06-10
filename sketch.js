let wx = 800;
let wy = wx / 4 * 3;
var captureVideo;
var space;
var length;
var weight;
var rotates;
var bgcolor;
var blackAndWhite;
var upper;
var lower;

function setup() {
  createP('line length').position(10, wy + 10);
  length = createSlider(0, 30, 10);
  length.position(10, wy + 10);
  length.style('width', '80px');

  createP('line spacing').position(110, wy + 10);
  space = createSlider(4, 30, 10);
  space.position(110, wy + 10);
  space.style('width', '80px');

  createP('line weight').position(210, wy + 10);
  weight = createSlider(1, 20, 1);
  weight.position(210, wy + 10);
  weight.style('width', '80px');

  createP('rotation mult.').position(310, wy + 10);
  rotates = createSlider(1, 20, 6);
  rotates.position(310, wy + 10);
  rotates.style('width', '80px');

  createP('background color').position(410, wy + 20);
  bgcolor = createColorPicker('#000000');
  bgcolor.position(410, wy + 10);
  
  blackAndWhite = createCheckbox('black/white', false);
  blackAndWhite.position(510, wy + 10);

  createP('lower limit').position(610, wy + 10);
  lower = createSlider(0, 255, 0);
  lower.position(610, wy + 10);
  lower.style('width', '80px');

  createP('upper limit').position(710, wy + 10);
  upper = createSlider(0, 255, 255);
  upper.position(710, wy + 10);
  upper.style('width', '80px');

  createCanvas(wx, wy);
  strokeWeight(1);
  stroke(0, 0, 0);
  noFill();

  captureVideo = createCapture(VIDEO);
  captureVideo.size(wx, wy);
  captureVideo.hide();
}

function drawIt(capture) {
    capture.loadPixels();
    let vbgcolor = bgcolor.value();
    let vlength = length.value();
    let vspace = space.value();
    let vrotates = rotates.value();
    let vlower = lower.value();
    let vupper = upper.value();
    let bw = blackAndWhite.checked();
    background(vbgcolor);
  if (bw) {
    stroke('white');
  }
    strokeWeight(weight.value());
    for (x = 0; x < wx / vspace; x++) {
      for (y = 0; y < wy / vspace; y++) {
        let c = capture.get(x * vspace, y * vspace, 1, 1);
        let brightness = (c[0] * 0.30 + c[1] * 0.59 + c[2] * 0.11);
        let g = brightness / PI / vrotates
        let x1 = x * vspace;
        let y1 = y * vspace;
        let x2 = x1 + sin(g) * vlength;
        let y2 = y1 + cos(g) * vlength;
        if (!bw) {
          stroke(c[0], c[1], c[2]); // colors
        }
        if (vlower <= brightness && brightness <= vupper) {
          line(x1, y1, x2, y2);
        }
      }
    }
}

function draw() {
  if (captureVideo.loadedmetadata) {
    drawIt(captureVideo)
  }
}