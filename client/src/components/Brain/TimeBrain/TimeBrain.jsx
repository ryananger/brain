import React, {useState, useEffect} from 'react';
import * as brain from 'brain.js';

import helpers  from '../../util/helpers.js';
import Draw     from './chart/Draw.jsx';
import br       from './br.js';

const {net, options, max, data} = br;

const Brain = function() {
  const [predicted, setPredicted] = useState([]);

  const normalized = data.map(function(entry) {
    return helpers.trunc(entry/max);
  });

  var trainBrain = function() {
    net.train([normalized], options);

    console.log('Training complete.');
  };

  var testBrain = function() {
    let forecast = net.forecast(normalized.slice(0, 10), 20);
    var forecasted = [...data.slice(0, 10)];

    forecast.map(function(entry) {
      forecasted.push(entry * max);
    })

    setPredicted(forecasted);
  };

  var renderDraw = function() {
    if (data[0]) {
      return <Draw data={data} predicted={predicted}/>
    }
  };

  var renderButtons = function() {
    return (
      <div className='brainButtons h'>
        <button className='brainButton' onClick={trainBrain}>train</button>
        <button className='brainButton' onClick={testBrain}>test</button>
      </div>
    )
  };

  return (
    <div className='visualContainer v'>
      <div className='brainHeader h'>
        <h3>brain.time</h3>
        {renderButtons()}
      </div>
      {renderDraw()}
    </div>
  )
};

export default Brain;