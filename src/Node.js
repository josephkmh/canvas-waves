/**
 * A single node on the canvas
 */
function Node({canvasWidth, canvasHeight, index, numberOfNodes, wavesVisible}) {

  /**
   * Initialize position on the canvas
   */
  this.x = (canvasWidth / (numberOfNodes - 1)) * index;
  this.y = canvasHeight;
  this.index = index;

  /**
   * Calculate
   */
  this.positionMultiplier = index / numberOfNodes;

  this.numberOffset = (2 * Math.PI * (index / numberOfNodes)) / (1 / wavesVisible);
}

export default Node;