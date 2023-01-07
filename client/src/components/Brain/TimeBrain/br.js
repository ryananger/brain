import * as brain from 'brain.js';

const createNet = function() {
  return new brain.recurrent.LSTMTimeStep({
    inputSize: 1,
    hiddenLayers: [10, 10],
    outputSize: 1,
  });
};

const createNets = function(num) {
  console.clear();
  let nets = [];

  for (var i = 0; i < num; i++) {
    nets.push(createNet());
  };

  window.nets = nets;
  console.log(`Created ${num} neural nets:`, nets);
  return nets;
};

const options = {
  iterations: 100,
  log: false,
  logPeriod: 100,
  errorThresh: 0.0001
};

const max = 30;
const lineData = function() {
  var data = [];

  for (var i = 1; i <= max; i++) {
    data.push(i);
  }

  return data;
}();

export default {createNets, options, max, lineData};