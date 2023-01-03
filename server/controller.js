const Ticker = require('./db.js');

const controller = {
  postTickers: function(req, res) {
    Ticker.insertMany(req.body);
    res.send({posted: true, message: 'Posted.'});
  },
  findTickers: function(filter, sort, res) {
    var sendBody = [];
    var proms    = [];

    if (filter.ticker) {
      filter.ticker.map(function(ticker) {
        var prom = new Promise(function(resolve) {
          controller.findTicker(ticker, filter, sort, resolve);
        });

        proms.push(prom);
      })

      Promise.all(proms)
        .then(function(all) {
          all.map(function(ticker) {
            if (!ticker) {
              return;
            }

            sendBody = sendBody.concat(ticker);
          })

          res.json(sendBody);
        })
    } else {
      Ticker.find(filter)
        .sort(sort)
        .then(function(tickers) {
          tickers.map(function(ticker) {
            sendBody.push(ticker.toObject());
          })

          res.json(sendBody);
        })
    }
  },
  findTicker: function(ticker, filter, sort, finish) {
    let thisFilter = {
      ...filter,
      ticker: ticker
    };

    Ticker.find(thisFilter)
      .sort(sort)
      .then(function(tickers) {
        if (tickers.length === 0) {
          finish(false);
          return;
        }

        var sendBody = [];

        tickers.map(function(ticker) {
          sendBody.push(ticker.toObject());
        });

        finish(sendBody);
        return sendBody;
      })

  },

  numQuery: function(expression) {
    expression = expression.replaceAll(' ', '');
    var args = expression.split(',');
    var filter = {};

    args.map(function(arg) {
      var index = arg.search(/[0-9]/);
      if (index === 0) {
        filter = Number(arg);
      } else {
        var operator = arg.slice(0, index);

        switch (operator) {
          case '>':
            operator = '$gt';
            break;
          case '<':
            operator = '$lt';
            break;
          case '>=':
            operator = '$gte';
            break;
          case '<=':
            operator = '$lte';
            break;
        }

        var num = Number(arg.slice(index));

        filter[operator] = num;
      }
    })

    return filter;
  }
};

module.exports = controller;