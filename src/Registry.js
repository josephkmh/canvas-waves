class Registry {
  constructor() {
    this.waves = [];
    console.log('here i am');
  }

  push(wave) {
    this
      .waves
      .push(wave);
    return this.waves;
  }

  items() {
    return this.waves;
  }
}

export default() => new Registry();