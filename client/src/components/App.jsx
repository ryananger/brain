import React   from 'react';
import ax      from './util/ax.js';
import helpers from './util/helpers.js';

import AllBrain     from './Brain/TimeBrain/AllBrain.jsx';
import WeatherBrain from './Brain/TimeBrain/WeatherBrain.jsx';

const App = function() {
  return (
    <div id='app'>
      <div className='main h'>
        {/* <AllBrain /> */}
        <WeatherBrain />
      </div>
    </div>
  )
}

export default App;