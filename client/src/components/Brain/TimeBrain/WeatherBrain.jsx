import React, {useState, useEffect} from 'react';
import * as brain from 'brain.js';

import helpers from '../../util/helpers.js';
import Draw    from './chart/Draw.jsx';
import br      from './br.js';
import weather from './sampleData/weatherData.js';

const data = weather.data;
const max  = weather.max;

const {createNets, options} = br;
const nets = createNets(3);

const Brain = function() {
  const [predicted, setPredicted]  = useState([]);
  const [pAverage,  setAverage]    = useState([]);
  const [averageOn, toggleAverage] = useState(false);

  // define training dataset length, slice from data, then normalize
  const trainLength  = 20;
  const trainingData = data.slice(0, trainLength);

  const normalized = trainingData.map(function(entry) {
    return helpers.trunc(entry/max);
  });

  var trainBrain = function(num) {
    // train each neural net on the normalized dataset, with options defined in br.js;
    nets.map(function(net, i) {
      net.train([normalized], options); // returns an object: {iterations, error};
    })

    testBrain(num);
  };

  var testBrain = function(num) {
    let predictions = [];

    // for each neural net, run forecast and push results to predicted
    nets.map(function(net, i) {
      let forecast = net.forecast(normalized, 20);
      let forecasted = [...trainingData];

      forecast.map(function(entry) {
        forecasted.push(entry * max);
      })

      predictions.push(forecasted);
    });

    let averages = helpers.getAverages(predictions);

    // update state and start next loop
    setAverage([averages]);
    setPredicted(predictions);

    var thisNum = num;

    setTimeout(function() {trainTestLoop(null, thisNum + 1)}, 100);
  };

  var trainTestLoop = function(e, num) {
    var num = num || 0;

    if (num < 100) {
      trainBrain(num);
    } else {
      alert('Training complete.');
    }
  };

  var renderChart = function() {
    if (!averageOn) {
      return <Draw dataType={'weather'} data={data} predicted={predicted}/>
    } else {
      return <Draw dataType={'weather'} data={data} predicted={pAverage}/>
    }
  };

  return (
    <div className='visualContainer v'>
      <div className='brainHeader h'>
        <h3>brain.js - timeseries</h3>
        <div className='brainButtons h'>
          <button className='brainButton' onClick={trainTestLoop}>train</button>
          <button className='brainButton' onClick={()=>{toggleAverage(!averageOn)}}>toggle avg.</button>
        </div>
      </div>
      {renderChart()}
    </div>
  )
};

export default Brain;