import React, {useState, useEffect} from 'react';
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

import options    from './options.js';

ChartJS.register(
  LinearScale,
  CategoryScale,
  PointElement,
  LineElement,
  Tooltip,
  LineController
);

const Draw = function({data, predicted}) {
  const labels = function() {
    if (predicted[0]) {
      return predicted.map((entry, i)=>{return i + 1});
    } else {
      return data.map((entry, i)=>{return i + 1});
    }
  };

  const prepped = function() {
    let prepped = {
      labels:   labels(),
      datasets: [
        {
          data: predicted,
          fill: false,
          borderColor: 'rgb(187, 80, 155)',
          tension: 0.1
        },
        {
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }
      ]
    };

    return prepped;
  }();

  var render = function() {
    if (data[0]) {
      return <Line options={options} data={prepped}/>
    }
  };

  return (
    <div className='chartContainer'>
      {render()}
    </div>
  )
}

export default Draw;