import React, {useState, useEffect} from 'react';
import * as brain from 'brain.js';

import helpers   from '../../util/helpers.js';
import Draw      from './chart/Draw.jsx';
import br        from './br.js';
import weather   from './sampleData/weatherData.js';
import stocks    from './sampleData/stockData.js';
import line      from './sampleData/lineData.js';

const {createNets, options} = br;
const initNets    = createNets(3);

const lineData    = line.data;
const lineMax     = line.max;
const stockData   = stocks.data;
const stockMax    = stocks.max;
const weatherData = weather.data;
const weatherMax  = weather.max;

const Brain = function() {
  const [predicted, setPredicted]  = useState([]);
  const [pAverage, setAverage]     = useState([]);
  const [averageOn, toggleAverage] = useState(false);

  const [data, setData] = useState(stockData);
  const [max,  setMax]  = useState(stockMax);
  const [nets, setNets] = useState(initNets);

  const [dataType, setType] = useState('stock');

  const trainLength  = dataType === 'stock' ? 40 : 20;
  const trainingData = data.slice(0, trainLength);

  const normalized = trainingData.map(function(entry) {
    return helpers.trunc(entry/max);
  });

  var trainBrain = function(num) {
    nets.map(function(net, i) {
      var trained = net.train([normalized], options);

      // net.train returns an object: {iteration count, error threshold}
      // console.log(trained);
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

    // get average of predictions
    let averages = [];

    for (var i = 0; i < predictions[0].length; i++) {
      var sum = 0;
      var average;

      predictions.map(function(entry) {
        sum += entry[i];
      })

      average = sum/predictions.length;
      averages.push(average);
    }

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

  var changeData = function(e) {
    let type, max;

    switch(e.target.value) {
      case 'weather':
        type = weatherData;
        max  = weatherMax;
        break;
      case 'line':
        type = lineData;
        max  = lineMax;
        break;
      case 'stock':
        type = stockData;
        max  = stockMax;
        break;
    }

    setData(type);
    setMax(max);
    setNets(createNets(3));
    setPredicted([]);
    setAverage([]);
    setType(e.target.value);
    toggleAverage(false);
  };

  var renderChart = function() {
    if (!averageOn) {
      return <Draw dataType={dataType} data={data} predicted={predicted}/>
    } else {
      return <Draw dataType={dataType} data={data} predicted={pAverage}/>
    }
  };

  return (
    <div className='visualContainer v'>
      <div className='brainHeader h'>
        <h3>brain.js - timeseries</h3>
        <div className='brainButtons h'>
          <select id='dataset' onChange={changeData}>
            <option value={'stock'}>  stock</option>
            <option value={'weather'}>weather</option>
            <option value={'line'}>   line</option>
          </select>
          <button className='brainButton' onClick={trainTestLoop}>train</button>
          <button className='brainButton' onClick={()=>{toggleAverage(!averageOn)}}>toggle avg.</button>
        </div>
      </div>
      {renderChart()}
    </div>
  )
};

export default Brain;