import Node from "./Node.js";
import Canvas from "./Canvas.js";

function Wave(
  selector,
  {
    baseHeight = 0,
    nodeCount,
    speed = 10000,
    color = "#000000",
    gradient = false,
    horizontalOffset = 0,
    startFlat = false,
    opacity = 1,
    waveGrows = false,
    waveHeight = "15%",
    wavesVisible = 0.5,
    waveAngle = 0
  } = {}
) {
  this.animating = null;
  this.horizontalOffsetTime = horizontalOffset * speed;
  this.speed = speed;
  this.startFlat = startFlat;
  this.startTime;
  this.waveAngleRadians = waveAngle * (Math.PI / 180);
  this.waveGrows = waveGrows;

  /**
   * Set up the canvas & context
   */
  this.canvas = Canvas({ selector, gradient, color, opacity });

  const numberOfNodes = nodeCount || Math.floor(this.canvas.width / 30);
  this.nodes = [];
  for (let i = 0; i < numberOfNodes; i++) {
    this.nodes.push(
      new Node({
        numberOfNodes,
        canvasWidth: this.canvas.width,
        canvasHeight: this.canvas.height,
        wavesVisible: wavesVisible,
        index: i
      })
    );
  }
  this.spaceBetweenNodes = this.canvas.width / (this.nodes.length - 1);

  /**
   * Parse user provided values into pixel values (in case a string percentage is provided)
   */
  this.pixelWaveHeight = this.userInputToPixelValue(
    waveHeight,
    this.canvas.height
  );
  this.pixelBaseHeight = this.userInputToPixelValue(
    baseHeight,
    this.canvas.height
  );

  /**
   * Draw initial position of wave
   */
  this.updateNodes();
  this.draw();
}

Wave.prototype = {
  /**
   * Animate the wave
   */
  animate: function() {
    // halt execution if animation has been turned off
    if (this.animating == false) {
      return;
    }
    this.animating = true;

    // update nodes, repaint canvas and request next animation frame
    this.updateNodes();
    this.draw();
    requestAnimationFrame(this.animate.bind(this));
  },

  /**
   * Draw the current nodes on the canvas context
   */
  draw: function() {
    let ctx = this.canvas.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, this.canvas.height);
    this.nodes.forEach(node => {
      ctx.lineTo(node.x, node.y);
    });
    ctx.lineTo(this.canvas.width, this.canvas.height);
    ctx.lineTo(0, this.canvas.height);
    ctx.closePath();
    ctx.fill();
  },

  /**
   * Calculate the current progress in radians
   */
  getProgressRadians: function() {
    let currentTime = this.timestamp();
    if (!this.startTime && this.animating) {
      this.startTime = currentTime;
    }
    let startTime = this.startTime || currentTime;
    let timeElapsed =
      (currentTime - startTime + this.horizontalOffsetTime) % this.speed;
    let progress = timeElapsed / this.speed;
    return progress * 2 * Math.PI;
  },

  getProgressPercentage: function() {
    // calculate the current progress from 0-1
    let currentTime = this.timestamp();
    if (!this.startTime && this.animating) {
      this.startTime = currentTime;
    }
    let timeElapsed =
      (currentTime - this.startTime + this.horizontalOffsetTime) % this.speed;
    let progress = timeElapsed / this.speed;
    return progress;
  },

  /**
   * Return current timestamp
   */
  timestamp: () => {
    return new Date().getTime();
  },

  /**
   * Toggle animation of the wave
   */
  toggleAnimation: function() {
    if (!this.animating) {
      this.animating = true;
      this.animate();
    } else {
      this.horizontalOffsetTime = this.getProgressPercentage() * this.speed;
      this.startTime = null;
      this.animating = false;
    }
  },

  /**
   * Update nodes based on current time
   */
  updateNodes: function() {
    let progress = this.getProgressRadians();

    this.nodes.forEach(node => {
      // if (this.startFlat && progress < nodePositionMultiplier) {   node.y =
      // this.canvasHeight - this.baseHeight;   return }

      let offset =
        ((Math.sin(progress - node.numberOffset) + 1) / 2) *
        this.pixelWaveHeight;
      if (this.waveGrows) {
        offset =
          offset * (node.index / (this.nodes.length - 1)) * this.waveGrows;
      }
      if (this.waveAngleRadians) {
        offset +=
          Math.tan(this.waveAngleRadians) * this.spaceBetweenNodes * node.index;
      }
      let yValue = this.canvas.height - offset - this.pixelBaseHeight;

      node.y = yValue;
    });
  },

  /**
   * Convert user input to pixels in case they provide a string specifying a percentage
   */
  userInputToPixelValue: (userInput, percentageOf) => {
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

export default Wave;
