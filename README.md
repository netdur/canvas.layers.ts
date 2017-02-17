## Canvas Layers — Blazing fast render enginer in Typescript

Inspired by Chrome accelerate rendering https://www.html5rocks.com/en/tutorials/speed/layers/

Canvas Layers adds support for layers to the canvas without using multiple stacked canvases, also minimises drawing via a damaged rectangles system.

Check demo [screenshot](http://imgur.com/a/l9gSR), on chrome open developer console > menu > more tools > rendering, then check both "Paint Flashing" and "FPS Meter", redraws are minimal at speed of 60 fps.

## License

GPL v2
