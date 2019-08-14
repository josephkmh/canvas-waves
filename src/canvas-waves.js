import Wave from "./Wave";

const CanvasWaves = () => {
  const waves = [];

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

  return {
    create: CanvasWave,
    all: waves
  };
};

export default CanvasWaves();
