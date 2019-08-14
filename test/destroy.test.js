const CanvasWaves = require("./../dist/canvas-waves.node.js");

// Mock window.canvas element properties that exists in a browser context
window.HTMLCanvasElement.prototype.getContext = require("./__mockCanvas");

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
