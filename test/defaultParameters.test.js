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

test("correct default wave parameters are set", () => {
  const parent = document.createElement("div");
  parent.className = "parent";
  document.body.appendChild(parent);
  const wave = CanvasWaves.wave(".parent");

  expect(wave.baseHeight).toEqual(0);
  expect(wave.speed).toEqual(10000);
  expect(wave.color).toEqual("#000000");
});
