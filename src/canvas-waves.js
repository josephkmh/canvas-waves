import Wave from "./Wave";

function CanvasWaves() {
  this.waves = [];

  const deregister = wave => {
    this.waves = this.waves.filter(w => w.id !== wave.id);
  };

  this.clearAll = () => {
    this.waves.forEach(wave => wave.destroy());
  };

  this.wave = function(selector, options) {
    const wave = new Wave(selector, options);
    wave.id = this.waves.length + 1;
    wave.deregister = () => deregister(wave);
    this.waves.push(wave);
    return wave;
  };
}

export default CanvasWaves;
