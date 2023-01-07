import React, {useState, useEffect} from 'react';
import chroma from 'chroma-js';

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController
} from 'chart.js';
import { Line } from 'react-chartjs-2';

import options from './options.js';
import weather from '../weatherData.js';
import stocks  from '../stockData.js';

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  LineController
);

const Draw = function({dataType, data, predicted}) {
  const datasets = function() {
    let datasets = [
      {
        data: data,
        fill: false,
        borderColor: 'green',
        tension: 0.1
      }
    ];

    predicted.map(function(set, i) {
      var config = {
        data: set,
        fill: false,
        tension: 0.01
      };

      let base = 'blue';
      let h = chroma(base).get('hsl.h');
      let s = chroma(base).get('hsl.s');
      let l = chroma(base).get('hsl.l');

      let hInc = h + (i * 50);
      let nh = hInc < 360 ? hInc : hInc - 360;

      let color = chroma.hsl(nh, s, l).hex();

      config.borderColor = color;
      config.backgroundColor = color;
      config.borderDash = [2, 4];

      datasets.push(config);
    });

    return datasets;
  };

  var setOptions = JSON.parse(JSON.stringify(options));
  var labels;

  switch (dataType) {
    case 'line':
    case 'weather':
      labels = weather.labels;
      setOptions.scales.y.min = 0;
      setOptions.scales.y.max = 60;
      break;
    case 'stock':
      labels = stocks.labels;
      setOptions.scales.y.min = 5;
      setOptions.scales.y.max = 9;
      break;
  }

  const prepped = function() {
    let prepped = {
      labels:   labels,
      datasets: datasets()
    };

    return prepped;
  }();

  var render = function() {
    if (data[0]) {
      return <Line options={setOptions} data={prepped}/>
    }
  };

  return (
    <div className='chartContainer'>
      {render()}
    </div>
  )
};

export default Draw;