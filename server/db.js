const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/tickers';
const options = {useNewUrlParser: true, useUnifiedTopology: true};

mongoose.set('strictQuery', true);
mongoose.connect(url, options);

const tickerSchema = new mongoose.Schema({
  ticker: String,
  date:   String,

  open:   Number,
  close:  Number,
  high:   Number,
  low:    Number,

  volume: Number,
  vwap:   Number
});

const Ticker = new mongoose.model('Ticker', tickerSchema);
Ticker.createCollection();

tickerSchema.options.toObject = {};
tickerSchema.options.toObject.transform = function(doc, ret) {
  delete ret._id;
  delete ret.__v;

  return ret;
};

module.exports = Ticker;