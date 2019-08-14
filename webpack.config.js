const path = require("path");

const serverConfig = {
  entry: "./src/index.js",
  target: "node",
  output: {
    filename: "canvas-waves.node.js",
    path: path.resolve(__dirname, "dist"),
    library: "CanvasWaves",
    libraryTarget: "umd"
  },
  mode: "development"
};

const clientConfig = {
  entry: "./src/index.js",
  target: "web",
  output: {
    filename: "canvas-waves.js",
    path: path.resolve(__dirname, "dist"),
    library: "CanvasWaves",
    libraryTarget: "umd"
  },
  mode: "development"
};

module.exports = [serverConfig, clientConfig];
