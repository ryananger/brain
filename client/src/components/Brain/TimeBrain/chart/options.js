var colors = {
  yellow1: 'rgb(230, 195, 130)',
  yellow2: 'rgb(232, 193, 121)',
  purple1: 'rgb(134, 100, 145)',
  purple2: 'rgb(75, 54, 82)'
};

var scales = {
  x: {
    ticks: {
      align: 'center',
      color: 'rgb(122, 48, 48)'
    },
    border: {
      display: false
    },
    grid: {
      display: false
    }
  },
  y: {
    position: 'right',
    ticks: {
      color: 'rgb(122, 48, 48)'
    },
    border: {
      display: false
    },
    grid: {
      color: 'rgba(136, 86, 86, 0.2)'
    }
  }
};

var options = {
  animation: false,
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  layout: {
    padding: 12
  },
  scales: scales,
  fill: false,
  radius: 0,
  borderWidth: 2,
  borderColor: 'rgb(122, 48, 48)'
};


export default options;