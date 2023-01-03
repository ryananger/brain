import * as brain from 'brain.js';

const net = new brain.recurrent.LSTMTimeStep({
  inputSize: 1,
  hiddenLayers: [10],
  outputSize: 1,
});

const options = {
  iterations: 100000,
  log: true,
  logPeriod: 1000,
  errorThresh: 0.0001
};

const max = 20;
const data = function() {
  var data = [];

  for (var i = 1; i <= max; i++) {
    data.push(i);
  }

  return data;
}();

export default {net, options, max, data};