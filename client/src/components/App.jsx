import React   from 'react';
import ax      from './util/ax.js';
import helpers from './util/helpers.js';

import Interface from './Interface.jsx';
import TimeBrain from './Brain/TimeBrain/TimeBrain.jsx';

const App = function() {
  const st = window.state;

  return (
    <div id='app'>
      <h1>brain</h1>

      <div className='main h'>
        <Interface />
        <TimeBrain data={[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]}/>
      </div>
    </div>
  )
}

export default App;