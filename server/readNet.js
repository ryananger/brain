const fs = require('fs');

const readNet = function(res) {
  fs.readFile('server/net.txt', 'utf8', function(err, data) {
    if (!data) {
      res.send('Empty neural net.');
      return;
    }

    var net = JSON.parse(data);

    res.json(net);
  })
};

module.exports = readNet;