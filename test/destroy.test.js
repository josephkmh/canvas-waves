const CanvasWaves = require("./../dist/canvas-waves.node.js");
window.HTMLCanvasElement.prototype.getContext = () => {
  return {
    clearRect: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    fill: () => {}
  };
};

describe("destroying a wave", () => {
  it("removes the canvas DOM node", () => {
    const parent = document.createElement("div");
    parent.className = "parent";
    parent.style.display = "inline-block";
    parent.style.width = "1000px";
    parent.style.height = "1000px";
    parent.style.position = "relative";
    document.body.appendChild(parent);
    const wave = CanvasWaves.wave(".parent", {
      nodes: 5,
      test: true
    });
    wave.destroy();
    expect(parent.children.length).toEqual(0);
    expect(CanvasWaves.waves.length).toEqual(0);
  });
});
