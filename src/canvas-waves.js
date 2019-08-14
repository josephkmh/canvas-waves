import Wave from "./Wave";

<<<<<<< HEAD
const CanvasWaves = () => {
  const waves = [];
=======
function CanvasWaves() {
  this.waves = [];

  const deregister = wave => {
    this.waves = this.waves.filter(w => w.id !== wave.id);
  };
>>>>>>> bb21da760afd643d9569a00f8e8f4da1387985ad

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
<<<<<<< HEAD

  return {
    create: CanvasWave,
    all: waves
  };
};

export default CanvasWaves();
=======
}

export default CanvasWaves;
>>>>>>> bb21da760afd643d9569a00f8e8f4da1387985ad
