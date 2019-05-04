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

test("updateNodes with sine wave", () => {
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

  expect(wave.nodes).toEqual([
    {
      x: 0,
      y: 0
    },
    {
      x: 0,
      y: 0
    }
  ]);
});
