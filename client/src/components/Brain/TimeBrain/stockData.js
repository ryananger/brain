import stocks from './stocks.js';

var data = [];
var labels = [];
var max = 0;

stocks.map(function(entry, i) {
  labels.unshift(entry.date);
  data.unshift(entry.open);

  if (entry.open > max && i < 40) {
    max = entry.open;
  }
})

export default {labels, data, max};