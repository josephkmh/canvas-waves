const Wave = require("../index.js");
window.HTMLCanvasElement.prototype.getContext = () => {
  return {
    clearRect: () => {},
    beginPath: () => {},
    moveTo: () => {},
    lineTo: () => {},
    closePath: () => {},
    fill: () => {}
  }
};

test("updateNodes with sine wave", () => {
  const parent = document.createElement("div");
  parent.className = "parent";
  parent.style.display = "inline-block";
  parent.style.width = "1000px";
  parent.style.height = "1000px";
  parent.style.position = "relative";
  document
    .body
    .appendChild(parent);
  const wave = new Wave(".parent", {
    nodes: 5,
    test: true
  });

  console.log(wave.parent);

  expect(wave.nodes).toEqual([
    {
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 0
    }
  ]);
});
