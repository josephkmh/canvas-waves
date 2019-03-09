function Wave(selector, {
  baseHeight,
  nodes,
  speed,
  color,
  gradient,
  freezeAfter,
  horizontalOffset,
  startFlat,
  opacity,
  waveGrows,
  waveCount,
  waveHeight,
  wavesVisible,
  waveAngle
} = {}) {
  this.canvas = this.createCanvas(selector);
  this.baseHeight = this.userInputToPixelValue(baseHeight, this.canvasHeight);
  this.opacity = opacity || 1;
  this.canvas.style.opacity = this.opacity;
  this.ctx = this
    .canvas
    .getContext("2d");
  if (this.gradient) {
    this.ctx.fillStyle = this.gradient;
  } else {
    this.ctx.fillStyle = this.color;
  }
  this.freezeAfter = freezeAfter || false;
  this.gradient = gradient || false;
  this.horizontalOffset = horizontalOffset
    ? horizontalOffset * 2 * Math.PI
    : 0;
  this.speed = speed || 5000;
  this.startFlat = startFlat || false;
  this.waveAngle = this.toRadians(waveAngle) || 0;
  this.waveCount = waveCount || false;
  this.waveHeight = this.userInputToPixelValue(waveHeight, this.canvasHeight) || 100;
  this.waveGrows = waveGrows;
  this.wavesVisible = wavesVisible || 1;
  this.color = color || "#000000";

  // Set up initial position of nodes
  let numberOfNodes = nodes || Math.floor(this.canvasWidth / 30);
  this.nodes = [];
  for (let i = 0; i < numberOfNodes; i++) {
    this
      .nodes
      .push({
        x: (this.canvasWidth / (numberOfNodes - 1)) * i,
        y: this.canvasHeight,
        positionMultiplier: i / numberOfNodes,
        numberOffset: (2 * Math.PI * (i / numberOfNodes)) / (1 / this.wavesVisible) + this.horizontalOffset
      });
  }
  this.spaceBetweenNodes = this.canvasWidth / (this.nodes.length - 1);

  // If a gradient was specified, create a linear gradient on the canvas context
  if (gradient) {
    this.gradient = this
      .ctx
      .createLinearGradient(0, this.canvasHeight, this.canvasWidth, this.canvasHeight - this.waveHeight);
    gradient.forEach(({stop, color}) => {
      this
        .gradient
        .addColorStop(stop, color);
    });
  }
}

Wave.prototype = {
  timestamp: function () {
    return new Date().getTime();
  },
  updateNodes: function (ms) {
    let progress = ms / this.speed;
    let radians = 2 * Math.PI * progress;

    let nodes = this
      .nodes
      .forEach((node, i, nodes) => {

        if (this.startFlat && progress < nodePositionMultiplier) {
          node.y = this.canvasHeight - this.baseHeight;
          return
        }

        let offset = ((Math.sin(radians - node.numberOffset) + 1) / 2) * this.waveHeight;

        if (this.waveGrows) {
          offset = offset * (i / (nodes.length - 1)) * this.waveGrows;
        }
        if (this.waveAngle) {
          offset += Math.tan(this.waveAngle) * this.spaceBetweenNodes * i;
        }
        let yValue = this.canvasHeight - offset - this.baseHeight;

        node.y = yValue;
      });
    return nodes;
  },
  createCanvas(selector) {
    const parent = document.querySelector(selector);
    if (!parent) 
      throw new Error("Parent element could not be found.");
    if (parent.style.position !== "relative" || "absolute") {
      parent.style.position = "relative";
    }
    const canvas = document.createElement("canvas");
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.height = parent.clientHeight;
    canvas.width = parent.clientWidth;
    this.canvasHeight = parent.clientHeight;
    this.canvasWidth = parent.clientWidth;

    if (parent.children.length !== 0) {
      parent.appendChild(canvas);
    } else {
      parent.insertBefore(canvas, parent.children[0]);
    }
    return canvas;
  },
  draw: function () {
    this
      .ctx
      .clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this
      .ctx
      .beginPath();
    this
      .ctx
      .moveTo(0, this.canvasHeight);
    this
      .nodes
      .forEach((node, i, nodes) => {
        this
          .ctx
          .lineTo(node.x, node.y);
      });
    this
      .ctx
      .lineTo(this.canvasWidth, this.canvasHeight);
    this
      .ctx
      .lineTo(0, this.canvasHeight);
    this
      .ctx
      .closePath();
    this
      .ctx
      .fill();
  },
  toRadians: function (degrees) {
    return degrees * (Math.PI / 180);
  },
  animate: function () {
    let currentTime = this.timestamp();
    if (!this.startTime) 
      this.startTime = currentTime;
    let progress = currentTime - this.startTime;
    if (this.freezeAfter && progress > this.freezeAfter) 
      return;
    if (this.waveCount && progress / this.speed >= this.waveCount) 
      return;
    this.updateNodes(progress);
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  },
  userInputToPixelValue: function (userInput, percentageOf) {
    if (!userInput) {
      return 0;
    } else if (typeof userInput === "number") {
      return userInput;
    } else if (typeof userInput === "string") {
      const percentage = parseInt(userInput, 10) / 100;
      return percentageOf * percentage;
    }
  }
};

module.exports = Wave;
