import React, {useState, useEffect} from 'react';
import * as brain from 'brain.js';

import helpers  from '../../util/helpers.js';
// import Draw     from './chart/Draw.jsx';

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 1,
  outputSize: 1,
});

const options = {
  iterations: 20000,
  log: true,
  logPeriod: 1000,
  errorThresh: 0.01
};

const Brain = function({data}) {
  var trainBrain = function() {
    net.train([data], options);

    console.log('Training complete.');

    let ran = net.run(data);
    let forecast = net.forecast(data, 10);

    console.log(ran, forecast);
  };

  var testBrain = function() {
    //net.run();
  };

  var renderDraw = function() {
    if (data[0]) {
      // return <Draw />
      return;
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
        {renderButtons()}
      </div>
      {renderDraw()}
    </div>
  )
};

export default Brain;