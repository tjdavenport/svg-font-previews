import slugify from 'slugify';
import { FixedSizeList as List } from 'react-window';
import SVG, { cacheStore } from 'react-inlinesvg';
import previewFamilies from "./preview-families.json";
import { useEffect, useRef, useState, useMemo } from 'react';

const loadFontPreviews = () => {
  return fetch('/font-previews.html.gz')
  .then(res => {
    const deflate = new window.DecompressionStream('gzip');
    return res.body.pipeThrough(deflate);
  })
  .then(stream => {
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/html'
      }
    }).text();
  }).then(html => {
    return html.split('</svg>');
  });
};

const useFontPreviews = () => {
  const [previews, setPreviews] = useState();

  useEffect(() => {
    loadFontPreviews().then(node => {
      setPreviews(node);
    });
  }, []);

  return previews;
};

const Fonts = ({ previews }) => {
  const Row = useMemo(() => {
    return ({ index, style }) => {
      return (
        <div style={style}><SVG src={previews[index]}/></div>
      );
    };
  }, []);

  return (
    <List
      height={150}
      itemCount={1541}
      itemSize={40}
      width={300}
      overscanCount={10}
    >
      {Row}
    </List>
  );
};

function App() {
  const previews = useFontPreviews();

  return (
    <div className="App">
      {previews && <Fonts previews={previews}/>}
    </div>
  );
}

export default App;
