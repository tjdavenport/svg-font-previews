const fsp = require('fs/promises');
const slugify = require('slugify');
const makerjs = require('makerjs');
const { optimize } = require('svgo');
const { gzip } = require('node-gzip');
const opentype = require('opentype.js');

const googleFontsApiKey = '';
const googleWebFontsEndpoint = `https://www.googleapis.com/webfonts/v1/webfonts?key=${googleFontsApiKey}`;

const fontSize = 18;
const union = false;
const bezierAccuracy = undefined;
const kerning = true;

const fill = '#000';
const stroke = '#000';
const strokeWidth = '0.25mm';
const fillRule = 'evenodd';
const scalingStroke = true;

const main = async () => {
  const googleRes = await fetch(googleWebFontsEndpoint);
  const list = await googleRes.json();
  const objMap = {};

  for (const item of list.items) {
    if (item.files.regular) {
      const buff = await fetch(item.files.regular).then(res => {
        return res.arrayBuffer();
      });
      const font = await opentype.parse(buff);

      const model = new makerjs.models.Text(
        font,
        item.family,
        fontSize,
        union,
        false,
        bezierAccuracy,
        { kerning }
      );

      const svg = makerjs.exporter.toSVG(model, {
        fill,
        stroke,
        strokeWidth,
        fillRule,
        scalingStroke
      });
      const result = optimize(svg, {
        multipass: true,
      });
      objMap[item.family] = result.data;
      const compressed = await gzip(result.data);

      await fsp.writeFile(`./out/${slugify(item.family)}.svg.gz`, compressed);
      await fsp.writeFile('./demo/src/map.json', JSON.stringify(objMap));
      console.log(`wrote ${item.family}`);
    } else {
      console.info(`skipping ${item.family}, no regular file`);
    }

  }
};

main().catch((error) => {
  console.error(error);
});
