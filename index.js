const fs = require('fs');
const zlib = require('zlib');
const fsp = require('fs/promises');
const slugify = require('slugify');
const makerjs = require('makerjs');
const { optimize } = require('svgo');
const opentype = require('opentype.js');


const googleFontsApiKey = 'AIzaSyAFeXd5l1uMGJAwWaK_d8d8vuGSyXtzQ38';
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

function insertString(originalString, position, stringToInsert) {
  let substringBefore = originalString.substring(0, position);
  let substringAfter = originalString.substring(position);
  let modifiedString = substringBefore + stringToInsert + substringAfter;
  return modifiedString;
}

const main = async () => {
  const googleRes = await fetch(googleWebFontsEndpoint);
  const list = await googleRes.json();
  const gzip = zlib.createGzip();
  const families = [];

  gzip.pipe(fs.createWriteStream('./demo/public/font-previews.html.gz'));

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
        scalingStroke,
      });

      const result = optimize(svg, {
        multipass: true,
        cleanupIds: false,
      });

      gzip.write(insertString(result.data, 5, `id="${slugify(item.family)}" `));
      families.push(item.family);

      console.log(`wrote ${item.family}`);
    } else {
      console.info(`skipping ${item.family}, no regular file`);
    }
  }

  gzip.end();
  await fsp.writeFile('./demo/src/preview-families.json', JSON.stringify(families));
};

main().catch((error) => {
  console.error(error);
});
