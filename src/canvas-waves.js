import Wave from "./Wave";

const CanvasWaves = () => {
  let waves = [];

  const deregister = wave => {
    console.log("remove waves with id ", wave.id);
    waves = waves.filter(w => w.id !== wave.id);
    console.log(waves);
  };

  const CanvasWave = (selector, options) => {
    const wave = new Wave(selector, options);
    wave.id = waves.length + 1;
    wave.deregister = () => deregister(wave);
    waves.push(wave);
    return wave;
  };

  return { wave: CanvasWave, waves };
};

export default CanvasWaves();
