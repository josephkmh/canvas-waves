const Wave = require("../index.js");
window.HTMLCanvasElement.prototype.getContext = function() {};

test("correct default wave parameters are set", () => {
  const parent = document.createElement("div");
  parent.className = "parent";
  document.body.appendChild(parent);
  const wave = new Wave(".parent");

  expect(wave.baseHeight).toEqual(0);
  expect(wave.speed).toEqual(5000);
  expect(wave.color).toEqual("#000000");
});
