# svg-font-previews
A barbaric pipeline for generating SVG font previews for large amounts of font families.

## Quickstart
This will generate optimized, gzipped SVG previews for all Google Web Fonts that have a `regular` variant into `./out`. Compressing the output with `tar` will bring the output down below `10MB` as of July1 2023.
Additionally, a json map of `{ [fontFamily]: svg, ... }` will be placed in `./demo/src/map.json`. This map comes in at under `30MB`.

- `npm i`
- Add a Google Web Fonts API key to `./index.js`
- `node index.js`

## Demo
You can test performance of rendering 1500+ SVG font previews after running through Quickstart

- `cd ./demo`
- `npm i`
- `npm run start`

<img width="1034" alt="image" src="https://github.com/tjdavenport/svg-font-previews/assets/4801431/cb205b04-3512-456b-a091-c900bfb168c7">

