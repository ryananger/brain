var helpers = {
  trunc: function(num) {
    if (!num) {
      return '';
    }

    return Math.trunc(num*100)/100;
  },
  getAverages: function(predictions) {
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

    return averages;
  }
};

export default helpers;