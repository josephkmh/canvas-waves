const Canvas = ({selector, gradient, color, opacity}) => {
  const parent = document.querySelector(selector);

  if (!parent) {
    throw new Error("Parent element could not be found.");
  }

  if (parent.style.position !== "relative" || "absolute") {
    parent.style.position = "relative";
  }
  const canvas = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.opacity = opacity;
  canvas.height = parent.clientHeight;
  canvas.width = parent.clientWidth;

  /**
   * Prepare context for rendering
   */
  canvas.ctx = canvas.getContext("2d");
  if (gradient) {
    canvas.ctx.fillStyle = gradient;
  } else {
    canvas.ctx.fillStyle = color;
  }

  /**
   * Add canvas to DOM
   */
  if (parent.children.length == 0) {
    parent.appendChild(canvas);
  } else {
    parent.insertBefore(canvas, parent.children[0]);
  }

  return canvas;
}

export default Canvas;