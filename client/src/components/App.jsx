import React   from 'react';

import AllBrain     from './Brain/TimeBrain/AllBrain.jsx';
import WeatherBrain from './Brain/TimeBrain/WeatherBrain.jsx';

const App = function() {
  return (
    <div id='app'>
      <div className='main h'>
        <AllBrain />
        {/* <WeatherBrain /> */}
      </div>
    </div>
  )
}

export default App;