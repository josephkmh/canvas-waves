# CanvasWaves.js

This library lets you easily create static or animated waves using the HTML5 `<canvas>` element, hence CanvasWaves.

[Check out some demos here](https://canvas-waves.joeymh.com)

## Usage

Include the javascript file in your webpage, or use the [npm package](https://www.npmjs.com/package/canvas-waves).

```html
<script src="canvas-waves.min.js"></script>
```

```javascript
import CanvasWaves from "canvas-waves";
```

This exposes a `CanvasWaves` object that you can use to create your waves. The only required argument is a DOM element that should contain the `<canvas>` element for the wave.

```javascript
const wave = CanvasWaves.create(".container", {
  color: "#abc123",
  baseHeight: "20%",
  waveHeight: "50%"
});
```

The canvas is **absolutely positioned to fill the container's width and height.** To avoid overlapping other child elements, make sure to give siblings `position: relative;` or another CSS:

```html
<div class="container">
  <canvas></canvas>
  <!-- The canvas element is injected here by CanvasWaves -->

  <!-- Sibling elements might need additional CSS to avoid being overlapped -->
  <div class="container__item">
    <p>Some other content</p>
  </div>
</div>
```

### Animation

Waves are static by default. You can toggle the animation of a wave by using the `.toggleAnimation()` method.

```javascript
const wave = CanvasWaves.create(".container", {
  color: "#abc123",
  baseHeight: "20%",
  waveHeight: "50%"
});
wave.toggleAnimation();
```

### Delete / remove a wave

You can get rid of a wave by calling its `.destroy()` method.

```javascript
wave.destroy(); // removes canvas from DOM
```

The global `CanvasWaves` object also keeps track of all instantiated waves in the `.all` property. You can also remove all instantiated waves by calling `CanvasWaves.destroyAll()`.

### Customizing the appearance of waves

Use an options object to customize the appearance and behavior of the wave. Here is a list of all possible properties to pass:

| key                  | description                                                                                                                                                                   | type                 | example                                 |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | --------------------------------------- |
| **color**            | The background color of a wave: hexadecimal or rgb(a)                                                                                                                         | `string`             | `#abc123` or `rgba(100, 200, 100, 0.5)` |
| **baseHeight**       | The starting height of the wave. Either a percentage (of the parent element's height) or a number of pixels is valid.                                                         | `String` or `Number` |
| **waveHeight**       | How high the wave extends above the `baseHeight`. Either a percentage (of the parent element's height) or a number of pixels is valid.                                        | `String` or `Number` |
| **wavesVisible**     | How many waves are visible at a given time, where 1 equals a full sine wave.                                                                                                  | `Number`             | `0.5`                                   |
| **horizontalOffset** | By default, a wave begins with the trough (lowest point) at the left. Override this setting to change the starting position of the wave.                                      | `Number (radians)`   | `1`                                     |
| **speed**            | If animation is activated, this determines how fast the wave is animated in milliseconds.                                                                                     | `Number`             | `12000`                                 |
| **nodeCount**        | When a wave is initialized, the number of nodes required is calculated automatically. You can override the number of points on the wave by passing a value here.              | `Number`             | `10`                                    |
| **waveGrows**        | By default, all waves are standard sine waves. When set, this property makes them appear to grow from right to left. The larger the multiplier, the more dramatic the effect. | `Number`             | `1.2`                                   |
