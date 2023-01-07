import React   from 'react';
import ax      from './util/ax.js';
import helpers from './util/helpers.js';

import Interface from './Interface.jsx';
import TimeBrain from './Brain/TimeBrain/TimeBrain.jsx';

const App = function() {
  const st = window.state;

  return (
    <div id='app'>
      <div className='main h'>
        {/* <Interface /> */}
        <TimeBrain />
      </div>
    </div>
  )
}

export default App;