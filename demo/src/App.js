import fontMap from './map.json';
import { useEffect, useRef } from 'react';

const fontEntries = Object.entries(fontMap);

const FontPreview = ({ family, svg }) => {
  const container = useRef();

  useEffect(() => {
    if (container.current) {
      try {
        container.current.innerHTML = svg;
      } catch (error) {
        debugger;
      }
    }
  }, []);

  return (
    <div ref={container}></div>
  );
}

function App() {
  return (
    <div className="App">
      <table style={{width: '100vw'}}>
        <thead>
          <tr>
            <th>Font Family</th>
            <th>Preview</th>
          </tr>
        </thead>
        <tbody>
          {fontEntries.map(([family, svg]) => {
            return (
              <tr>
                <td>{family}</td>
                <td><FontPreview family={family} svg={svg}/></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
