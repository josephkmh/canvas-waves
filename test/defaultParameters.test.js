const CanvasWaves = require("../dist/canvas-waves.js");

// Mock window.canvas element properties that exists in a browser context
window.HTMLCanvasElement.prototype.getContext = require("./__mockCanvas");

describe("default parameters", () => {
  test("correct default wave parameters are set", () => {
    const parent = document.createElement("div");
    parent.className = "parent";
    parent.width = 1000;
    parent.height = 1000;
    document.body.innerHTML = `<div class="parent" style="width:1000px;height:1000px;"></div>`;
    const wave = CanvasWaves.create(".parent");

    expect(wave.baseHeight).toEqual(0);
    expect(wave.speed).toEqual(10000);
    expect(wave.color).toEqual("#000000");
  });
});
