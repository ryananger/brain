const express = require('express');
const cors = require('cors');
const path = require('path');
const controller = require('./controller.js');
const readNet = require('./readNet.js');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.post('/tickers', function(req, res) {
  controller.postTickers(req, res);
});

app.get('/tickers', function(req, res) {
  var query = req.query.filter;
  var sort = req.query.sort;
  var filter = {};

  for (var key in query) {
    switch (key) {
      case 'date':
        filter.date = query.date;
        break;
      case 'ticker':
        let tickerString = query.ticker.replaceAll(' ', '');
        let tickers = tickerString.split(',');

        filter.ticker = tickers;
        break;
      case 'dateEnd':
        filter.date = {'$gte': filter.date, '$lte': query.dateEnd};
        break;
      default:
        filter[key] = controller.numQuery(query[key]);
        break;
    }
  }

  console.log(filter);

  controller.findTickers(filter, sort, res);
});

app.get('/net', function(req, res) {
  readNet(res);
});

const PORT = 4001;

app.listen(PORT);
console.log(`Server listening at http://localhost:${PORT}`);
