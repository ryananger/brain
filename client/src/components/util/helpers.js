var helpers = {
  trunc: function(num) {
    if (!num) {
      return '';
    }

    return Math.trunc(num*100)/100;
  },

  parseCookie: function() {
    if (!document.cookie) {
      return;
    }

    var split = document.cookie.replaceAll(' ', '').split(';');
    var cookie = {};

    split.map(function(entry) {
      var keyValue = entry.split('=');

      cookie[keyValue[0]] = keyValue[1];
    })

    return cookie;
  },
  getDateFromCookie: function() {
    var date;

    if (!document.cookie) {
      //document.cookie = 'date=2021-01-01';
      document.cookie = 'date=2022-12-30';
    }

    date = document.cookie.slice(5);

    return date;
  },
  getURL: function(date) {
    var urlBase = 'https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/';
    var urlDate = date;
    var urlMod = '?adjusted=true&apiKey=' + process.env.API_KEY;

    return urlBase + urlDate + urlMod;
  },
  dateToString: function(date) {
    var str = date.year + '-' + date.month.padStart(2, '0') + '-' + date.day.padStart(2, '0');

    return str;
  },
  getTodayString: function() {
    var today = new Date();
    var current = {
      year:  (today.getFullYear()).toString(),
      month: (today.getMonth() + 1).toString(),
      day:   (today.getDate()).toString()
    };

    var todayString = helpers.dateToString(current);

    return todayString;
  },
  newDate: function(date) {
    var newDate;

    switch (date.month) {
      case '13':
        return false;
      case '01':
      case '03':
      case '05':
      case '07':
      case '08':
      case '10':
      case '12':
        if (Number(date.day) < 31) {
          newDate = {
            ...date,
            day: (Number(date.day) + 1).toString().padStart(2, '0')
          }
        } else {
          newDate = {
            ...date,
            month: (Number(date.month) + 1).toString().padStart(2, '0'),
            day: '01'
          }
        }
        break;
      case '04':
      case '06':
      case '09':
      case '11':
        if (Number(date.day) < 30) {
          newDate = {
            ...date,
            day: (Number(date.day) + 1).toString().padStart(2, '0')
          }
        } else {
          newDate = {
            ...date,
            month: (Number(date.month) + 1).toString().padStart(2, '0'),
            day: '01'
          }
        }
        break;
      case '02':
        if (Number(date.day) < 28) {
          newDate = {
            ...date,
            day: (Number(date.day) + 1).toString().padStart(2, '0')
          }
        } else {
          newDate = {
            ...date,
            month: (Number(date.month) + 1).toString().padStart(2, '0'),
            day: '01'
          }
        }
        break;
    }

    var today = new Date();
    var current = {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      day: today.getDate()
    };

    if (Number(newDate.year)  === current.year  &&
        Number(newDate.month) === current.month &&
        Number(newDate.day)   === current.day) {
          return false;
    }

    return newDate;
  },

  reverseData: function(data) {
    var reversed = [];

    if (data[0]) {
      data.map(function(entry) {
        reversed.unshift(entry);
      })
    }

    return reversed;
  },
  getPages: function(data) {
    var pages = [];

    for (var i = 0; i < data.length/500; i++) {
      var start = i * 500;
      var end   = (i * 500) + 500;

      var slice = data.slice(start, end);

      pages.push(slice);
    }

    return pages;
  }
};

var dateString = helpers.getDateFromCookie();

helpers.dateString = dateString;
helpers.labels = ['ticker', 'date', 'dateEnd', 'open', 'close', 'high', 'low', 'volume', 'vwap'];
helpers.startDate = {
  year:  dateString.slice(0, 4),
  month: dateString.slice(5, 7),
  day:   dateString.slice(8)
};

export default helpers;