import Wave from "./Wave";

function CanvasWaves() {
  let waveCount = 0;
  let waves = [];

  const deregister = id => {
    let filtered = waves.filter(w => w.id !== id);
    waves.length = 0;
    [].push.apply(waves, filtered);
  };

  const clearAll = () => {
    waves.forEach(wave => wave.destroy());
  };

  const create = (selector, options) => {
    const wave = new Wave(selector, options);
    wave.id = ++waveCount;
    wave.deregister = () => deregister(wave.id);
    waves.push(wave);
    return wave;
  };

  return {
    create,
    all: waves,
    clearAll
  };
}

export default CanvasWaves;
