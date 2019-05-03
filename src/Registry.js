class Registry {
  constructor() {
    this.waves = [];
    console.log("here i am");
  }

  deregister(id) {
    this.waves = this.waves.filter(wave => wave.id !== id);
  }

  push(wave) {
    wave.deregister = () => deregister(wave.id);
    console.log("registered");
    this.waves.push(wave);
    return this.waves;
  }

  items() {
    return this.waves;
  }
}

export default () => new Registry();
