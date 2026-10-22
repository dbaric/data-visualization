# Scatter plot

Open `index.html` with the Live Server extension in VS Code (not via `file://`).
Write your code in `scatter.js` following the exercise instructions (`theory/VP_V02_scatter_plot.pdf`).

## Task 1

Load `vrijeme.json` and define accessors for dew point (°C, converted from °F) and relative humidity (%).

## Task 2

Set up dimensions, SVG, margins and two linear scales with `d3.extent()` and `.nice()`.

## Task 3

Draw one circle per observation using `.selectAll("circle").data(dataset).join("circle")`.

## Task 4

Add bottom and left axes with the labels `Temperatura rosišta (°C)` and `Relativna vlažnost (%)`.

## Task 5

Wrap drawing in `crtajTocke(podaci)` keyed by `d => d.date`, call it with the first 200 and then all 365 observations, and inspect the enter, update and exit sizes.

## Optional task

Colour the points by `cloudCover` with `d3.scaleSequential(d3.interpolateBlues)` and add a legend for 0 %, 50 % and 100 % cloud cover.
