import React, { useState } from 'react';
import logo from './logo.svg';
import Field, { CellType } from './components/Field';
import './App.css';
import { createMap, destroyShip } from './game/map';
import { findShip, isDestroyed } from './game/ship';

const createdMap = createMap();

function App() {

  const [map, setMap] = useState(createMap);

  const cellClickCallback = (i: number, j: number) => {
    if (map[i][j] === CellType.default) {
      map[i][j] = CellType.missed;
    }
    if (map[i][j] === CellType.ship) {
      map[i][j] = CellType.hitted;
      const foundShip = findShip(map, i, j);
      if (isDestroyed(foundShip, map)) {
        destroyShip(foundShip, map);
      };
    }

    setMap(map.slice());
  }

  return (
    <div className="App">
      <Field cells={map} cellClickCallback={cellClickCallback} />
    </div>
  );
}

export default App;
