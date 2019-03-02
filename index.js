function Wave({
  baseHeight,
  canvas,
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
  this.baseHeight = baseHeight;
  this.canvas = canvas;
  this.canvas.height = canvas.clientHeight;
  this.canvas.width = canvas.clientWidth;
  this.canvasHeight = canvas.clientHeight;
  this.canvasWidth = canvas.clientWidth;
  this.canvas.style.opacity = this.opacity;
  this.ctx = canvas.getContext("2d");
  this.freezeAfter = freezeAfter;
  this.gradient = gradient;
  this.horizontalOffset = horizontalOffset;
  this.opacity = opacity || 1;
  this.speed = speed;
  this.startFlat = startFlat;
  this.waveAngle = this.toRadians(waveAngle);
  this.waveCount = waveCount;
  this.waveGrows = waveGrows;
  this.waveHeight = waveHeight;
  this.wavesVisible = wavesVisible;
  this.color = color || '#000000';

  // Set up initial position of nodes
  let numberOfNodes = nodes || 40;
  this.nodes = [];
  for (let i = 0; i < numberOfNodes; i++) {
    this
      .nodes
      .push({
        x: (this.canvasWidth / (numberOfNodes - 1) * i),
        y: this.canvasHeight
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
    let radians = ((2 * Math.PI) * progress);

    let nodes = this
      .nodes
      .map((node, i, nodes) => {
        let horizontalOffset = 0;
        if (this.horizontalOffset) {
          horizontalOffset = this.horizontalOffset * 2 * Math.PI;
        }

        let nodeNumberOffset = (2 * Math.PI * (i / nodes.length) / (1 / this.wavesVisible)) + horizontalOffset;

        let offset = ((Math.sin(radians - nodeNumberOffset) + 1) / 2) * this.waveHeight;

        if (this.waveGrows) 
          offset = (offset * (i / (nodes.length - 1)) * this.waveGrows);
        
        if (this.waveAngle) {
          offset += (Math.tan(this.waveAngle) * this.spaceBetweenNodes * i);
        }
        let yValue = node.y - offset - this.baseHeight;

        if (this.startFlat && progress < (i / nodes.length)) {
          yValue = node.y - this.baseHeight;
        }

        return {x: node.x, y: yValue}
      });
    return nodes;
  },
  draw: function (nodes) {
    this
      .ctx
      .clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this
      .ctx
      .beginPath();
    this
      .ctx
      .moveTo(0, this.canvasHeight);
    nodes.forEach((node, i, nodes) => {
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
    if (this.gradient) {
      this.ctx.fillStyle = this.gradient;
    } else {
      this.ctx.fillStyle = this.color;
    }
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
    if (this.waveCount && (progress / this.speed) >= this.waveCount) 
      return;
    let nodes = this.updateNodes(progress);
    this.draw(nodes);
    requestAnimationFrame(this.animate.bind(this));
  }
}

module.exports = Wave;