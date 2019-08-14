import Wave from "./Wave";

const CanvasWaves = () => {
  const waves = [];

  const CanvasWave = (selector, options) => {
    const wave = new Wave(selector, options);
    waves.push(wave);
    return wave;
  };

  return {
    create: CanvasWave,
    all: waves
  };
};

export default CanvasWaves();
