# svg-font-previews
A pipeline for generating SVG font previews for large amounts of font families.

## Quickstart
This will generate optimized, gzipped SVG previews for all Google Web Fonts that have a `regular` variant into `./demo/public/font-previews.html.gz`. At time of writing, the output comes in at under `8MB`

- `npm i`
- Add a Google Web Fonts API key to `./index.js`
- `node index.js`

## Demo
You can test performance of rendering 1500+ SVG font previews with virtual rendering after running through Quickstart.

- `cd ./demo`
- `npm i`
- `npm run start`

<img width="1034" alt="image" src="https://github.com/tjdavenport/svg-font-previews/assets/4801431/cb205b04-3512-456b-a091-c900bfb168c7">

## Credits
- I used [danmarshall/google-font-to-svg-path]([asddsafdsa](https://github.com/danmarshall/google-font-to-svg-path)https://github.com/danmarshall/google-font-to-svg-path) to discover the rendering approach.
